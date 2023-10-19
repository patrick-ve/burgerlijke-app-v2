/*
  Warnings:

  - You are about to drop the column `isVegeterian` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "isVegeterian",
ADD COLUMN     "isVegetarian" BOOLEAN NOT NULL DEFAULT false;
