/*
  Warnings:

  - You are about to drop the column `slug` on the `Page` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Page_slug_key";

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "slug",
ADD COLUMN     "parentId" TEXT;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;
