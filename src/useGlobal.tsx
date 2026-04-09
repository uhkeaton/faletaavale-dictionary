import React, { createContext, useContext, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import type { Orthography, ThemeMode } from "./url";
import { useQuery } from "@tanstack/react-query";
import { fetchWords, type Dictionary, type Word } from "./api";
import { removeDiacritics } from "./orthography";

type GlobalContextType = ReturnType<typeof useGlobalContext>;

function toIdx(str: string) {
  return removeDiacritics(str).toLowerCase();
}

function useGlobalContext() {
  const wordsQuery = useQuery<Dictionary>({
    queryKey: ["words"],
    queryFn: fetchWords,
  });

  const [query, setQuery] = useState("");

  const wordIndex = useMemo(() => {
    const index = new Map<string, Word[]>();

    const words = wordsQuery?.data?.words ?? [];

    for (const word of words) {
      const key = toIdx(word.hw);

      if (!index.has(key)) {
        index.set(key, []);
      }

      index.get(key)!.push(word);
    }

    return index;
  }, [wordsQuery?.data]);

  const results = wordIndex.get(toIdx(query));

  const [searchParams, setSearchParams] = useSearchParams();

  const orthography: Orthography =
    (searchParams.get("orthography") as Orthography) || "marked";

  function setOrthography(value: Orthography) {
    setSearchParams((searchParams) => {
      searchParams.set("orthography", value);
      return searchParams;
    });
  }

  const theme: ThemeMode = (searchParams.get("theme") as ThemeMode) || "light";

  function setTheme(value: ThemeMode) {
    setSearchParams((searchParams) => {
      searchParams.set("theme", value);
      return searchParams;
    });
  }

  return {
    orthography,
    setOrthography,
    theme,
    setTheme,
    query,
    setQuery,
    wordsQuery,
    results,
  };
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const ctx = useGlobalContext();
  return (
    <GlobalContext.Provider value={ctx}>{children}</GlobalContext.Provider>
  );
};

// eslint-disable-next-line
export const useGlobal = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within an GlobalProvider");
  }
  return context;
};
