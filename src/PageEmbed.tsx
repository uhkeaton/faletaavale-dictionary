import { useGlobal } from "./useGlobal";
import { WordCard } from "./Card";
import { IconArrowBack } from "./BackButton";
import { useState } from "react";
import { Markdown } from "./Markdown";
import { IconInfo } from "./IconInfo";
import { EmbedSearchBar } from "./EmbedSearchBar";
import { useParentListener } from "./useParentListener";

export function PageEmbed() {
  useParentListener();
  const [showInfo, setShowInfo] = useState(false);
  const { query, setQuery, wordsQuery, wordIndex } = useGlobal();

  const results = wordIndex.get(query);

  if (showInfo) {
    return (
      <div className="p-4">
        <div className="flex justify-between w-full">
          <div
            onClick={() => setShowInfo(false)}
            className="p-4 flex gap-2 opacity-50 hover:opacity-100 cursor-pointer"
          >
            <IconArrowBack className="w-8" />
          </div>
        </div>
        <div className="p-4">
          {wordsQuery.data?.attributionMarkdown && (
            <div>
              <Markdown markdown={wordsQuery.data?.attributionMarkdown} />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-(--bg-base) min-h-dvh w-full h-full">
      <div className="p-4 sticky top-0 w-full bg-(--bg-base) z-90 border-b border-(--line)">
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <EmbedSearchBar
              value={query}
              onChange={(val) => {
                setQuery(val);
              }}
            />
          </div>
          <div
            className="opacity-50 hover:opacity-100 cursor-pointer"
            onClick={() => setShowInfo(true)}
          >
            <IconInfo className="w-8" />
          </div>
        </div>
      </div>

      <div className="p-4">
        {results?.map((w) => {
          return <WordCard word={w} />;
        })}
      </div>
    </div>
  );
}
