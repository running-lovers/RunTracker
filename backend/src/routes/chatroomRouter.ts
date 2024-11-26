import { Router } from "express";
import { deleteChatroom, getChatroomByChatroomId, postChatroom, updateChatroom } from "../controllers/chatroomController";

export const router = Router();

router.post('/', postChatroom)
// router.get('/:userId', getChatroomsByUserId)
router.get('/:chatroomId', getChatroomByChatroomId)
router.put('/:chatroomId', updateChatroom)
router.delete('/:chatroomId', deleteChatroom)