import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    heroImage: z.string(),
    heroAlt: z.string(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    slug: z.string().optional()
  })
});

export const collections = { posts };
