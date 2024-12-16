import { Router } from "express";
import {router as activitiesRouter} from "./activitiesRouter"
import {router as stravaRouter} from "./stravaAuthRouter"
import {router as goalsRouter} from "./goalsRouter"
import {router as chatroomRouter} from "./chatroomRouter"
import {router as messageRouter} from "./messageRouter"
import {router as chatroomUserRouter} from "./chatroomUserRouter"
import {router as connectionsRouter} from "./connectionsRouter"
import {router as userProfileRouter} from "./userProfileRouter"
import {router as dashboardRouter} from "./dashboardRouter"
import {router as routesRouter} from "./routesRouter"

export const router = Router();

// http://localhost:8080/api/
router.use('/activities', activitiesRouter)
router.use('/strava', stravaRouter)
router.use('/goals', goalsRouter)
router.use('/chatrooms', chatroomRouter)
router.use('/messages', messageRouter)
router.use('/chatroomUser', chatroomUserRouter)
router.use('/connections', connectionsRouter)
router.use('/userProfile', userProfileRouter)
router.use('/dashboard', dashboardRouter)
router.use('routes', routesRouter)