import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Die Sprache steckt im Ordnernamen: konzept/inhalte/<sprache>/<seite>.md
const inhalte = defineCollection({
  loader: glob({ pattern: '*/*.md', base: './konzept/inhalte' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = { inhalte };
