import { estimatePrice } from '~~/server/utils/ai/calculators/token';
import { PrismaClient, Recipe } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const recipes: Recipe[] = await prisma.recipe.findMany();
  console.log(typeof recipes);

  // Map recipes to string
  const recipesString = recipes
    .map((recipe) => JSON.stringify(recipe))
    .join('');

  console.log(recipesString);

  console.log(estimatePrice(recipesString));

  return {
    recipes,
  };
});
