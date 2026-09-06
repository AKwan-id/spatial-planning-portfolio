import { PortfolioData } from '../types/portfolio';
import { initialPortfolioData } from '../data/initialPortfolioData';
import { supabase } from './SupabaseClient';

export const portfolioRepository = {
  // Sync fallback for immediate render (gets overridden by async load)
  getPortfolioData(): PortfolioData {
    return initialPortfolioData;
  },

  async getPortfolioDataAsync(): Promise<PortfolioData> {
    if (!supabase) {
      console.warn('Supabase not configured. Using dummy initial data.');
      return initialPortfolioData;
    }
    try {
      // Determine if the current user has session (Admin)
      const { data: { session } } = await supabase.auth.getSession();
      const table = session ? 'portfolio_data' : 'public_portfolio_data';

      const { data, error } = await supabase.from(table).select('content').eq('id', 1).single();

      if (error) {
        if (error.code === 'PGRST116') return initialPortfolioData;
        console.error('Database fetch error:', error);
        alert('Fetch Error: ' + JSON.stringify(error));
        // Try fallback to public data if admin fetch failed unexpectedly
        if (session) {
          const fallback = await supabase.from('public_portfolio_data').select('content').eq('id', 1).single();
          if (fallback.data) return fallback.data.content as PortfolioData;
        }
        return initialPortfolioData;
      }

      if (data && data.content) {
        return data.content as PortfolioData;
      }
    } catch (e) {
      console.error('Supabase fetch error:', e);
      alert('Unknown Fetch Error: ' + (e as any).message);
    }
    return initialPortfolioData;
  },

  async savePortfolioDataAsync(data: PortfolioData): Promise<boolean> {
    if (!supabase) {
      console.error('Cannot save. Supabase is not configured.');
      return false;
    }
    try {
      // Filter for public view (strict removal of non-published items)
      const publicData = {
        ...data,
        projects: data.projects.filter(p => p.status === 'PUBLISHED'),
        skills: data.skills.filter(s => s.status === 'PUBLISHED'),
        experience: data.experience.filter(e => e.status === 'PUBLISHED'),
        certificates: data.certificates.filter(c => c.status === 'PUBLISHED')
      };

      // Upload full draft context. RLS protects this.
      const { error: err1 } = await supabase.from('portfolio_data').upsert({ id: 1, content: data });
      if (err1) throw err1;

      // Upload strictly published content for public visitors
      const { error: err2 } = await supabase.from('public_portfolio_data').upsert({ id: 1, content: publicData });
      if (err2) throw err2;

      window.dispatchEvent(new CustomEvent('portfolioDataUpdated', { detail: data }));
      return true;
    } catch (e) {
      console.error('Failed to save to Supabase:', e);
      alert('GAGAL MENYIMPAN KE DATABASE: ' + JSON.stringify(e));
      return false;
    }
  },

  resetPortfolioData(): PortfolioData {
    window.dispatchEvent(new CustomEvent('portfolioDataUpdated', { detail: initialPortfolioData }));
    return initialPortfolioData;
  },

  exportAsJson(currentData: PortfolioData): string {
    return JSON.stringify(currentData, null, 2);
  },

  async importFromJson(jsonString: string): Promise<boolean> {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.profile && parsed.profile.fullName) {
        return await this.savePortfolioDataAsync(parsed);
      }
    } catch (e) {
      console.error('Invalid JSON import:', e);
    }
    return false;
  }
};
