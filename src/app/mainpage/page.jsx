"use client"; // Required for Next.js App Router

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

const Dashboard = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user, router]);

  if (!user) {
    return null; // Prevent rendering before redirect
  }

  return (
    <div>Welcome, {user?.username || "User"}! This is your Dashboard.</div>
  );
};

export default Dashboard;
