/*
  Warnings:

  - You are about to drop the column `goal_type` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `target` on the `Goal` table. All the data in the column will be lost.
  - Added the required column `year_month` to the `Goal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "goal_type",
DROP COLUMN "target",
ADD COLUMN     "avarage_page" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "calories_burned" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "total_distance" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "year_month" TEXT NOT NULL;
