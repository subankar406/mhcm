import { createSatteriMarkdownProcessor } from "@astrojs/markdown-satteri";

type Processor = Awaited<ReturnType<typeof createSatteriMarkdownProcessor>>;

let processor: Promise<Processor> | undefined;

/**
 * Renders a Markdown string from frontmatter to HTML. Content collections
 * only render a file's body, so rich text fields go through here instead.
 */
export async function renderRichText(markdown?: string): Promise<string> {
  if (!markdown?.trim()) return "";
  processor ??= createSatteriMarkdownProcessor({});
  const { code } = await (await processor).render(markdown);
  return code;
}
