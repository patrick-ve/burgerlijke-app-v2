import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const recipes = await prisma.recipe.create({
    data: {
      name: 'Spaghetti alla Carbonara',
      description:
        'A delicious pasta dish from Rome with just 4 ingredients.',
      kitchen: 'ITALIAN',
      portions: 2,
      cookingTime: 30,
      ingredients: {
        create: [
          {
            name: 'Spaghetti quadrati',
            amount: 200,
            unit: 'GRAM',
          },
          {
            name: 'Guanciale',
            amount: 200,
            unit: 'GRAM',
          },
          {
            name: 'Pecorino Romano',
            amount: 100,
            unit: 'GRAM',
          },
          {
            name: 'Eggs',
            amount: 4,
            unit: 'PIECE',
          },
          {
            name: 'Black pepper',
            unit: 'SOME',
          },
        ],
      },
      preparationSteps: {
        create: [
          {
            description: 'Cut the guanciale into small cubes.',
          },
          {
            description:
              'Mix the eggs with the pecorino and some black pepper.',
          },
          {
            description:
              'Cook the guanciale in a pan until it is crispy.',
          },
          {
            description:
              'Cook the pasta in salted water until al dente.',
          },
          {
            description:
              'Mix the pasta with the guanciale and the egg mixture.',
          },
          {
            description:
              'Serve the pasta with some more black pepper and cheese.',
          },
        ],
      },
    },
  });

  console.log({ recipes });
}

const seedData = async () => {
  try {
    await seed();
    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
};

seedData();
