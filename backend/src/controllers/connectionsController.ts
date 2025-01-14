import { NextFunction, Request, RequestHandler, Response } from "express";
import prisma from "../../lib/prisma";


// follow user
export const followUser = async (req: Request, res: Response) => {
    console.log('Follow request received:', {
        body: req.body,
        headers: req.headers,
        method: req.method
    });

    const { userId, followingUserId } = req.body;

    if (!userId || !followingUserId) {
        console.log('Missing required fields:', { userId, followingUserId });
        res.status(400).json({ error: 'Both userId and followingUserId are required' });
        return;
    }

    try {
        const existingConnection = await prisma.connection.findFirst({
            where: {
                user_id: parseInt(userId),
                following_user_id: parseInt(followingUserId),
                deleted_at: null,
            }
        });

        if (existingConnection) {
            console.log('Already following:', existingConnection);
            res.status(400).json({ error: 'Already following this user' });
            return;
        }

        const newConnection = await prisma.connection.create({
            data: {
                user_id: parseInt(userId),
                following_user_id: parseInt(followingUserId)
            }
        });

        console.log('New connection created:', newConnection);
        res.status(200).json(newConnection);
    } catch (error) {
        console.error('Follow error:', error);
        res.status(500).json({ error: 'fail to follow user' });
    }
};

// unfollow user
export const unfollowUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const followingUserId = req.params.followingUserId;

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

        if (!connection) {
            res.status(404).json({ error: 'Connection not found' });
            return;
        }

        await prisma.connection.update({
            where: { id: connection.id },
            data: { deleted_at: new Date() }
        });

        res.status(200).json({ message: 'Successfully unfollowed user' });
    } catch (error) {
        res.status(500).json({ error: 'fail to unfollow user' })
    }
}

//get followers of user
export const getFollowers = async (req: Request, res: Response) => {
    const { userId } = req.params;

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
        res.status(500).json({ error: 'fail to get followers' })
    }
}

//get following users
export const getFollowingUsers = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;

    try {
        const parsedUserId = parseInt(userId);
        if (isNaN(parsedUserId)) {
            res.status(400).json({
                error: 'Invalid user ID format'
            });
            return;
        }

        const connections = await prisma.connection.findMany({
            where: {
                user_id: parsedUserId,
                deleted_at: null
            },
            select: {
                following_user: {
                    select: {
                        id: true,
                        name: true,
                        strava_id: true
                    }
                }
            }
        });

        const followingUsers = connections.map(conn => conn.following_user);

        res.json(followingUsers);
        return;
    } catch (error) {
        console.error('Error fetching following users:', error);
        res.status(500).json({
            error: 'Failed to fetch following users'
        });
        return;
    }
}

    export const getFollowingAndFollowers = async(req: Request, res: Response): Promise<void> => {
        const {userId} = req.params;
    
        try {
            const allUsers = await prisma.user.findMany({
                where: {
                    NOT: {
                        id: parseInt(userId)
                    }
                },
                select: {
                    id: true,
                    name: true,
                    strava_id: true,
                    userProfile: {
                        select: {
                            profile_medium: true,
                            profile: true
                        }
                    }
                }
            });
    
            const connections = await prisma.connection.findMany({
                where: {
                    OR: [
                        { user_id: parseInt(userId) },
                        { following_user_id: parseInt(userId) }
                    ],
                    deleted_at: null
                }
            });
    
            const formattedUsers = allUsers.map(user => {
                const isFollowing = connections.some(conn => 
                    conn.user_id === parseInt(userId) && 
                    conn.following_user_id === user.id &&
                    conn.deleted_at === null
                );
    
                const isFollower = connections.some(conn => 
                    conn.following_user_id === parseInt(userId) && 
                    conn.user_id === user.id &&
                    conn.deleted_at === null
                );
    
                return {
                    ...user,
                    isFollowing,
                    isFollower,
                    userProfile: user.userProfile
                };
            });
    
            console.log('Sending formatted users:', formattedUsers);
            res.json(formattedUsers);
        } catch (error) {
            console.error('Error fetching connections:', error);
            res.status(500).json({
                error: 'Failed to fetch connections'
            });
        }
    };

    export const getFriendDetail: RequestHandler = async (req, res): Promise<void> => {
        const { userId } = req.params;
    
        try {
            console.log('Received request for userId:', userId);
    
            if (!userId || isNaN(parseInt(userId))) {
                res.status(400).json({ error: 'Invalid user ID' });
                return;
            }
    
            const user = await prisma.user.findUnique({
                where: {
                    id: parseInt(userId)
                },
                select: {
                    id: true,
                    name: true,
                    strava_id: true,
                    userProfile: {
                        select: {
                            profile_medium: true,
                            profile: true
                        }
                    }
                }
            });
    
            console.log('Found user:', user);
    
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
    
            const followersCount = await prisma.connection.count({
                where: {
                    following_user_id: parseInt(userId),
                    deleted_at: null
                }
            });
    
            const followingCount = await prisma.connection.count({
                where: {
                    user_id: parseInt(userId),
                    deleted_at: null
                }
            });
    
            let avatarUrl = user.userProfile?.profile_medium;
            if (avatarUrl && !avatarUrl.startsWith('http')) {
                avatarUrl = `https://dgalywyr863hv.cloudfront.net/${avatarUrl}`;
            }
    
            const profileData = {
                ...user,
                followersCount,
                followingCount,
                avatarUrl: avatarUrl || null
            };
    
            console.log('Sending profile data:', profileData);
            res.json(profileData);
        } catch (error) {
            console.error('Error details:', error);
            res.status(500).json({ 
                error: 'Failed to fetch friend detail',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };