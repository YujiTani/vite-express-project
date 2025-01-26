-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DRAFT', 'READY', 'PUBLISHED');

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "published" "Status" NOT NULL DEFAULT 'DRAFT';
