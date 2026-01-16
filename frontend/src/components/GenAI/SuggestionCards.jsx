export default function SuggestionCards({ suggestions, onSelect, variant }) {
  const baseCard =
    "cursor-pointer px-4 py-3 rounded-xl bg-emerald-800/60 hover:bg-emerald-700 transition text-sm";

  if (variant === "sidebar") {
    return (
      <div className="w-64 shrink-0 border-l border-emerald-800/40 pl-4">
        <h3 className="text-sm text-emerald-300 mb-3">Suggestions</h3>
        <div className="flex flex-col gap-2">
          {suggestions.map((s, i) => (
            <div key={i} className={baseCard} onClick={() => onSelect(s)}>
              {s}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mt-10">
      {suggestions.map((s, i) => (
        <div key={i} className={baseCard} onClick={() => onSelect(s)}>
          {s}
        </div>
      ))}
    </div>
  );
}