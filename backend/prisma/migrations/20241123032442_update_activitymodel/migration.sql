-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_route_id_fkey";

-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "route_id" DROP NOT NULL,
ALTER COLUMN "activity_type" DROP NOT NULL,
ALTER COLUMN "average_speed" DROP NOT NULL,
ALTER COLUMN "max_speed" DROP NOT NULL,
ALTER COLUMN "calories" DROP NOT NULL,
ALTER COLUMN "end_time" DROP NOT NULL,
ALTER COLUMN "route_data" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "Route"("id") ON DELETE SET NULL ON UPDATE CASCADE;
