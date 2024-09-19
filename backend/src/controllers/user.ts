import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connection from "../db/db";
import { registerSchema, loginSchema } from "../utils/validations";

export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    
    console.log(username ,"username")

  try {
    registerSchema.parse({ username, email, password });
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await connection.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.status(201).json({
        message: "User registered successfully",
        //@ts-ignore
      userId: result.insertId,
    });
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Error registering user", error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    loginSchema.parse({ email, password });
    const [rows] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    //@ts-ignore
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error: any) {
    res.status(400).json({ message: "Error logging in", error: error.message });
  }
};
