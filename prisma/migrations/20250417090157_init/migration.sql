-- CreateTable
CREATE TABLE "Level" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "locationX" INTEGER NOT NULL,
    "locationY" INTEGER NOT NULL,
    "levelId" TEXT,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Score" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "time" INTEGER NOT NULL,
    "levelId" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Score_id_key" ON "Score"("id");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE SET NULL ON UPDATE CASCADE;
