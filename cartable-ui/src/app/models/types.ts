export enum Level {
    SIXIEME = '6ème',
    CINQUIEME = '5ème',
    QUATRIEME = '4ème',
    TROISIEME = '3ème',
    SECONDE = 'Seconde',
    PREMIERE = 'Première',
    TERMINALE = 'Terminale',
    BTS = 'BTS'
}

export enum Subject {
    FRANCAIS = 'Français',
    MATHS = 'Mathématiques',
    HISTOIRE_GEO = 'Histoire-Géo',
    PHYSIQUE_CHIMIE = 'Physique-Chimie',
    SVT = 'SVT',
    PHILO = 'Philosophie',
    LANGUES = 'Langues Vivantes',
    SES = 'SES',
    TECHNOLOGIE = 'Technologie',
    ARTS = 'Arts Plastiques',
    MUSIQUE = 'Education Musicale'
}

export interface Resource {
    id: string;
    title: string;
    description: string;
    author: string;
    authorId: string;
    level: Level;
    subject: Subject;
    tags: string[];
    likes: number;
    downloads: number;
    date: string;
    contentDetails: string;
    fileUrl: string; // Mock URL for the PDF
    fileName: string;
    price: number; // 0 for free, > 0 for credits
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    credits: number;
    uploads: string[]; // IDs of resources uploaded
    purchased: string[]; // IDs of resources purchased/downloaded
    following: string[]; // IDs of users followed
}

export interface Notification {
    id: string;
    userId: string;
    message: string;
    read: boolean;
    date: string;
    type: 'upload' | 'social' | 'system';
}

export interface FilterState {
    search: string;
    level: Level | '';
    subject: Subject | '';
}
