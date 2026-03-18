import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Book, Globe, Shield, Sparkles } from 'lucide-react';
import VisualBackground from '../components/VisualBackground';
import EcoAulaLogo from '../components/EcoAulaLogo';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col font-sans overflow-x-hidden selection:bg-primary-100 selection:text-primary-900">
            <VisualBackground />

            {/* Header / Navbar */}
            <header className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-2xl border-b border-white/10 px-8 py-5">
                <div className="max-w-7xl mx-auto flex justify-between items-center text-white">
                    <Link to="/" className="flex items-center gap-5 group cursor-pointer">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary-400 blur-2xl opacity-40 group-hover:opacity-80 transition-opacity"></div>
                            <EcoAulaLogo className="w-20 h-20 relative group-hover:scale-110 transition-transform duration-500 ease-out drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]" />
                        </div>
                        <span className="text-4xl font-black tracking-tight text-white drop-shadow-sm">EcoAula</span>
                    </Link>
                    <div className="flex items-center gap-8">
                        <Link to="/login" className="text-sm font-bold text-white/80 hover:text-white transition-all uppercase tracking-widest hidden sm:block hover:scale-105">
                            Entrar
                        </Link>
                        <Link
                            to="/register"
                            className="bg-white hover:bg-primary-50 text-slate-900 font-black py-3 px-8 rounded-2xl transition-all shadow-2xl hover:shadow-white/20 text-sm uppercase tracking-wider active:scale-95"
                        >
                            Empezar ahora
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="relative pt-44 pb-32 px-8 z-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-white/5 backdrop-blur-3xl p-10 md:p-14 rounded-[3rem] border border-white/20 shadow-[0_40px_100px_-15px_rgba(0,0,0,0.3)]"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="inline-flex items-center gap-3 bg-primary-500/10 backdrop-blur-md text-primary-300 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-primary-500/20 shadow-sm"
                        >
                            <span className="flex h-1.5 w-1.5 rounded-full bg-primary-400 animate-ping"></span>
                            <Sparkles size={12} className="text-primary-400" /> La nueva era de la educación sostenible
                        </motion.div>

                        <h1 className="text-5xl sm:text-6xl font-black text-white leading-[1.1] mb-8 tracking-tight">
                            Transforma tu <br />
                            <span className="relative inline-block mt-2">
                                <span className="relative z-10 text-primary-400 drop-shadow-[0_0_25px_rgba(34,197,94,0.25)]">Futuro Verde</span>
                                <svg className="absolute -bottom-2 left-0 w-full h-4 text-primary-500/30 -z-0" viewBox="0 0 100 12" preserveAspectRatio="none">
                                    <path d="M0,10 Q50,0 100,10" stroke="currentColor" strokeWidth="10" fill="none" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h1>

                        <p className="text-xl text-slate-200/70 leading-relaxed mb-10 max-w-xl font-medium">
                            Domina la sostenibilidad con la plataforma de aprendizaje más avanzada del mundo.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-stretch">
                            <Link
                                to="/register"
                                className="w-full sm:w-auto bg-primary-500 hover:bg-primary-400 text-slate-900 font-black py-4 px-10 rounded-2xl transition-all shadow-2xl shadow-primary-500/20 hover:-translate-y-1 active:scale-95 group flex items-center justify-center gap-3 text-lg"
                            >
                                Únete Gratis
                                <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                            </Link>
                            <Link
                                to="/login"
                                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-2 border-white/20 font-black py-4 px-10 rounded-2xl transition-all flex items-center justify-center text-lg backdrop-blur-md active:scale-95"
                            >
                                Ver catálogo
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="relative"
                    >
                        <div className="relative z-10 rounded-[4rem] overflow-hidden translate-y-4 shadow-[0_40px_100px_-15px_rgba(0,0,0,0.1)] border-[12px] border-white group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/20 to-transparent z-10 opacity-60"></div>
                            <img
                                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Nature Education"
                                className="w-full aspect-[4/5] object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out"
                            />
                        </div>

                        {/* Decorative background blobs */}
                        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary-300/30 rounded-full blur-[100px] -z-10 animate-pulse"></div>
                        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-200/30 rounded-full blur-[100px] -z-10 animate-pulse delay-700"></div>

                        {/* Premium Border Element */}
                        <div className="absolute inset-0 border-[1px] border-slate-200/50 rounded-[4.5rem] -m-4 z-0 pointer-events-none"></div>
                    </motion.div>
                </div>
            </main>

            {/* Features Preview */}
            <section className="bg-slate-950 py-40 px-8 relative overflow-hidden z-10">
                {/* Decorative background for features */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-[150px]"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl font-black text-white mb-6 tracking-tight"
                        >
                            ¿Por qué EcoAula es <span className="text-primary-400 underline underline-offset-[10px] decoration-primary-500/30">diferente</span>?
                        </motion.h2>
                        <p className="text-xl text-slate-400 font-medium leading-relaxed">Combinamos tecnología de vanguardia con expertos ambientales.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <FeatureCard
                            icon={<Globe size={32} />}
                            title="Impacto Global"
                            description="Conéctate con proyectos reales de sostenibilidad en todo el mundo y haz la diferencia tangible."
                            color="bg-primary-500"
                            shadow="shadow-primary-500/20"
                        />
                        <FeatureCard
                            icon={<Book size={32} />}
                            title="Aprendizaje Práctico"
                            description="Cursos directos y actualizados semanalmente por líderes del sector. Aprende haciendo."
                            color="bg-emerald-400"
                            shadow="shadow-emerald-400/20"
                        />
                        <FeatureCard
                            icon={<Shield size={32} />}
                            title="Certificación Oficial"
                            description="Obtén certificados validados por organizaciones ambientales internacionales de primer nivel."
                            color="bg-white"
                            shadow="shadow-white/10"
                            darkIcon
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-950 border-t border-white/5 py-20 px-8 z-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
                    <div className="flex items-center gap-5 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary-400 blur-2xl opacity-30"></div>
                            <EcoAulaLogo className="w-20 h-20 relative group-hover:rotate-12 transition-transform duration-700 drop-shadow-2xl" />
                        </div>
                        <div>
                            <span className="text-3xl font-black tracking-tight text-white block">EcoAula</span>
                            <span className="text-sm font-bold text-primary-400 uppercase tracking-[0.3em]">Educación Sostenible</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-slate-300 text-lg font-medium mb-2">© 2026 EcoAula. Hecho con ❤️ para el planeta.</p>
                        <p className="text-slate-500 text-sm">Transformando la educación ambiental un estudiante a la vez.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description, color, shadow, darkIcon }: { icon: React.ReactNode, title: string, description: string, color: string, shadow: string, darkIcon?: boolean }) {
    return (
        <motion.div
            whileHover={{ y: -15, scale: 1.01 }}
            className="p-10 rounded-[3rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl transition-all duration-700 group relative overflow-hidden"
        >
            <div className={`w-20 h-20 ${color} ${darkIcon ? 'text-slate-900' : 'text-white'} rounded-[2rem] flex items-center justify-center mb-8 shadow-3xl ${shadow} group-hover:scale-110 transition-transform duration-700`}>
                {icon}
            </div>
            <h3 className="text-2xl font-black text-primary-400 mb-5 tracking-tight drop-shadow-sm">{title}</h3>
            <p className="text-slate-400 leading-relaxed font-medium text-lg">{description}</p>

            <div className={`absolute bottom-0 left-0 h-1.5 w-0 ${color} group-hover:w-full transition-all duration-700`}></div>
        </motion.div>
    );
}
