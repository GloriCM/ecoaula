import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

// Formulario de creación de curso nuevo (paso 1)
export default function AdminCourseNew() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    // Al presionar "Siguiente", redirigir a la vista de edición del curso nuevo
    const handleNext = () => {
        if (!title.trim()) return;
        // Crear un ID temporal para el nuevo curso y redirigir a la edición
        const newId = String(Date.now());
        navigate(`/admin/courses/${newId}`, {
            state: { isNew: true, title: title.trim(), category: category.trim() }
        });
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white/[0.07] backdrop-blur-2xl border border-white/15 rounded-3xl p-10 w-full max-w-lg shadow-2xl"
            >
                {/* Título del formulario */}
                <h2 className="text-2xl font-black text-white mb-8">Nuevo Curso</h2>

                <div className="space-y-6">
                    {/* Campo: Título del Proyecto */}
                    <div>
                        <label className="text-[11px] font-black text-white/80 uppercase tracking-[0.2em] mb-2.5 block">
                            Título del Proyecto
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Ej: Bioconstrucción Pro"
                            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium placeholder:text-slate-600 text-base"
                        />
                    </div>

                    {/* Campo: Categoría */}
                    <div>
                        <label className="text-[11px] font-black text-white/80 uppercase tracking-[0.2em] mb-2.5 block">
                            Categoría
                        </label>
                        <input
                            type="text"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            placeholder="Ej: Sostenibilidad, Energía..."
                            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium placeholder:text-slate-600 text-base"
                        />
                    </div>

                    {/* Botón Siguiente */}
                    <button
                        onClick={handleNext}
                        disabled={!title.trim()}
                        className="w-full py-4 px-6 rounded-xl bg-primary-500 hover:bg-primary-400 text-slate-950 font-black text-base transition-all shadow-lg shadow-primary-500/20 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                    >
                        Siguiente
                        <ChevronRight size={18} />
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
