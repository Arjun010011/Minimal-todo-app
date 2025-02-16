import connectDb from "@/lib/mongodb";
import Notes from "@/model/Note";

export const POST = async (req) => {
  try {
    await connectDb();
    const body = await req.json(); // Correct way to read request body in Next.js App Router

    if (!body.userId) {
      return new Response(JSON.stringify({ message: "User ID is required" }), {
        status: 400,
      });
    }

    const notes = await Notes.find({ userId: body.userId }).sort({
      createdAt: -1,
    });

    return new Response(JSON.stringify(notes), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error", error }), {
      status: 500,
    });
  }
};
