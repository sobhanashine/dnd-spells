-- CreateTable
CREATE TABLE "Spell" (
    "id" SERIAL NOT NULL,
    "spell_name" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "casting_time" TEXT NOT NULL,
    "range" TEXT NOT NULL,
    "components" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "classes" TEXT NOT NULL,
    "source_book" TEXT NOT NULL,

    CONSTRAINT "Spell_pkey" PRIMARY KEY ("id")
);
