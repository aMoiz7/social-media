// frontend/schemas/postSchema.ts
import { z } from "zod";

export const postSchema = z.object({
  content: z
    .string()
    .min(1, "Post content cannot be empty")
    .max(500, "Post content cannot exceed 500 characters"),
});
