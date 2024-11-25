import { Router } from "express";
import { deleteMessage, getAllMessageByChatId, postMessage, updateMessage } from "../controllers/messageController";

export const router = Router();

router.post('/', postMessage);
router.get('/:chatroomId', getAllMessageByChatId);
router.put('/:messageId', updateMessage);
router.delete('/:messageId',deleteMessage);
