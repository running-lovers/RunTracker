import { Request, Response } from "express";
import prisma from "../../lib/prisma";

//Get all activities
export const getActivities = async (req: Request, res: Response) => {
    try {
        const activities = await prisma.activity.findMany({
            where: {activity_type: "Run"}
        });
        res.json(activities);
    }catch (error) {
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
};


//Get activity by userId
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

//save new activities from strava
export const saveNewActivity = async(req: Request, res: Response) => {
    const {userId, activities}= req.body as {userId: number , activities: any[], access_token: string}
    if(!userId || !activities) {
        throw new Error('userId and activities are required')
    }    
    
    try {
        const existingActivities = await prisma.activity.findMany({
            where: {
                strava_activity_id: {
                    in: activities.map((activity) => String(activity.id))
                }
            }
        })

        const existingActivityIds = new Set(existingActivities.map((activity) => activity.strava_activity_id))        
        
        const newActivities = activities.filter((activity) => !existingActivityIds.has(String(activity.id)))

        const savedActivities = await prisma.activity.createMany({
            data: newActivities.map((activity) => ({
                activity_type: activity.sport_type,
                user_id: userId,
                name: activity.name,
                distance: activity.distance,
                duration: activity.elapsed_time,
                average_speed: activity.average_speed,
                start_time: activity.start_date_local,
                strava_activity_id: String(activity.id),
                route_data: activity.map,
            }))
        })

        res.json({ savedActivities, message: "Activities saved to database successfully" } )
        
    } catch (error) {
        console.log('saveActivityError:', error);
        
        res.status(500).json({ error:'Failed to create activities' });
    }
}

//Create a new activity
export const createActivity = async(req: Request, res: Response) => {
    const {        
        userId,
        name,
        sport_type,
        start_date,
        distance,
        elapsed_time,
        description
    } = req.body;

    try {
        const data: any = {
            user_id: Number(userId),
            name,
            activity_type: sport_type,
            distance,
            duration: elapsed_time,
            start_time: new Date(start_date),
            description: description || null
        };

        const newActivity = await prisma.activity.create({
            data,
        });

        res.json(newActivity)
    } catch (error) {
        console.error("Error creating activity:", error);
        res.status(500).json({error: 'fail to create new activity'})
    }
}


//update an activity
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


//delete an activity
export const deleteActivity = async(req: Request, res: Response) => {
    const {activityId} = req.params;

    try {
        await prisma.activity.delete({
            where: {id: Number(activityId)}
        });
        res.json({ message: 'Activity deleted successfully' });
    } catch (error) {
        res.status(500).json({error: 'fail to delete activity'})
    }
}