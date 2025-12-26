import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface GameTimeContextType {
  dailyLimit: number; // in minutes
  timeUsed: number; // in seconds
  isTimeUp: boolean;
  isPlaying: boolean;
  setDailyLimit: (limit: number) => void;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}

const GameTimeContext = createContext<GameTimeContextType | undefined>(undefined);

export function GameTimeProvider({ children }: { children: ReactNode }) {
  // Default limit 30 mins
  const [dailyLimit, setDailyLimitState] = useState<number>(30);
  const [timeUsed, setTimeUsed] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const savedDate = localStorage.getItem('mori_game_date');
    const savedTime = localStorage.getItem('mori_game_time_used');
    const savedLimit = localStorage.getItem('mori_game_limit');

    if (savedLimit) {
      setDailyLimitState(parseInt(savedLimit, 10));
    }

    if (savedDate === today && savedTime) {
      setTimeUsed(parseInt(savedTime, 10));
    } else {
      // New day or first time
      setTimeUsed(0);
      localStorage.setItem('mori_game_date', today);
      localStorage.setItem('mori_game_time_used', '0');
    }
  }, []);

  // Timer Logic
  useEffect(() => {
    let interval: number;

    if (isPlaying && !isTimeUp) {
      interval = window.setInterval(() => {
        setTimeUsed((prev) => {
          const newTime = prev + 1;
          localStorage.setItem('mori_game_time_used', newTime.toString());
          localStorage.setItem('mori_game_date', new Date().toISOString().split('T')[0]); // Ensure date is current
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, isTimeUp]);

  // Check limit
  useEffect(() => {
    if (timeUsed >= dailyLimit * 60 && dailyLimit > 0) {
      setIsTimeUp(true);
      setIsPlaying(false);
    } else {
      setIsTimeUp(false);
    }
  }, [timeUsed, dailyLimit]);

  const setDailyLimit = (limit: number) => {
    setDailyLimitState(limit);
    localStorage.setItem('mori_game_limit', limit.toString());
    // If we increase limit, we might need to reset isTimeUp if we have more time now
    if (timeUsed < limit * 60) {
      setIsTimeUp(false);
    }
  };

  const startTimer = () => {
    if (!isTimeUp) {
      setIsPlaying(true);
    }
  };

  const stopTimer = () => {
    setIsPlaying(false);
  };

  const resetTimer = () => {
    setTimeUsed(0);
    setIsTimeUp(false);
    localStorage.setItem('mori_game_time_used', '0');
  };

  return (
    <GameTimeContext.Provider
      value={{
        dailyLimit,
        timeUsed,
        isTimeUp,
        isPlaying,
        setDailyLimit,
        startTimer,
        stopTimer,
        resetTimer,
      }}
    >
      {children}
    </GameTimeContext.Provider>
  );
}

export function useGameTime() {
  const context = useContext(GameTimeContext);
  if (context === undefined) {
    throw new Error('useGameTime must be used within a GameTimeProvider');
  }
  return context;
}
