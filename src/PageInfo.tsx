import { Markdown } from "./Markdown";
import { useGlobal } from "./useGlobal";
import { BackButton } from "./BackButton";
import { ThemeButton } from "./ThemeButton";

export function PageInfo() {
  const { wordsQuery } = useGlobal();
  return (
    <div className="bg-(--bg-secondary) min-h-dvh">
      <div className="bg-(--bg-primary) max-w-3xl m-auto min-h-dvh">
        <div className="flex justify-between w-full">
          <div className="p-4 flex gap-2">
            <BackButton to={"/"} text="Back" />
          </div>
          <div className="p-4 flex gap-2">
            <ThemeButton />
          </div>
        </div>
        <div className="p-8">
          {wordsQuery.data?.attributionMarkdown && (
            <div>
              <Markdown markdown={wordsQuery.data?.attributionMarkdown} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
