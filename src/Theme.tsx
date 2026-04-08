import { ThemeMode } from "./url";
import { useGlobal } from "./useGlobal";
import { useEffect, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

function applyThemeMode(mode: ThemeMode) {
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(mode);

  document.documentElement.setAttribute("data-theme", mode);
  document.documentElement.style.colorScheme = mode;
}

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useGlobal();
  const isDarkMode = theme === ThemeMode.dark;

  useEffect(() => {
    if (!document.documentElement) return;
    if (!document.body) return;
    applyThemeMode(isDarkMode ? ThemeMode.dark : ThemeMode.light);
  }, [isDarkMode]);

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
        },
      }),
    [isDarkMode],
  );
  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
}
