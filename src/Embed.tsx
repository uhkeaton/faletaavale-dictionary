import { Markdown } from "./Markdown";
import { useGlobal } from "./useGlobal";

export function Embed() {
  const { wordsQuery } = useGlobal();
  return (
    <div>
      <div>
        {wordsQuery.data?.words?.map((w) => {
          return <div>{w.hw}</div>;
        })}
      </div>
      {wordsQuery.data?.attributionMarkdown && (
        <div>
          <Markdown markdown={wordsQuery.data?.attributionMarkdown} />
        </div>
      )}
    </div>
  );
}
