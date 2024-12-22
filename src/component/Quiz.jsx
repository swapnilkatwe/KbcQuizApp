// Contains one Question and multiple choise Answers.

import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import quizComlete from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleAnswer = useCallback(
    function handleAnswer(selectedAnswer) {
      setUserAnswers((previousAnswers) => {
        return [...previousAnswers, selectedAnswer];
      });
    },
    []
  );

  //To avoid recreation of object hapens due to rerender.
  const handleSkipAnswer = useCallback(
    () => handleAnswer(null),
    [handleAnswer]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizComlete} alt="quiz completed image" />
        <h2>Quiz Completed!!!</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleAnswer}
        onskipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
