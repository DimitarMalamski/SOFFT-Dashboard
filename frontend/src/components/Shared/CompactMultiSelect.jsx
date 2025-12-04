import React, { useState, useRef, useEffect } from "react";

export default function CompactMultiSelect({
   label,
   options = [],
   selected = [],
   onChange,
   maxHeight = "160px",
}) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const ref = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredOptions = options
        .filter((opt) =>
            opt.toLowerCase().includes(query.toLowerCase())
        )
        .sort((a, b) => a.localeCompare(b));

    const toggleOption = (opt) => {
        if (selected.includes(opt)) {
            onChange(selected.filter(o => o !== opt));
        } else {
            onChange([...selected, opt]);
        }
    };

    const display =
        selected.length === 0 ? "All" : `${selected.length} selected`;

    return (
        <div className="relative w-full" ref={ref}>
            <label className="text-[11px] text-emerald-200 block mb-1">
                {label}
            </label>

            <button
                className="w-full flex justify-between items-center bg-emerald-900 border border-emerald-700 rounded-md px-2 py-1 text-xs text-emerald-50 hover:bg-emerald-800"
                onClick={() => {
                    setOpen(o => !o);
                    setQuery("");
                }}
                type="button"
            >
                <span>{display}</span>
                <span className="text-emerald-300">▾</span>
            </button>

            {open && (
                <div
                    className="absolute left-0 right-0 mt-1 bg-emerald-900 border border-emerald-700 rounded-md shadow-lg z-50"
                    style={{ maxHeight, overflowY: "auto" }}
                >
                    <input
                        className="w-full p-2 bg-emerald-800 text-emerald-100 border-b border-emerald-700 placeholder-emerald-300/40 text-xs focus:outline-none"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    {filteredOptions.length === 0 && (
                        <div className="p-2 text-xs text-emerald-300 italic">
                            No results
                        </div>
                    )}

                    {filteredOptions.map((opt) => (
                        <label
                            key={opt}
                            className="flex items-center gap-2 px-2 py-1 text-xs cursor-pointer hover:bg-emerald-800/40"
                        >
                            <input
                                type="checkbox"
                                checked={selected.includes(opt)}
                                onChange={() => toggleOption(opt)}
                                className="h-3 w-3 text-emerald-500"
                            />

                            <span
                                onClick={() => toggleOption(opt)}
                                className="text-emerald-100"
                            >
                                {opt}
                            </span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}
