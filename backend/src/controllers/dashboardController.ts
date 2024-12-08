import { Request, Response } from "express";
import prisma from "../../lib/prisma";

export const getRecentActivities = async(req: Request, res: Response) => {
    const userId = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: {id: Number(userId)},
            include: {
                following: {
                    select: {
                        following_user_id: true
                    }
                }
            }
        });

        if(!user) {
            res.status(404).json({error: 'User is not found'})
            return;
        }

        //get the IDs of user and followingUser
        const userIds: number[] = [Number(userId), ...user!.following.map(f => f.following_user_id)]

        const activities = await prisma.activity.findMany({
            where: {
                user_id: {in: userIds}
            },
            include: {
                user: {
                    include: {
                        userProfile: {
                            select: {
                                firstname: true,
                                lastname: true,
                                profile: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                start_time: 'desc'
            },
            take: 20
        });

        res.json(activities)
    } catch (error) {
        res.status(500).json({error: 'fail to get activities for dashboard from DB'})
    }
}