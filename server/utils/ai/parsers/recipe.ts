import { StructuredOutputParser } from 'langchain/output_parsers';
import { z } from 'zod';
import { Kitchen, Unit } from '@prisma/client';

// https://www.santamariaworld.com/nl/alle-leuke-en-verrassende-recepten/spicy-kip-fajita-wrap/

export const recipeParser = StructuredOutputParser.fromZodSchema(
  z.object({
    name: z.string().describe('Name of the recipe.'),
    description: z
      .string()
      .describe('Short description of the recipe in 2-3 sentences.'),
    youtubeUrl: z
      .string()
      //   .nullable()
      .describe(
        'YouTube URL for the recipe. Must be returned as a valid URL.'
      ),
    kitchen: z
      .nativeEnum(Kitchen)
      .describe('Kitchen type for the recipe.'),
    isVegeterian: z
      .boolean()
      .describe('Whether the recipe is vegetarian or not.'),
    portions: z
      .number()
      .describe('Number of portions the recipe provides.'),
    cookingTime: z
      .number()
      .describe('Time in minutes required to cook the recipe.'),
    ingredients: z.array(
      z.object({
        name: z.string().describe('Name of the ingredient.'),
        amount: z
          .number()
          .nullable()
          .describe('Amount of the ingredient.'),
        unit: z.nativeEnum(Unit).describe('Unit of the ingredient.'),
      })
    ),
    instructions: z
      .array(
        z.object({
          step: z
            .string()
            .describe(
              'Step of the instruction. Each step must be a single sentence.'
            ),
        })
      )
      .describe(
        'Instructions for the recipe, consisting of multiple steps.'
      ),
  })
);
