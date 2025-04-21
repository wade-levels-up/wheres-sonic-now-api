/*
  Warnings:

  - A unique constraint covering the columns `[sid]` on the table `Session` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Levelstate" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "sessionId" TEXT,
    "sonicFound" BOOLEAN NOT NULL DEFAULT false,
    "tailsFound" BOOLEAN NOT NULL DEFAULT false,
    "knucklesFound" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Levelstate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sid_key" ON "Session"("sid");

-- AddForeignKey
ALTER TABLE "Levelstate" ADD CONSTRAINT "Levelstate_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("sid") ON DELETE SET NULL ON UPDATE CASCADE;
