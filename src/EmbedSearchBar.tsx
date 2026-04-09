import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { IconSearch } from "./IconSearch";

export function EmbedSearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="border rounded-full border-(--line) flex items-center py-0.5 px-1 bg-(--bg-base) drop-shadow-xl/2">
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <IconSearch className="w-6" />
      </IconButton>
      <InputBase
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        sx={{ ml: 1, flex: 1 }}
        placeholder={"Search"}
        inputProps={{
          "aria-label": "Search",
        }}
      />
    </div>
  );
}
