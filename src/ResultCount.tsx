import { useGlobal } from "./useGlobal";

export function ResultCount({ source }: { source: "hw" | "body" }) {
  const { results, resultsEng, query } = useGlobal();
  if (source == "hw") {
    const len = (results || []).length;
    return (
      <div className="p-4 text-secondary text-lg">
        ({len}) {len == 1 ? "result" : "results"} for "{query}"
      </div>
    );
  }
  if (source == "body") {
    const len = (resultsEng || []).length;
    return (
      <div className="p-4 text-secondary text-lg">
        ({len}) {len == 1 ? "result (en)" : "results (en)"} for "{query}"
      </div>
    );
  }
  return <></>;
}
