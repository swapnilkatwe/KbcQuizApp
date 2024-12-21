/* eslint-disable react/prop-types */
import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";

export default function Question({ questionText, answers, onSelectAnswer, selectedAnswer, answerState, onskipAnswer }) {

    return(
        <div id="question">
        <QuestionTimer
          timeout={10000}
          onTimeout={onskipAnswer}
        />
        <h2>{questionText}</h2>
        <Answers
          answerState={answerState}
          answers={answers}
          userAnswer={selectedAnswer}
          onSelect={onSelectAnswer}
        />
      </div>
    );
}