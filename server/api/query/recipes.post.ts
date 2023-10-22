import dotenv from 'dotenv';
dotenv.config();

import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
// import { serverSupabaseClient } from '#supabase/server';
import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
const prisma = new PrismaClient();

const client = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default defineEventHandler(async (event) => {
  const { query } = await readBody(event);

  const embeddings = new OpenAIEmbeddings({
    modelName: 'text-embedding-ada-002',
    openAIApiKey: useRuntimeConfig().openAiKey,
  });

  const generatedEmbeddings = await embeddings.embedQuery(query);
  // const vectorQuery = `[${generatedEmbeddings.join(',')}]`;
  const vectorQuery = `[${generatedEmbeddings}]`;
  const recipes = await prisma.$queryRaw`
    SELECT
      id,
      "name",
      "description",
      1 - (embedding <=> ${vectorQuery}::vector) as similarity
    FROM recipes
    where 1 - (embedding <=> ${vectorQuery}::vector) > .5
    ORDER BY similarity DESC
    LIMIT 4;
  `;

  return recipes;

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
