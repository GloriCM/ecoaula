import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronLeft, ChevronRight, Menu, X, Download, MessageCircle, Play } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Quiz } from '../components/Quiz';
import VisualBackground from '../components/VisualBackground';
import EcoAulaLogo from '../components/EcoAulaLogo';

const MOCK_SYLLABUS = [
    {
        title: 'Módulo 1: Fundamentos',
        lessons: [
            { id: '1-1', title: '¿Qué es la Economía Circular?', duration: '12:45', completed: true },
            { id: '1-2', title: 'Lineal vs. Circular', duration: '08:30', completed: true },
            { id: '1-3', title: 'Los 3 pilares básicos', duration: '15:20', completed: false }
        ]
    },
    {
        title: 'Módulo 2: Estrategias Pro',
        lessons: [
            { id: '2-1', title: 'Ecodiseño y materiales', duration: '20:10', completed: false },
            { id: '2-2', title: 'Ciclos biológicos vs técnicos', duration: '18:15', completed: false },
            { id: '2-3', title: 'Logística inversa', duration: '22:40', completed: false }
        ]
    }
];

export default function Lesson() {
    useParams();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeLesson, setActiveLesson] = useState(MOCK_SYLLABUS[0].lessons[2]);
    const [showQuiz, setShowQuiz] = useState(false);

    return (
        <div className="flex h-screen relative font-sans selection:bg-primary-500/30 selection:text-white overflow-hidden">
            <VisualBackground variant="deep" />

            {/* Quiz Modal Overlay */}
            <AnimatePresence>
                {showQuiz && (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        className="absolute inset-0 z-[100] bg-slate-950/95 backdrop-blur-2xl overflow-y-auto"
                    >
                        <div className="max-w-4xl mx-auto px-6 py-20 relative">
                            <button
                                onClick={() => setShowQuiz(false)}
                                className="absolute top-8 right-8 p-4 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-all border border-white/10"
                            >
                                <X size={24} />
                            </button>

                            <div className="text-center mb-12">
                                <EcoAulaLogo className="w-16 h-16 mx-auto mb-6" />
                                <h2 className="text-4xl font-black text-white tracking-tight">Cuestionario de Evaluación</h2>
                                <p className="text-slate-400 mt-2 font-medium">Demuestra tus conocimientos sobre la lección actual.</p>
                            </div>

                            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl">
                                <Quiz onComplete={() => setShowQuiz(false)} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <AnimatePresence mode="wait">
                {isSidebarOpen && (
                    <motion.div
                        initial={{ x: -400, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -400, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="z-40 w-[400px] border-r border-white/10 flex flex-col h-full bg-slate-950/40 backdrop-blur-3xl overflow-hidden shadow-2xl"
                    >
                        <div className="p-8 pb-6 flex items-center justify-between">
                            <Link to="/dashboard" className="flex items-center gap-3 group">
                                <EcoAulaLogo className="w-8 h-8 group-hover:scale-110 transition-transform" />
                                <span className="text-xl font-black text-white tracking-widest">EcoAula</span>
                            </Link>
                            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="px-8 mb-8">
                            <h2 className="text-2xl font-black text-white leading-tight mb-2">Sostenibilidad Circular</h2>
                            <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-primary-500 uppercase">
                                <span className="bg-primary-500/10 px-2 py-0.5 rounded-md border border-primary-500/20">Progreso: 45%</span>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto px-4 pb-10 space-y-8 no-scrollbar">
                            {MOCK_SYLLABUS.map((module, idx) => (
                                <div key={idx} className="space-y-4">
                                    <div className="flex items-center gap-3 mb-6 mt-2 first:mt-0">
                                        <div className="h-px flex-1 bg-white/10"></div>
                                        <span className="text-[10px] font-black text-primary-500/80 uppercase tracking-[0.2em] whitespace-nowrap bg-white/5 px-3 py-1 rounded-full border border-white/5">
                                            Módulo {idx + 1}
                                        </span>
                                        <div className="h-px flex-1 bg-white/10"></div>
                                    </div>
                                    <div className="space-y-3">
                                        {module.lessons.map((lesson) => (
                                            <button
                                                key={lesson.id}
                                                onClick={() => setActiveLesson(lesson)}
                                                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group/item ${activeLesson.id === lesson.id
                                                    ? 'bg-primary-500/10 text-primary-400 border border-primary-500/30'
                                                    : 'hover:bg-white/5 text-slate-300 border border-transparent'
                                                    }`}
                                            >
                                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all ${activeLesson.id === lesson.id ? 'bg-primary-500 text-slate-950 shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'bg-white/10 text-slate-500 group-hover/item:bg-white/20'}`}>
                                                    <BookOpen size={16} strokeWidth={activeLesson.id === lesson.id ? 2.5 : 2} />
                                                </div>
                                                <div className="flex-1 text-left">
                                                    <p className={`text-sm font-black transition-colors ${activeLesson.id === lesson.id ? 'text-primary-400' : 'group-hover/item:text-white'}`}>
                                                        {lesson.title}
                                                    </p>
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                                                        {lesson.duration} min • Video
                                                    </p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full bg-slate-950/20 relative z-10 transition-all duration-500">
                {/* Top Navbar */}
                <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-slate-950/40 backdrop-blur-2xl sticky top-0 z-10">
                    <div className="flex items-center gap-6">
                        {!isSidebarOpen && (
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="p-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl text-white transition-all flex items-center gap-3 group"
                            >
                                <Menu size={20} className="group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-black uppercase tracking-widest hidden sm:block">Contenido</span>
                            </button>
                        )}
                        <div className="h-6 w-[1px] bg-white/10"></div>
                        <Link to="/courses" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
                            <ChevronLeft size={16} /> Volver al Curso
                        </Link>
                    </div>

                    <div className="flex items-center gap-6">
                        <span className="hidden sm:block text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase">Módulo {activeLesson.id.split('-')[0]}</span>
                        <button className="bg-primary-500 hover:bg-primary-400 text-slate-950 px-8 py-3 rounded-2xl font-black shadow-2xl shadow-primary-500/30 transition-all flex items-center gap-3 active:scale-95 text-xs uppercase tracking-widest">
                            Siguiente Lección <ChevronRight size={18} />
                        </button>
                    </div>
                </header>

                {/* Lesson Viewer Area */}
                <main className="flex-1 overflow-y-auto p-8 lg:p-14 no-scrollbar">
                    <div className="max-w-5xl mx-auto space-y-12 pb-20">
                        {/* Video Player Area */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="aspect-video bg-slate-950 rounded-[3rem] overflow-hidden shadow-[0_48px_100px_-20px_rgba(0,0,0,0.8)] relative group cursor-pointer border border-white/10"
                        >
                            <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors duration-500">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center text-slate-950 shadow-2xl relative"
                                >
                                    <div className="absolute inset-0 bg-primary-500 blur-2xl opacity-40 animate-pulse"></div>
                                    <Play size={36} fill="currentColor" className="relative z-10 ml-1" />
                                </motion.div>
                            </div>
                            <img
                                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 grayscale-[0.5] group-hover:grayscale-0 scale-105 group-hover:scale-100"
                                alt="Thumbnail"
                            />

                            {/* Player UI Placeholder */}
                            <div className="absolute bottom-10 left-10 right-10 z-30">
                                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-4 border border-white/5 p-[1px]">
                                    <div className="h-full bg-primary-500 w-[33%] rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
                                </div>
                                <div className="flex justify-between text-[10px] font-black text-white uppercase tracking-widest">
                                    <span>04:12</span>
                                    <span>{activeLesson.duration}:00</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Content Text */}
                        <div className="space-y-8 px-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col md:flex-row md:items-center justify-between gap-6"
                            >
                                <div>
                                    <span className="inline-block px-3 py-1 rounded-lg bg-primary-500/10 text-primary-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-primary-500/20">Lección en Progreso</span>
                                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                                        {activeLesson.title}
                                    </h1>
                                </div>
                                <div className="flex gap-4">
                                    <button className="w-14 h-14 bg-white/5 border border-white/10 text-slate-400 rounded-2xl hover:bg-white/10 hover:text-white transition-all flex items-center justify-center group shadow-xl">
                                        <Download size={24} className="group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                    <button className="w-14 h-14 bg-white/5 border border-white/10 text-slate-400 rounded-2xl hover:bg-white/10 hover:text-white transition-all flex items-center justify-center group shadow-xl">
                                        <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="prose prose-invert max-w-none"
                            >
                                <p className="text-xl text-slate-400 leading-relaxed font-medium">
                                    En esta clase profundizaremos en los pilares fundamentales que sostienen el modelo circular.
                                    Analizaremos cómo las empresas líderes están rediseñando sus cadenas de valor para eliminar
                                    el concepto de "desperdicio" desde la etapa de diseño.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                                    <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 shadow-xl group hover:bg-white/10 transition-all">
                                        <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                                            <Download size={24} />
                                        </div>
                                        <h4 className="text-xl font-black text-white mb-2">Recursos de la Clase</h4>
                                        <p className="text-sm text-slate-500 mb-6 font-medium">Guía avanzada de materiales sostenibles y estrategias de ciclo de vida.</p>
                                        <button className="text-xs font-black text-emerald-400 tracking-widest uppercase flex items-center gap-2 hover:gap-3 transition-all">
                                            DESCARGAR PDF (4.2 MB) <ChevronRight size={16} />
                                        </button>
                                    </div>

                                    <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 shadow-xl group hover:bg-white/10 transition-all border-b-4 border-b-primary-500">
                                        <div className="w-12 h-12 bg-primary-500/20 rounded-2xl flex items-center justify-center text-primary-400 mb-6 group-hover:scale-110 transition-transform">
                                            <EcoAulaLogo className="w-8 h-8" />
                                        </div>
                                        <h4 className="text-xl font-black text-white mb-2">Ponlo a Prueba</h4>
                                        <p className="text-sm text-slate-500 mb-6 font-medium">Completa el cuestionario del módulo para validar tus conocimientos.</p>
                                        <button
                                            onClick={() => setShowQuiz(true)}
                                            className="bg-primary-500 text-slate-950 px-8 py-3 rounded-2xl text-xs font-black tracking-widest uppercase hover:bg-primary-400 transition-all shadow-2xl shadow-primary-500/20"
                                        >
                                            EMPEZAR TEST
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
