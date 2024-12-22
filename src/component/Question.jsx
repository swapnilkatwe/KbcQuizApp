/* eslint-disable react/prop-types */
import { useState } from "react";
import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";
import QUESTIONS from "../questions.js";

export default function Question({ index, onSelectAnswer, onskipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  // TIMER LOGIC TO SOLVE ANSWER MISSMATCH ISSUE DUE TO LAST MOMENT ANSWER SELECTION
  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  function handleSelectedAnswer(answer) {
    // TO SET THE ANSWER WITH HIGHLIGHT THE SELECTED ANSWER
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      // TO SET THE RIGHT OR WRONG ANSWER AFTER 1000 MILISECONDS
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      });

      // TO MOVE TO NEXT QUESTION WITH SELECTED ANSWER AFTER 2000 MILISECONDS DEPENDING ON USERS ACTION
      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer !== "" ? onskipAnswer : null }
        mode={answerState}
      />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answerState={answerState}
        answers={QUESTIONS[index].answers}
        userAnswer={answer.selectedAnswer}
        onSelect={handleSelectedAnswer}
      />
    </div>
  );
}
