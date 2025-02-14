"use client";

import { Alert, Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
function page() {
  const router = useRouter();
  const [formdata, setFormdata] = useState(null);
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
      const res = await axios.post("/api/signup", formdata);
      router.push("/signin");
      setMessage(res.data.user);
    } catch (error) {
      setError(error);
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
          <h3 className="font-semibold text-2xl ">Signup Form</h3>

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
          <TextInput
            placeholder="Enter your username"
            type="text"
            id="username"
            onChange={handleChange}
          />
          <Button type="submit" gradientDuoTone="redToYellow">
            submit
          </Button>
          <span className="flex ">
            <p>Have an account?</p>
            <Link href="/signin" className="text-blue-400">
              Signin
            </Link>
          </span>
        </form>
        {message && <Alert color="green">{message}</Alert>}
      </div>
    </div>
  );
}

export default page;
