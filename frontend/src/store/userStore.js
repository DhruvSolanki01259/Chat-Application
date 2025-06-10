import axios from "axios";
import { create } from "zustand";

axios.defaults.withCredentials = true;

export const useUserStore = create((set) => ({
  users: [],
  loading: false,
  error: null,

  getUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("http://localhost:5000/api/user");
      // console.log("Fetched users:", response.data);
      set({ users: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching users:", error);
      set({
        loading: false,
        error: error.response?.data?.message || "Error fetching users",
      });
    }
  },
}));
