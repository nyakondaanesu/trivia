"use client";
import { useSearchParams } from "next/navigation";
import Card from "@/components/quizCard";
import { useEffect, useState } from "react";

export default function DocsPage() {
  const searchParams = useSearchParams();
  const [data, setData] = useState([]);
  const [timeLeft, setTimeLeft] = useState(90);
  const [hasStarted, setHasStarted] = useState(false);
  const category = searchParams.get("category") || "23";
  const amount = searchParams.get("amount") || "20";
  const difficulty = searchParams.get("difficulty") || "easy";

  const fetchData = async () => {
    try {
      const response = await fetch(
        `/api/trivia?category=${category}&amount=${amount}&difficulty=${difficulty}`
      );
      const trivia = await response.json();
      setData(trivia); // Set the fetched data into state
      console.log(trivia);
      console.log(`${category}, ${amount} , ${difficulty}`);
    } catch (error) {
      console.error("Error fetching trivia:", error);
    }
  };
  useEffect(() => {
    fetchData();
    console.log(data);
  }, [category, amount, difficulty]);

  useEffect(() => {
    if (!hasStarted || timeLeft <= 0) return; // Stop when the timer reaches zero

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1)); // Ensure it never goes below 0
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, hasStarted]);

  useEffect(() => {
    if (data.length > 0) {
      setHasStarted(true);
    }
  }, [data]);

  return (
    <div className="flex-col flex items-center justify-center">
      <div className="rounded-full  ">
        <p className="text-xl font-bold p-3">{timeLeft}</p>
      </div>
      {data.length > 0 && <Card props={data} />}
    </div>
  );
}
