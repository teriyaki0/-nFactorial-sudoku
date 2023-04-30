import { useState, useEffect } from "react";

export const Timer = ({ won, difficult, newGame }) => {
  const [wonTime, setWonTime] = useState("60:00");
  const [bestTime, setBestTime] = useState(wonTime);
  const [bestDifficult, setBestDifficult] = useState("Easy");
  const [time, setTime] = useState(0);
  const [timerId, setTimerId] = useState(null);

  const difficultLevels = ["Easy", "Medium", "Hard", "Very Hard", "Insane"];

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, []);

  useEffect(() => {
    stopTimer();
    if (timerId !== null) {
      const intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timerId, won]);

  useEffect(() => {
    setTime(0);
    setTimerId(1);
  }, [difficult, newGame]);

  function startTimer() {
    setTimerId(1);
  }
  function stopTimer() {
    if (won) {
      setTimerId(null);
      setWonTime(formatTime(time));
    }
  }
  const seconds1 =
    parseInt(bestTime.split(":")[0]) * 60 + parseInt(bestTime.split(":")[1]);
  const seconds2 =
    parseInt(wonTime.split(":")[0]) * 60 + parseInt(wonTime.split(":")[1]);

  if (seconds1 > seconds2) {
    setBestTime(wonTime);
  }

  if (won) {
    if (
      difficultLevels.indexOf(bestDifficult) <
      difficultLevels.indexOf(difficult)
    ) {
      setBestDifficult(difficult);
    }
  }

  function formatTime(seconds) {
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }

  return (
    <div>
      <span>
        You Best Game: {bestTime} ({bestDifficult})
      </span>

      <div>{formatTime(time)}</div>
    </div>
  );
};
