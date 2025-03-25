/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Template` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'draft';

-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE INDEX "Page_status_idx" ON "Page"("status");

-- CreateIndex
CREATE INDEX "Page_order_idx" ON "Page"("order");

-- CreateIndex
CREATE UNIQUE INDEX "Template_name_key" ON "Template"("name");

-- CreateIndex
CREATE INDEX "Template_name_idx" ON "Template"("name");
