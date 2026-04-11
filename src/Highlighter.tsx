function splitMatches(str: string, query: string) {
  if (!query) return [str];

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // escape regex
  const regex = new RegExp(`(${escaped})`, "gi");

  return str.split(regex);
}

export function Highlighter({ text, q }: { text: string; q: string }) {
  const parts = splitMatches(text, q);

  return (
    <span>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="hl-yellow">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  );
}
