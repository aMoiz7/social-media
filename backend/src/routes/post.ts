import Router from "express";
import { createPost, getPosts } from "../controllers/post";
import authMiddleware from "../middlewares/auth";
const router = Router();

router.route("/create").post(authMiddleware, createPost);
router.route("/all").get(authMiddleware,getPosts);

export default router;
