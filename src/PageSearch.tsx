import { useGlobal } from "./useGlobal";
import { SimpleSearch } from "./SimpleSearch";
import { WordCard } from "./Card";
import { BackButton } from "./BackButton";
import { ThemeButton } from "./ThemeButton";
import { Hero } from "./Hero";
import { ResultCount } from "./ResultCount";

const MAX_RENDERED_RESULTS = 100;
export function PageSearch() {
  const { results, resultsEng } = useGlobal();
  return (
    <Hero>
      <div className="min-h-dvh">
        <div className="bg-(--bg-primary) max-w-3xl m-auto min-h-dvh">
          <div className="p-4 sticky top-0 w-full bg-(--bg-primary) z-90 border-b border-(--line)">
            <div className="flex gap-4">
              <BackButton to="/" />
              <div className="flex-1">
                <SimpleSearch />
              </div>
              <ThemeButton />
            </div>
          </div>
          <ResultCount source="hw" />
          <div className="p-4">
            {results.slice(0, MAX_RENDERED_RESULTS).map((w) => {
              return <WordCard word={w} />;
            })}
            {results.length > MAX_RENDERED_RESULTS && (
              <div className="w-full p-4">
                <div className="m-auto w-fit text-secondary">
                  + {results.length - MAX_RENDERED_RESULTS} more results
                </div>
              </div>
            )}
          </div>
          <div className="border-b border-(--line)"></div>
          <ResultCount source="body" />
          <div className="p-4">
            {resultsEng.slice(0, MAX_RENDERED_RESULTS).map((w) => {
              return <WordCard word={w} />;
            })}
            {resultsEng.length > MAX_RENDERED_RESULTS && (
              <div className="w-full p-4">
                <div className="m-auto w-fit text-secondary">
                  + {resultsEng.length - MAX_RENDERED_RESULTS} more results
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Hero>
  );
}
