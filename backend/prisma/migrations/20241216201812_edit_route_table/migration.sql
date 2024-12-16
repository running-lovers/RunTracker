/*
  Warnings:

  - You are about to drop the column `coordinates` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `bikes` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `clubs` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `ftp` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `measurement_preference` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `premium` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `shoes` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `UserProfile` table. All the data in the column will be lost.
  - Added the required column `polyline` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Route" DROP COLUMN "coordinates",
ADD COLUMN     "polyline" JSONB NOT NULL,
ALTER COLUMN "elevation_data" DROP NOT NULL,
ALTER COLUMN "is_favorite" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "bikes",
DROP COLUMN "clubs",
DROP COLUMN "ftp",
DROP COLUMN "measurement_preference",
DROP COLUMN "premium",
DROP COLUMN "shoes",
DROP COLUMN "weight";
