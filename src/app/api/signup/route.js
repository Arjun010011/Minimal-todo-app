import User from "@/model/User";
import connectDb from "@/lib/mongodb";
import bcryptjs from "bcryptjs";

export async function POST(req) {
  await connectDb();
  const body = await req.json();
  const { email, password, username } = body;
  if (!email || !password || !username) {
    return new Response(
      JSON.stringify({ message: "email or password or both have'nt got " })
    );
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists!" }), {
        status: 400,
      });
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ email, password: hashedPassword, username });

    await newUser.save();

    return new Response(
      JSON.stringify({ message: "User created successfully!", user: newUser }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error", error }), {
      status: 500,
    });
  }
}
