import logoImg from '../assets/logo_ecoaula.png';

export default function EcoAulaLogo({ className = "w-20 h-20" }: { className?: string }) {
    return (
        <img
            src={logoImg}
            alt="EcoAula Logo"
            className={`${className} brightness-110 contrast-125`}
        />
    );
}
