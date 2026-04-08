import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { GlobalProvider } from "./useGlobal.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeWrapper } from "./Theme.tsx";
import { Embed } from "./Embed.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          <ThemeWrapper>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<div>Home</div>} />
                <Route path="/embed" element={<Embed />} />
              </Route>
            </Routes>
          </ThemeWrapper>
        </GlobalProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
