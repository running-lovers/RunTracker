import { Request, Response } from "express";
import prisma from "../../lib/prisma";

export const postRoute = async(req: Request, res: Response) => {
    const {userId, activities} = req.body as {userId: number, activities: any[]}

    try {
        const uniqueActivities = activities.filter((activity, index, self) => activity.map.id && index === self.findIndex((a) => a.map?.id === activity.map?.id))
        const existingRoutes = await prisma.route.findMany({
            where: {
                user_id: userId,
                route_data: {
                    path: ['id'],
                    not: {equels: null}
                },
            },
            select: {
                route_data: true,
            },
        });
        
        const existingRouteIds = new Set(existingRoutes.map(route => (route.route_data as any).id));
        const newActivities = uniqueActivities.filter(activity => !existingRouteIds.has(activity.map.id));

        const routeData = newActivities.map((activity) => ({
            user_id: userId,
            distance: activity.distance,
            route_data: activity.map
        }))

        const newRoute = await prisma.route.createMany({
            data: routeData
            })

        res.json(newRoute);
    } catch (error) {
        res.status(500).json({error: 'fail to save new route in database'});
        console.log('error:', error);
        
    }
}

export const getRoutesDataByUserId = async(req: Request, res: Response) => {
    const {userId} = req.params;

    try {
        const routeData = await prisma.route.findMany({
            where: {user_id: Number(userId)}
        })

        res.json(routeData);
    } catch (error) {
        res.status(500).json({error: "fail to get routes data from db"})
    }
}