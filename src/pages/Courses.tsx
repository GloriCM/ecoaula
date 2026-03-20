import { motion } from 'framer-motion';
import { BookOpen, Clock, ArrowRight, Star, Filter, Search, LayoutGrid, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import VisualBackground from '../components/VisualBackground';
import EcoAulaLogo from '../components/EcoAulaLogo';
import { useAuth } from '../contexts/AuthContext';

import { MOCK_COURSES } from '../constants/courses';

export default function Courses() {
    const { user } = useAuth();
    const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuario';

    return (
        <div className="min-h-screen relative flex flex-col font-sans selection:bg-primary-500/30 selection:text-white overflow-hidden">
            <VisualBackground />

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
                    <Link to="/dashboard" className="hidden md:flex items-center gap-2 text-primary-400 hover:text-primary-300 font-bold transition-colors">
                        <LayoutGrid size={18} />
                        Dashboard
                    </Link>

                    <div className="w-px h-6 bg-white/10 hidden md:block"></div>

                    <div className="flex items-center gap-4 group cursor-pointer relative">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-black text-white group-hover:text-primary-400 transition-colors uppercase">{displayName}</p>
                        </div>
                        <Link to="/profile" className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-105 transition-all overflow-hidden group/avatar">
                            <User className="text-white group-hover/avatar:text-primary-400" size={24} />
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/20 text-primary-400 text-xs font-black uppercase tracking-widest mb-4">Explora el Futuro</span>
                        <h1 className="text-5xl font-black text-white tracking-tight leading-tight">Catálogo de Cursos</h1>
                        <p className="mt-3 text-lg text-slate-400 max-w-lg font-medium">Domina las habilidades necesarias para liderar la transformación sostenible del planeta.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 w-full md:w-auto"
                    >
                        <div className="relative flex-1 md:flex-none">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="text"
                                placeholder="Buscar curso..."
                                className="pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent min-w-full md:min-w-[320px] text-white placeholder:text-slate-600 backdrop-blur-md transition-all font-medium"
                            />
                        </div>
                        <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-400 hover:text-white hover:bg-white/10 transition-all backdrop-blur-md group">
                            <Filter size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                        </button>
                    </motion.div>
                </div>

                {/* Categories Bar */}
                <div className="flex overflow-x-auto gap-4 pb-10 scrollbar-hide no-scrollbar">
                    {['Todos', 'Sostenibilidad', 'Energía', 'Residuos', 'Agricultura', 'Agua'].map((cat, i) => (
                        <motion.button
                            key={cat}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`px-8 py-3 rounded-2xl text-sm font-black whitespace-nowrap transition-all border ${i === 0
                                ? 'bg-primary-500 text-slate-950 border-primary-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                                : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/20 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {MOCK_COURSES.map((course, idx) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all group shadow-2xl relative"
                        >
                            {/* Ambient Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="relative h-60 overflow-hidden m-3 rounded-[2rem]">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-[0.85] group-hover:brightness-100"
                                />
                                <div className="absolute top-5 left-5 bg-slate-950/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-primary-400 uppercase tracking-[0.2em] border border-white/10">
                                    {course.category}
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6">
                                    <Link
                                        to={`/lesson/${course.id}`}
                                        className="w-full bg-white text-slate-950 px-6 py-4 rounded-2xl font-black text-center shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500"
                                    >
                                        Ver Detalles
                                    </Link>
                                </div>
                            </div>

                            <div className="p-8 pt-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex items-center text-primary-400 bg-primary-500/10 px-3 py-1 rounded-lg border border-primary-500/20">
                                        <Star size={14} fill="currentColor" />
                                        <span className="ml-1.5 text-xs font-black">{course.rating}</span>
                                    </div>
                                    <span className="text-slate-700">•</span>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{course.level}</span>
                                </div>

                                <h3 className="text-2xl font-black text-primary-400 mb-3 drop-shadow-sm leading-tight">
                                    {course.title}
                                </h3>
                                <p className="text-slate-400 text-sm font-medium line-clamp-2 mb-8 leading-relaxed">
                                    {course.description}
                                </p>

                                <div className="flex items-center justify-between text-slate-500 text-[10px] font-black uppercase tracking-widest mb-6 py-4 border-y border-white/5">
                                    <div className="flex items-center gap-2">
                                        <BookOpen size={14} className="text-primary-500" />
                                        <span>{course.lessons} lecciones</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock size={14} className="text-primary-500" />
                                        <span>{course.duration}</span>
                                    </div>
                                </div>

                                {course.progress > 0 ? (
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-xs font-black italic">
                                            <span className="text-slate-500">PROGRESO</span>
                                            <span className="text-primary-400">{course.progress}%</span>
                                        </div>
                                        <div className="h-3 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${course.progress}%` }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        to={`/lesson/${course.id}`}
                                        className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white py-4 rounded-2xl font-black hover:bg-primary-500 hover:text-slate-950 hover:border-primary-500 transition-all group/btn"
                                    >
                                        Empezar Ahora
                                        <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
