import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Timer({ onSubmit }) {
  const [secondsRemaining, setSecondsRemaining] = useState(30 * 60);
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    const timerId = setInterval(() => {
      setSecondsRemaining((prevSeconds) => {
        const newSeconds = prevSeconds - 1;

        if (newSeconds >= 0) {
          return newSeconds;
        } else {
          clearInterval(timerId);
          return 0;
        }
      });
    }, 1000);
    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    const alertTimeout = setTimeout(() => {
      if (secondsRemaining <= 30 && !alertShown) {
        toast.error("Last 5 Minutes", {
          autoClose: 3000,
        });
        setAlertShown(true);
      }
      else if(secondsRemaining === 0){
        onSubmit()
      }
    }, 0);
    return () => clearTimeout(alertTimeout);
  }, [secondsRemaining, alertShown]);


  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  return (
    <>
      <p>
        Time Remaining: {minutes.toString().padStart(2, "0")} minutes{" "}
        {seconds.toString().padStart(2, "0")} seconds
      </p>
    </>
  );
}
