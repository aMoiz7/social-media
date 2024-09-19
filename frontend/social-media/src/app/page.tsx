"use client"
import React, { useEffect } from "react";
import Postlist from "../components/postsList";
import { getToken } from "@/utils/auth";
import { useRouter } from "next/navigation"; // Use Next.js router

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if token exists
    const token = getToken();
    if (!token) {
      // Redirect to login page if no token
      router.push("/login");
    }
  }, [router]);

  return (
    <div>
      {getToken() && <Postlist />}
    </div>
  );
};

export default Page;
