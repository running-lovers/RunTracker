import { Router } from "express";
import { getRoutesDataByUserId, postRoute } from "../controllers/RouteController";

export const router = Router();

router.post('/', postRoute);
router.get('/:userId', getRoutesDataByUserId);