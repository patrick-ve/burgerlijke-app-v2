-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "embedding" vector(1536);
