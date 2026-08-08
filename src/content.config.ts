import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(4).max(120),
    description: z.string().min(20).max(300),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Ahron Darnell'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    heroImage: z.string().optional(),
    canonical: z.string().url().optional(),
  }),
});

const updates = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(4).max(120),
    description: z.string().min(20).max(300),
    pubDate: z.coerce.date(),
    author: z.string().default('Ahron Darnell'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, updates };
