import dotenv from 'dotenv';
dotenv.config();

// import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
// import { serverSupabaseClient } from '#supabase/server';
// import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';

const client = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default defineEventHandler(async (event) => {
  const { query } = await readBody(event);

  // const recipes = await prisma.recipes.findMany();
  // console.log(recipes);
  const recipes = await client.from('recipes').select('*');
  console.log(recipes);

  // const embeddings = new OpenAIEmbeddings({
  //   modelName: 'text-embedding-ada-002',
  //   openAIApiKey: useRuntimeConfig().openAiKey,
  // });

  // const generatedEmbeddings = await embeddings.embedQuery(query);

  // console.log(generatedEmbeddings);

  // const { data: recipes, error } = await client.rpc(
  //   'match_recipes',
  //   // @ts-expect-error
  //   {
  //     query_embeddings: generatedEmbeddings,
  //     similarity_threshold: 0.5,
  //     match_count: 3,
  //   }
  // );

  // console.log(recipes);

  // if (error) console.error(error);
  // else console.log(recipes);
});
