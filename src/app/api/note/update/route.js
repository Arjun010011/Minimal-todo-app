import connectDb from "@/lib/mongodb";
import Notes from "@/model/Note";

export const PUT = async (req) => {
  try {
    await connectDb();
    const body = await req.json();
    const { noteId, content } = body;

    if (!noteId || !content) {
      return new Response(
        JSON.stringify({ message: "Note ID and content are required" }),
        { status: 400 }
      );
    }

    const updatedNote = await Notes.findByIdAndUpdate(
      noteId,
      { content },
      { new: true }
    );

    if (!updatedNote) {
      return new Response(JSON.stringify({ message: "Note not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedNote), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error", error }), {
      status: 500,
    });
  }
};
