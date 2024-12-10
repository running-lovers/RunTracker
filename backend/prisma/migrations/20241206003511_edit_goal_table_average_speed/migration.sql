/*
  Warnings:

  - You are about to drop the column `average_pace` on the `Goal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "average_pace",
ADD COLUMN     "average_speed" DOUBLE PRECISION NOT NULL DEFAULT 0;
