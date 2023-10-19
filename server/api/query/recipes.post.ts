import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const { query } = await readBody(event);
  const client = await serverSupabaseClient(event);

  const embedding = new OpenAIEmbeddings({
    modelName: 'text-embedding-ada-002',
    openAIApiKey: useRuntimeConfig().openAiKey,
  });
});
