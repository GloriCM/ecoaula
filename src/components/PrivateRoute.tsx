import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export const PrivateRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F0FDF4] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#16A34A] animate-spin" />
            </div>
        );
    }

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};
