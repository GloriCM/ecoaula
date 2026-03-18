import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    LayoutDashboard, BookOpen, Users,
    ChevronLeft, ChevronRight, LogOut, ArrowLeft, Leaf
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VisualBackground from './VisualBackground';

const NAV_ITEMS = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/courses', label: 'Cursos', icon: BookOpen },
    { path: '/admin/users', label: 'Usuarios', icon: Users },
];

export default function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const { user, signOut } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Admin';

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <div className="min-h-screen relative flex font-sans overflow-hidden">
            <VisualBackground variant="deep" />

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: collapsed ? 80 : 280 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-0 left-0 h-screen z-50 bg-slate-900/80 backdrop-blur-2xl border-r border-white/10 flex flex-col overflow-hidden"
            >
                {/* Logo Header */}
                <div className="p-6 flex items-center gap-3 border-b border-white/10 min-h-[80px]">
                    <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 bg-primary-500/20 rounded-xl flex items-center justify-center border border-primary-500/30">
                            <Leaf className="text-primary-400" size={20} />
                        </div>
                    </div>
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <h1 className="text-lg font-black text-white whitespace-nowrap">EcoAula</h1>
                                <p className="text-[10px] font-bold text-primary-400 uppercase tracking-widest whitespace-nowrap">Panel Admin</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 px-3 space-y-1.5">
                    {NAV_ITEMS.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group relative overflow-hidden ${isActive
                                    ? 'bg-primary-500/15 text-primary-400 border border-primary-500/20'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                                    }`}
                                title={collapsed ? item.label : undefined}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="admin-nav-active"
                                        className="absolute inset-0 bg-primary-500/10 rounded-xl"
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                                <item.icon size={20} className="flex-shrink-0 relative z-10" />
                                <AnimatePresence>
                                    {!collapsed && (
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="font-bold text-sm whitespace-nowrap relative z-10"
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Section */}
                <div className="p-3 border-t border-white/10 space-y-1.5">
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-all"
                        title={collapsed ? 'Volver al sitio' : undefined}
                    >
                        <ArrowLeft size={20} className="flex-shrink-0" />
                        <AnimatePresence>
                            {!collapsed && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="font-bold text-sm whitespace-nowrap"
                                >
                                    Volver al Sitio
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all"
                        title={collapsed ? 'Cerrar sesión' : undefined}
                    >
                        <LogOut size={20} className="flex-shrink-0" />
                        <AnimatePresence>
                            {!collapsed && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="font-bold text-sm whitespace-nowrap"
                                >
                                    Cerrar Sesión
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>

                {/* Collapse Toggle */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute top-[90px] -right-3 w-6 h-6 bg-slate-800 border border-white/20 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all z-50"
                >
                    {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
                </button>
            </motion.aside>

            {/* Main Content */}
            <motion.main
                initial={false}
                animate={{ marginLeft: collapsed ? 80 : 280 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 min-h-screen relative z-10"
            >
                {/* Top Bar */}
                <header className="sticky top-0 z-40 bg-white/5 backdrop-blur-2xl border-b border-white/10 px-8 py-5 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Administración</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm font-bold text-white">{displayName}</p>
                            <p className="text-[10px] font-bold text-primary-400 uppercase tracking-widest">Administrador</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center">
                            <Users size={18} className="text-primary-400" />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8">
                    <Outlet />
                </div>
            </motion.main>
        </div>
    );
}
