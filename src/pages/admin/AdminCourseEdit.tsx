import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, Save, Image, Plus, Trash2, GripVertical,
    BookOpen, Check, Eye, Award, Play, Type, FileText, Star
} from 'lucide-react';

// Tipos de lección disponibles
type LessonType = 'video' | 'texto' | 'guia_pdf' | 'evaluacion';

// Cada lección tiene un tipo y un título
interface Lesson {
    id: string;
    title: string;
    type: LessonType;
}

// Una sección agrupa varias lecciones
interface Section {
    id: string;
    title: string;
    lessons: Lesson[];
    isAddingLesson: boolean; // true = mostrando el selector de tipo
}

// Configuración de los tipos de lección
const LESSON_TYPES: Array<{ type: LessonType; label: string; icon: typeof Play; color: string; bg: string }> = [
    { type: 'video', label: 'VIDEO', icon: Play, color: 'text-orange-400', bg: 'bg-orange-500/15 border-orange-500/20 hover:bg-orange-500/25' },
    { type: 'texto', label: 'TEXTO', icon: Type, color: 'text-purple-400', bg: 'bg-purple-500/15 border-purple-500/20 hover:bg-purple-500/25' },
    { type: 'guia_pdf', label: 'GUÍA PDF', icon: FileText, color: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/20 hover:bg-emerald-500/25' },
    { type: 'evaluacion', label: 'EVALUACIÓN', icon: Star, color: 'text-rose-400', bg: 'bg-rose-500/15 border-rose-500/20 hover:bg-rose-500/25' },
];

// Imágenes de fondo disponibles para el curso
const BACKGROUND_IMAGES = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
];

