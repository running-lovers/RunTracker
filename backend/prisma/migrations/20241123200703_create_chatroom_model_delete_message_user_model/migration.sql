/*
  Warnings:

  - You are about to drop the column `created_at` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `UserMessage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `chatRoomId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserMessage" DROP CONSTRAINT "UserMessage_message_id_fkey";

-- DropForeignKey
ALTER TABLE "UserMessage" DROP CONSTRAINT "UserMessage_user_id_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "created_at",
DROP COLUMN "deleted_at",
DROP COLUMN "title",
DROP COLUMN "updated_at",
ADD COLUMN     "chatRoomId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "senderId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "UserMessage";

-- CreateTable
CREATE TABLE "ChatRoom" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatRoomUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "chatRoomId" INTEGER NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatRoomUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatRoomUser_userId_chatRoomId_key" ON "ChatRoomUser"("userId", "chatRoomId");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "ChatRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatRoomUser" ADD CONSTRAINT "ChatRoomUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatRoomUser" ADD CONSTRAINT "ChatRoomUser_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "ChatRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
