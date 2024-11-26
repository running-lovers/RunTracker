/*
  Warnings:

  - You are about to drop the column `year_month` on the `Goal` table. All the data in the column will be lost.
  - Added the required column `month` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Goal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "year_month",
ADD COLUMN     "month" TEXT NOT NULL,
ADD COLUMN     "year" TEXT NOT NULL;
