"use client";

import { Alert, Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

function SignupPage() {
  const router = useRouter();
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormdata((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      const res = await axios.post("/api/signup", formdata);
      setMessage(res.data.message || "Signup successful!");
      router.push("/signin");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-slate-700 flex items-center justify-center">
      <div className="inline-flex flex-col">
        <form
          onSubmit={handleSubmit}
          className="p-5 mb-5 gap-4 flex flex-col text-center pt-10 bg-yellow-100 rounded-lg border shadow-lg pb-10 min-w-[30vw] max-w-[90vw] w-[90vw] lg:w-[30vw]"
        >
          <h3 className="font-semibold text-2xl">Signup Form</h3>

          <TextInput
            placeholder="Enter your email"
            type="email"
            id="email"
            value={formdata.email}
            onChange={handleChange}
          />
          <TextInput
            placeholder="Enter your password"
            type="password"
            id="password"
            value={formdata.password}
            onChange={handleChange}
          />
          <TextInput
            placeholder="Enter your username"
            type="text"
            id="username"
            value={formdata.username}
            onChange={handleChange}
          />

          <Button type="submit" gradientDuoTone="redToYellow">
            Submit
          </Button>

          <span className="flex">
            <p>Have an account?</p>
            <Link href="/signin" className="text-blue-400">
              Sign in
            </Link>
          </span>
        </form>

        {message && <Alert color="green">{message}</Alert>}

        {error && (
          <Alert color="failure">
            {error?.response?.data?.message || "User already exists"}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default SignupPage;