export default function AdminCourseEdit() {
    const navigate = useNavigate();
    const location = useLocation();

    // Estado inicial desde la navegación (nuevo curso) o datos existentes
    const stateData = location.state as { isNew?: boolean; title?: string; category?: string } | null;

    const [title, setTitle] = useState(stateData?.title || '222');
    const [description, setDescription] = useState('Nueva descripción del curso...');
    const [backgroundImage, setBackgroundImage] = useState(BACKGROUND_IMAGES[0]);
    const [status, setStatus] = useState<'Borrador' | 'Publicado' | 'Archivado'>('Borrador');
    const [isPublic, setIsPublic] = useState(true);
    const [emitCertificate, setEmitCertificate] = useState(false);
    const [showBgPicker, setShowBgPicker] = useState(false);

    // Secciones del curso
    const [sections, setSections] = useState<Section[]>([]);

    // Agregar nueva sección (vacía, con picker abierto)
    const addSection = () => {
        const newSection: Section = {
            id: String(Date.now()),
            title: 'Nueva Sección',
            lessons: [],
            isAddingLesson: true,
        };
        setSections(prev => [...prev, newSection]);
    };

    // Eliminar sección
    const removeSection = (sectionId: string) => {
        setSections(prev => prev.filter(s => s.id !== sectionId));
    };

    // Actualizar título de sección
    const updateSectionTitle = (sectionId: string, newTitle: string) => {
        setSections(prev => prev.map(s =>
            s.id === sectionId ? { ...s, title: newTitle } : s
        ));
    };

    // Mostrar/ocultar el picker de tipo en una sección
    const toggleAddingLesson = (sectionId: string, show: boolean) => {
        setSections(prev => prev.map(s =>
            s.id === sectionId ? { ...s, isAddingLesson: show } : s
        ));
    };

    // Agregar lección con el tipo seleccionado
    const addLessonWithType = (sectionId: string, type: LessonType) => {
        const typeConfig = LESSON_TYPES.find(t => t.type === type);
        const newLesson: Lesson = {
            id: String(Date.now()),
            title: `Nueva lección - ${typeConfig?.label || type}`,
            type,
        };
        setSections(prev => prev.map(s =>
            s.id === sectionId
                ? { ...s, lessons: [...s.lessons, newLesson], isAddingLesson: false }
                : s
        ));
    };

    // Eliminar una lección de una sección
    const removeLesson = (sectionId: string, lessonId: string) => {
        setSections(prev => prev.map(s =>
            s.id === sectionId
                ? { ...s, lessons: s.lessons.filter(l => l.id !== lessonId) }
                : s
        ));
    };

    // Actualizar título de lección
    const updateLessonTitle = (sectionId: string, lessonId: string, newTitle: string) => {
        setSections(prev => prev.map(s =>
            s.id === sectionId
                ? { ...s, lessons: s.lessons.map(l => l.id === lessonId ? { ...l, title: newTitle } : l) }
                : s
        ));
    };

    // Publicar cambios
    const handlePublish = () => {
        navigate('/admin/courses');
    };

    const STATUS_OPTIONS: Array<{ value: 'Borrador' | 'Publicado' | 'Archivado'; label: string }> = [
        { value: 'Borrador', label: 'BORRADOR' },
        { value: 'Publicado', label: 'PUBLICADO' },
        { value: 'Archivado', label: 'ARCHIVADO' },
    ];

    return (
        <div className="space-y-8 max-w-5xl">
            {/* Barra superior: volver + publicar */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => navigate('/admin/courses')}
                    className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-bold text-sm"
                >
                    <ArrowLeft size={16} />
                    Volver al listado
                </button>
                <button
                    onClick={handlePublish}
                    className="flex items-center gap-2 bg-primary-500 hover:bg-primary-400 text-slate-950 font-black py-3 px-6 rounded-xl transition-all shadow-lg shadow-primary-500/20 active:scale-95"
                >
                    <Save size={16} />
                    Publicar cambios
                </button>
            </div>

            {/* Hero Banner del curso */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative rounded-2xl overflow-hidden h-64"
            >
                <img
                    src={backgroundImage}
                    alt="Fondo del curso"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

                {/* Botón cambiar fondo */}
                <button
                    onClick={() => setShowBgPicker(!showBgPicker)}
                    className="absolute top-4 right-4 flex items-center gap-2 bg-slate-800/70 backdrop-blur-sm text-white text-xs font-black uppercase tracking-widest px-4 py-2.5 rounded-lg border border-white/15 hover:bg-slate-700/70 transition-all"
                >
                    <Image size={14} />
                    Cambiar Fondo
                </button>

                {/* Selector de fondo */}
                <AnimatePresence>
                    {showBgPicker && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-16 right-4 bg-slate-900/95 backdrop-blur-xl border border-white/15 rounded-xl p-3 flex gap-2 z-10"
                        >
                            {BACKGROUND_IMAGES.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => { setBackgroundImage(img); setShowBgPicker(false); }}
                                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${backgroundImage === img ? 'border-primary-500' : 'border-transparent hover:border-white/30'}`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Icono, título y descripción sobre el banner */}
                <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-end gap-4">
                        <div className="w-16 h-16 bg-slate-800/60 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl border border-white/15 flex-shrink-0">
                            🌱
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-emerald-400 text-sm">●●●●</span>
                            </div>
                            <input
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="bg-transparent text-white text-3xl font-black w-full focus:outline-none placeholder:text-white/30"
                                placeholder="Título del curso"
                            />
                            <input
                                type="text"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                className="bg-transparent text-slate-300 text-sm font-medium w-full focus:outline-none placeholder:text-slate-500 mt-1"
                                placeholder="Descripción breve del curso..."
                            />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Contenido principal: Estructura + Configuración */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Estructura del Curso (2/3 del ancho) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-black text-white flex items-center gap-2.5 uppercase tracking-wide">
                            <BookOpen size={18} className="text-primary-400" />
                            Estructura del Curso
                        </h2>
                        <button
                            onClick={addSection}
                            className="flex items-center gap-1.5 text-primary-400 hover:text-primary-300 font-bold text-sm transition-colors"
                        >
                            <Plus size={16} />
                            Añadir Sección
                        </button>
                    </div>

                    {/* Lista de secciones */}
                    {sections.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white/[0.03] border border-white/10 border-dashed rounded-2xl p-12 text-center"
                        >
                            <p className="text-slate-400 font-medium text-sm uppercase tracking-wider">
                                Crea tu primera lección aquí
                            </p>
                        </motion.div>
                    ) : (
                        <div className="space-y-4">
                            {sections.map((section) => (
                                <motion.div
                                    key={section.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white/[0.07] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
                                >
                                    {/* Cabecera de la sección */}
                                    <div className="flex items-center gap-3 p-5">
                                        <GripVertical size={16} className="text-slate-500 cursor-grab" />
                                        <input
                                            type="text"
                                            value={section.title}
                                            onChange={e => updateSectionTitle(section.id, e.target.value)}
                                            className="bg-transparent text-white font-bold text-sm flex-1 focus:outline-none"
                                        />
                                        {/* Botón Cancelar (eliminar sección) */}
                                        <button
                                            onClick={() => removeSection(section.id)}
                                            className="flex items-center gap-1.5 text-slate-300 hover:text-red-400 font-medium text-xs transition-colors bg-white/5 border border-white/10 rounded-lg px-3 py-1.5"
                                        >
                                            <Plus size={12} className="rotate-45" />
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={() => removeSection(section.id)}
                                            className="p-1.5 text-slate-400 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>

                                    {/* Lecciones existentes + selector de tipo */}
                                    <div className="px-5 pb-5 space-y-3">
                                        {/* Lista de lecciones ya agregadas */}
                                        {section.lessons.length > 0 && (
                                            <div className="space-y-2">
                                                {section.lessons.map((lesson) => {
                                                    const typeConfig = LESSON_TYPES.find(t => t.type === lesson.type);
                                                    return (
                                                        <div
                                                            key={lesson.id}
                                                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 group"
                                                        >
                                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${typeConfig?.color || 'text-slate-400'} bg-white/5 flex-shrink-0`}>
                                                                {typeConfig && <typeConfig.icon size={16} />}
                                                            </div>
                                                            <input
                                                                type="text"
                                                                value={lesson.title}
                                                                onChange={e => updateLessonTitle(section.id, lesson.id, e.target.value)}
                                                                className="bg-transparent text-slate-200 text-sm font-medium flex-1 focus:outline-none focus:text-white"
                                                            />
                                                            <span className={`text-[9px] font-black uppercase tracking-widest ${typeConfig?.color || 'text-slate-500'}`}>
                                                                {typeConfig?.label}
                                                            </span>
                                                            <button
                                                                onClick={() => removeLesson(section.id, lesson.id)}
                                                                className="p-1 text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                                                            >
                                                                <Trash2 size={12} />
                                                            </button>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}

                                        {/* Botón para añadir lección (si no está mostrando el picker) */}
                                        {!section.isAddingLesson && (
                                            <button
                                                onClick={() => toggleAddingLesson(section.id, true)}
                                                className="flex items-center gap-1.5 text-primary-400 hover:text-primary-300 font-bold text-xs transition-colors py-2"
                                            >
                                                <Plus size={14} />
                                                Añadir Lección
                                            </button>
                                        )}

                                        {/* Picker de tipo de lección */}
                                        {section.isAddingLesson && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="space-y-3"
                                            >
                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                    {LESSON_TYPES.map((lt) => (
                                                        <button
                                                            key={lt.type}
                                                            onClick={() => addLessonWithType(section.id, lt.type)}
                                                            className={`flex flex-col items-center gap-2.5 p-5 rounded-xl border transition-all ${lt.bg}`}
                                                        >
                                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${lt.color}`}>
                                                                <lt.icon size={24} />
                                                            </div>
                                                            <span className={`text-[10px] font-black uppercase tracking-widest ${lt.color}`}>
                                                                {lt.label}
                                                            </span>
                                                        </button>
                                                    ))}
                                                </div>
                                                <button
                                                    onClick={() => toggleAddingLesson(section.id, false)}
                                                    className="text-slate-400 hover:text-white text-xs font-medium transition-colors"
                                                >
                                                    Cancelar
                                                </button>
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Panel de Configuración (1/3 del ancho) */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/[0.07] backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-6"
                    >
                        <h3 className="text-xs font-black text-slate-300 uppercase tracking-[0.2em]">
                            Configuración
                        </h3>

                        {/* Estado del curso */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                                Estado
                            </label>
                            <div className="space-y-1.5">
                                {STATUS_OPTIONS.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setStatus(opt.value)}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${status === opt.value
                                                ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                                                : 'bg-white/[0.03] text-slate-300 border border-white/5 hover:bg-white/[0.06]'
                                            }`}
                                    >
                                        {opt.label}
                                        {status === opt.value && <Check size={16} />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Toggle: Visible al público */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-slate-200">
                                <Eye size={14} className="text-slate-400" />
                                <span className="text-xs font-black uppercase tracking-widest">Visible al Público</span>
                            </div>
                            <button
                                onClick={() => setIsPublic(!isPublic)}
                                className={`relative w-12 h-6 rounded-full transition-all ${isPublic ? 'bg-primary-500' : 'bg-slate-700'}`}
                            >
                                <motion.div
                                    animate={{ x: isPublic ? 24 : 2 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                                />
                            </button>
                        </div>

                        {/* Toggle: Emitir certificado */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-slate-200">
                                <Award size={14} className="text-slate-400" />
                                <span className="text-xs font-black uppercase tracking-widest">Emitir Certificado</span>
                            </div>
                            <button
                                onClick={() => setEmitCertificate(!emitCertificate)}
                                className={`relative w-12 h-6 rounded-full transition-all ${emitCertificate ? 'bg-primary-500' : 'bg-slate-700'}`}
                            >
                                <motion.div
                                    animate={{ x: emitCertificate ? 24 : 2 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                                />
                            </button>
                        </div>

                        {/* Tip informativo */}
                        <p className="text-xs text-slate-400 font-medium leading-relaxed pt-2 border-t border-white/5">
                            Cursos con íconos claros y descripciones directas aumentan un 25% la retención.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
