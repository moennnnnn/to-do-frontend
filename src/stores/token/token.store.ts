// Libraries
import { create } from "zustand";

// Types
export type TokenStoreType = {
  accessToken: string | null;
  initialized: boolean;
  _refreshPromise: Promise<boolean> | null;
  loading: boolean;

  init: () => Promise<boolean>;
  setToken: (token: string | null) => void;
  setClearToken: () => void;
};

// API
import { refreshTokenApi } from "@/api/token/token.api";

export const useTokenStore = create<TokenStoreType>((set, get) => ({
  accessToken: null,
  initialized: false,
  _refreshPromise: null,
  loading: false,

  init: async () => {
    const { initialized } = get();
    if (initialized) return get().accessToken !== null;

    set({ initialized: true });

    const existing = get()._refreshPromise;
    if (existing) return existing;

    const p = (async () => {
      set({ loading: true });
      try {
        const res = await refreshTokenApi();
        const token = res?.accessToken ?? null;

        set({ accessToken: token });
        return token !== null;
      } catch {
        set({ accessToken: null });
        return false;
      } finally {
        set({ loading: false, _refreshPromise: null });
      }
    })();

    set({ _refreshPromise: p });
    return p;
  },

  setToken: (token) => set({ accessToken: token }),

  setClearToken: () =>
    set({
      accessToken: null,
      initialized: false,
      _refreshPromise: null,
    }),
}));
