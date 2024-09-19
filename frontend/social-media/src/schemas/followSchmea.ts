// frontend/schemas/followSchema.ts
import { z } from "zod";

export const followSchema = z.object({
  followedId: z.number().min(1, "Followed user ID is required"), // Ensure the number is greater than 0
});
