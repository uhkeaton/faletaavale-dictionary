import { Link } from "react-router";
import { useGlobal } from "./useGlobal";
import { SearchBar } from "./SearchBar";

export function PageSearch() {
  const { query, setQuery, wordsQuery } = useGlobal();
  return (
    <div className="p-4">
      <div>
        <SearchBar
          value={query}
          onChange={(val) => {
            setQuery(val);
          }}
        />
        <div className="p-4 text-blue-500 underline">
          <Link to="/info">info</Link>
        </div>
      </div>
      <div>
        {wordsQuery.data?.words?.map((w) => {
          return <div>{w.hw}</div>;
        })}
      </div>
    </div>
  );
}
