import { useGlobal } from "./useGlobal";
import { SearchBar } from "./SearchBar";
import { WordCard } from "./Card";
import { BackButton } from "./BackButton";
import { useMemo } from "react";
import type { Word } from "./api";
import { ThemeButton } from "./ThemeButton";

export function PageSearch() {
  const { query, setQuery, wordsQuery } = useGlobal();

  const wordIndex = useMemo(() => {
    const index = new Map<string, Word[]>();

    const words = wordsQuery?.data?.words ?? [];

    for (const word of words) {
      const key = word.hw;

      if (!index.has(key)) {
        index.set(key, []);
      }

      index.get(key)!.push(word);
    }

    return index;
  }, [wordsQuery?.data]);

  const results = wordIndex.get(query);

  return (
    <div className="bg-(--bg-secondary) min-h-dvh">
      <div className="bg-(--bg-primary) max-w-3xl m-auto min-h-dvh">
        <div className="p-4 sticky top-0 w-full bg-(--bg-primary) z-90 border-b border-(--line)">
          <div className="flex gap-4">
            <BackButton to="/" />
            <div className="flex-1">
              <SearchBar
                value={query}
                onChange={(val) => {
                  setQuery(val);
                }}
              />
            </div>
            <ThemeButton />
          </div>
        </div>

        <div className="p-4">
          {results?.map((w) => {
            return <WordCard word={w} />;
          })}
        </div>
      </div>
    </div>
  );
}
