import { useGlobal } from "./useGlobal";

export function ResultCount() {
  const { query, wordIndex } = useGlobal();
  const results = wordIndex.get(query);
  const len = (results || []).length;
  return (
    <div className="p-4 text-secondary text-lg">
      ({len}) {len == 1 ? "result" : "results"} for "{query}"
    </div>
  );
}
