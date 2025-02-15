"use client";

import { Alert, Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
function page() {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const [formdata, setFormdata] = useState({});
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  console.log(formdata);
  console.log(message);
  console.log(error);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setMessage(null);
    try {
      const res = await axios.post("/api/signin", formdata);
      if (res.status !== 200) {
        setError(res.data.message);
      }
      setUser(res.data.user);
      router.push("/");
    } catch (error) {
      setError(error.res?.data?.message || error.message);
    }
  };
  return (
    <div className="w-[100vw] h-[100vh] bg-slate-700  flex items-center justify-center">
      <div className=" inline-flex  flex-col ">
        <form
          onSubmit={handleSubmit}
          className="p-5 mb-5 gap-4 flex flex-col text-center  pt-10 bg-yellow-100 rounded-lg border shadow-lg pb-10 min-w-[30vw] max-w-[90vw] w-[90vw] lg:w-[30vw]
        "
        >
          <h3 className="font-semibold text-2xl ">Signin Form</h3>

          <TextInput
            placeholder="Enter your email"
            type="email"
            id="email"
            onChange={handleChange}
          />
          <TextInput
            placeholder="Enter your password"
            type="password"
            id="password"
            onChange={handleChange}
          />

          <Button type="submit" gradientDuoTone="redToYellow">
            submit
          </Button>
          <span className="flex">
            <p>Don't have an account ?</p>
            <Link href="/signup" className="text-blue-400">
              SignUp
            </Link>
          </span>
        </form>
        {message && <Alert color="green">{message.message}</Alert>}
        {error && <Alert color="failure">{error}</Alert>}
      </div>
    </div>
  );
}

export default page;
