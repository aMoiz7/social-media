"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getToken, removeToken } from "../utils/auth";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const checkAuthentication = () => {
    const token = getToken();
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    checkAuthentication();

    const handleAuthChange = () => {
      checkAuthentication();
    };

    // Listen for the custom authChange event
    window.addEventListener("authChange", handleAuthChange);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    removeToken(); // Will trigger the custom event to update state
    router.push("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 p-4 mb-6 flex justify-between">
      <Link
        href="/"
        className="text-gray-800 hover:text-blue-600 font-semibold"
      >
        Home
      </Link>
      <div>
        {!isAuthenticated ? (
          <>
            <Link
              href="/login"
              className="text-gray-800 hover:text-blue-600 font-semibold mr-4"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-gray-800 hover:text-blue-600 font-semibold"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
