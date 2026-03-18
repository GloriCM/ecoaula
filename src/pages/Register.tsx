import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import VisualBackground from '../components/VisualBackground';
import EcoAulaLogo from '../components/EcoAulaLogo';

export default function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!acceptedTerms) {
            setError('Debes aceptar los términos y condiciones.');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const { error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name
                    }
                }
            });

            if (signUpError) throw signUpError;

            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Error al registrar la cuenta.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-6 selection:bg-primary-500/30 selection:text-white">
            <VisualBackground variant="misty" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-xl z-10"
            >
                <div className="bg-white/5 backdrop-blur-3xl p-10 md:p-14 rounded-[3rem] border border-white/20 shadow-[0_48px_100px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                    {/* Ambient Glow */}
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 blur-[80px] -ml-32 -mb-32 rounded-full group-hover:bg-emerald-500/20 transition-colors duration-1000"></div>

                    <div className="relative">
                        <div className="flex flex-col items-center mb-10">
                            <Link to="/" className="flex flex-col items-center gap-4 group/logo cursor-pointer mb-6">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary-400 blur-2xl opacity-30 group-hover/logo:opacity-60 transition-opacity"></div>
                                    <EcoAulaLogo className="w-24 h-24 relative group-hover/logo:scale-110 transition-transform duration-500 ease-out drop-shadow-2xl" />
                                </div>
                                <span className="text-4xl font-black tracking-tight text-white drop-shadow-sm">EcoAula</span>
                            </Link>
                            <h2 className="text-3xl font-black text-white mb-2 text-center">Crea tu cuenta</h2>
                            <p className="text-slate-400 font-medium text-center">Únete a la nueva era de la educación sostenible.</p>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mb-8 p-4 bg-red-500/10 text-red-400 rounded-2xl text-sm border border-red-500/20 backdrop-blur-md flex items-center gap-3"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                                {error}
                            </motion.div>
                        )}

                        <form className="space-y-5" onSubmit={handleRegister}>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-300 ml-1">Nombre completo</label>
                                <div className="relative group/input">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within/input:text-primary-400 transition-colors">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/5 text-white placeholder:text-slate-600 focus:bg-white/10"
                                        placeholder="Juan Pérez"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-300 ml-1">Correo electrónico</label>
                                <div className="relative group/input">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within/input:text-primary-400 transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/5 text-white placeholder:text-slate-600 focus:bg-white/10"
                                        placeholder="tu@correo.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-300 ml-1">Contraseña</label>
                                <div className="relative group/input">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within/input:text-primary-400 transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        minLength={6}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white/5 text-white placeholder:text-slate-600 focus:bg-white/10"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="flex items-start mb-6 pt-2 pl-1">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={acceptedTerms}
                                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                                    className="mt-1 h-4 w-4 text-primary-500 focus:ring-primary-500 border-white/10 bg-white/5 rounded cursor-pointer"
                                />
                                <label htmlFor="terms" className="ml-3 block text-xs text-slate-400 font-medium leading-tight">
                                    Acepto los <Link to="/terms" className="text-primary-400 hover:text-primary-300 font-bold">Términos de servicio</Link> y la <Link to="/privacy" className="text-primary-400 hover:text-primary-300 font-bold">Política de privacidad</Link>.
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary-500 text-slate-950 py-4 rounded-2xl font-black hover:bg-primary-400 transition-all flex items-center justify-center gap-2 group/btn shadow-xl shadow-primary-500/20 active:scale-95 text-lg"
                            >
                                {loading ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : (
                                    <>
                                        Crear Cuenta
                                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-slate-400 font-medium text-sm">
                                ¿Ya tienes cuenta?{' '}
                                <Link to="/login" className="font-black text-primary-400 hover:text-primary-300 transition-colors">
                                    Inicia sesión
                                </Link>
                            </p>

                            <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="text-sm font-bold">Google</span>
                            </button>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-8 text-center"
                >
                    <p className="text-slate-500 text-sm font-medium">© 2026 EcoAula. Comprometidos con el planeta.</p>
                </motion.div>
            </motion.div>
        </div>
    );
}
