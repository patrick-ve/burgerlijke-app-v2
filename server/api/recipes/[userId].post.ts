import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { userId } = await getRouterParams(event);

  // TODO: obtain actual values from the request body
  const recipe = await prisma.recipe.create({
    data: {
      name: 'Pasta pesto',
      description: 'A simple pasta pesto recipe',
      cookingTime: 15,
      youtubeUrl: null,
      portions: 2,
      kitchen: 'ITALIAN',
      ingredients: {
        create: [
          {
            name: 'Pasta',
            amount: 200,
            unit: 'GRAM',
          },
          {
            name: 'Pesto',
            amount: 100,
            unit: 'GRAM',
          },
        ],
      },
      preparationSteps: {
        create: [
          {
            description: 'Cook the pasta',
            isCompleted: false,
          },
          {
            description: 'Add the pesto',
            isCompleted: false,
          },
        ],
      },

      userId,
    },
  });
});
