create table recipes (
  id uuid primary key,
  name text,
  description text,
  kitchen text,
  portions int,
  cookingtime int,
  ingredients text[],
  instructions text[],
  embedding vector (1536)
);