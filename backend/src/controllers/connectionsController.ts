    import { NextFunction, Request, Response } from "express";
    import prisma from "../../lib/prisma";


    // follow user
    export const followUser = async(req: Request, res: Response) => {
        const {userId, followingUserId} = req.body;

        if(!userId || !followingUserId) {
            res.status(400).json({error: 'Both userId and followingUserId are required'});
            return;
        }

        try {
            const existingConnection = await prisma.connection.findFirst({
                where: {
                    user_id: parseInt(userId),
                    following_user_id:parseInt(followingUserId),
                    deleted_at: null,
                }
            })

            if(existingConnection) {
                res.status(400).json({error: 'Already following this user'})
                return;
            }

            const newConnection = await prisma.connection.create({
                data: {
                    user_id: parseInt(userId),
                    following_user_id: parseInt(followingUserId)
                }
            })

            res.status(200).json(newConnection)
        } catch (error) {
            res.status(500).json({error: 'fail to follow user'})
        }
    }

    // unfollow user
    export const unfollowUser = async(req: Request, res: Response) => {
        const {userId, followingUserId} = req.body;

        if (!userId || !followingUserId) {
            res.status(400).json({ error: 'Both userId and followingUserId are required' });
            return;
        }

        try {
            const connection = await prisma.connection.findFirst({
                where: {
                    user_id: parseInt(userId),
                    following_user_id: parseInt(followingUserId),
                    deleted_at: null,
                }
            });

            if(!connection) {
                res.status(404).json({error: 'Connection not found'});
                return;
            }

            await prisma.connection.update({
                where: {id: connection.id},
                data: {deleted_at: new Date()}
            });

            res.status(200).json({message: 'Successfully unfollowed user'});
        } catch (error) {
            res.status(500).json({error: 'fail to unfollow user'})
        }
    }

    //get followers of user
    export const getFollowers = async(req: Request, res: Response) => {
        const {userId} = req.params;

        try {
            const followers = await prisma.connection.findMany({
                where: {
                    following_user_id: parseInt(userId),
                    deleted_at: null,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            strava_id: true,
                        }
                    }
                }
            });

            res.json(followers);
        } catch (error) {
            res.status(500).json({error: 'fail to get followers'})
        }
    }

    //get following users
    export const getFollowingUsers = async(req: Request, res: Response) => {
        const {userId} = req.params;

        try {
            const followingUsers = await prisma.connection.findMany({
                where: {user_id: parseInt(userId), deleted_at: null},
                include: {following_user: {
                    select: {
                        id: true,
                        name: true,
                        strava_id: true,
                    }
                }}
            });

            res.json(followingUsers)
        } catch (error) {
            res.status(500).json({error: 'fail to get following users'})
        }
    }