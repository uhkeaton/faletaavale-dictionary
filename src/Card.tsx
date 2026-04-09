import type { Entry, Word } from "./api";
import { makeUnmarked } from "./orthography";
import { Orthography } from "./url";
import { useGlobal } from "./useGlobal";

export function WordCard({ word }: { word: Word }) {
  const { orthography } = useGlobal();

  return (
    <div className="p-4">
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
          <Entry entry={e} />
        ))}
      </div>
    </div>
  );
}

export function Entry({ entry }: { entry: Entry }) {
  return (
    <>
      <div className="flex gap-2">
        <div className="text-neutral-400">{entry.pos}</div>
        <div className="flex-1 text-lg opacity-75">
          {entry.defs.map((def) => {
            return <div>{def.text}</div>;
          })}
        </div>
      </div>
    </>
  );
}
