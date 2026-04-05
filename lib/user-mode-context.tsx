'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserMode = 'citizen' | 'court-agent' | 'lawyer';

interface UserModeContextType {
  currentMode: UserMode;
  setMode: (mode: UserMode) => void;
}

const UserModeContext = createContext<UserModeContextType | undefined>(undefined);

export function UserModeProvider({ children }: { children: React.ReactNode }) {
  const [currentMode, setCurrentMode] = useState<UserMode>('citizen');

  useEffect(() => {
    const storedMode = localStorage.getItem('nyayaai_mode');
    if (storedMode && ['citizen', 'court-agent', 'lawyer'].includes(storedMode)) {
      setCurrentMode(storedMode as UserMode);
    }
  }, []);

  const setMode = (mode: UserMode) => {
    setCurrentMode(mode);
    localStorage.setItem('nyayaai_mode', mode);
  };

  return (
    <UserModeContext.Provider value={{ currentMode, setMode }}>
      {children}
    </UserModeContext.Provider>
  );
}

export function useUserMode() {
  const context = useContext(UserModeContext);
  if (context === undefined) {
    throw new Error('useUserMode must be used within UserModeProvider');
  }
  return context;
}
