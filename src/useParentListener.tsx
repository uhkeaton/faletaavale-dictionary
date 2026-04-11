import { useEffect, useRef } from "react";
import { viteAllowedParentOrigins } from "./env";
import { useGlobal } from "./useGlobal";

export function useParentListener() {
  const { query, setQuery, setTheme } = useGlobal();

  const prevSuccessfulQuery = useRef(query);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      const allowedOrigins = viteAllowedParentOrigins;

      // donʻt allow unknown origins
      if (!allowedOrigins.includes(event.origin)) return;

      const newQuery = event.data.query;

      if (event.data?.type === "SET_QUERY") {
        setQuery(newQuery);
        // notify parent window when the query finishes
        // so the parent knows when to show the loaded UI
        // (happening almost instantly in the current search implementation, so safe to call right away)
        if (prevSuccessfulQuery.current != newQuery) {
          window.parent.postMessage({ type: "DICTIONARY_SUCCESS" }, "*");
        }
        prevSuccessfulQuery.current = newQuery;
      }

      if (event.data?.type === "SET_THEME") {
        const theme = event.data.theme;
        setTheme(theme);
      }
    }

    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  }, [setQuery, setTheme]);
}
