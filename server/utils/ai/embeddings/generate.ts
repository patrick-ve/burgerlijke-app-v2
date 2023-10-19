import { openai } from '~~/server/utils/ai/llm/openai';

export const generateEmbedding = async (input: string) => {
  const embeddingsInput = input.replace(/\n/g, ' ');
  const embeddingData = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: embeddingsInput,
  });
  console.log(embeddingData);
  const [{ embedding }] = (embeddingData as any).data;
  return embedding;
};
