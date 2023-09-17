/*
  Warnings:

  - A unique constraint covering the columns `[weekdayId]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Day" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "groceryListId" TEXT;

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "weekdayId" TEXT;

-- CreateTable
CREATE TABLE "WeekDay" (
    "id" TEXT NOT NULL,
    "name" "Day" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "recipeId" TEXT,

    CONSTRAINT "WeekDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroceryList" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GroceryList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_weekdayId_key" ON "Recipe"("weekdayId");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_weekdayId_fkey" FOREIGN KEY ("weekdayId") REFERENCES "WeekDay"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_groceryListId_fkey" FOREIGN KEY ("groceryListId") REFERENCES "GroceryList"("id") ON DELETE SET NULL ON UPDATE CASCADE;
