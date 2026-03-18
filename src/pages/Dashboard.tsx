import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Book, Award, Clock, ArrowRight, Play, LayoutGrid, LogOut, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import VisualBackground from '../components/VisualBackground';
import EcoAulaLogo from '../components/EcoAulaLogo';

export default function Dashboard() {
    const { user, signOut, isAdmin } = useAuth();
    const navigate = useNavigate();
    const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuario';

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <div className="min-h-screen relative flex flex-col font-sans selection:bg-primary-500/30 selection:text-white overflow-hidden">
            <VisualBackground variant="deep" />

            {/* Nav Header */}
            <header className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-2xl border-b border-white/10 px-8 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary-400 blur-xl opacity-20 group-hover:opacity-50 transition-opacity"></div>
                        <EcoAulaLogo className="w-12 h-12 relative group-hover:scale-110 transition-all duration-500 ease-out" />
                    </div>
                    <span className="text-2xl font-black tracking-tight text-white">EcoAula</span>
                </Link>

                <div className="flex items-center gap-6">
                    {isAdmin && (
                        <Link to="/admin" className="flex items-center gap-2 text-primary-400 hover:text-primary-300 font-bold transition-colors">
                            <Shield size={18} />
                            Admin
                        </Link>
                    )}

                    <Link to="/courses" className="hidden md:flex items-center gap-2 text-slate-300 hover:text-white font-bold transition-colors">
                        <LayoutGrid size={18} />
                        Catálogo
                    </Link>

                    <div className="w-px h-6 bg-white/10 hidden md:block"></div>

                    <div className="flex items-center gap-4 group cursor-pointer relative">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-black text-white group-hover:text-primary-400 transition-colors">{displayName}</p>
                            <p className="text-[10px] font-black text-primary-500 uppercase tracking-widest">Estudiante Elite</p>
                        </div>
                        <Link to="/profile" className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-105 transition-all overflow-hidden group/avatar">
                            <User className="text-white group-hover/avatar:text-primary-400" size={24} />
                        </Link>

                        <button
                            onClick={handleSignOut}
                            className="p-2.5 text-slate-400 hover:text-red-400 transition-colors"
                            title="Cerrar sesión"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full space-y-12 relative z-10">
                {/* Hero Greeting */}
                <section>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-white/5 backdrop-blur-3xl rounded-[3rem] p-10 md:p-14 border border-white/10 relative overflow-hidden shadow-[0_32px_100px_-20px_rgba(0,0,0,0.5)] group"
                    >
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 blur-[100px] -mr-48 -mt-48 rounded-full"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 blur-[80px] -ml-32 -mb-32 rounded-full"></div>

                        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/20 text-primary-400 text-xs font-black uppercase tracking-widest mb-6">Panel del Estudiante</span>
                                    <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                                        ¡Bienvenido, <span className="text-primary-400 underline decoration-primary-500/30 underline-offset-8">{displayName}</span>!
                                    </h2>
                                    <p className="text-slate-400 text-xl mb-10 leading-relaxed font-medium max-w-md">
                                        Tu compromiso con el planeta es la semilla del cambio. Continúa tu especialización hoy mismo.
                                    </p>
                                    <button
                                        onClick={() => navigate('/courses')}
                                        className="bg-primary-500 hover:bg-primary-400 text-slate-950 font-black py-4 px-10 rounded-2xl transition-all shadow-2xl shadow-primary-500/20 flex items-center gap-3 group/btn active:scale-95 text-lg"
                                    >
                                        Explorar Catálogo
                                        <ArrowRight size={22} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </motion.div>
                            </div>

                            <div className="hidden lg:block relative group/img">
                                <div className="absolute inset-0 bg-primary-500/20 blur-3xl rounded-[3rem] opacity-0 group-hover/img:opacity-100 transition-opacity duration-1000"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                                    className="w-full h-[400px] object-cover rounded-[2.5rem] border border-white/20 relative z-10 shadow-2xl brightness-75 group-hover:brightness-100 transition-all duration-700 grayscale-[0.3] group-hover:grayscale-0"
                                    alt="Nature"
                                />
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { icon: Book, label: 'Cursos Activos', value: '2', color: 'primary', bg: 'primary-500/10' },
                        { icon: Award, label: 'Certificados', value: '1', color: 'emerald', bg: 'emerald-500/10' },
                        { icon: Clock, label: 'Horas de Estudio', value: '14h', color: 'blue', bg: 'blue-500/10' }
                    ].map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            className="bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 flex items-center gap-6 hover:bg-white/10 transition-all group border-b-4 border-b-transparent hover:border-b-primary-500"
                        >
                            <div className={`w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white border border-white/10 group-hover:scale-110 group-hover:bg-primary-500/20 group-hover:text-primary-400 transition-all`}>
                                <stat.icon size={28} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                                <p className="text-3xl font-black text-white">{stat.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Recent Learning Section */}
                <section>
                    <div className="flex items-end justify-between mb-8 px-2">
                        <div>
                            <h3 className="text-3xl font-black text-white tracking-tight">Continuar Aprendiendo</h3>
                            <p className="text-slate-500 font-medium">No pierdas el impulso, finaliza tu curso actual.</p>
                        </div>
                        <Link to="/courses" className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all">Ver todo</Link>
                    </div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        onClick={() => navigate('/lesson/1')}
                        className="bg-white/5 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/10 flex flex-col md:flex-row items-center gap-8 hover:bg-white/10 transition-all cursor-pointer group shadow-xl"
                    >
                        <div className="w-full md:w-80 h-52 bg-slate-800 rounded-3xl overflow-hidden relative border border-white/10">
                            <img
                                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=1000"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                                alt="Course"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100">
                                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-slate-950 shadow-2xl">
                                    <Play size={28} fill="currentColor" />
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 py-2 w-full">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs font-black text-primary-400 bg-primary-500/10 px-4 py-1.5 rounded-full uppercase tracking-tighter">Sostenibilidad</span>
                                <span className="text-xs font-bold text-slate-500">Módulo 3 de 12</span>
                            </div>
                            <h4 className="text-3xl font-black text-white mb-6 group-hover:text-primary-400 transition-colors leading-tight">Introducción a la Economía Circular</h4>

                            <div className="space-y-4">
                                <div className="flex justify-between text-sm font-black italic">
                                    <span className="text-slate-500">Progreso del curso</span>
                                    <span className="text-primary-400">45% COMPLETADO</span>
                                </div>
                                <div className="w-full bg-white/5 rounded-full h-4 p-1 border border-white/10">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '45%' }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="bg-gradient-to-r from-primary-600 to-primary-400 h-full rounded-full shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                                    ></motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>
            </main>
        </div>
    );
}
