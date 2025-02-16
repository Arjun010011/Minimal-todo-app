"use client";
import LogOut from "./components/LogOut";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
const MainPage = () => {
  const router = useRouter();
  const { user, notes, fetchNotes, addNote } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);
  const [noteInput, setNoteInput] = useState("");

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && !user) {
      router.push("/signin");
    }
  }, [user, isHydrated, router]);

  // Fetch notes when the page loads
  useEffect(() => {
    if (isHydrated && user) {
      fetchNotes();
    }
  }, [isHydrated, user, fetchNotes]);

  const handleAddNote = async () => {
    if (noteInput.trim() === "") return;
    await addNote(noteInput);
    setNoteInput("");
  };

  if (!isHydrated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">
          Welcome, {user?.username || "User"}!
        </h1>

        {/* Note Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            placeholder="Enter your note..."
            className="flex-1 p-2 border rounded-md"
          />
          <button
            onClick={handleAddNote}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add
          </button>
          <LogOut />
        </div>

        {/* Notes List */}
        <div className="mt-4">
          {notes.length > 0 ? (
            <ul className="space-y-2">
              {notes.map((note) => (
                <li key={note._id} className="p-2 bg-gray-200 rounded-md">
                  {note.content}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">
              No notes yet. Start adding some!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
