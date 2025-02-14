"use client";

import React from "react";
import useAuthStore from "@/store/authStore";
function page() {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="text-pink-400 w-[100vw] h-[100vh] text-center bg-gray-700">
      Hellow welcome!!! {user?.username}
    </div>
  );
}

export default page;
