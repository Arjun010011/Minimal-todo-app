"use client";

import React from "react";
import { Button } from "flowbite-react";
import useAuthStore from "@/store/authStore";
function LogOut() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div>
      <Button onClick={() => logout()} color="failure">
        logout
      </Button>
    </div>
  );
}

export default LogOut;
