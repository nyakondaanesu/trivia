import { useState, useEffect } from "react";
import { title } from "./primitives";
import styled from "styled-components";
import he from "he";

interface CardProps {
  props: Array<{
    question: string;
    incorrect_answers: string[];
    correct_answer: string;
  }>;
}

const Card: React.FC<CardProps> = ({ props }) => {
  const [questionNum, setQuestionNum] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  useEffect(() => {
    let currentAnswers = [...props[questionNum].incorrect_answers];
    if (!currentAnswers.includes(props[questionNum].correct_answer)) {
      currentAnswers.push(props[questionNum].correct_answer);
    }

    // Shuffle the answers
    for (let i = currentAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [currentAnswers[i], currentAnswers[j]] = [
        currentAnswers[j],
        currentAnswers[i],
      ];
    }

    setAnswers(currentAnswers);
    setSelectedAnswer(null); // Reset selection when changing questions
    setShowCorrectAnswer(false); // Reset correct answer display

    // Start the timer
  }, [questionNum, props]);

  return (
    <StyledWrapper>
      <div className="card px-2 mt-5 ">
        <div className="flex flex-col justify-center items-center text-center">
          <h2 className={`${title()} text-xl  text-questionHeader`}>
            {he.decode(props[questionNum].question)}
          </h2>
          {answers.map((answer, index) => {
            const isCorrect = answer === props[questionNum].correct_answer;
            const isSelected = selectedAnswer === answer;

            let buttonColor = "bg-dark hover:bg-black"; // Default color
            if (selectedAnswer) {
              if (isSelected) {
                buttonColor = isCorrect ? "bg-green-900" : "bg-red-900"; // Highlight user choice
              } else if (isCorrect && showCorrectAnswer) {
                buttonColor = "bg-green-900"; // Show correct answer only
              }
            }

            return (
              <div key={index} className="mt-8 w-full">
                <button
                  className={`text-white font-bold py-3 px-6 my-2 rounded-lg sm:w-3/4 md:w-1/2 lg:w-1/3 ${buttonColor}`}
                  onClick={() => {
                    if (selectedAnswer) return; // Prevent multiple clicks

                    setSelectedAnswer(answer);
                    if (!isCorrect) {
                      setShowCorrectAnswer(true);
                      setTimeout(
                        () => setQuestionNum((prev) => prev + 1),
                        1000
                      ); // Reveal correct answer
                    } else {
                      setTimeout(
                        () => setQuestionNum((prev) => prev + 1),
                        1000
                      );
                    }
                  }}
                >
                  {he.decode(answer)}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    height: 70vh;
    width: 80vw;
    background: #fff1e4;
    border-radius: 1rem;
    border: 0.5vmin solid #05060f;
    box-shadow: 0.4rem 0.4rem #05060f;
    overflow: hidden;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export default Card;
