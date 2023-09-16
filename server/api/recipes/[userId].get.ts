import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { userId } = await getRouterParams(event);

  const recipes = await prisma.recipe.findMany({
    where: {
      userId,
    },
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

  console.log(JSON.stringify(recipes, null, 2));

  if (!recipes) {
    throw createError({
      statusCode: 404,
      statusMessage: 'No recipes found for this user',
    });
  }

  return recipes;
});
