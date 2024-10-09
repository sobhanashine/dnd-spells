/*
  Warnings:

  - You are about to drop the column `tag` on the `Spell` table. All the data in the column will be lost.
  - Added the required column `ritual` to the `Spell` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tags` to the `Spell` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `level` on the `Spell` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `school` on table `Spell` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Spell" DROP COLUMN "tag",
ADD COLUMN     "ritual" BOOLEAN NOT NULL,
ADD COLUMN     "tags" TEXT NOT NULL,
DROP COLUMN "level",
ADD COLUMN     "level" INTEGER NOT NULL,
ALTER COLUMN "school" SET NOT NULL;
