import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('id');
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(initialPortfolioData);
  const [isLoading, setIsLoading] = useState(true); // Hydration state

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      const data = await portfolioRepository.getPortfolioDataAsync();
      setPortfolioData(data);
      setIsLoading(false);
    };
    initializeData();

    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<PortfolioData>;
      if (customEvent.detail) {
        setPortfolioData(customEvent.detail);
      }
    };

    window.addEventListener('portfolioDataUpdated', handleSync);
    return () => window.removeEventListener('portfolioDataUpdated', handleSync);
  }, []);

  const t = (textObj: LocalizedText | undefined | null, fallback: string = ''): string => {
    if (!textObj) return fallback;
    return textObj[language] || textObj['en'] || textObj['id'] || fallback;
  };

  const updateData = async (newData: PortfolioData) => {
    // Optimistic UI update
    setPortfolioData(newData);
    // Background save
    await portfolioRepository.savePortfolioDataAsync(newData);
  };

  const resetData = () => {
    const defaultData = portfolioRepository.resetPortfolioData();
    setPortfolioData(defaultData);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, portfolioData, setPortfolioData, t, updateData, resetData }}>
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
