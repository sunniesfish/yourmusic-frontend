import { User } from "@/graphql/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  token: string | undefined;
  setUser: (user: User | null) => void;
  setToken: (token: string | undefined) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: undefined,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: undefined }),
    }),
    { name: "auth-store" }
  )
);
