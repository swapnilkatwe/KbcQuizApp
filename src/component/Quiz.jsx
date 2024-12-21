// Contains one Question and multiple choise Answers.

import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import quizComlete from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleAnswer = useCallback(
    function handleAnswer(selectedAnswer) {
      setAnswerState("answered");
      setUserAnswers((previousAnswers) => {
        return [...previousAnswers, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
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
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        onSelectAnswer={handleAnswer}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        answerState={answerState}
        onskipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
