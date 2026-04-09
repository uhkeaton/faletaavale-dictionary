import { IconSearch } from "./IconSearch";
import { InputAdornment, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useGlobal } from "./useGlobal";
import { useMemo } from "react";

export function AutocompleteSearch() {
  const { query, setQuery, wordsQuery } = useGlobal();

  const autocompleteOptions = useMemo(() => {
    return (wordsQuery?.data?.words ?? [])?.map((i) => ({ title: i.hw }));
  }, [wordsQuery?.data]);

  return (
    <Autocomplete
      value={query}
      onChange={(_, newValue) => {
        if (typeof newValue === "string") {
          setQuery(newValue);
        } else if (newValue) {
          setQuery(newValue.title);
        } else {
          setQuery("");
        }
      }}
      freeSolo
      options={autocompleteOptions}
      disableClearable
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            slotProps={{
              ...params.slotProps,
              input: {
                ...params.slotProps.input,
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
      }}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.title
      }
      // this demo demonstrates how the value parameter can be either an object (same type as option) or a string
      // it could become a string if, for example, you press "Enter" in the input field
      isOptionEqualToValue={(option, value) => {
        if (typeof value === "string") {
          return option.title === value;
        }
        return option.title === value.title;
      }}
    />
  );
}
