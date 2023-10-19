import {
  Browser,
  Page,
  PlaywrightWebBaseLoader,
  Response,
} from 'langchain/document_loaders/web/playwright';
import { OpenAI } from 'langchain/llms/openai';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { OutputFixingParser } from 'langchain/output_parsers';
import { PromptTemplate } from 'langchain/prompts';
import {
  serverSupabaseClient,
  serverSupabaseUser,
} from '#supabase/server';
import { PrismaClient } from '@prisma/client';
import { recipeParser } from '~~/server/utils/ai/parsers/recipe';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const { recipeUrl } = await readBody(event);

  // const user = await serverSupabaseUser(event);

  const textLoader = new PlaywrightWebBaseLoader(recipeUrl, {
    launchOptions: {
      headless: true,
    },
    gotoOptions: {
      waitUntil: 'domcontentloaded',
    },
    async evaluate(
      page: Page,
      browser: Browser,
      response: Response | null
    ) {
      if (response?.status() !== 200) {
        throw createError({
          statusCode: 500,
          message: 'Site is unreachable.',
        });
      }

      const result = await page.evaluate(() => {
        let innerText = document.body.innerText;
        // const anchors = Array.from(document.querySelectorAll('a'));
        // const anchorTexts = anchors.map((a) => a.innerText);
        // const anchorHrefs = anchors.map((a) => a.href);

        // for (let i = 0; i < anchorTexts.length; i++) {
        //   if (innerText.includes(anchorTexts[i])) {
        //     innerText = innerText.replace(
        //       anchorTexts[i],
        //       `${anchorTexts[i]} (${anchorHrefs[i]})`
        //     );
        //   }
        // }

        return innerText;
      });

      return result;
    },
  });

  const docs = await textLoader.load();

  const pageContent = docs[0].pageContent.replace(/\n/g, ' ');
  console.log(pageContent);

  const formatInstructions = recipeParser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template: `You are an expert in cooking and you are given the text of a recipe web page. Extract information as best as you can from this text.\n
        {format_instructions}\n
        All content should be returned in the original language.\n
        Website page content: \n{pageContent}`,
    inputVariables: ['pageContent'],
    partialVariables: { format_instructions: formatInstructions },
  });

  const model = new OpenAI({
    temperature: 0,
    modelName: 'gpt-4',
    verbose: true,
  });

  const input = await prompt.format({
    pageContent,
  });

  const response = await model.call(input);

  let recipe;

  try {
    recipe = await recipeParser.parse(response);
  } catch (e) {
    const fixParser = OutputFixingParser.fromLLM(
      new OpenAI({
        temperature: 0,
        modelName: 'gpt-4',
        verbose: true,
      }),
      recipeParser
    );

    recipe = await fixParser.parse(response);
  }

  const {
    name,
    description,
    youtubeUrl,
    kitchen,
    isVegetarian,
    portions,
    cookingTime,
    ingredients,
    instructions,
  } = recipe;
  const text = `
    name: ${name}
    description: ${description}
    youtubeUrl: ${youtubeUrl}
    kitchen: ${kitchen}
    isVegetarian: ${isVegetarian}
    portions: ${portions}
    cookingTime: ${cookingTime}
    instructions: ${instructions.map((instruction) =>
      instruction.step.replace(/\.$/, '')
    )}
    ingredients: ${ingredients.map((ingredient) => ingredient.name)}
    `;

  const embeddings = new OpenAIEmbeddings({
    modelName: 'text-embedding-ada-002',
    openAIApiKey: useRuntimeConfig().openAiKey,
  });

  const generatedEmbeddings = await embeddings.embedQuery(text);

  // const userId = user!.id;
  const userId = 'a4f6b791-bade-4067-aa69-b61b6fbc7bb8';

  const savedRecipe = await prisma.recipe.create({
    data: {
      userId,
      name,
      description,
      youtubeUrl,
      kitchen,
      isVegetarian,
      portions,
      cookingTime,
      ingredients: {
        create: ingredients.map((ingredient) => ({
          name: ingredient.name,
          amount: ingredient.amount,
          unit: ingredient.unit,
        })),
      },
      preparationSteps: {
        create: instructions.map((instruction) => ({
          description: instruction.step,
        })),
      },
    },
  });

  const recipeId = savedRecipe.id;

  await prisma.$queryRaw`UPDATE "Recipe" SET embedding = ${generatedEmbeddings} WHERE "id" = ${recipeId}`;

  return recipe;
});
