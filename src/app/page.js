"use client";
import LogOut from "./components/LogOut";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Button } from "flowbite-react";

const MainPage = () => {
  const router = useRouter();
  const { user, notes, fetchNotes, addNote, deleteNote, updateNote } =
    useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);
  const [noteInput, setNoteInput] = useState("");
  const [isEditing, setIsEditing] = useState(null); // Track which note is being edited
  const [editedContent, setEditedContent] = useState(""); // Track the content of the note being edited

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && !user) {
      router.push("/signin");
    }
  }, [user, isHydrated, router]);

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

  const handleEditNote = (note) => {
    setIsEditing(note._id); // Start editing the note
    setEditedContent(note.content); // Set the content of the note being edited
  };

  const handleSaveEdit = async () => {
    if (editedContent.trim() === "") {
      // If content is empty, delete the note
      await deleteNote(isEditing);
    } else {
      // Otherwise, update the note
      await updateNote(isEditing, editedContent);
    }
    setIsEditing(null); // Exit edit mode
    setEditedContent(""); // Clear the edited content
  };

  const handleCancelEdit = () => {
    setIsEditing(null); // Exit edit mode
    setEditedContent(""); // Clear the edited content
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
        <div className="flex gap-2 flex-col sm:flex-row">
          <input
            type="text"
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            placeholder="Enter your note..."
            className="flex-1 p-2 border rounded-md"
          />
          <div className="flex gap-2 pt-3">
            <button
              onClick={handleAddNote}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Add
            </button>
            <LogOut />
          </div>
        </div>

        {/* Notes List */}
        <div className="mt-4">
          {notes.length > 0 ? (
            <ul className="space-y-2">
              {notes.map((note) => (
                <li
                  key={note._id}
                  className="p-2 bg-gray-200 rounded-md flex justify-between items-center group relative"
                >
                  {isEditing === note._id ? (
                    // If the note is being edited, show an input box
                    <div className="flex flex-1 gap-2">
                      <textarea
                        type="text"
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="flex-1 p-2 border rounded-md outline-none focus:outline-none focus:ring-none"
                        style={{
                          backgroundColor: "#e5e7eb",
                          border: "none",
                          outline: "none",
                        }}
                      />
                      <button
                        onClick={handleSaveEdit}
                        className=" px-4 py-2 bg-blue-500 text-white rounded-md"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 mr-2 bg-gray-500 text-white rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    // Otherwise, show the note content
                    <div className="flex items-center gap-2">
                      <span className="flex-1">{note.content}</span>
                      <Button
                        className="hidden group-hover:block bg-green-500 text-white hover:bg-gray-500"
                        onClick={() => handleEditNote(note)}
                      >
                        <FaEdit />
                      </Button>
                    </div>
                  )}

                  <div className="flex ">
                    <Button
                      className="hidden group-hover:block bg-red-500 text-white hover:bg-gray-500"
                      onClick={() => deleteNote(note._id)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">
              No notes yet. Start adding some!!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
