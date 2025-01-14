import { Router } from "express";
import { getFavoriteRouteByUserId, getRoutesDataByUserId, postRoute, putRouteData } from "../controllers/RouteController";

export const router = Router();

router.post('/', postRoute);
router.get('/:userId', getRoutesDataByUserId);
router.put('/:routeId', putRouteData);
router.get('/favorite/:userId', getFavoriteRouteByUserId);