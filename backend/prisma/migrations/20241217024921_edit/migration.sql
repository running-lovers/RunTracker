/*
  Warnings:

  - You are about to drop the column `polyline` on the `Route` table. All the data in the column will be lost.
  - Added the required column `route_data` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Route" DROP COLUMN "polyline",
ADD COLUMN     "route_data" JSONB NOT NULL;
