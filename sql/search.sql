create or replace function search_recipes (
  query_embedding vector(1536),
  similarity_threshold float,
  match_count int
)
returns table (
  id text,
  name text,
  description text,
  kitchen text,
  portions int,
  cookingtime int,
  ingredients text[],
  instructions text[],
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    recipes.id,
    recipes.name,
    recipes.description,
    recipes.kitchen,
    recipes.portions,
    recipes.cookingtime,
    recipes.ingredients,
    recipes.instructions,
    1 - (recipes.embedding <=> query_embedding) as similarity
  from recipes
  where 1 - (recipes.embedding <=> query_embedding) > similarity_threshold
  order by recipes.embedding <=> query_embedding
  limit match_count;
end;
$$;