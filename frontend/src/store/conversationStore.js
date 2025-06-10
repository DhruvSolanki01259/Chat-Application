import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

export const useConversationStore = create((set) => ({
  receiverId: null,
  setReceiverId: (id) => set({ receiverId: id }),

  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),

  messages: [],
  setMessages: (messages) => set({ messages }),

  loading: false,
  loadingMessages: false,
  sendingMessage: false,

  error: null,

  sendMessages: async (id, message) => {
    set({ sendingMessage: true, error: null });
    try {
      const response = await axios.post(
        `http://localhost:5000/api/message/send/${id}`,
        { message }
      );

      set((state) => ({
        messages: [...state.messages, response.data],
        sendingMessage: false,
        error: null,
      }));
    } catch (error) {
      set({
        sendingMessage: false,
        error: error.response?.data?.message || "Failed to send message",
      });
    }
  },

  getMessages: async (id) => {
    set({ loadingMessages: true, error: null });
    try {
      const response = await axios.get(
        `http://localhost:5000/api/message/${id}`
      );
      set({
        messages: response.data,
        loadingMessages: false,
        error: null,
      });
    } catch (error) {
      set({
        loadingMessages: false,
        error: error.response?.data?.message || "Error fetching messages",
      });
    }
  },
}));
