import { PrismaClient } from '@prisma/client';
import {
  serverSupabaseClient,
  serverSupabaseUser,
} from '#supabase/server';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  console.log('user', user);
  const { userId } = await getRouterParams(event);

  console.log('userId', userId);
  const client = await serverSupabaseClient(event);

  client.storage.from('recipes').download('test.jpg');
  // const { userId } = await getRouterParams(event);
  const {
    name,
    description,
    imageData,
    youtubeUrl,
    kitchen,
    portions,
    cookingTime,
    ingredients,
    preparationSteps,
  } = await readBody(event);

  let recipe;

  try {
    // TODO: handle image upload

    recipe = await prisma.recipe.create({
      data: {
        name,
        description,
        cookingTime,
        youtubeUrl: youtubeUrl ? youtubeUrl : null,
        portions,
        kitchen,
        ingredients: {
          create: ingredients,
        },
        preparationSteps: {
          create: preparationSteps,
        },
        userId,
      },
    });
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    });
  }

  return recipe;
});
