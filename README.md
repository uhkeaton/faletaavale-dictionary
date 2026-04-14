# Faletaavale Dictionary

![Mt. Alava Trail – Aualasopo i Alava](https://pub-04fc8b0f269346dc866259c95ea2ff25.r2.dev/talo-hero.jpg)

[Mt. Alava Trail – Aualasopo i Alava](https://www.nps.gov/npsa/planyourvisit/mt-alava-trail-aualasopo-i-alava.htm) Photo Credit: Keaton Williamson

# Search Logic

```
1. The following are ignored:
-  Faamamafa & Koma Liliu
- ʻOkina & Kahakō
- Case

Paying attention to the ʻOkina and Kahakō seems more valuable in a corpus search (where the intent is probably different) than in a dictionary search, since usually there are not too many variants to sort through in a dictionary seach result when these elements are ignored

2. Only the first 5 letters of a query are considered.
- A noticed drawback is that searching "faama…" will return too many results because "faa" is a common prefix, and its not possible to narrow when only 5 characters are considered, this could be handled as an edge case later, along with "hoo" in Hawaiian
- A noticed positive is that more results show up for similar sounding words. Searching "taitai" will return taʻitasi and taʻitaʻi 
- Searching "ausetalasdf" will still return "‘Ausetālia", which seems okay

3. Search is constant time
- A "word" record contains entries for i‘a, ia, iā, etc…
- a word index is built {"ia" => i‘a, ia, iā, "pai" => pai, paʻi}
- a ngram index is built from (n=2 … n=5). Example if n=3: {"pai" => pai, paia, pailate, paina apainu, papai, vaipaipa, fale paito}
- searching "Paʻi" will go to the ngram index first ("pai"), and for each string in the list, access the word index to get words in constant time
```

# Communication with Parent application


### The intended parent application can be found here [Kakau Reader](https://github.com/uhkeaton/kakau-reader)


Faletaavale Dictionary can be run normally as a standalone app, or can be embedded as an iframe in a parent application and controlled that way.


The embedded app is at http://localhost:2001/embed (in dev mode)

Here is the logic to communicate with the parent.
```js
import { useEffect, useRef } from "react";
import { viteAllowedParentOrigins } from "./env";
import { useGlobal } from "./useGlobal";

export function useParentListener() {
  const { query, setQuery, setTheme } = useGlobal();

  const prevSuccessfulQuery = useRef(query);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      const allowedOrigins = viteAllowedParentOrigins;

      // donʻt allow unknown origins
      if (!allowedOrigins.includes(event.origin)) return;

      const newQuery = event.data.query;

      if (event.data?.type === "SET_QUERY") {
        setQuery(newQuery);
        // notify parent window when the query finishes
        // so the parent knows when to show the loaded UI
        // (happening almost instantly in the current search implementation, so safe to call right away)
        if (prevSuccessfulQuery.current != newQuery) {
          window.parent.postMessage({ type: "DICTIONARY_SUCCESS" }, "*");
        }
        prevSuccessfulQuery.current = newQuery;
      }

      if (event.data?.type === "SET_THEME") {
        const theme = event.data.theme;
        setTheme(theme);
      }
    }

    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  }, [setQuery, setTheme]);
}

```
# .env

Example .env

*.env* 
```

VITE_DATA_URL=<the url where dictionary data is hosted>

# the url of the parent application
VITE_ALLOWED_PARENT_ORIGINS=["http://localhost:5174", "http://localhost:1822"]
```

Example dictionary response:

```json
{
  "words": [
    {
      "hw": "moana",
      "entries": [{ "pos": "n.", "defs": [{ "text": "ocean" }] }]
    },
    {
      "hw": "aloha",
      "entries": [{ "pos": "n.", "defs": [{ "text": "hello" }] }]
    },
    {
      "hw": "nui",
      "entries": [{ "pos": "adj.", "defs": [{ "text": "big" }] }]
    },
    {
      "hw": "faletaavale",
      "entries": [{ "pos": "n.", "defs": [{ "text": "garage" }] }]
    }
  ],
  "attributionMarkdown": "This is an example."
}

```

