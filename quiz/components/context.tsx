// context/QuestionsContext.tsx
"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

type ObjectData = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

type QuestionsContextType = {
  questions: ObjectData[];
  setQuestions: (questions: ObjectData[]) => void;
};

const QuestionsContext = createContext<QuestionsContextType | undefined>(
  undefined
);

export const QuestionsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [questions, setQuestions] = useState<ObjectData[]>([]);

  return (
    <QuestionsContext.Provider value={{ questions, setQuestions }}>
      {children}
    </QuestionsContext.Provider>
  );
};

export const useQuestions = (): QuestionsContextType => {
  const context = useContext(QuestionsContext);
  if (!context) {
    throw new Error("useQuestions must be used within a QuestionsProvider");
  }
  return context;
};
