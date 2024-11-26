import { Router } from "express";
import { deleteUserFromChatroom, getChatroomsByUserId, getUsersByChatroomId, inviteUser } from "../controllers/chatroomUserController";

export const router = Router();

router.post("/invite", inviteUser);
router.get("/:userId", getChatroomsByUserId);
router.get("/:chatroomId", getUsersByChatroomId);
router.delete('/:chatroomId/:userId', deleteUserFromChatroom);