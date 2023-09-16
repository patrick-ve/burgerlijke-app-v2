-- CreateEnum
CREATE TYPE "Kitchen" AS ENUM ('ITALIAN', 'MEXICAN', 'SPANISH', 'GREEK', 'JAPANESE', 'CHINESE', 'INDIAN', 'FRENCH', 'DUTCH', 'AMERICAN', 'VEGAN', 'VEGETARIAN', 'OTHER');

-- CreateEnum
CREATE TYPE "Amount" AS ENUM ('GRAM', 'KILOGRAM', 'LITER', 'MILLILITER', 'PIECE', 'TEASPOON', 'TABLESPOON', 'CUP', 'PINCH', 'SOME', 'OTHER');

-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "youtubeUrl" TEXT,
    "kitchen" "Kitchen" NOT NULL DEFAULT 'ITALIAN',
    "portions" INTEGER NOT NULL,
    "prepationTime" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "unit" "Amount" NOT NULL DEFAULT 'GRAM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreparationStep" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "PreparationStep_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreparationStep" ADD CONSTRAINT "PreparationStep_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
