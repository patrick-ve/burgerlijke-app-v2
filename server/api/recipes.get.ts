import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const recipe = await prisma.recipe.findMany({
    include: {
      preparationSteps: {
        select: {
          description: true,
          isCompleted: true,
        },
      },
      ingredients: {
        select: {
          name: true,
          amount: true,
          unit: true,
        },
      },
    },
  });

  if (!recipe) {
    throw createError({
      statusCode: 404,
      statusMessage: 'No recipes found',
    });
  }

  return recipe;
});
