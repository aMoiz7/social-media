import Router from "express";
import { likePost, followUser } from "../controllers/interactionController";
import authMiddleware from "../middlewares/auth";
const router = Router();

router.route("/like").post(authMiddleware, likePost);
router.route("/follow").get(authMiddleware, followUser);

export default router;
