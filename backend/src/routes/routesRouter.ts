import { Router } from "express";
import { postRoute } from "../controllers/RouteController";

export const router = Router();

router.post('/', postRoute);