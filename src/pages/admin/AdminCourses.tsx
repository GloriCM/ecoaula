import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Plus, BookOpen, Star, Trash2 } from 'lucide-react';

// Tipo de curso para la lista
interface Course {
    id: string;
    title: string;
    category: string;
    lessons: number;
    rating: number;
    status: 'Publicado' | 'Borrador' | 'Archivado';
    image: string;
    icon: string;
}

// Cursos de ejemplo con imágenes de naturaleza
const MOCK_COURSES: Course[] = [
    {
        id: '1',
        title: 'Introducción a la Economía Circular',
        category: 'Sostenibilidad',
        lessons: 2,
        rating: 4.8,
        status: 'Publicado',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
        icon: '♻️',
    },
    {
        id: '2',
        title: 'Energías Renovables para el Hogar',
        category: 'Energía',
        lessons: 0,
        rating: 4.9,
        status: 'Publicado',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
        icon: '☀️',
    },
    {
        id: '3',
        title: 'Gestión Avanzada de Residuos',
        category: 'Residuos',
        lessons: 5,
        rating: 4.7,
        status: 'Publicado',
        image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
        icon: '🗑️',
    },
    {
        id: '4',
        title: 'Agricultura Urbana y Huertos',
        category: 'Agricultura',
        lessons: 3,
        rating: 4.9,
        status: 'Borrador',
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
        icon: '🌿',
    },
];

// Badge de estado con colores
const STATUS_COLORS: Record<string, string> = {
    'Publicado': 'bg-emerald-500 text-white',
    'Borrador': 'bg-amber-500 text-white',
    'Archivado': 'bg-slate-500 text-white',
};

export default function AdminCourses() {
    const [courses, setCourses] = useState(MOCK_COURSES);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    // Filtrar cursos por búsqueda
    const filtered = courses.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase())
    );

    // Eliminar curso
    const handleDelete = (id: string) => {
        setCourses(prev => prev.filter(c => c.id !== id));
    };

    // Ir a gestionar (editar) curso
    const handleManage = (id: string) => {
        navigate(`/admin/courses/${id}`);
    };

    // Ir a crear curso nuevo
    const handleCreate = () => {
        navigate('/admin/courses/new');
    };

    return (
        <div className="space-y-8">
            {/* Header con título y botón de crear */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-black text-white tracking-tight"
                    >
                        Gestión de Cursos
                    </motion.h1>
                    <p className="text-slate-500 font-medium mt-1">{courses.length} cursos en total</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 bg-primary-500 hover:bg-primary-400 text-slate-950 font-black py-3 px-6 rounded-xl transition-all shadow-lg shadow-primary-500/20 active:scale-95"
                >
                    <Plus size={18} />
                    Nuevo Curso
                </button>
            </div>

            {/* Barra de búsqueda */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                    type="text"
                    placeholder="Buscar cursos..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder:text-slate-600 backdrop-blur-md font-medium"
                />
            </div>

            {/* Grid de tarjetas de cursos */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((course, index) => (
                    <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden group hover:border-primary-500/30 transition-all"
                    >
                        {/* Imagen de fondo del curso */}
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                            {/* Badge de categoría */}
                            <span className="absolute top-4 left-4 bg-slate-800/80 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-white/10">
                                {course.category}
                            </span>

                            {/* Icono y título sobre la imagen */}
                            <div className="absolute bottom-4 left-4 right-4 flex items-end gap-3">
                                <div className="w-12 h-12 bg-slate-800/60 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl border border-white/10 flex-shrink-0">
                                    {course.icon}
                                </div>
                                <h3 className="text-white font-bold text-base leading-tight line-clamp-2">
                                    {course.title}
                                </h3>
                            </div>
                        </div>

                        {/* Info del curso */}
                        <div className="p-5">
                            {/* Lecciones, rating, estado */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-1.5 text-slate-400">
                                    <BookOpen size={14} />
                                    <span className="text-sm font-bold">{course.lessons}</span>
                                </div>
                                <div className="flex items-center gap-1 text-amber-400">
                                    <Star size={14} fill="currentColor" />
                                    <span className="text-sm font-bold">{course.rating}</span>
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md ml-auto ${STATUS_COLORS[course.status]}`}>
                                    {course.status}
                                </span>
                            </div>

                            {/* Botones de acción */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleManage(course.id)}
                                    className="flex-1 py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all text-center"
                                >
                                    Gestionar
                                </button>
                                <button
                                    onClick={() => handleDelete(course.id)}
                                    className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all"
                                    title="Eliminar"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Estado vacío */}
            {filtered.length === 0 && (
                <div className="text-center py-16">
                    <BookOpen size={40} className="mx-auto text-slate-700 mb-4" />
                    <p className="text-slate-500 font-bold">No se encontraron cursos</p>
                </div>
            )}
        </div>
    );
}
