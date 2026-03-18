import { motion, AnimatePresence } from 'framer-motion';

type BackgroundVariant = 'primary' | 'misty' | 'deep';

interface VisualBackgroundProps {
    variant?: BackgroundVariant;
}

const VARIANTS = {
    primary: {
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        gradient1: 'bg-primary-500',
        gradient2: 'bg-emerald-400',
        overlay: 'from-slate-900/60 via-transparent to-slate-900/80'
    },
    misty: {
        image: 'https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        gradient1: 'bg-slate-400',
        gradient2: 'bg-indigo-400',
        overlay: 'from-slate-950/70 via-slate-950/20 to-slate-950/90'
    },
    deep: {
        image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        gradient1: 'bg-emerald-600',
        gradient2: 'bg-teal-500',
        overlay: 'from-slate-950/80 via-transparent to-slate-950/95'
    }
};

export default function VisualBackground({ variant = 'primary' }: VisualBackgroundProps) {
    const config = VARIANTS[variant];

    return (
        <div className="fixed inset-0 z-0 bg-slate-950 overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={variant}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                    className="absolute inset-0"
                >
                    {/* High-res Nature Image with Parallax & Blur */}
                    <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 10, ease: 'linear' }}
                        className="absolute inset-0"
                    >
                        <img
                            src={config.image}
                            alt="Nature Background"
                            className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-b ${config.overlay}`}></div>
                    </motion.div>

                    {/* Mesh Gradients Overlay */}
                    <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none">
                        <div className={`absolute top-[-20%] left-[-10%] w-[70%] h-[70%] ${config.gradient1} rounded-full blur-[150px] animate-pulse`}></div>
                        <div className={`absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] ${config.gradient2} rounded-full blur-[150px] animate-pulse delay-1000`}></div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Subtle Grain Texture */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-soft-light"></div>
        </div>
    );
}
