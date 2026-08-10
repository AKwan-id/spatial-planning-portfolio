import { PortfolioData } from '../types/portfolio';
import { initialPortfolioData } from '../data/initialPortfolioData';

const STORAGE_KEY = 'annisa_portfolio_content_v1';

export const portfolioRepository = {
  getPortfolioData(): PortfolioData {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Basic validation to ensure required fields exist
        if (parsed && parsed.profile && parsed.profile.fullName) {
          if (parsed.profile.shortIntro?.id?.includes('akan ditambahkan') || parsed.profile.shortIntro?.en?.includes('will be added')) {
            parsed.profile.shortIntro = initialPortfolioData.profile.shortIntro;
          }
          if (parsed.profile.education?.id?.includes('akan ditambahkan') || parsed.profile.education?.en?.includes('will be added')) {
            parsed.profile.education = initialPortfolioData.profile.education;
          }
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read portfolio data from localStorage, using defaults.', e);
    }
    return initialPortfolioData;
  },

  savePortfolioData(data: PortfolioData): boolean {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      // Dispatch custom event so UI can sync in real-time
      window.dispatchEvent(new CustomEvent('portfolioDataUpdated', { detail: data }));
      return true;
    } catch (e) {
      console.error('Failed to save portfolio data:', e);
      return false;
    }
  },

  resetPortfolioData(): PortfolioData {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('portfolioDataUpdated', { detail: initialPortfolioData }));
    } catch (e) {
      console.error('Failed to reset portfolio data:', e);
    }
    return initialPortfolioData;
  },

  exportAsJson(): string {
    const data = this.getPortfolioData();
    return JSON.stringify(data, null, 2);
  },

  importFromJson(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.profile && parsed.profile.fullName) {
        return this.savePortfolioData(parsed);
      }
    } catch (e) {
      console.error('Invalid JSON import:', e);
    }
    return false;
  }
};
