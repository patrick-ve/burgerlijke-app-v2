import { PrismaClient } from '@prisma/client';
import {
  serverSupabaseClient,
  serverSupabaseUser,
} from '#supabase/server';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  console.log('user', user);
  const { id: userId } = user!;
  // const { userId } = await getRouterParams(event);

  console.log('userId', userId);
  const client = await serverSupabaseClient(event);

  client.storage.from('recipes').download('test.jpg');

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

  if (!recipes) {
    throw createError({
      statusCode: 404,
      statusMessage: 'No recipes found for this user',
    });
  }

  return recipes;
});
