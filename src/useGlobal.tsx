import React, { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router";
import type { Orthography, ThemeMode } from "./url";
import { useQuery } from "@tanstack/react-query";
import {
  buildSearchableDictionary,
  type Dictionary,
  type SearchableIndexes,
} from "./api";
import { MAX_GRAMS, toIndex } from "./search";

type GlobalContextType = ReturnType<typeof useGlobalContext>;

function useGlobalContext() {
  const wordsQuery = useQuery<Dictionary & SearchableIndexes>({
    queryKey: ["words"],
    queryFn: buildSearchableDictionary,
  });

  const [query, setQuery] = useState("");
  const q = toIndex(query);

  const wordIndexes = wordsQuery?.data?.wordIndexes ?? {};
  const nGramIndexes = wordsQuery?.data?.nGramIndexes ?? {};
  const nGramEngIndexes = wordsQuery?.data?.nGramEngIndexes ?? {};

  // only consider first 5 letters of query
  const qIndexes = nGramIndexes[q.slice(0, MAX_GRAMS)] ?? [];
  const qEngIndexes = nGramEngIndexes[q.slice(0, MAX_GRAMS)] ?? [];

  // for words longer than 5 grams, or whatever the upper limit,
  // make sure can directly get word with query as an index itself
  if (!qIndexes.includes(q)) qIndexes.push(q);

  const results = (qIndexes ?? [])
    // sory by position of query in word
    .sort((a, b) => a.indexOf(q) - b.indexOf(q))
    .map((index) => {
      return wordIndexes[index];
    })
    .filter(Boolean)
    .flat();

  const resultsEng = (qEngIndexes ?? [])
    // sory by position of query in word
    .sort((a, b) => a.indexOf(q) - b.indexOf(q))
    .map((index) => {
      return wordIndexes[index];
    })
    .filter(Boolean)
    .flat();

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
    resultsEng,
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
