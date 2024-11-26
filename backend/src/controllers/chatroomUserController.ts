import { Request, Response } from "express";
import prisma from "../../lib/prisma";

export const inviteUser = async(req: Request, res: Response) => {
    const {userId, chatroomId} = req.body;
    
    try {
        const newChatroomUser = await prisma.chatRoomUser.create({
            data: {userId: parseInt(userId), chatRoomId: parseInt(chatroomId)},
        });

        res.json(newChatroomUser);
    } catch (error) {
        res.status(500).json({error: 'fail to create new chatroomUser'})
    }
}

//get all chatrooms a specific user in by userId
export const getChatroomsByUserId = async(req: Request, res: Response) => {
    const {userId} = req.params;

    try {
        const chatrooms = await prisma.chatRoomUser.findMany({
            where: {userId: parseInt(userId)},
            include: {chatRoom: true}
        })

        res.json(chatrooms)
    } catch (error) {
        res.status(500).json({error: 'fail to get chatrooms'})
    }
}

//get all users in specific chatroom by chatroomId
export const getUsersByChatroomId = async(req:Request, res: Response) => {
    const {chatroomId} = req.params;

    try {
        const users = await prisma.chatRoomUser.findMany({
            where: {chatRoomId: parseInt(chatroomId)},
            include: {user: true,}
        });
        
        res.json(users);
    } catch (error) {
        res.status(500).json({error: 'fail to get users'})
    }
}

//delete a specific user from specific chatroom
export const deleteUserFromChatroom = async (req: Request, res: Response) => {
    const {chatroomId, userId} = req.params;

    try {
        const deletedUser = await prisma.chatRoomUser.delete({
            where: {userId_chatRoomId: {userId: parseInt(userId), chatRoomId: parseInt(chatroomId)}},
        })

        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({error: 'fail to delete a user from chatroom'})
    }
}