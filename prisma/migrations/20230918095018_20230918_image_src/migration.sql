/*
  Warnings:

  - You are about to drop the column `groceryListId` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `weekdayId` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the `GroceryList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_groceryListId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_weekdayId_fkey";

-- DropIndex
DROP INDEX "Recipe_weekdayId_key";

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "groceryListId";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "weekdayId",
ADD COLUMN     "imageSrc" TEXT;

-- DropTable
DROP TABLE "GroceryList";
