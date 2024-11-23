import { Request, Response } from "express";
import prisma from "../../lib/prisma";

export const postChatroom = async(req: Request, res: Response) => {
    const {userId, name} = req.body;

    try {
        const newChatroom = await prisma.chatRoom.create({
            data: {
                name: name,
                users: {
                    create: {userId: userId}
                }
            },
            include: {users: true}
        })

        res.json(newChatroom);
    } catch (error) {
        res.status(500).json({error: 'fail to create new chatroom'})
    }
}

// Get all chat rooms By userId
export const getChatroomsByUserId = async(req: Request, res: Response) => {
    const {userId} = req.params

    try {
        const chatrooms = await prisma.chatRoom.findMany({
            where: {users: {some: {userId: Number(userId)}}},
            include: {users: true}
        });

        res.json(chatrooms)
    } catch (error) {
        res.status(500).json({error: 'fail to fetch chatrooms'})
    }
}

//Get specific chatroom 
export const getChatroomByChatroomId = async(req: Request, res: Response) => {
    const {chatroomId} = req.params;

    try {
        const chatroom = await prisma.chatRoom.findUnique({
            where: {id: parseInt(chatroomId)},
            include: {users: {include: {user: true}}, messages: {include: {sender: true}, orderBy: {createdAt: 'asc'}}}
        });

        res.json(chatroom);
    } catch (error) {
        res.status(500).json({error: 'fail to fetch chatroom'})
    }
}

//update chatroom name
export const updateChatroom = async(req: Request, res: Response) => {
    const {chatroomId} = req.params;
    const {name} = req.body;

    try {
        const updatedChatroom = await prisma.chatRoom.update({
            where: {id: parseInt(chatroomId)},
            data: {name: name}
        });

        res.json(updatedChatroom)
    } catch (error) {
        res.status(500).json({error: 'fail to update chatroom'})
    }
}

export const deleteChatroom = async(req: Request, res: Response) => {
    const {chatroomId} = req.params;

    try {
        const deletedChatroom = await prisma.chatRoom.delete({
            where: {id: parseInt(chatroomId)}
        })

        res.json(deletedChatroom)
    } catch (error) {
        res.status(500).json({error: 'fail to delete chatroom'})
    }
}