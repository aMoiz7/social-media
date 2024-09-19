import Router from "express";
import { createPost, getPosts } from "../controllers/post";
import { likePost , followUser } from "../controllers/interactionController";
import authMiddleware from "../middlewares/auth";
const router = Router();

router.route("/create").post(authMiddleware, createPost);
router.route("/all").get(authMiddleware, getPosts);
router.route("/like/:postId").post(authMiddleware, likePost);
router.route("/follow/:followedId").post(authMiddleware, followUser);

export default router;
