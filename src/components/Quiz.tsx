import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RefreshCcw, Award, Check, X } from 'lucide-react';

interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
}

const MOCK_QUESTIONS: Question[] = [
    {
        id: 1,
        question: "¿Cuál de estas opciones define mejor la Economía Circular?",
        options: [
            "Un modelo de producción basado en usar y tirar.",
            "Un sistema que busca eliminar el desperdicio y mantener los productos en uso.",
            "Una técnica para vender más productos reciclados.",
            "Un software para gestionar basureros municipales."
        ],
        correctAnswer: 1
    },
    {
        id: 2,
        question: "¿Cuál es el primer paso en la jerarquía de gestión de residuos?",
        options: [
            "Reciclar",
            "Reutilizar",
            "Reducir / Rechazar",
            "Incinerar"
        ],
        correctAnswer: 2
    }
];

export function Quiz({ onComplete }: { onComplete?: () => void }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const handleOptionSelect = (index: number) => {
        if (showFeedback) return;
        setSelectedOption(index);
    };

    const handleNext = () => {
        const isCorrect = selectedOption === MOCK_QUESTIONS[currentStep].correctAnswer;
        if (isCorrect) setScore(s => s + 1);

        setShowFeedback(true);

        setTimeout(() => {
            if (currentStep < MOCK_QUESTIONS.length - 1) {
                setCurrentStep(s => s + 1);
                setSelectedOption(null);
                setShowFeedback(false);
            } else {
                setQuizFinished(true);
            }
        }, 1500);
    };

    if (quizFinished) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 px-4"
            >
                <div className="relative inline-block mb-8">
                    <div className="absolute inset-0 bg-primary-500 blur-3xl opacity-30 animate-pulse"></div>
                    <div className="w-24 h-24 bg-primary-500 text-slate-950 rounded-[2rem] flex items-center justify-center mx-auto relative z-10 shadow-2xl">
                        <Award size={48} />
                    </div>
                </div>

                <h2 className="text-4xl font-black text-white mb-4 tracking-tight">¡Misión Cumplida!</h2>
                <p className="text-slate-400 mb-10 font-medium text-lg max-w-sm mx-auto">
                    Has demostrado una gran comprensión de los conceptos. Tu puntuación: <span className="text-primary-400 font-black">{score}/{MOCK_QUESTIONS.length}</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => {
                            setCurrentStep(0);
                            setScore(0);
                            setSelectedOption(null);
                            setQuizFinished(false);
                            setShowFeedback(false);
                        }}
                        className="flex items-center justify-center gap-3 px-8 py-4 bg-white/5 text-white font-black rounded-2xl border border-white/10 hover:bg-white/10 transition-all uppercase tracking-widest text-xs"
                    >
                        <RefreshCcw size={18} /> Reintentar
                    </button>
                    <button
                        onClick={onComplete}
                        className="px-10 py-4 bg-primary-500 text-slate-950 font-black rounded-2xl hover:bg-primary-400 shadow-2xl shadow-primary-500/20 transition-all uppercase tracking-widest text-xs"
                    >
                        Cerrar y Continuar
                    </button>
                </div>
            </motion.div>
        );
    }

    const currentQuestion = MOCK_QUESTIONS[currentStep];

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-12">
                <div className="flex justify-between items-end mb-4">
                    <h3 className="text-[10px] font-black text-primary-400 uppercase tracking-[0.2em]">Pregunta {currentStep + 1} de {MOCK_QUESTIONS.length}</h3>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{Math.round(((currentStep + 1) / MOCK_QUESTIONS.length) * 100)}% Completado</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden p-[1px] border border-white/10">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep + 1) / MOCK_QUESTIONS.length) * 100}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full"
                    />
                </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-white mb-10 leading-tight tracking-tight">
                {currentQuestion.question}
            </h2>

            <div className="space-y-4">
                {currentQuestion.options.map((option, index) => {
                    let stateClass = "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20";
                    if (selectedOption === index) stateClass = "bg-primary-500/10 border-primary-500/50 text-white shadow-[0_0_15px_rgba(34,197,94,0.1)]";
                    if (showFeedback) {
                        if (index === currentQuestion.correctAnswer) stateClass = "bg-emerald-500/20 border-emerald-500/50 text-emerald-400 ring-4 ring-emerald-500/10";
                        else if (selectedOption === index) stateClass = "bg-red-500/20 border-red-500/50 text-red-400 ring-4 ring-red-500/10";
                    }

                    return (
                        <motion.button
                            key={index}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleOptionSelect(index)}
                            className={`w-full p-6 rounded-[1.5rem] border text-left font-black transition-all flex items-center justify-between gap-6 group relative overflow-hidden ${stateClass}`}
                        >
                            <span className="relative z-10 text-base md:text-lg">{option}</span>

                            <div className="shrink-0 relative z-10">
                                <AnimatePresence mode="wait">
                                    {showFeedback && index === currentQuestion.correctAnswer ? (
                                        <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}>
                                            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                                                <Check size={18} className="text-emerald-400" strokeWidth={3} />
                                            </div>
                                        </motion.div>
                                    ) : showFeedback && selectedOption === index && index !== currentQuestion.correctAnswer ? (
                                        <motion.div initial={{ scale: 0, rotate: 20 }} animate={{ scale: 1, rotate: 0 }}>
                                            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
                                                <X size={18} className="text-red-400" strokeWidth={3} />
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div className={`w-8 h-8 rounded-full border-2 transition-colors flex items-center justify-center ${selectedOption === index ? 'border-primary-400 bg-primary-500/10' : 'border-white/10'} `}>
                                            <div className={`w-2 h-2 rounded-full bg-primary-400 transition-opacity ${selectedOption === index ? 'opacity-100' : 'opacity-0'}`}></div>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            <div className="mt-12">
                <button
                    disabled={selectedOption === null || showFeedback}
                    onClick={handleNext}
                    className={`w-full py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all uppercase tracking-widest text-sm border shadow-2xl ${selectedOption === null || showFeedback
                        ? 'bg-white/5 text-slate-600 border-white/5 cursor-not-allowed'
                        : 'bg-primary-500 text-slate-950 border-primary-500 hover:bg-primary-400 active:scale-95 shadow-primary-500/20'
                        }`}
                >
                    {showFeedback ? 'Procesando...' : 'Validar Respuesta'}
                    <ArrowRight size={20} className={selectedOption !== null && !showFeedback ? 'animate-bounce-x' : ''} />
                </button>
            </div>
        </div>
    );
}
