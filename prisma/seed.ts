import dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';

const prisma = new PrismaClient();

export type Recipe = (typeof recipes)[0];

const recipes = [
  {
    name: 'Spaghetti alla Carbonara',
    description:
      'A delicious pasta dish from Rome with just 4 ingredients.',
    kitchen: 'Italian',
    portions: 2,
    cookingtime: 30,
    ingredients: [
      '200 grams of spaghetti',
      '200 grams of guanciale',
      '100 grams of pecorino romano',
      '4 eggs',
      'some black pepper',
    ],
    instructions: [
      'Cut the guanciale into small cubes',
      'Mix the eggs with the pecorino and some black pepper',
      'Cook the guanciale in a pan until it is crispy',
      'Cook the pasta in salted water until al dente',
      'Mix the pasta with the guanciale and the egg mixture',
      'Serve the pasta with some more black pepper and cheese',
    ],
  },
  {
    name: 'Lasagna Bolognese',
    description:
      'A delicious pasta dish from Bologna with just 4 ingredients.',
    kitchen: 'Italian',
    portions: 4,
    cookingtime: 60,
    ingredients: [
      '200 grams of lasagna sheets',
      '500 grams of bolognese sauce',
      '500 grams of bechamel sauce',
      '100 grams of parmesan',
    ],
    instructions: [
      'Cook the lasagna sheets in salted water until al dente.',
      'Layer the lasagna sheets with the bolognese sauce and the bechamel sauce.',
      'Grate the parmesan and sprinkle it over the lasagna.',
      'Bake the lasagna in the oven at 180°C for 30 minutes.',
    ],
  },

  {
    name: 'Chicken Alfredo',
    description:
      'Creamy and indulgent pasta dish with tender chicken.',
    kitchen: 'Italian',
    portions: 4,
    cookingtime: 40,
    ingredients: [
      '350 grams of fettuccine pasta',
      '2 chicken breasts',
      '1 cup of heavy cream',
      '1 cup of grated Parmesan cheese',
      '2 cloves of garlic',
      'Salt and black pepper to taste',
    ],
    instructions: [
      'Cook the fettuccine pasta according to package instructions until al dente.',
      'Season chicken breasts with salt and black pepper, then cook them in a pan until no longer pink. Slice into strips.',
      'In the same pan, sauté minced garlic until fragrant, then add heavy cream and Parmesan cheese. Stir until it thickens into a creamy sauce.',
      'Toss the cooked pasta and sliced chicken in the Alfredo sauce. Serve hot.',
    ],
  },
  {
    name: 'Beef Stir-Fry',
    description: 'Quick and flavorful beef stir-fry with vegetables.',
    kitchen: 'Asian',
    portions: 3,
    cookingtime: 25,
    ingredients: [
      '300 grams of thinly sliced beef',
      '1 bell pepper',
      '1 broccoli head',
      '2 cloves of garlic',
      '2 tablespoons of soy sauce',
      '1 tablespoon of oyster sauce',
    ],
    instructions: [
      'Slice the bell pepper and broccoli into bite-sized pieces.',
      'In a hot wok or pan, stir-fry the beef until browned. Remove from the pan.',
      'In the same pan, sauté minced garlic, then add vegetables and stir-fry until tender-crisp.',
      'Return the beef to the pan, add soy sauce and oyster sauce. Stir-fry for a few more minutes.',
      'Serve hot with rice.',
    ],
  },
  {
    name: 'Caesar Salad',
    description:
      'Classic salad with crisp romaine lettuce, croutons, and Caesar dressing.',
    kitchen: 'International',
    portions: 2,
    cookingtime: 15,
    ingredients: [
      '1 head of romaine lettuce',
      '1 cup of croutons',
      '1/2 cup of grated Parmesan cheese',
      '1/4 cup of Caesar dressing',
    ],
    instructions: [
      'Wash and chop the romaine lettuce into bite-sized pieces.',
      'In a large bowl, combine the lettuce, croutons, and grated Parmesan cheese.',
      'Drizzle Caesar dressing over the salad and toss until well coated. Serve immediately.',
    ],
  },
  {
    name: 'Vegetarian Tacos',
    description:
      'Delicious and healthy tacos filled with a variety of veggies.',
    kitchen: 'Mexican',
    portions: 4,
    cookingtime: 25,
    ingredients: [
      '1 can of black beans',
      '1 cup of corn kernels',
      '1 bell pepper',
      '1 red onion',
      '1 tablespoon of taco seasoning',
      '8 small tortillas',
      'Salsa and guacamole for topping',
    ],
    instructions: [
      'Rinse and drain the black beans and corn.',
      'Dice the bell pepper and red onion.',
      'In a pan, sauté the vegetables with taco seasoning until tender.',
      'Warm the tortillas in the oven or on a dry skillet.',
      'Fill the tortillas with the sautéed vegetables and top with salsa and guacamole. Serve.',
    ],
  },
  {
    name: 'Bratwurst with Sauerkraut',
    description:
      'A classic German dish featuring grilled bratwurst sausages served with tangy sauerkraut.',
    kitchen: 'German',
    portions: 4,
    cookingtime: 30,
    ingredients: [
      '4 bratwurst sausages',
      '1 can of sauerkraut',
      '4 pretzel buns',
      'Mustard for serving',
    ],
    instructions: [
      'Grill the bratwurst sausages until they are browned and cooked through.',
      'Warm the sauerkraut in a saucepan or microwave.',
      'Serve the grilled bratwurst in pretzel buns with sauerkraut and mustard.',
    ],
  },
  {
    name: 'Wiener Schnitzel',
    description:
      'A traditional Austrian dish of breaded and fried veal or pork cutlets.',
    kitchen: 'Austrian',
    portions: 2,
    cookingtime: 20,
    ingredients: [
      '2 veal or pork cutlets',
      '1 cup of breadcrumbs',
      '2 eggs',
      'Salt and black pepper to taste',
      'Lemon wedges for garnish',
    ],
    instructions: [
      'Pound the veal or pork cutlets to an even thickness, then season with salt and black pepper.',
      'Dip each cutlet in beaten eggs and then coat with breadcrumbs.',
      'Heat oil in a pan and fry the cutlets until they are golden brown and crispy.',
      'Serve with lemon wedges for garnish.',
    ],
  },
  {
    name: 'German Potato Salad',
    description:
      'A warm and tangy potato salad with a delicious bacon dressing.',
    kitchen: 'German',
    portions: 6,
    cookingtime: 40,
    ingredients: [
      '1.5 kg of potatoes',
      '200 grams of bacon',
      '1 onion',
      '1/2 cup of vegetable broth',
      '1/4 cup of white wine vinegar',
      'Salt and black pepper to taste',
    ],
    instructions: [
      'Boil the potatoes until tender, then peel and slice them.',
      'In a pan, cook the bacon until crispy, then remove it and crumble it. Sauté diced onion in the bacon fat.',
      'Add vegetable broth and white wine vinegar to the pan and bring to a boil. Season with salt and black pepper.',
      'Toss the warm dressing with the potatoes and crumbled bacon. Serve.',
    ],
  },
  {
    name: 'Beef Rouladen',
    description:
      'A German dish consisting of thinly sliced beef rolled up with a savory filling.',
    kitchen: 'German',
    portions: 4,
    cookingtime: 90,
    ingredients: [
      '4 beef slices (schnitzel or round steak)',
      '4 slices of bacon',
      '1 onion',
      '4 dill pickles',
      'Dijon mustard',
      'Beef broth',
    ],
    instructions: [
      'Lay out the beef slices and spread Dijon mustard on each one. Place a slice of bacon, a slice of onion, and a dill pickle on each slice.',
      'Roll up the beef slices and secure with toothpicks.',
      'Brown the rouladen in a hot pan, then add beef broth to simmer until tender.',
      'Remove toothpicks and serve with gravy.',
    ],
  },
  {
    name: 'Paella',
    description:
      'A classic Spanish rice dish filled with saffron-infused rice, seafood, and flavorful seasonings.',
    kitchen: 'Spanish',
    portions: 6,
    cookingtime: 45,
    ingredients: [
      '2 cups of Arborio or Valencia rice',
      '500 grams of mixed seafood (shrimp, mussels, squid)',
      '1 onion',
      '2 cloves of garlic',
      '1 red bell pepper',
      '1 teaspoon of saffron threads',
      '1 teaspoon of paprika',
      '4 cups of chicken or seafood broth',
    ],
    instructions: [
      'In a paella pan, sauté diced onion and minced garlic in olive oil until translucent.',
      'Add rice and stir to coat with oil. Sprinkle with saffron and paprika, then pour in broth.',
      'Simmer the rice, arranging seafood and pepper strips on top. Cover and cook until rice is tender and seafood is cooked.',
      'Serve paella hot with lemon wedges.',
    ],
  },
  {
    name: 'Gazpacho',
    description:
      'A refreshing Spanish cold soup made with ripe tomatoes and fresh vegetables.',
    kitchen: 'Spanish',
    portions: 4,
    cookingtime: 15,
    ingredients: [
      '6 ripe tomatoes',
      '1 cucumber',
      '1 bell pepper',
      '1 small red onion',
      '2 cloves of garlic',
      '3 cups of tomato juice',
      '3 tablespoons of red wine vinegar',
      '1/4 cup of olive oil',
    ],
    instructions: [
      'Chop the tomatoes, cucumber, bell pepper, red onion, and garlic.',
      'Blend the vegetables with tomato juice, red wine vinegar, and olive oil until smooth.',
      'Chill the gazpacho in the refrigerator for a few hours before serving.',
    ],
  },
  {
    name: 'Spanish Tortilla',
    description:
      'A classic Spanish omelet made with potatoes, onions, and eggs.',
    kitchen: 'Spanish',
    portions: 4,
    cookingtime: 30,
    ingredients: [
      '4 potatoes',
      '1 onion',
      '6 eggs',
      'Olive oil for frying',
      'Salt and black pepper to taste',
    ],
    instructions: [
      'Peel and slice the potatoes and onion thinly.',
      'Fry the potatoes and onion in olive oil until they are tender but not browned.',
      'Whisk the eggs and season with salt and black pepper. Pour over the potatoes and onions in the pan.',
      'Cook until the eggs are set, then flip and cook the other side until golden brown.',
    ],
  },
  {
    name: 'Patatas Bravas',
    description:
      'Crispy fried potatoes served with a spicy tomato sauce and aioli.',
    kitchen: 'Spanish',
    portions: 4,
    cookingtime: 35,
    ingredients: [
      '4 large potatoes',
      '1/4 cup of olive oil',
      '1 cup of tomato sauce',
      '1 teaspoon of paprika',
      '1/2 cup of mayonnaise',
      '2 cloves of garlic',
    ],
    instructions: [
      'Cut the potatoes into bite-sized cubes and fry in olive oil until golden and crispy.',
      'In a saucepan, combine tomato sauce and paprika. Simmer for a few minutes.',
      'Mix mayonnaise with minced garlic to make aioli sauce.',
      'Serve the crispy potatoes with tomato sauce and a drizzle of aioli.',
    ],
  },
  {
    name: 'Churros',
    description:
      'Delicious Spanish fried dough pastries, often served with a rich chocolate dipping sauce.',
    kitchen: 'Spanish',
    portions: 4,
    cookingtime: 30,
    ingredients: [
      '1 cup of water',
      '2 tablespoons of sugar',
      '1/2 teaspoon of salt',
      '1 cup of all-purpose flour',
      '2 cups of vegetable oil (for frying)',
      '1/4 cup of sugar (for coating)',
      '1 teaspoon of cinnamon (for coating)',
    ],
    instructions: [
      'In a saucepan, heat water, sugar, and salt until boiling. Remove from heat and stir in flour until a dough forms.',
      'Heat vegetable oil in a deep pan. Pipe or spoon the dough into hot oil and fry until golden brown.',
      'Drain churros on paper towels and roll in a mixture of sugar and cinnamon.',
      'Serve churros with hot chocolate sauce for dipping.',
    ],
  },
  {
    name: 'Turkish Kebabs',
    description:
      'Delicious grilled meat kebabs seasoned with Turkish spices.',
    kitchen: 'Turkish',
    portions: 4,
    cookingtime: 30,
    ingredients: [
      '500 grams of lamb or chicken pieces',
      '1 onion, finely chopped',
      '2 cloves of garlic, minced',
      '1 tablespoon of yogurt',
      '1 tablespoon of olive oil',
      '1 teaspoon of paprika',
      '1 teaspoon of cumin',
      'Salt and pepper to taste',
    ],
    instructions: [
      'In a bowl, mix together the chopped onion, minced garlic, yogurt, olive oil, and spices.',
      'Add the meat pieces to the marinade, coating them well. Let them marinate for at least 30 minutes.',
      'Thread the marinated meat onto skewers and grill until cooked to your desired level of doneness.',
      'Serve the kebabs with pita bread and a side of yogurt sauce.',
    ],
  },
  {
    name: 'Turkish Lentil Soup',
    description:
      'A hearty and nutritious red lentil soup, a staple in Turkish cuisine.',
    kitchen: 'Turkish',
    portions: 6,
    cookingtime: 45,
    ingredients: [
      '1 cup of red lentils',
      '1 onion, finely chopped',
      '2 carrots, chopped',
      '2 cloves of garlic, minced',
      '1 teaspoon of paprika',
      '1 teaspoon of cumin',
      '6 cups of vegetable or chicken broth',
      'Juice of one lemon',
    ],
    instructions: [
      'In a pot, sauté the chopped onion, carrots, and minced garlic until they soften.',
      'Add red lentils, paprika, cumin, and broth. Simmer for about 30 minutes until lentils are soft.',
      'Use an immersion blender to puree the soup until smooth.',
      'Stir in lemon juice and serve hot with crusty bread.',
    ],
  },
  {
    name: 'Spinach Börek',
    description:
      'A savory Turkish pastry filled with spinach and feta cheese.',
    kitchen: 'Turkish',
    portions: 8,
    cookingtime: 40,
    ingredients: [
      '6 sheets of phyllo dough',
      '500 grams of fresh spinach, chopped',
      '200 grams of feta cheese, crumbled',
      '2 eggs',
      '1/4 cup of olive oil',
      'Salt and black pepper to taste',
    ],
    instructions: [
      'Preheat the oven to 180°C (350°F).',
      'In a bowl, mix together chopped spinach, crumbled feta, eggs, olive oil, salt, and black pepper.',
      'Lay a sheet of phyllo dough in a baking dish, brush with olive oil, and repeat the process with 3 more sheets.',
      'Spread the spinach and feta mixture over the phyllo layers, then layer the remaining phyllo sheets, brushing each with olive oil.',
      'Bake for 30-35 minutes or until the börek is golden brown and crispy.',
    ],
  },
  {
    name: 'Baklava',
    description:
      'A sweet and flaky Turkish pastry made with layers of phyllo dough, nuts, and sweet syrup.',
    kitchen: 'Turkish',
    portions: 16,
    cookingtime: 60,
    ingredients: [
      '16 sheets of phyllo dough',
      '2 cups of mixed nuts (e.g., walnuts, pistachios), finely chopped',
      '1 cup of unsalted butter, melted',
      '1 teaspoon of ground cinnamon',
      '2 cups of sugar',
      '1 cup of water',
      '1/2 cup of honey',
    ],
    instructions: [
      'Preheat the oven to 160°C (325°F).',
      'In a bowl, combine the finely chopped nuts with ground cinnamon.',
      'Layer 8 sheets of phyllo dough in a greased baking dish, brushing each sheet with melted butter.',
      'Sprinkle the nut mixture evenly over the phyllo layers.',
      'Layer the remaining 8 sheets of phyllo dough, brushing each sheet with butter.',
      'Cut the baklava into diamond or square shapes and bake for 45-50 minutes or until golden brown.',
      'While baking, make a syrup by boiling sugar, water, and honey. Pour the hot syrup over the hot baklava after it comes out of the oven.',
      'Allow the baklava to cool and absorb the syrup before serving.',
    ],
  },
];

const seedData = async () => {
  try {
    for (const recipe of recipes) {
      const newRecipe = await prisma.recipes.create({
        data: recipe,
      });

      const recipeId = newRecipe.id;

      const embeddings = new OpenAIEmbeddings({
        modelName: 'text-embedding-ada-002',
        openAIApiKey: process.env.OPENAI_API_KEY,
      });

      const generatedEmbeddings = await embeddings.embedQuery(
        `${newRecipe.name}`
      );

      await prisma.$queryRaw`UPDATE "recipes" SET embedding = ${generatedEmbeddings} WHERE id = ${recipeId}::uuid`;
    }
    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
};

seedData();
