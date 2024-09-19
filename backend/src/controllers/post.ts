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

// Example backend controller modification for pagination
export const getPosts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  try {
    const [posts] = await connection.query(
      'SELECT posts.*, users.username, COUNT(likes.id) as likes_count FROM posts JOIN users ON posts.user_id = users.id LEFT JOIN likes ON posts.id = likes.post_id GROUP BY posts.id ORDER BY posts.created_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );

    const [countResult] = await connection.query('SELECT COUNT(*) as count FROM posts');
    //@ts-ignore
    const total = countResult[0].count;

    res.json({ posts, total });
  } catch (error:any) {
    res.status(500).json({ message: 'Error retrieving posts', error: error.message });
  }
};

