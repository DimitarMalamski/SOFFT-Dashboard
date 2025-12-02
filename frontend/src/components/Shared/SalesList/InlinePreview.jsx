import React from "react";
import SalesChip from "./SalesChip.jsx";

export default function InlinePreview({ people, limit, onOpen }) {
    const visible = people.slice(0, limit);
    const hidden = people.length - limit;

    return (
        <span className="inline-flex flex-wrap gap-1 items-center">
            {visible.map((p, i) => (
                <SalesChip key={i} name={p.name} />
            ))}

            {hidden > 0 && (
                <button
                    className="text-emerald-300 text-xs px-2 py-0.5 border border-emerald-700
                               rounded-full hover:bg-emerald-800/40 transition"
                    onClick={onOpen}
                >
                    +{hidden}
                </button>
            )}
        </span>
    );
}