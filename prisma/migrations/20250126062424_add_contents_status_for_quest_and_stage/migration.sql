/*
  Warnings:

  - You are about to drop the column `published` on the `courses` table. All the data in the column will be lost.
  - The `state` column on the `quests` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `state` column on the `stages` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "courses" DROP COLUMN "published",
ADD COLUMN     "state" "Status" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "quests" DROP COLUMN "state",
ADD COLUMN     "state" "Status" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "stages" DROP COLUMN "state",
ADD COLUMN     "state" "Status" NOT NULL DEFAULT 'DRAFT';

-- CreateIndex
CREATE INDEX "quests_state_idx" ON "quests"("state");

-- CreateIndex
CREATE INDEX "stages_state_idx" ON "stages"("state");
