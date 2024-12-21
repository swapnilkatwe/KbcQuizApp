/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log("set Timeout");
    const timer = setTimeout(onTimeout, timeout);

    return ()=> {
        clearInterval(timer);
    }
  }, [timeout, onTimeout]);

  useEffect(() => {
    console.log("set Interval");
    // Potential case of infinite loop as state updation every loop. So needed a wrap of useEffect to avoid issue.
    const interval = setInterval(() => setRemainingTime((prevTime) => prevTime - 100), 100);

    return ()=> {
        clearInterval(interval);
    };
  }, []);

  return <progress id="question" value={remainingTime} max={timeout} />;
}
