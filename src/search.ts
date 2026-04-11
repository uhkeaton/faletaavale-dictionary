import type { Word } from "./api";
import { removeDiacritics } from "./orthography";

// Helpers
export function toIndex(str: string) {
  return removeDiacritics(str).toLowerCase();
}

function getNGrams(word: string, n = 3): string[] {
  const normalized = toIndex(word);
  const grams: string[] = [];

  for (let i = 0; i <= normalized.length - n; i++) {
    grams.push(normalized.slice(i, i + n));
  }

  return grams;
}

// Indexes
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

const MIN_GRAMS = 2;
export const MAX_GRAMS = 5;
export function buildNGramIndexes(
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

      if (!index.get(gram)?.includes(key)) {
        index.get(gram)!.push(key);
      }
    }
  }
  const serializable = Object.fromEntries(index);
  return serializable;
}

// English Indexes
const MIN_ENG_GRAMS = 2;
export const MAX_ENG_GRAMS = 5;
export function buildNGramEnglishIndexes(
  wordIndex: ReturnType<typeof buildWordIndexes>,
) {
  const index = new Map<string, string[]>();

  for (const [key, words] of Object.entries(wordIndex)) {
    for (const word of words) {
      const engTokens = word.entries
        .map((e) => e.defs)
        .flat()
        .map((d) => d.text.split(" "))
        .flat()
        // lowercase and letters only
        .map((str) => str.toLowerCase().replace(/[^a-z]/g, ""))
        .filter(Boolean);
      for (const token of engTokens) {
        const grams = [
          ...getNGrams(token, MIN_ENG_GRAMS),
          ...getNGrams(token, 3),
          ...getNGrams(token, 4),
          ...getNGrams(token, MAX_ENG_GRAMS),
        ];

        for (const gram of grams) {
          if (!index.has(gram)) {
            index.set(gram, []);
          }
          if (!index.get(gram)?.includes(key)) {
            index.get(gram)!.push(key);
          }
        }
      }
    }
  }
  const serializable = Object.fromEntries(index);
  return serializable;
}
