/*
  Warnings:

  - You are about to drop the column `avarage_page` on the `Goal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "avarage_page",
ADD COLUMN     "average_pace" DOUBLE PRECISION NOT NULL DEFAULT 0;
