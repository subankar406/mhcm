import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Rich text lives in frontmatter as a Markdown string and is rendered with
 * `renderRichText` from `@/utils/markdown.ts`. The one exception is
 * "About Project", which is the file body so it stays comfortable to write.
 */
const richText = z.string();

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.object({
      /** Project name. */
      title: z.string(),
      /** Where the project stands, e.g. `Completed`. */
      status: z.string(),
      /** Short line under the title. */
      subtitle: z.string().optional(),
      /** Sort position, lowest first. */
      order: z.number(),
      /** Card and header image. */
      mainImage: image(),
      /** Town and state. */
      location: z.string(),
      /** Rich text sections. */
      challenges: richText.optional(),
      strategy: richText.optional(),
      execution: richText.optional(),
      result: richText.optional(),
      label: richText.optional(),
      /** Additional images, in display order. */
      gallery: z.array(image()).default([]),
      /** Industries this project belongs to. */
      relatedIndustries: z.array(reference("industries")).default([]),
      /** Services and pages this project relates to. */
      relatedServices: z.array(reference("globalCategories")).default([]),
    }),
});

const industries = defineCollection({
  loader: glob({ base: "./src/content/industries", pattern: "**/*.md" }),
  schema: z.object({
    /** Industry name. */
    title: z.string(),
  }),
});

const globalCategories = defineCollection({
  loader: glob({ base: "./src/content/global-categories", pattern: "**/*.md" }),
  schema: z.object({
    /** Page name. */
    title: z.string(),
    /** Route this page lives at, so references can link to it. */
    path: z.string(),
  }),
});

export const collections = { projects, industries, globalCategories };
