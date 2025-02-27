import { NextResponse } from "next/server";
import redis from "@/config/redis";

// Check if any cached trivia keys exist for a category
async function checkTriviaKeysExist(
  category: string,
  amount: number,
  difficulty: string
): Promise<boolean> {
  try {
    const keys = await redis.keys(
      `cachedTrivia:${category}:${amount}:${difficulty}`
    );
    return keys.length > 0; // Returns true if trivia keys exist
  } catch (error) {
    console.error("Error checking trivia keys in Redis:", error);
    return false;
  }
}

type dataQuestion = {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export async function GET(req: Request) {
  try {
    // Parse query parameters from the request
    const url = new URL(req.url);
    const category = url.searchParams.get("category") || "23"; // Default to category 23 (General Knowledge)
    const amount = Number(url.searchParams.get("amount")) || 20; // Default to 20 questions
    const difficulty = url.searchParams.get("difficulty") || "easy"; // Default to easy difficulty

    console.log(
      `Category: ${category}, Amount: ${amount}, Difficulty: ${difficulty}`
    );

    // Check if trivia keys already exist in Redis
    const exists = await checkTriviaKeysExist(category, amount, difficulty);

    if (exists) {
      console.log("Returning cached trivia...");
      // Retrieve cached trivia questions from Redis
      const cachedTrivia = await redis.get(
        `cachedTrivia:${category}:${amount}:${difficulty}`
      );
      if (cachedTrivia) {
        return NextResponse.json(JSON.parse(cachedTrivia)); // Return cached trivia
      }
    }

    // If no cached data, fetch new trivia questions from OpenTDB
    console.log("Fetching new trivia questions...");
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch trivia questions from OpenTDB");
    }

    const data = await response.json();
    const triviaResults = data.results;

    // Store trivia questions in Redis using a pipeline to reduce multiple Redis calls
    const pipeline = redis.pipeline();
    triviaResults.forEach((question: dataQuestion, index: number) => {
      const key = `trivia:${category}:${index + 1}`;
      pipeline.hset(key, {
        type: question.type,
        difficulty: question.difficulty,
        category: question.category,
        question: question.question,
        correct_answer: question.correct_answer,
        incorrect_answers: JSON.stringify(question.incorrect_answers),
      });
      pipeline.expire(key, 3600); // Set expiration time for trivia data (1 hour)
    });

    // Execute all pipeline commands in one batch for better performance
    await pipeline.exec();

    // Cache the trivia questions for faster subsequent requests
    await redis.set(
      `cachedTrivia:${category}:${amount}:${difficulty}`,
      JSON.stringify(triviaResults),
      "EX",
      300 // Cache the trivia data for 5 minutes
    );

    return NextResponse.json(triviaResults);
  } catch (error) {
    console.error("Error in /api/trivia:", error);
    return NextResponse.json(
      { error: "Failed to fetch trivia questions" },
      { status: 500 }
    );
  }
}
