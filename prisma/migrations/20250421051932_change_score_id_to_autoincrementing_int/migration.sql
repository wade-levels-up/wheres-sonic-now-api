/*
  Warnings:

  - The `id` column on the `Score` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "Score_id_key";

-- AlterTable
ALTER TABLE "Score" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Score_pkey" PRIMARY KEY ("id");
