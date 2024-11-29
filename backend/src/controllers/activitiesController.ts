import { Request, Response } from "express";
import prisma from "../../lib/prisma";

export const getActivities = async (req: Request, res: Response) => {
    const activities = await prisma.activity.findMany();
    res.json(activities);
}

export const getActivitiesByUserId = async(req: Request, res: Response) => {
    const {userId} = req.params;

    try {
        const activities = await prisma.activity.findMany({
            where: {user_id: Number(userId)},
            include: {route: true},
        });

        res.json(activities)
    } catch (error) {
        res.status(500).json({error: 'fail to get user activity data'})
    }
}

export const postActivity = async(req: Request, res: Response) => {
    const {userId, activityType, distance, duration, description, time} = req.body;

    try {
        const newActivity = await prisma.activity.create({
            data: {
                activity_type: activityType,
                user_id: Number(userId),
                distance: distance,
                duration: duration,
                start_time: time,
                description: description
            }
        })
        
        res.json(newActivity)
    } catch (error) {
        res.status(500).json({error: 'fail to create new activity'})
    }
}

export const updateActivity = async(req: Request, res: Response) => {
    const {activityId} = req.params;
    const {activityType, distance, duration, description, time} = req.body;

    try {
        const updatedActivity = await prisma.activity.update({
            where: {id: Number(activityId)},
            data: {
                activity_type: activityType,
                distance: distance,
                duration: duration,
                start_time: time,
                description: description
            }
        })

        res.json(updatedActivity)
    } catch (error) {
        res.status(500).json({error: 'fail to update activity'})
    }
}

export const deleteActivity = async(req: Request, res: Response) => {
    const {activityId} = req.params;

    try {
        const deletedActivity = await prisma.activity.delete({
            where: {id: Number(activityId)}
        })
    } catch (error) {
        res.status(500).json({error: 'fail to delete activity'})
    }
}