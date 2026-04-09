import { useEffect } from "react";
import { viteAllowedParentOrigins } from "./env";
import { useGlobal } from "./useGlobal";

export function useParentListener() {
  const { setQuery, setTheme } = useGlobal();
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      const allowedOrigins = viteAllowedParentOrigins;

      // donʻt allow unknown origins
      if (!allowedOrigins.includes(event.origin)) return;

      if (event.data?.type === "SET_QUERY") {
        const query = event.data.query;
        setQuery(query);
      }

      if (event.data?.type === "SET_THEME") {
        const theme = event.data.theme;
        setTheme(theme);
      }
    }

    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  }, []);
}
