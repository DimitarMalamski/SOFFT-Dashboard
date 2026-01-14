import React, { useState, useRef, useEffect } from "react";

export default function MultiSelectDropdown({
    label,
    options,
    selected = [],
    onChange,
    ...props
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

    const filteredOptions = options.filter((opt) =>
        opt.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => a.localeCompare(b));

    function toggleOption(opt) {
        if (selected.includes(opt)) {
            onChange(selected.filter((o) => o !== opt));
        } else {
            onChange([...selected, opt]);
        }
    }

    // Display text in top bar
    const display = selected.length === 0 ? "All" : `${selected.length} selected`;

    return (
        <div className="flex flex-col relative min-w-[220px]" ref={ref}>
            <label className="text-xs mb-1 text-emerald-200">{label}</label>

            <div
                onClick={() => setOpen((o) => !o)}
                className="p-2 bg-emerald-900 border border-emerald-700 text-emerald-50 rounded-md cursor-pointer"
                data-testid={`${label.toLowerCase().replace(/\s+/g, "-")}-dropdown`}
            >
                {display}
            </div>

            {open && (
                <div className="absolute z-50 mt-1 w-full bg-emerald-900 border border-emerald-700 rounded-md shadow-lg">

                    <input
                        className="w-full p-2 bg-emerald-800 text-emerald-100 border-b border-emerald-700 placeholder-emerald-300/40 focus:outline-none"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    {/* List */}
                    <div className="max-h-60 overflow-y-auto">
                        {filteredOptions.length === 0 && (
                            <div className="p-2 text-sm text-emerald-300 italic">
                                No results
                            </div>
                        )}

                        {filteredOptions.map((opt) => (
                            <label
                                key={opt}
                                className="flex items-center gap-2 p-2 cursor-pointer hover:bg-emerald-700/30"
                            >
                                <input
                                    type="checkbox"
                                    checked={selected.includes(opt)}
                                    onChange={() => toggleOption(opt)}
                                    className="form-checkbox text-emerald-500"
                                />
                                <span className="text-emerald-100 text-sm">{opt}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
