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