import { loginApi, logoutApi, registerApi } from "@/api/auth/auth.api";
import type { AuthStoreType } from "@/types/auth/auth.type";
import { showError } from "@/utils/error/error.util";
import toast from "react-hot-toast";
import { create } from "zustand";
import { useAccountStore } from "../account/account.store";
import { useTokenStore } from "../token/token.store";

export const useAuthStore = create<AuthStoreType>((set) => ({
  loading: false,
  setRegister: async (data) => {
    set({ loading: true });
    try {
      const response = await registerApi(data);
      toast.success(response.message);
      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  setLogin: async (data) => {
    set({ loading: true });
    try {
      const response = await loginApi(data);

      // Save the access token first
      useTokenStore.getState().setToken(response.accessToken);

      //fetch account after login
      await useAccountStore.getState().getAccount();
      toast.success(response.message);
      return true;
    } catch (error) {
      console.error(error);
      showError(error);
      return false;
    } finally {
      set({
        loading: false,
      });
    }
  },
  logout: async () => {
    set({ loading: true });
    try {
      const response = await logoutApi();
      toast.success(response.message);
      return true;
    } catch (error) {
      console.log(error);
      showError(error);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  setLogout: async () => {
    set({ loading: true });
    try {
      const response = await logoutApi();
      toast.success(response.message);
      return true;
    } catch (error) {
      console.log(error);
      showError(error);
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));
