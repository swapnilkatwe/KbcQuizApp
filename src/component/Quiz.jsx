// Contains one Question and multiple choise Answers.

import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import quizComlete from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleAnswer = useCallback(function handleAnswer(answer) {
    setUserAnswers((previousAnswers) => {
      return [...previousAnswers, answer];
    });
  }, []);

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

  // In case of Quiz questions are not finished.
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer} />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
            return (
              <li className="answer" key={Math.random()}>
                <button onClick={() => handleAnswer(answer)}>{answer}</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
