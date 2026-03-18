import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Play, FileText, Clock, ExternalLink, ChevronRight, BookOpen } from 'lucide-react';

interface Lesson {
    id: string;
    course_id: string;
    course_title: string;
    title: string;
    duration: string;
    type: 'Video' | 'Lectura' | 'Quiz';
    order: number;
}

const MOCK_LESSONS: Lesson[] = [
    { id: '1', course_id: '1', course_title: 'Economía Circular', title: '¿Qué es la Economía Circular?', duration: '12:45', type: 'Video', order: 1 },
    { id: '2', course_id: '1', course_title: 'Economía Circular', title: 'Los 3 pilares del desarrollo sostenible', duration: '15:20', type: 'Video', order: 2 },
    { id: '3', course_id: '1', course_title: 'Economía Circular', title: 'Ciclos biológicos vs tecnológicos', duration: '10:00', type: 'Lectura', order: 3 },
    { id: '4', course_id: '1', course_title: 'Economía Circular', title: 'Quiz: Conceptos básicos', duration: '5:00', type: 'Quiz', order: 4 },
    { id: '5', course_id: '2', course_title: 'Energías Renovables', title: 'Introducción a la Energía Solar', duration: '18:30', type: 'Video', order: 1 },
    { id: '6', course_id: '2', course_title: 'Energías Renovables', title: 'Componentes de un sistema fotovoltaico', duration: '22:15', type: 'Video', order: 2 },
];

const TYPE_ICONS: Record<string, any> = {
    'Video': Play,
    'Lectura': FileText,
    'Quiz': BookOpen,
};

const TYPE_COLORS: Record<string, string> = {
    'Video': 'text-primary-400 bg-primary-500/10 border-primary-500/20',
    'Lectura': 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    'Quiz': 'text-purple-400 bg-purple-500/10 border-purple-500/20',
};

export default function AdminLessons() {
    const [search, setSearch] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('Todos');

    const filtered = MOCK_LESSONS.filter(l =>
        (selectedCourse === 'Todos' || l.course_title === selectedCourse) &&
        (l.title.toLowerCase().includes(search.toLowerCase()) || l.course_title.toLowerCase().includes(search.toLowerCase()))
    );

    const courses = ['Todos', ...Array.from(new Set(MOCK_LESSONS.map(l => l.course_title)))];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-black text-white tracking-tight">
                        Gestión de Lecciones
                    </motion.h1>
                    <p className="text-slate-500 font-medium mt-1">Configura el contenido de tus cursos</p>
                </div>
                <button className="flex items-center gap-2 bg-primary-500 hover:bg-primary-400 text-slate-950 font-black py-3 px-6 rounded-xl transition-all shadow-lg shadow-primary-500/20 active:scale-95">
                    <Plus size={18} />
                    Añadir Lección
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar por título de lección..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder:text-slate-600 backdrop-blur-md font-medium transition-all"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar lg:pb-0">
                    {courses.map(course => (
                        <button
                            key={course}
                            onClick={() => setSelectedCourse(course)}
                            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest border transition-all whitespace-nowrap ${selectedCourse === course
                                    ? 'bg-primary-500 text-slate-950 border-primary-500'
                                    : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {course}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content List */}
            <div className="space-y-4">
                {filtered.map((lesson, idx) => {
                    const Icon = TYPE_ICONS[lesson.type];
                    return (
                        <motion.div
                            key={lesson.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 hover:border-primary-500/30 hover:bg-white/[0.07] transition-all group flex flex-col md:flex-row md:items-center gap-6"
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <div className={`w-12 h-12 flex-shrink-0 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-110 ${TYPE_COLORS[lesson.type]}`}>
                                    <Icon size={20} />
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-[10px] font-black text-primary-400 bg-primary-500/10 px-2 py-0.5 rounded-md uppercase tracking-wider border border-primary-500/20">
                                            {lesson.course_title}
                                        </span>
                                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                                            Orden: {lesson.order}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-black text-white group-hover:text-primary-400 transition-colors truncate">
                                        {lesson.title}
                                    </h3>
                                </div>
                            </div>

                            <div className="flex items-center justify-between md:justify-end gap-8 border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <Clock size={16} />
                                        <span className="text-sm font-bold">{lesson.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <div className={`w-2 h-2 rounded-full ${lesson.type === 'Video' ? 'bg-primary-500' : lesson.type === 'Lectura' ? 'bg-blue-500' : 'bg-purple-500'}`} />
                                        <span className="text-sm font-bold">{lesson.type}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-2.5 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                                        <ExternalLink size={18} />
                                    </button>
                                    <button className="p-2.5 rounded-xl bg-primary-500/10 text-primary-400 hover:bg-primary-500 hover:text-slate-950 transition-all">
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
            {filtered.length === 0 && (
                <div className="bg-white/5 rounded-2xl p-16 text-center border border-dashed border-white/10">
                    <FileText size={48} className="mx-auto text-slate-800 mb-4" />
                    <p className="text-slate-500 font-bold italic">No se encontraron lecciones que coincidan con la búsqueda.</p>
                </div>
            )}
        </div>
    );
}
