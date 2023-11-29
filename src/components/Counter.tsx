import { useEffect, useState } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(180); // 3 minuti in secondi

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    // Resetta il contatore
    return () => clearInterval(intervalId);
  }, []);

  // formattazione
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return <span>{formatTime(counter)}</span>;
};
export default Counter;
