import { PromptTemplate } from 'langchain/prompts';
import { OpenAI } from 'langchain/llms/openai';
import {
  OutputFixingParser,
  StructuredOutputParser,
} from 'langchain/output_parsers';
import { z } from 'zod';

// https://www.santamariaworld.com/nl/alle-leuke-en-verrassende-recepten/spicy-kip-fajita-wrap/

const recipeParser = StructuredOutputParser.fromZodSchema(
  z.object({
    name: z.string().describe('Name of the recipe.'),
    description: z
      .string()
      .describe('Short description of the recipe in 2-3 sentences.'),
    kitchen: z
      .string()
      .describe(
        'Kitchen type for the recipe, e.g. Italian, Mexican, etc.'
      ),
    cookingtime: z
      .number()
      .describe('Time in minutes required to cook the recipe.'),
    portions: z
      .number()
      .describe('Number of portions the recipe provides.'),
    ingredients: z.array(z.string()).describe('List of ingredients.'),
    instructions: z
      .array(z.string())
      .describe(
        'Instructions for the recipe, consisting of a single step in a single sentence.'
      ),
  })
);

export const generateStructuredOutputFromDocument = async (
  document: string
) => {
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
    pageContent: document,
  });

  const response = await model.call(input);

  let recipe;

  try {
    recipe = await recipeParser.parse(response);
    return recipe;
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
    return recipe;
  }
};
