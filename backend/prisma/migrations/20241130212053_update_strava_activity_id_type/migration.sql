/*
  Warnings:

  - The `strava_activity_id` column on the `Activity` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "strava_activity_id",
ADD COLUMN     "strava_activity_id" INTEGER;
