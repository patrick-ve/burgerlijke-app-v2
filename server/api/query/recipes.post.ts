import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const { query } = await readBody(event);

  const { supabaseUrl, supabaseKey, openAiKey } = useRuntimeConfig();

  const client = createClient(supabaseUrl, supabaseKey);

  const embeddings = new OpenAIEmbeddings({
    modelName: 'text-embedding-ada-002',
    openAIApiKey: openAiKey,
  });

  const generatedEmbeddings = await embeddings.embedQuery(query);

  let { data, error } = await client.rpc('search_recipes', {
    match_count: 3,
    query_embedding: generatedEmbeddings,
    similarity_threshold: 0.805,
  });

  if (data) {
    console.log(data);
  }

  if (error) {
    console.log(error);
  }

  return {
    recipes: data,
  };
});
