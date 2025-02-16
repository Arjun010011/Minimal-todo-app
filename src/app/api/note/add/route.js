import connectDb from "@/lib/mongodb";
import Notes from "@/model/Note";

export const POST = async (req) => {
  try {
    await connectDb();
    const body = await req.json(); // Correct way to read request body

    if (!body.userId || !body.content.trim()) {
      return new Response(
        JSON.stringify({ message: "User ID and content are required" }),
        { status: 400 }
      );
    }

    const newNote = await Notes.create({
      userId: body.userId,
      content: body.content,
    });

    return new Response(JSON.stringify(newNote), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error", error }), {
      status: 500,
    });
  }
};
