import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      notes: [],

      setUser: (userData) => set({ user: userData }),
      logout: () => {
        set({ user: null, notes: [] });
        localStorage.removeItem("user-storage"); // Clears persisted user data
      },

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

      deleteNote: async (noteId) => {
        const { user, notes } = get();
        if (!user) return;

        try {
          await axios.delete("/api/note/delete", {
            data: { noteId },
          });

          set((state) => ({
            notes: state.notes.filter((note) => note._id !== noteId),
          }));
        } catch (error) {
          console.error("Failed to delete note", error);
        }
      },

      updateNote: async (noteId, newContent) => {
        const { user, notes } = get();
        if (!user) return;

        try {
          const response = await axios.put("/api/note/update", {
            noteId,
            content: newContent,
          });

          set((state) => ({
            notes: state.notes.map((note) =>
              note._id === noteId ? response.data : note
            ),
          }));
        } catch (error) {
          console.error("Failed to update note", error);
        }
      },
    }),
    { name: "user-storage" }
  )
);

export default useAuthStore;
