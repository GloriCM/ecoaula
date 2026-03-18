import { motion } from 'framer-motion';
import { Users, BookOpen, FileText, Award, TrendingUp, Eye, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const STATS = [
    { label: 'Usuarios Totales', value: '1,248', change: '+12%', icon: Users, color: 'primary' },
    { label: 'Cursos Activos', value: '24', change: '+3', icon: BookOpen, color: 'blue' },
    { label: 'Lecciones', value: '186', change: '+8', icon: FileText, color: 'purple' },
    { label: 'Certificados Emitidos', value: '342', change: '+28%', icon: Award, color: 'amber' },
];

const RECENT_ACTIVITY = [
    { user: 'María García', action: 'Completó el curso "Economía Circular"', time: 'Hace 5 min', avatar: 'MG' },
    { user: 'Carlos López', action: 'Se registró como nuevo estudiante', time: 'Hace 12 min', avatar: 'CL' },
    { user: 'Ana Martínez', action: 'Obtuvo certificado en "Energías Renovables"', time: 'Hace 30 min', avatar: 'AM' },
    { user: 'Pedro Sánchez', action: 'Inició el curso "Gestión de Residuos"', time: 'Hace 1h', avatar: 'PS' },
    { user: 'Laura Fernández', action: 'Completó la lección "Paneles Solares"', time: 'Hace 2h', avatar: 'LF' },
];

const TOP_COURSES = [
    { title: 'Introducción a la Economía Circular', students: 456, completion: 78 },
    { title: 'Energías Renovables para el Hogar', students: 312, completion: 65 },
    { title: 'Gestión Avanzada de Residuos', students: 189, completion: 42 },
    { title: 'Agricultura Urbana y Huertos', students: 267, completion: 71 },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-black text-white tracking-tight"
                >
                    Dashboard
                </motion.h1>
                <p className="text-slate-500 font-medium mt-1">Resumen general de la plataforma EcoAula</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {STATS.map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-11 h-11 bg-primary-500/15 rounded-xl flex items-center justify-center border border-primary-500/20 group-hover:scale-110 transition-transform">
                                <stat.icon size={20} className="text-primary-400" />
                            </div>
                            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg flex items-center gap-1">
                                <TrendingUp size={12} />
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-3xl font-black text-white mb-1">{stat.value}</p>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Top Courses */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-3 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
                >
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <h2 className="text-lg font-black text-white">Cursos Populares</h2>
                        <Link to="/admin/courses" className="text-xs font-bold text-primary-400 hover:text-primary-300 flex items-center gap-1 transition-colors">
                            Ver todos <ArrowUpRight size={14} />
                        </Link>
                    </div>
                    <div className="divide-y divide-white/5">
                        {TOP_COURSES.map((course, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-5 hover:bg-white/5 transition-colors">
                                <div className="w-10 h-10 bg-primary-500/10 rounded-xl flex items-center justify-center text-primary-400 font-black text-sm border border-primary-500/20 flex-shrink-0">
                                    {idx + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-white truncate">{course.title}</p>
                                    <p className="text-xs text-slate-500 font-medium">{course.students} estudiantes</p>
                                </div>
                                <div className="flex items-center gap-3 flex-shrink-0">
                                    <div className="w-24 h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${course.completion}%` }}
                                            transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                                            className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full"
                                        />
                                    </div>
                                    <span className="text-xs font-bold text-primary-400 w-10 text-right">{course.completion}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
                >
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <h2 className="text-lg font-black text-white">Actividad Reciente</h2>
                        <Eye size={16} className="text-slate-500" />
                    </div>
                    <div className="divide-y divide-white/5">
                        {RECENT_ACTIVITY.map((activity, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-4 hover:bg-white/5 transition-colors">
                                <div className="w-9 h-9 bg-primary-500/15 rounded-lg flex items-center justify-center text-[10px] font-black text-primary-400 border border-primary-500/20 flex-shrink-0 mt-0.5">
                                    {activity.avatar}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm text-white font-bold">{activity.user}</p>
                                    <p className="text-xs text-slate-500 font-medium leading-relaxed truncate">{activity.action}</p>
                                    <p className="text-[10px] text-slate-600 font-bold mt-1 uppercase tracking-wider">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
                {[
                    { label: 'Crear Nuevo Curso', desc: 'Agregar contenido educativo', link: '/admin/courses', icon: BookOpen },
                    { label: 'Gestionar Usuarios', desc: 'Administrar cuentas y roles', link: '/admin/users', icon: Users },
                    { label: 'Agregar Lección', desc: 'Crear nuevo material didáctico', link: '/admin/lessons', icon: FileText },
                ].map((action) => (
                    <Link
                        key={action.label}
                        to={action.link}
                        className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-primary-500/30 hover:bg-primary-500/5 transition-all group flex items-center gap-4"
                    >
                        <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center border border-primary-500/20 group-hover:bg-primary-500/20 group-hover:scale-110 transition-all">
                            <action.icon size={22} className="text-primary-400" />
                        </div>
                        <div>
                            <p className="text-sm font-black text-white group-hover:text-primary-400 transition-colors">{action.label}</p>
                            <p className="text-xs text-slate-500 font-medium">{action.desc}</p>
                        </div>
                    </Link>
                ))}
            </motion.div>
        </div>
    );
}
