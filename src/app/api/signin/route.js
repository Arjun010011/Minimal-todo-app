import User from "@/model/User";
import connectDb from "@/lib/mongodb";
import bcryptjs from "bcryptjs";
export async function POST(req) {
  await connectDb();
  const { email, password } = await req.json();
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "user not found" }), {
        status: 404,
      });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: "wrong credentials" }), {
        status: 401,
      });
    }
    return new Response(
      JSON.stringify({ message: "user logged in successfully!!", user }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "unable to get the data", errorData: error }),
      { status: 500 }
    );
  }
}
