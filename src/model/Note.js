import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // Validate against Zustand user ID
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Notes = mongoose.models.Notes || mongoose.model("Notes", NotesSchema);
export default Notes;
