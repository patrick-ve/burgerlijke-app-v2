import { PrismaClient } from '@prisma/client';
import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  const recipes = await prisma.recipes.findMany();

  console.log(recipes);

  return recipes;
});
