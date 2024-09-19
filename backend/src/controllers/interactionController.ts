import { Request, Response } from "express";
import connection from "../db/db";
import { followSchema } from "../utils/validations";

export const likePost = async (req: Request, res: Response) => {
  const { postId } = req.body;
  const userId = (req as any).user.userId;

  try {
    await connection.query(
      "INSERT INTO likes (user_id, post_id) VALUES (?, ?)",
      [userId, postId]
    );
    res.status(200).json({ message: "Post liked successfully" });
  } catch (error:any) {
    res
      .status(400)
      .json({ message: "Error liking post", error: error.message });
  }
};

export const followUser = async (req: Request, res: Response) => {
  const { followedId } = req.body;
  const followerId = (req as any).user.userId;

  try {
    followSchema.parse({ followedId });
    await connection.query(
      "INSERT INTO follows (follower_id, followed_id) VALUES (?, ?)",
      [followerId, followedId]
    );
    res.status(200).json({ message: "User followed successfully" });
  } catch (error:any) {
    res
      .status(400)
      .json({ message: "Error following user", error: error.message });
  }
};
