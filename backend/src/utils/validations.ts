import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(1, "Username is required").max(255),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const postSchema = z.object({
  content: z.string().min(1, "Content is required"),
});

export const followSchema = z.object({
  followedId: z.number().int().positive("Followed user ID is required"),
});
