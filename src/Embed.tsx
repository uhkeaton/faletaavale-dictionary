import { useGlobal } from "./useGlobal";

export function Embed() {
  const { wordsQuery } = useGlobal();
  return <div>{JSON.stringify(wordsQuery.data?.words)}</div>;
}


