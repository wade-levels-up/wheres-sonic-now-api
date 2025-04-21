-- CreateTable
CREATE TABLE "session" (
    "sid" VARCHAR NOT NULL,
    "sess" JSON NOT NULL,
    "expire" TIMESTAMP(6) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
);

-- CreateTable
CREATE TABLE "LevelState" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT,
    "sonicFound" BOOLEAN NOT NULL DEFAULT false,
    "tailsFound" BOOLEAN NOT NULL DEFAULT false,
    "knucklesFound" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE INDEX "IDX_session_expire" ON "session"("expire");

-- CreateIndex
CREATE UNIQUE INDEX "LevelState_id_key" ON "LevelState"("id");

-- AddForeignKey
ALTER TABLE "LevelState" ADD CONSTRAINT "LevelState_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "session"("sid") ON DELETE SET NULL ON UPDATE CASCADE;
