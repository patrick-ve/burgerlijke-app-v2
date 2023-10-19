import {
  Browser,
  Page,
  PlaywrightWebBaseLoader,
  Response,
} from 'langchain/document_loaders/web/playwright';
import { OpenAI } from 'langchain/llms/openai';
import { OutputFixingParser } from 'langchain/output_parsers';
import { PromptTemplate } from 'langchain/prompts';
import { recipeParser } from '~~/server/utils/ai/parsers/recipe';

export default defineEventHandler(async (event) => {
  const { recipeUrl } = await readBody(event);

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

  let output;

  try {
    output = await recipeParser.parse(response);
  } catch (e) {
    const fixParser = OutputFixingParser.fromLLM(
      new OpenAI({
        temperature: 0,
        modelName: 'gpt-4',
        verbose: true,
      }),
      recipeParser
    );

    output = await fixParser.parse(response);
  }

  console.log(output);

  // Create embedding
});
