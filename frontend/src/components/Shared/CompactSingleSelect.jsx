import React, { useState, useRef, useEffect } from "react";

export default function CompactSingleSelect({
    label,
    options = [],
    selected = "",
    onChange,
    maxHeight = "160px"
}) {
    const [open, setOpen] = useState(false);
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

    const display = selected || "All";

    return (
        <div className="relative w-full" ref={ref}>
            <label className="text-[11px] text-emerald-200 block mb-1">
                {label}
            </label>

            <button
                className="w-full flex justify-between items-center bg-emerald-900 border border-emerald-700 rounded-md px-2 py-1 text-xs text-emerald-50 hover:bg-emerald-800"
                onClick={() => setOpen(o => !o)}
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
                    {options.map((opt) => (
                        <div
                            key={opt}
                            onClick={() => {
                                onChange(opt);
                                setOpen(false);
                            }}
                            className={`px-2 py-1 text-xs cursor-pointer hover:bg-emerald-800/40 flex items-center justify-between`}
                        >
                            <span className="text-emerald-100">{opt}</span>

                            {selected === opt && (
                                <span className="text-emerald-300 font-bold text-xs">●</span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
