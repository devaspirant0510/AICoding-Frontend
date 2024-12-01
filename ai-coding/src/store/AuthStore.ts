import { create } from 'zustand';

interface AuthState {
    accessToken: string | null;
    setAccessToken: (token: string) => void;
    getAccessToken: () => string | null;
}

const useAuthStore = create<AuthState>((set, get) => ({
    accessToken: null,
    setAccessToken: (token) => set({ accessToken: token }),
    getAccessToken: () => get().accessToken,
}));

export default useAuthStore;