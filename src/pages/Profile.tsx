import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Camera, Save, Shield, LogOut, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import VisualBackground from '../components/VisualBackground';
import EcoAulaLogo from '../components/EcoAulaLogo';

export default function Profile() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [isSaving, setIsSaving] = useState(false);
    const [name, setName] = useState(user?.user_metadata?.full_name || '');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (user?.user_metadata?.full_name) {
            setName(user.user_metadata.full_name);
        }
    }, [user]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSaving(true);
            setError('');
            setSuccess('');

            const { error: updateError } = await supabase.auth.updateUser({
                data: { full_name: name }
            });

            if (updateError) throw updateError;
            setSuccess('Perfil actualizado correctamente.');
        } catch (err: any) {
            setError(err.message || 'Error al actualizar el perfil.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <div className="min-h-screen relative flex flex-col font-sans selection:bg-primary-500/30 selection:text-white overflow-hidden">
            <VisualBackground variant="misty" />

            <main className="flex-1 py-32 px-6 max-w-4xl mx-auto w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                    <div className="space-y-2">
                        <Link to="/dashboard" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all group">
                            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver al Panel
                        </Link>
                        <h1 className="text-5xl font-black text-white tracking-tight">Tu Perfil</h1>
                    </div>

                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 font-black px-8 py-3 rounded-2xl hover:bg-red-500 hover:text-white transition-all group active:scale-95 text-xs uppercase tracking-widest"
                    >
                        <LogOut size={18} />
                        Cerrar Sesión
                    </button>
                </motion.div>

                <div className="bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
                    <div className="h-40 bg-gradient-to-r from-primary-600/40 to-primary-400/40 relative">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
                    </div>

                    <div className="px-8 md:px-14 pb-14">
                        <div className="relative flex justify-between items-end -mt-20 mb-12">
                            <div className="relative group">
                                <div className="w-40 h-40 bg-slate-900 rounded-[2.5rem] p-1 shadow-2xl border border-white/20">
                                    <div className="w-full h-full bg-white/5 rounded-[2.2rem] flex items-center justify-center overflow-hidden relative group/avatar">
                                        <div className="absolute inset-0 bg-primary-500/10 blur-2xl opacity-0 group-hover/avatar:opacity-100 transition-opacity"></div>
                                        <EcoAulaLogo className="w-20 h-20 text-white relative z-10" />
                                        <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity cursor-pointer text-white">
                                            <Camera size={32} strokeWidth={2.5} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pb-4 hidden md:block">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/20 text-primary-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2 border border-primary-500/20">Miembro desde 2026</span>
                            </div>
                        </div>

                        {error && (
                            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-8 p-6 bg-red-500/10 border border-red-500/20 text-red-400 rounded-3xl text-sm font-bold flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                {error}
                            </motion.div>
                        )}

                        {success && (
                            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-8 p-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-3xl text-sm font-bold flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                {success}
                            </motion.div>
                        )}

                        <form onSubmit={handleSave} className="space-y-10">
                            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nombre Completo</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-primary-400 transition-colors">
                                            <User size={20} />
                                        </div>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-white placeholder:text-slate-600 transition-all font-bold text-lg"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Correo Electrónico</label>
                                    <div className="relative opacity-60">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-500">
                                            <Mail size={20} />
                                        </div>
                                        <input
                                            type="email"
                                            value={user?.email || ''}
                                            readOnly
                                            className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-[1.5rem] text-slate-400 cursor-not-allowed font-bold text-lg"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Biografía e Intereses</label>
                                <textarea
                                    rows={4}
                                    className="w-full p-6 bg-white/5 border border-white/10 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-white placeholder:text-slate-700 transition-all font-bold text-lg resize-none"
                                    placeholder="Cuéntanos sobre tu compromiso con la sostenibilidad..."
                                />
                            </div>

                            <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8">
                                <div className="flex items-center text-xs font-black text-slate-500 gap-3 tracking-widest uppercase">
                                    <Shield size={18} className="text-primary-500" />
                                    Tus datos están blindados
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={isSaving}
                                    className="w-full sm:w-auto flex items-center justify-center gap-3 bg-primary-500 hover:bg-primary-400 text-slate-950 font-black py-5 px-10 rounded-2xl transition-all shadow-2xl shadow-primary-500/20 text-sm uppercase tracking-widest active:scale-95"
                                >
                                    {isSaving ? (
                                        <span className="w-5 h-5 border-4 border-slate-950/30 border-t-slate-950 rounded-full animate-spin"></span>
                                    ) : (
                                        <Save size={20} />
                                    )}
                                    <span>{isSaving ? 'Guardando...' : 'Actualizar Perfil'}</span>
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
