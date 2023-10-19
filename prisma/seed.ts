import {
  PrismaClient,
  Recipe,
  Ingredient,
  PreparationStep,
} from '@prisma/client';

type SeedingRecipe = Omit<
  Recipe,
  'id' | 'createdAt' | 'updatedAt'
> & {
  ingredients: {
    create: Omit<
      Ingredient,
      'id' | 'createdAt' | 'updatedAt' | 'recipeId'
    >[];
  };
  preparationSteps: {
    create: Omit<
      PreparationStep,
      'id' | 'createdAt' | 'updatedAt' | 'recipeId' | 'isCompleted'
    >[];
  };
};

const prisma = new PrismaClient();

const recipes: SeedingRecipe[] = [
  {
    name: 'Spaghetti alla Carbonara',
    description:
      'A delicious pasta dish from Rome with just 4 ingredients.',
    kitchen: 'ITALIAN',
    isVegeterian: false,
    portions: 2,
    cookingTime: 30,
    imageSrc: null,
    youtubeUrl: null,
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
          amount: null,
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
    userId: 'a4f6b791-bade-4067-aa69-b61b6fbc7bb8',
  },
  {
    name: 'Lasagna Bolognese',
    description:
      'A delicious pasta dish from Bologna with just 4 ingredients.',
    imageSrc: null,
    youtubeUrl: null,
    kitchen: 'ITALIAN',
    isVegeterian: false,
    portions: 4,
    cookingTime: 60,
    ingredients: {
      create: [
        {
          name: 'Lasagna sheets',
          amount: 200,
          unit: 'GRAM',
        },
        {
          name: 'Bolognese sauce',
          amount: 500,
          unit: 'GRAM',
        },
        {
          name: 'Bechamel sauce',
          amount: 500,
          unit: 'GRAM',
        },
        {
          name: 'Parmigiano Reggiano',
          amount: 100,
          unit: 'GRAM',
        },
      ],
    },
    preparationSteps: {
      create: [
        {
          description:
            'Cook the lasagna sheets in salted water until al dente.',
        },
        {
          description:
            'Layer the lasagna sheets with the bolognese sauce and the bechamel sauce.',
        },
        {
          description:
            'Grate the parmesan and sprinkle it over the lasagna.',
        },
        {
          description:
            'Bake the lasagna in the oven at 180°C for 30 minutes.',
        },
      ],
    },
    userId: 'a4f6b791-bade-4067-aa69-b61b6fbc7bb8',
  },
  {
    name: 'Fajitas',
    description: 'Tasty and spicy fajitas with chicken.',
    imageSrc: null,
    youtubeUrl: null,
    kitchen: 'MEXICAN',
    isVegeterian: false,
    portions: 4,
    cookingTime: 30,
    ingredients: {
      create: [
        {
          name: 'Chicken breast',
          amount: 500,
          unit: 'GRAM',
        },
        {
          name: 'Bell pepper',
          amount: 2,
          unit: 'PIECE',
        },
        {
          name: 'Onion',
          amount: 1,
          unit: 'PIECE',
        },
        {
          name: 'Tortillas',
          amount: 8,
          unit: 'PIECE',
        },
        {
          name: 'Fajita seasoning',
          amount: null,
          unit: 'SOME',
        },
        {
          name: 'Sour cream',
          amount: 1,
          unit: 'CUP',
        },
        {
          name: 'Salsa',
          amount: 1,
          unit: 'CUP',
        },
      ],
    },
    preparationSteps: {
      create: [
        {
          description:
            'Cut the chicken breast into strips and season it with the fajita seasoning.',
        },
        {
          description:
            'Cut the bell pepper and the onion into strips.',
        },
        {
          description:
            'Cook the chicken breast in a pan until it is done.',
        },
        {
          description:
            'Cook the bell pepper and the onion in a pan until they are soft.',
        },
        {
          description:
            'Heat the tortillas in a pan or in the microwave.',
        },
        {
          description:
            'Serve the tortillas with the chicken, bell pepper, onion, sour cream and salsa.',
        },
      ],
    },
    userId: 'a4f6b791-bade-4067-aa69-b61b6fbc7bb8',
  },
];

const seedData = async () => {
  try {
    for (const recipe of recipes) {
      await prisma.recipe.create({
        data: recipe,
      });
    }
    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
};

seedData();
