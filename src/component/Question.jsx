/* eslint-disable react/prop-types */
import { useState } from "react";
import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";
import QUESTIONS from "../questions.js";

export default function Question({
  index,
  onSelectAnswer,
  onskipAnswer,
}) {

  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null
  });

  function handleSelectedAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null
    });

    setTimeout(()=> {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer
      });

      setTimeout(()=> {
        onSelectAnswer(answer);
      },2000);

    }, 1000);


  }

  let answerState = "";
  
  if(answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if(answer.selectedAnswer) {
    answerState = "answered";   
  }

  return (
    <div id="question">
      <QuestionTimer timeout={10000} onTimeout={onskipAnswer} />
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
