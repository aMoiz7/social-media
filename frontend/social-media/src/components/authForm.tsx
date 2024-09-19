"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import api from "../utils/api";
import { setToken } from "../utils/auth";
import { registerSchema, loginSchema } from "../schemas/authSchmea";
import { useEffect } from "react";

interface AuthFormProps {
  type: "register" | "login";
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const router = typeof window !== "undefined" ? useRouter() : null; // Only use router in browser

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(type === "register" ? registerSchema : loginSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const endpoint = type === "register" ? "/user/register" : "/user/login";
      const response = await api(endpoint, "POST", data);

      if (type === "login") {
        setToken(response.token);
        router?.push("/"); // Check router availability before pushing
      } else {
        alert("Registration successful! Please login.");
        router?.push("/login");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-8 bg-white shadow-md rounded-md"
    >
      <h1 className="text-2xl font-bold mb-4 text-center">
        {type === "register" ? "Register" : "Login"}
      </h1>
      {type === "register" && (
        <>
          <input
            type="text"
            placeholder="Username"
            {...register("username")}
            className="w-full p-3 mb-4 border border-gray-300 rounded"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mb-4">
              {errors.username.message}
            </p>
          )}
        </>
      )}
      <input
        type="email"
        placeholder="Email"
        {...register("email")}
        className="w-full p-3 mb-4 border border-gray-300 rounded"
      />
      {errors.email && (
        <p className="text-red-500 text-sm mb-4">{errors.email.message}</p>
      )}

      <input
        type="password"
        placeholder="Password"
        {...register("password")}
        className="w-full p-3 mb-4 border border-gray-300 rounded"
      />
      {errors.password && (
        <p className="text-red-500 text-sm mb-4">{errors.password.message}</p>
      )}

      <button
        type="submit"
        className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {type === "register" ? "Register" : "Login"}
      </button>
    </form>
  );
};

export default AuthForm;
