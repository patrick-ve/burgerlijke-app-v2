import { DynamicTool, DynamicStructuredTool } from 'langchain/tools';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { initializeAgentExecutorWithOptions } from 'langchain/agents';
import { WikipediaQueryRun } from 'langchain/tools';
import { Calculator } from 'langchain/tools/calculator';
import * as z from 'zod';

export default defineEventHandler(async (event) => {
  const input = 'How many days has it been since the last leap year?';
  const model = new ChatOpenAI({
    temperature: 0,
    streaming: true,
    verbose: true,
  });
  const wikipediaQuery = new WikipediaQueryRun({
    topKResults: 1,
    maxDocContentLength: 500,
  });

  const tools = [wikipediaQuery, new Calculator()];

  const executor = await initializeAgentExecutorWithOptions(
    tools,
    model,
    {
      agentType: 'openai-functions',
    }
  );

  const result = await executor.run(input);
  return result;
});
