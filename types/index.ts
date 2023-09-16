import { Recipe, Ingredient, PreparationStep } from '@prisma/client';

export type CompleteRecipe = Recipe & {
  ingredients: Ingredient[];
  preparationSteps: PreparationStep[];
};
