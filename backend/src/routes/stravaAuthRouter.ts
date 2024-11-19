import { Router } from "express";
import { getAuthURL, logoutUser, postToken } from "../controllers/stravaAuthController";

export const router = Router();

router.get('/auth', getAuthURL)
router.put('/logout', logoutUser)
router.post('/token', postToken)