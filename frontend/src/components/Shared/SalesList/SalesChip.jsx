import React from "react";

export default function SalesChip({ name }) {
    return (
        <span
            className="px-2 py-0.5 bg-emerald-800/60 border border-emerald-700
                       text-emerald-100 text-xs rounded-full whitespace-nowrap"
        >
            {name}
        </span>
    );
}