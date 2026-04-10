import { viteDataUrl } from "./env";
import { z } from "zod";
import { buildNGramIndex, buildWordIndexes } from "./search";

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

export async function fetchDictionary(): Promise<Dictionary> {
  const res = await fetch(viteDataUrl);
  const data = await res.json();

  const result = DictionarySchema.safeParse(data);

  if (!result.success) {
    console.error(result.error);
    throw new Error("Invalid dictionary response");
  }

  return result.data;
}

export type SearchableIndexes = {
  wordIndexes: Record<string, Word[]>;
  nGramIndexes: Record<string, string[]>;
};

export async function buildSearchableDictionary(): Promise<
  Dictionary & SearchableIndexes
> {
  const dictionary = await fetchDictionary();

  const words = dictionary.words ?? [];
  const wordIndexes = buildWordIndexes(words);
  const nGramIndexes = buildNGramIndex(wordIndexes);

  return {
    words: words,
    attributionMarkdown: dictionary.attributionMarkdown,
    wordIndexes: wordIndexes,
    nGramIndexes: nGramIndexes,
  };
}
