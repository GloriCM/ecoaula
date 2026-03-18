import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, Loader2, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import VisualBackground from '../components/VisualBackground';
import EcoAulaLogo from '../components/EcoAulaLogo';

export default function Recovery() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSent, setIsSent] = useState(false);

    const handleRecovery = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError('');

            const { error: recoveryError } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/login`,
            });

            if (recoveryError) throw recoveryError;

            setIsSent(true);
        } catch (err: any) {
            setError(err.message || 'Error al enviar el enlace de recuperación.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-6 selection:bg-primary-500/30 selection:text-white overflow-hidden font-sans">
            <VisualBackground variant="misty" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-xl z-10"
            >
                <div className="bg-white/5 backdrop-blur-3xl p-10 md:p-14 rounded-[3rem] border border-white/20 shadow-[0_48px_100px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                    {/* Ambient Glow */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500/10 blur-[80px] -ml-32 -mt-32 rounded-full group-hover:bg-primary-500/20 transition-colors duration-1000"></div>

                    <div className="relative">
                        <div className="flex flex-col items-center mb-10 text-center">
                            <Link to="/" className="flex flex-col items-center gap-4 group/logo cursor-pointer mb-6">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary-400 blur-2xl opacity-30 group-hover/logo:opacity-60 transition-opacity"></div>
                                    <EcoAulaLogo className="w-24 h-24 relative group-hover/logo:scale-110 transition-transform duration-500 ease-out drop-shadow-2xl" />
                                </div>
                                <span className="text-4xl font-black tracking-tight text-white drop-shadow-sm">EcoAula</span>
                            </Link>
                            <h2 className="text-3xl font-black text-white mb-2">Restablecer tu contraseña</h2>
                            <p className="text-slate-400 font-medium">Te enviaremos un enlace seguro a tu correo.</p>
                        </div>

                        {error && (
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-8 p-6 bg-red-500/10 border border-red-500/20 text-red-400 rounded-3xl text-sm font-bold flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                {error}
                            </motion.div>
                        )}

                        <AnimatePresence mode="wait">
                            {!isSent ? (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-8"
                                    onSubmit={handleRecovery}
                                >
                                    <div className="space-y-3">
                                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Correo Electrónico</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-primary-400 transition-colors">
                                                <Mail size={20} />
                                            </div>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-white placeholder:text-slate-600 transition-all font-bold text-lg"
                                                placeholder="tu@correo.com"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex justify-center items-center gap-3 bg-primary-500 hover:bg-primary-400 text-slate-950 font-black py-5 px-6 rounded-2xl transition-all shadow-2xl shadow-primary-500/20 text-sm uppercase tracking-widest active:scale-95 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed transform"
                                    >
                                        {loading ? (
                                            <Loader2 size={24} className="animate-spin" />
                                        ) : (
                                            <>
                                                <span>Enviar enlace seguro</span>
                                                <Send size={20} />
                                            </>
                                        )}
                                    </button>
                                </motion.form>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-6"
                                >
                                    <div className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/10">
                                        <Mail size={40} strokeWidth={2.5} />
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-4 tracking-tight">¡Enlace enviado!</h3>
                                    <p className="text-slate-400 font-medium mb-10 max-w-sm mx-auto">
                                        Hemos enviado instrucciones de recuperación a <span className="text-white font-black">{email}</span>. Revisa tu bandeja de entrada.
                                    </p>
                                    <Link to="/login" className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white font-black px-10 py-5 rounded-2xl hover:bg-white/10 transition-all text-xs uppercase tracking-widest">
                                        Regresar al Login
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {!isSent && (
                            <div className="mt-12 pt-8 border-t border-white/5 text-center">
                                <Link to="/login" className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all group">
                                    <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Volver al Inicio de Sesión
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
