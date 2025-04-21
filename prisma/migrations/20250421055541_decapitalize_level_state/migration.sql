/*
  Warnings:

  - You are about to drop the `LevelState` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LevelState" DROP CONSTRAINT "LevelState_sessionId_fkey";

-- DropTable
DROP TABLE "LevelState";

-- CreateTable
CREATE TABLE "Levelstate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sessionId" TEXT,
    "sonicFound" BOOLEAN NOT NULL DEFAULT false,
    "tailsFound" BOOLEAN NOT NULL DEFAULT false,
    "knucklesFound" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Levelstate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Levelstate" ADD CONSTRAINT "Levelstate_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("sid") ON DELETE SET NULL ON UPDATE CASCADE;
