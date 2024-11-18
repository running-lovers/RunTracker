import { Router } from "express";
import { getAuthURL, postToken } from "../controllers/stravaAuthController";

export const router = Router();

router.get('/auth', getAuthURL)
router.post('/token', postToken)