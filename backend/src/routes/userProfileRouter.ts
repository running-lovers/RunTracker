import { Router } from "express";
import { getUserProfile, postUserProfile } from "../controllers/userProfileController";

export const router = Router();

router.get('/:userId', getUserProfile)
router.post('/', postUserProfile)