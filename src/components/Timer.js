import { useEffect } from "react";

export default function Timer({ secondsremaining, dispatch }) {
  useEffect(() => {
    if (secondsremaining === 0) {
      dispatch({ type: "FINISH_QUIZ" });
      return;
    }

    const timerId = setTimeout(() => {
      dispatch({ type: "DECREMENT_TIMER" });
    }, 1000);

    return () => clearTimeout(timerId);
  }, [secondsremaining, dispatch]);

  const minutes = Math.floor(secondsremaining / 60);
  const seconds = secondsremaining % 60;

  return (
    <div className="timer">
      {String(minutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}
    </div>
  );
}