import React, { useState, useRef, useEffect } from "react";

export default function SingleSelectDropdown({
 label,
 options = [],
 selected = "",
 onChange,
 ...props
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
        <div className="flex flex-col relative min-w-[220px]" ref={ref}>
            <label className="text-xs mb-1 text-emerald-200">{label}</label>

            {/* MATCHING MULTISELECT TOP BAR */}
            <div
                onClick={() => setOpen(o => !o)}
                className="p-2 bg-emerald-900 border border-emerald-700 text-emerald-50 rounded-md cursor-pointer"
                data-testid={props["data-testid"]}
            >
                {display}
            </div>

            {open && (
                <div className="absolute z-50 mt-1 w-full bg-emerald-900 border border-emerald-700 rounded-md shadow-lg">

                    <div className="max-h-60 overflow-y-auto">
                        {options.map(opt => (
                            <div
                                key={opt}
                                onClick={() => {
                                    onChange(opt);
                                    setOpen(false);
                                }}
                                className="flex items-center justify-between p-2 cursor-pointer hover:bg-emerald-700/30"
                            >
                                <span className="text-emerald-100 text-sm">{opt}</span>

                                {selected === opt && (
                                    <span className="text-emerald-300 text-xs font-bold">●</span>
                                )}
                            </div>
                        ))}
                    </div>

                </div>
            )}
        </div>
    );
}
