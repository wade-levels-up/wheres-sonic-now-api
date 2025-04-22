/*
  Warnings:

  - You are about to drop the `Levelstate` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `knucklesFound` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sonicFound` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tailsFound` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Levelstate" DROP CONSTRAINT "Levelstate_sessionId_fkey";

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "destroyed_at" TIMESTAMP(2),
ADD COLUMN     "knucklesFound" BOOLEAN NOT NULL,
ADD COLUMN     "level" TEXT NOT NULL,
ADD COLUMN     "sonicFound" BOOLEAN NOT NULL,
ADD COLUMN     "tailsFound" BOOLEAN NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(2);

-- DropTable
DROP TABLE "Levelstate";
