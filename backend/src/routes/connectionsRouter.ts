import { Router } from "express";
import { followUser, getFollowers, getFollowingUsers, unfollowUser } from "../controllers/connectionsController";

export const router = Router();

router.post("/follow", followUser);
router.delete("/unfollow", unfollowUser);
router.get("/:userId/followers", getFollowers);
router.get("/:userId/following", getFollowingUsers);