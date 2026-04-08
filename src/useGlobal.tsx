import React, { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router";
import type { Orthography, ThemeMode } from "./url";
import { useQuery } from "@tanstack/react-query";

type GlobalContextType = ReturnType<typeof useGlobalContext>;

function useGlobalContext() {
  const wordsQuery = useQuery({
    queryKey: ["words"],
    queryFn: () => ({ words: [] }),
  });

  const [query, setQuery] = useState("");

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
