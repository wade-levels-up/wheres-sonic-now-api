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

-- AddForeignKey
ALTER TABLE "Levelstate" ADD CONSTRAINT "Levelstate_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("sid") ON DELETE SET NULL ON UPDATE CASCADE;
