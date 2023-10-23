import dotenv from 'dotenv';
dotenv.config();

import { SupabaseVectorStore } from 'langchain/vectorstores/supabase';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { createClient } from '@supabase/supabase-js';

const supabaseKey = process.env.SUPABASE_KEY;
if (!supabaseKey)
  throw new Error(`Expected SUPABASE_SERVICE_ROLE_KEY`);

const url = process.env.SUPABASE_URL;
if (!url) throw new Error(`Expected env var SUPABASE_URL`);

export const run = async () => {
  const client = createClient(url, supabaseKey);

  const vectorStore = await SupabaseVectorStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    {
      client,
      tableName: 'recipes',
      queryName: 'match_recipes',
    }
  );

  const resultOne = await vectorStore.similaritySearch(
    'Vegetarian',
    5
  );

  console.log(resultOne);

  // Create Embedding

  const embeddings = new OpenAIEmbeddings();

  const generatedEmbedding = await embeddings.embedQuery(
    'Vegetarian'
  );
  // console.log(generatedEmbedding);

  // // Search Supabase
  const { data, error } = await client.rpc('match_recipes', {
    query_embedding: generatedEmbedding,
    similarity_threshold: 0.75,
    match_count: 3,
  });

  if (data) {
    console.log(data);
  }

  if (error) {
    console.log(error);
  }
};

run();
