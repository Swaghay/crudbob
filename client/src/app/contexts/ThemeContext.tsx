'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type University = 'umn' | 'uw-madison';

interface ThemeContextType {
  university: University;
  toggleUniversity: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [university, setUniversity] = useState<University>('umn');

  const toggleUniversity = () => {
    setUniversity(prev => prev === 'umn' ? 'uw-madison' : 'umn');
  };

  return (
    <ThemeContext.Provider value={{ university, toggleUniversity }}>
      <div className={`theme-${university}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}