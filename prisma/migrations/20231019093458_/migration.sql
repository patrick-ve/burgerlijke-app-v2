/*
  Warnings:

  - The `unit` column on the `Ingredient` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('GRAM', 'KILOGRAM', 'LITER', 'MILLILITER', 'PIECE', 'TEASPOON', 'TABLESPOON', 'CUP', 'PINCH', 'SOME', 'OTHER');

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "unit",
ADD COLUMN     "unit" "Unit" NOT NULL DEFAULT 'GRAM';

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "isVegeterian" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "Amount";
