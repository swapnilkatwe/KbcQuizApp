// Contains one Question and multiple choise Answers.

import { useState } from "react";
import QUESTIONS from "../questions.js";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestion = userAnswers.length;

  function handleAnswer(answer) {
    setUserAnswers((previousAnswers) => {
      return [...previousAnswers, answer];
    });
  }

  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[activeQuestion].text}</h2>
        <ul id="answers">
          {QUESTIONS[activeQuestion].answers.map((answer) => {
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
