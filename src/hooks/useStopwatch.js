import { useState, useRef, useCallback } from "react";

const useStopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);

  const startStopwatch = useCallback(() => {
    startTimeRef.current = Date.now() - time * 1000;
    intervalRef.current = setInterval(() => {
      setTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    setRunning(true);
  }, [time]);

  const pauseStopwatch = useCallback(() => {
    clearInterval(intervalRef.current);
    setRunning(false);
  }, []);

  const resetStopwatch = useCallback(() => {
    clearInterval(intervalRef.current);
    setTime(0);
    setRunning(false);
  }, []);

  const resumeStopwatch = useCallback(() => {
    startTimeRef.current = Date.now() - time * 1000;
    intervalRef.current = setInterval(() => {
      setTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    setRunning(true);
  }, [time]);

  return {
    time,
    running,
    startStopwatch,
    pauseStopwatch,
    resetStopwatch,
    resumeStopwatch,
  };
};

export default useStopwatch;
