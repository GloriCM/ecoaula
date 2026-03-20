export interface Course {
    id: string;
    title: string;
    description: string;
    image: string;
    progress: number;
    lessons: number;
    duration: string;
    level: string;
    rating: number;
    category: string;
}

export const MOCK_COURSES: Course[] = [
    {
        id: '1',
        title: 'Introducción a la Economía Circular',
        description: 'Aprende los principios fundamentales de la economía circular y cómo aplicarlos en la vida diaria.',
        image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800',
        progress: 45,
        lessons: 12,
        duration: '6h 30m',
        level: 'Principiante',
        rating: 4.8,
        category: 'Sostenibilidad'
    },
    {
        id: '2',
        title: 'Energías Renovables para el Hogar',
        description: 'Descubre cómo implementar soluciones de energía solar y eólica a pequeña escala para tu vivienda.',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800',
        progress: 0,
        lessons: 8,
        duration: '4h 15m',
        level: 'Intermedio',
        rating: 4.9,
        category: 'Energía'
    },
    {
        id: '3',
        title: 'Gestión Avanzada de Residuos',
        description: 'Técnicas profesionales para el manejo de residuos orgánicos e inorgánicos en entornos urbanos.',
        image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800',
        progress: 0,
        lessons: 15,
        duration: '10h',
        level: 'Avanzado',
        rating: 4.7,
        category: 'Residuos'
    },
    {
        id: '4',
        title: 'Agricultura Urbana y Huertos',
        description: 'Crea tu propio oasis verde en la ciudad y cultiva tus propios alimentos de forma orgánica.',
        image: 'https://images.unsplash.com/photo-1592150621344-824545028267?auto=format&fit=crop&q=80&w=800',
        progress: 10,
        lessons: 10,
        duration: '5h 45m',
        level: 'Principiante',
        rating: 4.9,
        category: 'Agricultura'
    }
];
