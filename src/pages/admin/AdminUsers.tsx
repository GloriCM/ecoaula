import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, UserPlus, Shield, User, Mail, Calendar, MoreHorizontal, UserCheck, UserX, Users } from 'lucide-react';

interface UserProfile {
    id: string;
    full_name: string;
    email: string;
    role: 'Admin' | 'Estudiante';
    status: 'Activo' | 'Inactivo' | 'Suspendido';
    joined: string;
    last_active: string;
}

const MOCK_USERS: UserProfile[] = [
    { id: '1', full_name: 'Admin EcoAula', email: 'admin@ecoaula.com', role: 'Admin', status: 'Activo', joined: '2025-01-10', last_active: 'Hace 2 min' },
    { id: '2', full_name: 'María García', email: 'maria.g@ejemplo.com', role: 'Estudiante', status: 'Activo', joined: '2025-02-15', last_active: 'Hace 1h' },
    { id: '3', full_name: 'Carlos López', email: 'carlos.l@ejemplo.com', role: 'Estudiante', status: 'Activo', joined: '2025-03-01', last_active: 'Hace 15 min' },
    { id: '4', full_name: 'Ana Martínez', email: 'ana.m@ejemplo.com', role: 'Estudiante', status: 'Activo', joined: '2025-02-20', last_active: 'Hace 3h' },
    { id: '5', full_name: 'Juan Pérez', email: 'juan.p@ejemplo.com', role: 'Estudiante', status: 'Inactivo', joined: '2025-01-20', last_active: 'Hace 1 semana' },
    { id: '6', full_name: 'Laura Sánchez', email: 'laura.s@ejemplo.com', role: 'Estudiante', status: 'Suspendido', joined: '2025-01-05', last_active: 'Hace 2 semanas' },
];

const STATUS_STYLES: Record<string, string> = {
    'Activo': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    'Inactivo': 'bg-slate-500/15 text-slate-400 border-slate-500/20',
    'Suspendido': 'bg-red-500/15 text-red-400 border-red-500/20',
};

export default function AdminUsers() {
    const [users, setUsers] = useState(MOCK_USERS);
    const [search, setSearch] = useState('');

    const filtered = users.filter(u =>
        u.full_name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    const toggleStatus = (id: string) => {
        setUsers(prev => prev.map(u => {
            if (u.id === id) {
                const nextStatus = u.status === 'Activo' ? 'Inactivo' : 'Activo';
                return { ...u, status: nextStatus as any };
            }
            return u;
        }));
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-black text-white tracking-tight">
                        Gestión de Usuarios
                    </motion.h1>
                    <p className="text-slate-500 font-medium mt-1">{users.length} usuarios registrados</p>
                </div>
                <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-bold py-3 px-6 rounded-xl border border-white/10 transition-all active:scale-95">
                    <UserPlus size={18} />
                    Invitar Usuario
                </button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                    type="text"
                    placeholder="Buscar por nombre o email..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder:text-slate-600 backdrop-blur-md font-medium"
                />
            </div>

            {/* Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left text-[10px] font-black text-slate-500 uppercase tracking-widest px-6 py-4">Usuario</th>
                                <th className="text-left text-[10px] font-black text-slate-500 uppercase tracking-widest px-6 py-4 hidden md:table-cell">Rol</th>
                                <th className="text-left text-[10px] font-black text-slate-500 uppercase tracking-widest px-6 py-4 hidden lg:table-cell">Fecha Registro</th>
                                <th className="text-left text-[10px] font-black text-slate-500 uppercase tracking-widest px-6 py-4 hidden md:table-cell">Última Actividad</th>
                                <th className="text-center text-[10px] font-black text-slate-500 uppercase tracking-widest px-6 py-4">Estado</th>
                                <th className="text-right text-[10px] font-black text-slate-500 uppercase tracking-widest px-6 py-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filtered.map((user) => (
                                <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10 overflow-hidden flex-shrink-0 group-hover:border-primary-500/50 transition-colors">
                                                <User size={20} className="text-slate-400 group-hover:text-primary-400" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-white truncate">{user.full_name}</p>
                                                <div className="flex items-center gap-1 text-xs text-slate-500 font-medium truncate">
                                                    <Mail size={12} />
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        <div className="flex items-center gap-2">
                                            {user.role === 'Admin' ? (
                                                <span className="flex items-center gap-1.5 text-xs font-black text-primary-400 bg-primary-500/10 px-2.5 py-1 rounded-lg border border-primary-500/20 uppercase tracking-tight">
                                                    <Shield size={12} />
                                                    Admin
                                                </span>
                                            ) : (
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-tight">Estudiante</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 hidden lg:table-cell">
                                        <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                                            <Calendar size={14} className="text-slate-600" />
                                            {user.joined}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        <span className="text-sm text-slate-400 font-medium">{user.last_active}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border ${STATUS_STYLES[user.status]}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => toggleStatus(user.id)}
                                                className={`p-2 rounded-lg transition-all ${user.status === 'Activo'
                                                    ? 'text-slate-500 hover:text-red-400 hover:bg-red-500/10'
                                                    : 'text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10'
                                                    }`}
                                                title={user.status === 'Activo' ? 'Desactivar' : 'Activar'}
                                            >
                                                {user.status === 'Activo' ? <UserX size={16} /> : <UserCheck size={16} />}
                                            </button>
                                            <button className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-all">
                                                <MoreHorizontal size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filtered.length === 0 && (
                    <div className="text-center py-16">
                        <Users size={40} className="mx-auto text-slate-700 mb-4" />
                        <p className="text-slate-500 font-bold">No se encontraron usuarios</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
