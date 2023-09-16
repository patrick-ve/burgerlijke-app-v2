import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { id } = await getRouterParams(event);

  const recipe = await prisma.recipe.findUnique({
    where: {
      id: id as string,
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

  console.log(JSON.stringify(recipe, null, 2));

  if (!recipe) {
    throw createError({
      statusCode: 404,
      statusMessage: 'No recipe found',
    });
  }

  return recipe;
});
