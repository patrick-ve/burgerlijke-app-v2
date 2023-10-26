import {
  Browser,
  Page,
  PlaywrightWebBaseLoader,
  Response,
} from 'langchain/document_loaders/web/playwright';
import { generateDocumentFromWebPage } from '~~/server/utils/ai/loader/web';
import { OpenAI } from 'langchain/llms/openai';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { OutputFixingParser } from 'langchain/output_parsers';
import { PromptTemplate } from 'langchain/prompts';
import {
  serverSupabaseClient,
  serverSupabaseUser,
} from '#supabase/server';
import { PrismaClient } from '@prisma/client';
import { generateStructuredOutputFromDocument } from '~~/server/utils/ai/parsers/recipe';
import { recipes } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { recipeUrl } = await readBody(event);

  const recipeDocument = await generateDocumentFromWebPage(recipeUrl);
  const recipe = await generateStructuredOutputFromDocument(
    recipeDocument
  );

  console.log(recipe);

  const {
    name,
    description,
    kitchen,
    portions,
    cookingtime,
    ingredients,
    instructions,
  } = recipe;
  const text = `Recipe name: ${name}`;
  // description: ${description}
  // kitchen: ${kitchen}
  // portions: ${portions}
  // cookingTime: ${cookingtime}
  // instructions: ${instructions.map((instruction) =>
  //   instruction.replace(/\.$/, '')
  // )}
  // ingredients: ${ingredients.map((ingredient) => ingredient)}
  //`;

  const embeddings = new OpenAIEmbeddings({
    modelName: 'text-embedding-ada-002',
    openAIApiKey: useRuntimeConfig().openAiKey,
  });

  const generatedEmbeddings = await embeddings.embedQuery(text);
  console.log(generatedEmbeddings);

  const savedRecipe = await prisma.recipes.create({
    data: {
      name,
      description,
      kitchen,
      portions,
      cookingtime,
      ingredients,
      instructions,
    },
  });

  const recipeId = savedRecipe.id;

  await prisma.$queryRaw`UPDATE "recipes" SET embedding = ${generatedEmbeddings} WHERE "id" = ${recipeId}::uuid`;

  return savedRecipe;
});
