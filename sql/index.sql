create index on public.recipes 
using ivfflat (embedding vector_cosine_ops)
with (lists = 100);