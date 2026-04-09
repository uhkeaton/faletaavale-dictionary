import { viteDataUrl } from "./env";
import { z } from "zod";

export const DefinitionSchema = z.object({
  text: z.string(),
});

export const EntrySchema = z.object({
  pos: z.string(),
  defs: z.array(DefinitionSchema),
});
export type Entry = z.infer<typeof EntrySchema>;

export const WordSchema = z.object({
  hw: z.string(),
  entries: z.array(EntrySchema),
});
export type Word = z.infer<typeof WordSchema>;

export const DictionarySchema = z.object({
  words: z.array(WordSchema),
  attributionMarkdown: z.string(),
});

export type Dictionary = z.infer<typeof DictionarySchema>;

export async function fetchWords(): Promise<Dictionary> {
  const res = await fetch(viteDataUrl);
  const data = await res.json();

  const result = DictionarySchema.safeParse(data);

  if (!result.success) {
    console.error(result.error);
    throw new Error("Invalid dictionary response");
  }

  return result.data;
}
