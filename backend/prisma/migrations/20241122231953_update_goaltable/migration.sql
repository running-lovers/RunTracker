-- AlterTable
ALTER TABLE "Goal" ALTER COLUMN "current" DROP NOT NULL,
ALTER COLUMN "start_date" DROP NOT NULL,
ALTER COLUMN "end_date" DROP NOT NULL;
