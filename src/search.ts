import type { Word } from "./api";
import { removeDiacritics } from "./orthography";

export function buildWordIndexes(words: Word[]): Record<string, Word[]> {
  const index = new Map<string, Word[]>();

  for (const word of words) {
    const key = toIndex(word.hw);

    if (!index.has(key)) {
      index.set(key, []);
    }

    index.get(key)!.push(word);
  }

  const serializable = Object.fromEntries(index);
  return serializable;
}

export function toIndex(str: string) {
  return removeDiacritics(str).toLowerCase();
}

const MIN_GRAMS = 2;
export const MAX_GRAMS = 5;
export function buildNGramIndex(
  wordIndex: ReturnType<typeof buildWordIndexes>,
) {
  const index = new Map<string, string[]>();

  for (const key of Object.keys(wordIndex)) {
    const grams = [
      ...getNGrams(key, MIN_GRAMS),
      ...getNGrams(key, 3),
      ...getNGrams(key, 4),
      ...getNGrams(key, MAX_GRAMS),
    ];

    for (const gram of grams) {
      if (!index.has(gram)) {
        index.set(gram, []);
      }

      index.get(gram)!.push(key);
    }
  }
  const serializable = Object.fromEntries(index);
  return serializable;
}

function getNGrams(word: string, n = 3): string[] {
  const normalized = toIndex(word);
  const grams: string[] = [];

  for (let i = 0; i <= normalized.length - n; i++) {
    grams.push(normalized.slice(i, i + n));
  }

  return grams;
}
