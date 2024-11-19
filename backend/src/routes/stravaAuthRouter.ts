import { Request, Response, Router } from "express";
import { checkAuth, getAuthURL, logoutUser, postToken } from "../controllers/stravaAuthController";

export const router = Router();

router.get('/auth', getAuthURL)
router.put('/logout', logoutUser)
router.post('/token', postToken)
router.get('/auth/check', checkAuth)