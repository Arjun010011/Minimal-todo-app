"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

const MainPage = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true); // Mark Zustand as hydrated after first render
  }, []);

  useEffect(() => {
    if (isHydrated && !user) {
      router.push("/signin"); // Redirect if Zustand has loaded and user is missing
    }
  }, [user, isHydrated, router]);

  if (!isHydrated) {
    return <div>Loading...</div>; // Prevent flickering before Zustand loads
  }

  return <div>Welcome, {user?.username || "User"}! This is your MainPage.</div>;
};

export default MainPage;
