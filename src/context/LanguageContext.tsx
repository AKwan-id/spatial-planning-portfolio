import React, { createContext, useContext, useState, useEffect, ReactNode, useRef, startTransition } from 'react';
import { Language, LocalizedText, PortfolioData } from '../types/portfolio';
import { portfolioRepository } from '../services/portfolioRepository';
import { initialPortfolioData } from '../data/initialPortfolioData';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  portfolioData: PortfolioData;
  setPortfolioData: React.Dispatch<React.SetStateAction<PortfolioData>>;
  t: (textObj: LocalizedText | undefined | null, fallback?: string) => string;
  updateData: (newData: PortfolioData) => void;
  resetData: () => void;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('id');
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(initialPortfolioData);
  const [isLoading, setIsLoading] = useState(true); // Hydration state
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      const data = await portfolioRepository.getPortfolioDataAsync();
      setPortfolioData(data);
      setIsLoading(false);
    };
    initializeData();

    // BroadcastChannel for cross-tab synchronization
    const channel = new BroadcastChannel('portfolio_sync');
    channel.onmessage = (event) => {
      if (event.data && event.data.type === 'SYNC_DATA') {
        setPortfolioData(event.data.payload);
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  const t = (textObj: LocalizedText | undefined | null, fallback: string = ''): string => {
    if (!textObj) return fallback;
    return textObj[language] || textObj['en'] || textObj['id'] || fallback;
  };

  const updateData = (newData: PortfolioData) => {
    // Instant optimistic UI update for global context (inputs are now locally buffered)
    setPortfolioData(newData);

    // Broadcast change to other open tabs
    const channel = new BroadcastChannel('portfolio_sync');
    channel.postMessage({ type: 'SYNC_DATA', payload: newData });
    channel.close();

    // Clear the existing timeout if user types quickly again
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Background save debounced by 800ms to prevent database thrashing and cursor jumping
    saveTimeoutRef.current = setTimeout(async () => {
      await portfolioRepository.savePortfolioDataAsync(newData);
      saveTimeoutRef.current = null;
    }, 800);
  };

  const resetData = () => {
    const defaultData = portfolioRepository.resetPortfolioData();
    setPortfolioData(defaultData);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, portfolioData, setPortfolioData, t, updateData, resetData, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
