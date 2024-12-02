import { Router } from "express";
import { followUser, getFollowers, getFollowingAndFollowers, getFollowingUsers, unfollowUser } from "../controllers/connectionsController";

export const router = Router();

router.post("/follow", followUser);
router.delete("/unfollow/:userId/:followingUserId", unfollowUser);
router.get("/:userId/followers", getFollowers);
router.get("/:userId/following", getFollowingUsers);
router.get("/:userId/all", getFollowingAndFollowers);