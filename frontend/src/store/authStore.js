import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

axios.defaults.withCredentials = true;

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,
      isAuthenticated: false,

      signup: async (fullName, email, password, confirmPassword, gender) => {
        set({ user: null, loading: true, error: null, isAuthenticated: false });
        try {
          const response = await axios.post(
            `http://localhost:5000/api/auth/signup`,
            { fullName, email, password, confirmPassword, gender }
          );
          set({
            user: response.data.rest,
            loading: false,
            error: null,
            isAuthenticated: true,
          });
        } catch (error) {
          set({
            loading: false,
            error: error.response.data.message,
            isAuthenticated: false,
          });
        }
      },

      login: async (email, password) => {
        set({ user: null, loading: true, error: null, isAuthenticated: false });
        try {
          const response = await axios.post(
            `http://localhost:5000/api/auth/login`,
            { email, password }
          );
          set({
            user: response.data.rest,
            loading: false,
            error: null,
            isAuthenticated: true,
          });
        } catch (error) {
          set({
            loading: false,
            error: error.response.data.message,
            isAuthenticated: false,
          });
        }
      },

      logout: async () => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post(
            "http://localhost:5000/api/auth/logout"
          );
          set({
            user: null,
            loading: false,
            error: null,
            isAuthenticated: false,
          });
        } catch (error) {
          set({ loading: false, error: error.response.data.message });
        }
      },
    }),

    {
      name: "chatapp-auth", // key in localStorage
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }), // store only what you need
    }
  )
);
