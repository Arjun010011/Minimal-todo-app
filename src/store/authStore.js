import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      notes: [],

      setUser: (userData) => set({ user: userData }),
      logout: () => set({ user: null, notes: [] }),

      fetchNotes: async () => {
        const { user } = get();
        if (!user) return;

        try {
          const response = await axios.post("/api/note/get", {
            userId: user._id,
          });
          set({ notes: response.data });
        } catch (error) {
          console.error("Failed to fetch notes", error);
        }
      },

      addNote: async (content) => {
        const { user } = get();
        if (!user) return;

        try {
          const response = await axios.post("/api/note/add", {
            userId: user._id,
            content,
          });
          set((state) => ({ notes: [response.data, ...state.notes] }));
        } catch (error) {
          console.error("Failed to add note", error);
        }
      },
    }),
    { name: "user-storage" }
  )
);

export default useAuthStore;
