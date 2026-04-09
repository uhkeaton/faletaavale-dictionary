import { useGlobal } from "./useGlobal";
import { AutocompleteSearch } from "./AutocompleteSearch";
import { WordCard } from "./Card";
import { BackButton } from "./BackButton";
import { ThemeButton } from "./ThemeButton";
import { Hero } from "./Hero";
import { ResultCount } from "./ResultCount";

export function PageSearch() {
  const { results } = useGlobal();
  return (
    <Hero>
      <div className="min-h-dvh">
        <div className="bg-(--bg-primary) max-w-3xl m-auto min-h-dvh">
          <div className="p-4 sticky top-0 w-full bg-(--bg-primary) z-90 border-b border-(--line)">
            <div className="flex gap-4">
              <BackButton to="/" />
              <div className="flex-1">
                <AutocompleteSearch />
              </div>
              <ThemeButton />
            </div>
          </div>
          <ResultCount />
          <div className="p-4">
            {results?.map((w) => {
              return <WordCard word={w} />;
            })}
          </div>
        </div>
      </div>
    </Hero>
  );
}
