-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_parentId_fkey";

-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "showInNav" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE INDEX "Page_parentId_idx" ON "Page"("parentId");

-- CreateIndex
CREATE INDEX "Page_level_idx" ON "Page"("level");

-- CreateIndex
CREATE INDEX "Page_showInNav_idx" ON "Page"("showInNav");

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;
