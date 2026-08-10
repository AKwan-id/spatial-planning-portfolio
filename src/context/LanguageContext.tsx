import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, LocalizedText, PortfolioData } from '../types/portfolio';
import { portfolioRepository } from '../services/portfolioRepository';

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
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => portfolioRepository.getPortfolioData());

  useEffect(() => {
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<PortfolioData>;
      if (customEvent.detail) {
        setPortfolioData(customEvent.detail);
      } else {
        setPortfolioData(portfolioRepository.getPortfolioData());
      }
    };

    window.addEventListener('portfolioDataUpdated', handleSync);
    return () => {
      window.removeEventListener('portfolioDataUpdated', handleSync);
    };
  }, []);

  const t = (textObj: LocalizedText | undefined | null, fallback: string = ''): string => {
    if (!textObj) return fallback;
    return textObj[language] || textObj['en'] || textObj['id'] || fallback;
  };

  const updateData = (newData: PortfolioData) => {
    portfolioRepository.savePortfolioData(newData);
    setPortfolioData(newData);
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
