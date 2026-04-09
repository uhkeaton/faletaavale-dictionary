import { Link } from "react-router";
import { Markdown } from "./Markdown";
import { useGlobal } from "./useGlobal";

export function PageInfo() {
  const { wordsQuery } = useGlobal();
  return (
    <div className="p-4">
      <div className="flex justify-between w-full">
        <div className="p-4 text-blue-500 underline">
          <Link to="/search">Back</Link>
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
