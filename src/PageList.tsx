import { useGlobal } from "./useGlobal";
import { WordCard } from "./Card";
import { BackButton } from "./BackButton";
import { ThemeButton } from "./ThemeButton";
import { Hero } from "./Hero";

export function PageList() {
  const { wordsQuery } = useGlobal();
  return (
    <Hero>
      <div className="sticky top-0 w-full z-90">
        <div className="p-4 max-w-3xl m-auto flex justify-between bg-(--bg-primary) border-b border-(--line)">
          <BackButton to={"/"} />
          <ThemeButton />
        </div>
      </div>
      <div className="max-w-3xl m-auto p-4 bg-(--bg-primary)">
        {wordsQuery.data?.words?.map((w) => {
          return <WordCard word={w} highlight={false} />;
        })}
      </div>
    </Hero>
  );
}
