import { PrismaClient } from '@prisma/client';
import { serverSupabaseUser } from '#supabase/server';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const { recipeId } = await readBody(event);
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const { id: userId } = user;
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: recipeId as string,
    },
    include: {
      ingredients: true,
    },
  });

  const groceryList = await prisma.groceryList.findFirst({
    where: {
      userId,
    },
    include: {
      ingredients: true,
    },
  });

  //   let groceryListId = groceryList?.id;

  if (!groceryList) {
    await prisma.groceryList.upsert({
      where: {
        userId,
      },
      update: {},
      create: {
        userId,
        ingredients: {
          create: recipe!.ingredients,
        },
      },
    });
  }

  //   await prisma.groceryList.update({
  //     where: {
  //       id: groceryListId,
  //     },
  //     data: {
  //       ingredients: {
  //         create: recipe!.ingredients,
  //       },
  //     },
  //     include: {
  //       ingredients: true,
  //     },
  //   });
});
