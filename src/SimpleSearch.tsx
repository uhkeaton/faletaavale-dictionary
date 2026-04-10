import { IconSearch } from "./IconSearch";
import { InputAdornment, TextField } from "@mui/material";
import { useGlobal } from "./useGlobal";

export function SimpleSearch() {
  const { query, setQuery } = useGlobal();
  return (
    <TextField
      className="w-full"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      slotProps={{
        input: {
          type: "search",
          style: { borderRadius: "40px" },
          startAdornment: (
            <InputAdornment position="start">
              <IconSearch className="ml-1 w-8" />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
