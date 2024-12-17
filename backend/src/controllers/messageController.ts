import { Request, Response } from "express";
import prisma from "../../lib/prisma";

export const postMessage = async(req: Request, res: Response) => {
    const {content, senderId, chatroomId} = req.body;

    try {
        const newMessage = await prisma.message.create({
            data: {
                content: content, 
                senderId: parseInt(senderId), 
                chatRoomId: parseInt(chatroomId)
            },
            include: {sender: true}
        });

        res.json(newMessage)
    } catch (error) {
        res.status(500).json({error: 'fail to create new message'})
    }
}

//get all message in specific chat message
export const getAllMessageByChatId = async (req: Request, res: Response) => {
    const { chatroomId } = req.params;
  
    try {
      const messages = await prisma.message.findMany({
        where: { chatRoomId: parseInt(chatroomId) },
        include: {
          sender: {
            select: { name: true },
          },
        },
        orderBy: { createdAt: "asc" },
      });
  
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "fail to fetch messages" });
    }
  };

export const updateMessage = async(req: Request, res: Response) => {
    const {messageId} = req.params;
    const {content} = req.body;

    try {
        const updatedMessage = await prisma.message.update({
            where: {id: parseInt(messageId)},
            data: {
                content: content
            }
        })

        res.json(updatedMessage)
    } catch (error) {
        res.status(500).json({error: 'fail to update message'})
    }
}

export const deleteMessage = async(req: Request, res: Response) => {
    const {messageId} = req.params;

    try {
        const deletedMessage = await prisma.message.delete({
            where: {id: parseInt(messageId)},
        });

        res.json(deletedMessage);
    } catch (error) {
        res.status(500).json({error: 'fail to delete data'})
    }
}