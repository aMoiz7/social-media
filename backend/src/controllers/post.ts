import { Request, Response } from "express";
import connection from "../db/db";
import { postSchema } from "../utils/validations";

export const createPost = async (req: Request, res: Response) => {
  const { content } = req.body;
  const userId = (req as any).user.userId;

  try {
    postSchema.parse({ content });
    const [result] = await connection.query(
      "INSERT INTO posts (user_id, content) VALUES (?, ?)",
      [userId, content]
      );
      
      //@ts-ignore
      
     res.status(201).json({ message: "Post created successfully", postId: result.insertId });
  }  catch (error:any) {
     res
      .status(400)
      .json({ message: "Error creating post", error: error.message });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const [posts] = await connection.query(
      "SELECT * FROM posts ORDER BY created_at DESC"
    );
    res.json(posts);
  } catch (error:any) {
    res
      .status(500)
      .json({ message: "Error retrieving posts", error: error.message });
  }
};
