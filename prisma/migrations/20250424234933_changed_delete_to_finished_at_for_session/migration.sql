/*
  Warnings:

  - You are about to drop the column `destroyed_at` on the `Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "destroyed_at",
ADD COLUMN     "finished_at" TIMESTAMP(2);
