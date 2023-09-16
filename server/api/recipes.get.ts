import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const recipe = await prisma.recipe.findUnique({
    where: { id: 1 },
    include: { preparationSteps: true, ingredients: true },
  });

  console.log(recipe);

  if (!recipe) {
    throw createError({
      statusCode: 404,
      statusMessage: 'No recipes found',
    });
  }

  return recipe;
});
