"use client";

import { Button, TextInput } from "flowbite-react";
import React, { useState } from "react";

function page() {
  const [formdata, setFormdata] = useState(null);
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  console.log(formdata);
  return (
    <div className="w-[100vw] h-[100vh] bg-yellow-100  flex items-center justify-center">
      <div className=" inline-flex ">
        <form
          className="p-5 gap-4 flex flex-col text-center  pt-10 bg-white rounded-lg border shadow-lg pb-10 min-w-[30vw] max-w-[90vw] w-[90vw] lg:w-[30vw]
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
          <Button type="submit">submit</Button>
        </form>
      </div>
    </div>
  );
}

export default page;
