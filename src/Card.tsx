import type { Entry, Word } from "./api";
import { Highlighter } from "./Highlighter";
import { makeUnmarked } from "./orthography";
import { Orthography } from "./url";
import { useGlobal } from "./useGlobal";

export function WordCard({
  word,
  highlight,
}: {
  word: Word;
  highlight: boolean;
}) {
  const { orthography } = useGlobal();

  return (
    <div className="p-3">
      <div className="mb-2 flex flex-wrap items-end gap-x-2">
        <div className={"align-baseline lexend-500 text-2xl"}>
          {orthography === Orthography.unmarked
            ? makeUnmarked(word.hw)
            : word.hw}
        </div>
        {orthography === Orthography.unmarked && (
          <div className="align-baseline text-xl text-neutral-400">
            {word.hw}
          </div>
        )}
      </div>
      <div>
        {word.entries.map((e) => (
          <Entry entry={e} highlight={highlight} />
        ))}
      </div>
    </div>
  );
}

export function Entry({
  entry,
  highlight,
}: {
  entry: Entry;
  highlight: boolean;
}) {
  const { query } = useGlobal();
  return (
    <>
      <div className="flex gap-2 mb-2">
        <div className="text-neutral-400">{entry.pos}</div>
        <div className="flex-1 text-lg opacity-75">
          {entry.defs.map((def) => {
            return (
              <div>
                {highlight && <Highlighter text={def.text} q={query} />}
                {!highlight && <>{def.text}</>}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
