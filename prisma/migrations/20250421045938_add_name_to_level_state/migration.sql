/*
  Warnings:

  - The `id` column on the `LevelState` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `name` to the `LevelState` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "LevelState_id_key";

-- AlterTable
ALTER TABLE "LevelState" ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "LevelState_pkey" PRIMARY KEY ("id");
