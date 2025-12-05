import React, { useState, useRef, useEffect } from "react";

export default function ChartSelector({ selectedChart, setSelectedChart, chartOptions }) {
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

    const active = chartOptions.find((o) => o.value === selectedChart);
    const FallbackIcon = () => <span />;
    const ActiveIcon = active?.icon || FallbackIcon;

    return (
        <div className="relative flex flex-col gap-1" ref={ref}>
            <label className="text-xs font-medium text-emerald-200">
                Select chart
            </label>

            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                className="
                    flex items-center justify-between
                    bg-emerald-900 border border-emerald-700 rounded-md
                    px-3 py-1.5 h-[32px] text-xs text-emerald-50
                    hover:bg-emerald-800 transition
                "
            >
                <span className="flex items-center gap-2">
                    <ActiveIcon size={14} className="text-emerald-300" />
                    {active.label}
                </span>

                <span className="text-emerald-300">▾</span>
            </button>

            {open && (
                <div className="
                    absolute mt-1 w-full z-50
                    bg-emerald-900 border border-emerald-700 rounded-md shadow-lg
                ">
                    {chartOptions.map((opt) => {
                        const Icon = opt.icon || FallbackIcon;

                        return (
                            <button
                                key={opt.value}
                                onClick={() => {
                                    setSelectedChart(opt.value);
                                    setOpen(false);
                                }}
                                className="
                                    w-full flex items-center gap-2 text-left
                                    px-3 py-2 text-xs text-emerald-50
                                    hover:bg-emerald-800 transition
                                "
                            >
                                <Icon size={14} className="text-emerald-300" />
                                {opt.label}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
