import connectDb from "@/lib/mongodb";
import Notes from "@/model/Note";
import { ObjectId } from "mongodb";
export const DELETE = async (req) => {
  try {
    await connectDb();
    const body = await req.json();
    const { noteId } = body;
    if (!noteId) {
      return new Response(
        JSON.stringify({ message: "did'nt get the note id" }),
        {
          status: 400,
        }
      );
    }
    const note = await Notes.findOneAndDelete({ _id: new ObjectId(noteId) });
    if (note) {
      return new Response(JSON.stringify({ message: "deleted succefully" }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: "note not found " }), {
        status: 404,
      });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error || "something went wrong" }),
      {
        status: error.status || 500,
      }
    );
  }
};
