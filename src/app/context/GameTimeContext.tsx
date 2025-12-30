import React, { createContext, useContext, useState, useEffect } from 'react';

interface GameTimeContextType {
  dailyLimit: number;
  setDailyLimit: (limit: number) => void;
  timeUsed: number;
  isPlaying: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  isTimeUp: boolean;
}

const GameTimeContext = createContext<GameTimeContextType>({
  dailyLimit: 30,
  setDailyLimit: () => {},
  timeUsed: 0,
  isPlaying: false,
  startTimer: () => {},
  stopTimer: () => {},
  isTimeUp: false
});

export function GameTimeProvider({ children }: { children: React.ReactNode }) {
  const [dailyLimit, setDailyLimit] = useState(30); // minutes
  const [timeUsed, setTimeUsed] = useState(0); // seconds
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimeUsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const startTimer = () => setIsPlaying(true);
  const stopTimer = () => setIsPlaying(false);

  const isTimeUp = timeUsed >= dailyLimit * 60;

  return (
    <GameTimeContext.Provider value={{
      dailyLimit,
      setDailyLimit,
      timeUsed,
      isPlaying,
      startTimer,
      stopTimer,
      isTimeUp
    }}>
      {children}
    </GameTimeContext.Provider>
  );
}

export const useGameTime = () => useContext(GameTimeContext);