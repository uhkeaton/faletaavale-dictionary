import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { GlobalProvider } from "./useGlobal.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeWrapper } from "./Theme.tsx";
import { PageSearch } from "./PageSearch.tsx";
import { PageHome } from "./PageHome.tsx";
import { PageInfo } from "./PageInfo.tsx";
import { PageList } from "./PageList.tsx";
import { PageEmbed } from "./PageEmbed.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          <ThemeWrapper>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<PageHome />} />
                <Route path="/search" element={<PageSearch />} />
                <Route path="/list" element={<PageList />} />
                <Route path="/info" element={<PageInfo />} />
                <Route path="/embed" element={<PageEmbed />} />
              </Route>
            </Routes>
          </ThemeWrapper>
        </GlobalProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
