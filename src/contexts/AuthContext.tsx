import { createContext, useContext, useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    isAdmin: boolean;
    loginAsGuest: () => void;
    loginAsAdmin: () => void;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    loading: true,
    isAdmin: false,
    loginAsGuest: () => { },
    loginAsAdmin: () => { },
    signOut: async () => { },
});

export const useAuth = () => {
    return useContext(AuthContext);
};

const checkIsAdmin = (user: User | null): boolean => {
    if (!user) return false;
    if (user.id === 'demo-admin') return true;
    if (user.user_metadata?.is_admin) return true;
    if (user.email?.includes('admin')) return true;
    return false;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    const isAdmin = checkIsAdmin(user);

    useEffect(() => {
        // If keys are placeholders, we skip Supabase initialization listeners
        const isPlaceholder = import.meta.env.VITE_SUPABASE_URL?.includes('placeholder');

        if (isPlaceholder) {
            setLoading(false);
            return;
        }

        // Fetch initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const loginAsGuest = () => {
        const mockUser = {
            id: 'demo-user',
            email: 'eco.estudiante@ejemplo.com',
            user_metadata: { full_name: 'Estudiante Eco', is_admin: false }
        } as unknown as User;
        setUser(mockUser);
        setLoading(false);
    };

    const loginAsAdmin = () => {
        const mockUser = {
            id: 'demo-admin',
            email: 'admin@ecoaula.com',
            user_metadata: { full_name: 'Estudiante Eco', is_admin: true }
        } as unknown as User;
        setUser(mockUser);
        setLoading(false);
    };

    const signOut = async () => {
        const isPlaceholder = import.meta.env.VITE_SUPABASE_URL?.includes('placeholder');
        if (!isPlaceholder) {
            await supabase.auth.signOut();
        }
        setUser(null);
        setSession(null);
    };

    return (
        <AuthContext.Provider value={{ user, session, loading, isAdmin, loginAsGuest, loginAsAdmin, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
