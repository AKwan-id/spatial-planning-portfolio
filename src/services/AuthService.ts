import { supabase } from './SupabaseClient';

export const authService = {
    async signInWithGoogle() {
        if (!supabase) throw new Error('Supabase Client not initialized');
        const redirectUrl = (import.meta as any).env.VITE_SITE_URL || window.location.origin;

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${redirectUrl}/owner`
            }
        });
        if (error) throw error;
        return data;
    },

    async signOut() {
        if (!supabase) return;
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    async getCurrentSession() {
        if (!supabase) return null;
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        return session;
    },

    async getCurrentUser() {
        if (!supabase) return null;
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        return user;
    },

    onAuthStateChange(callback: (event: string, session: any) => void) {
        if (!supabase) return { data: { subscription: { unsubscribe: () => { } } } };
        return supabase.auth.onAuthStateChange(callback);
    }
};
