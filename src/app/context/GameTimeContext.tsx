import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { toast } from 'sonner';

interface GameRecord {
  gameId: string;
  gameType: string;
  score: string | number;
  timePlayed: number;
}

interface GameTimeContextType {
  dailyLimit: number;
  setDailyLimit: (limit: number) => void;
  timeUsed: number;
  isPlaying: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  isTimeUp: boolean;
  recordGame: (data: GameRecord) => Promise<void>;
  saveSettings: (settings: { dailyLimit?: number; birthday?: string; name?: string }) => Promise<void>;
}

const GameTimeContext = createContext<GameTimeContextType>({
  dailyLimit: 30,
  setDailyLimit: () => {},
  timeUsed: 0,
  isPlaying: false,
  startTimer: () => {},
  stopTimer: () => {},
  isTimeUp: false,
  recordGame: async () => {},
  saveSettings: async () => {},
});

export function GameTimeProvider({ children }: { children: React.ReactNode }) {
  const [dailyLimit, setDailyLimit] = useState(30); // minutes
  const [timeUsed, setTimeUsed] = useState(0); // seconds
  const [isPlaying, setIsPlaying] = useState(false);
  const { session, user } = useAuth();

  // Load settings when user logs in
  useEffect(() => {
    const fetchSettings = async () => {
      if (!session?.access_token) return;
      try {
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-92f3175c/settings`, {
          headers: {
             'Authorization': `Bearer ${publicAnonKey}`,
             'X-Access-Token': session.access_token
          }
        });
        if (response.ok) {
          const data = await response.json();
          if (data.dailyLimit) {
            setDailyLimit(data.dailyLimit);
          }
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    };

    if (user) {
      fetchSettings();
    }
  }, [user, session]);

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

  const saveSettings = async (settings: { dailyLimit?: number; birthday?: string; name?: string }) => {
      if (settings.dailyLimit !== undefined) {
        setDailyLimit(settings.dailyLimit);
      }
      
      if (!session?.access_token) return;

      try {
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-92f3175c/settings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
            'X-Access-Token': session.access_token
          },
          body: JSON.stringify(settings)
        });
        
        if (response.ok) {
           toast.success("設定已儲存");
        } else {
           toast.error("儲存設定失敗");
        }
      } catch (error) {
        console.error("Failed to save settings:", error);
        toast.error("儲存設定失敗");
      }
  };

  const recordGame = async (data: GameRecord) => {
    if (!session?.access_token) return; // Only record if logged in

    try {
      await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-92f3175c/game/record`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
          'X-Access-Token': session.access_token
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error("Failed to record game:", error);
    }
  };

  return (
    <GameTimeContext.Provider value={{
      dailyLimit,
      setDailyLimit,
      timeUsed,
      isPlaying,
      startTimer,
      stopTimer,
      isTimeUp,
      recordGame,
      saveSettings
    }}>
      {children}
    </GameTimeContext.Provider>
  );
}

export const useGameTime = () => useContext(GameTimeContext);
