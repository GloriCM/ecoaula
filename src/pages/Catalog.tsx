import { motion } from 'framer-motion';
import { BookOpen, Clock, ArrowRight, Star, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import VisualBackground from '../components/VisualBackground';
import EcoAulaLogo from '../components/EcoAulaLogo';
import { MOCK_COURSES } from '../constants/courses';

export default function Catalog() {
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
                    <Link to="/" className="flex items-center gap-2 text-white/70 hover:text-white font-bold transition-colors">
                        <ChevronLeft size={18} />
                        Volver al Inicio
                    </Link>
                    <Link
                        to="/register"
                        className="bg-primary-500 hover:bg-primary-400 text-slate-900 font-black py-2.5 px-6 rounded-xl transition-all shadow-lg text-sm uppercase tracking-wider active:scale-95"
                    >
                        Registrarse
                    </Link>
                </div>
            </header>

            <main className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full relative z-10">
                {/* Header Section */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/20 text-primary-400 text-xs font-black uppercase tracking-widest mb-4">Explora el Futuro</span>
                        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
                            Catálogo de <span className="text-primary-400">Cursos</span>
                        </h1>
                        <p className="mt-6 text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                            Domina las habilidades necesarias para liderar la transformación sostenible del planeta con nuestros programas especializados.
                        </p>
                    </motion.div>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {MOCK_COURSES.map((course, idx) => (
                        <CatalogCourseCard key={course.id} course={course} index={idx} />
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-slate-950/50 backdrop-blur-md border-t border-white/5 py-12 px-8 relative z-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-4">
                        <EcoAulaLogo className="w-10 h-10" />
                        <span className="text-xl font-black text-white">EcoAula</span>
                    </div>
                    <p className="text-slate-500 text-sm font-medium">© 2026 EcoAula. Educación para un futuro sostenible.</p>
                </div>
            </footer>
        </div>
    );
}

function CatalogCourseCard({ course, index }: { course: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            whileHover={{ y: -10 }}
            className="group relative bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 hover:border-primary-500/50 transition-all duration-500 overflow-hidden shadow-2xl flex flex-col h-full"
        >
            <div className="relative h-56 overflow-hidden m-3 rounded-[2rem]">
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out brightness-90 group-hover:brightness-100"
                />
                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-primary-400 uppercase tracking-widest border border-white/10">
                    {course.category}
                </div>
            </div>

            <div className="p-8 pt-2 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center text-primary-400 text-[11px] font-black uppercase tracking-wider">
                        <Star size={14} fill="currentColor" className="mr-1.5" />
                        {course.rating}
                    </div>
                    <span className="text-slate-700">•</span>
                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{course.level}</span>
                </div>

                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-primary-400 transition-colors leading-tight">
                    {course.title}
                </h3>
                
                <p className="text-slate-400 text-sm font-medium mb-8 line-clamp-2 leading-relaxed">
                    {course.description}
                </p>

                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between text-slate-400 text-[11px] font-black uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                        <BookOpen size={16} className="text-primary-500" />
                        <span>{course.lessons} lecciones</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-primary-500" />
                        <span>{course.duration}</span>
                    </div>
                </div>

                <Link
                    to="/register"
                    className="mt-8 w-full bg-white hover:bg-primary-500 text-slate-900 font-black py-4.5 rounded-2xl transition-all shadow-xl hover:shadow-primary-500/20 text-center text-sm uppercase tracking-widest active:scale-95 flex items-center justify-center gap-3 group/btn"
                >
                    Inscribirse ahora
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
            </div>
        </motion.div>
    );
}
