export interface User {
    _id: string;
    email: string;
    market: string;
    name: string;
    role: string;
    createdAt: string;
}

export interface LoginPopupState {
    isOpen: boolean;
    openPopup: () => void;
    closePopup: () => void;
}

export interface FetchMarketState {
    marketList: Record<string, unknown>[];
    isLoading: boolean;
    error: string | null;
    fetchMarkets: () => Promise<void>;
}

export interface LanguageState {
    language: string;
    setLanguage: (language: string) => void;
}

export interface RecipeInterface {
    createdAt: string;
    createdBy: string;
    difficulty:number;
    imageUrl: string;
    ingredients: [];
    title: string;
    shortDescription: string;
    instructions: string;
    _id: string;    
}

export interface RecipePostData {
    title: string;
    imageUrl: string;
    shortDescription: string;
    difficulty: number;
    ingredients: (string | number)[];
    instructions: string;
    createdBy: string;
}
