/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profile_picture` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[strava_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `TokenExpiresAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accessToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `strava_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "password",
DROP COLUMN "profile_picture",
DROP COLUMN "username",
ADD COLUMN     "TokenExpiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "accessToken" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "refreshToken" TEXT NOT NULL,
DROP COLUMN "strava_id",
ADD COLUMN     "strava_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_strava_id_key" ON "User"("strava_id");
