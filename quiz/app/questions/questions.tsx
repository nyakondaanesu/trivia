"use client";
import { useSearchParams } from "next/navigation";
import Card from "@/components/quizCard";
import { useEffect, useState } from "react";

export default function DocsPage() {
  const searchParams = useSearchParams();
  const [data, setData] = useState([]);
  const [timeLeft, setTimeLeft] = useState(90);
  const [hasStarted, setHasStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const category = searchParams.get("category") || "23";
  const amount = searchParams.get("amount") || "20";
  const difficulty = searchParams.get("difficulty") || "easy";

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/trivia?category=${category}&amount=${amount}&difficulty=${difficulty}`
      );
      const trivia = await response.json();
      setData(trivia);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching trivia:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category, amount, difficulty]);

  useEffect(() => {
    if (!hasStarted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
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
      <div className="rounded-full">
        <p className="text-xl font-bold p-3">{timeLeft}</p>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        data.length > 0 && <Card props={data} />
      )}
    </div>
  );
}
