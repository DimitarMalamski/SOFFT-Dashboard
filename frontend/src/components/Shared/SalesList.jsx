import React, { useState } from "react";

export default function SalesList({ people = [], limit = 3 }) {
    const [expanded, setExpanded] = useState(false);

    if (!people || people.length === 0) {
        return <span>N/A</span>;
    }

    const visible = expanded ? people : people.slice(0, limit);
    const hiddenCount = people.length - limit;

    return (
        <span>
            {visible.map((p, i) => (
                <span key={i}>
                    {p.name}
                    {i < visible.length - 1 && ", "}
                </span>
            ))}

            {!expanded && hiddenCount > 0 && (
                <span
                    className="text-emerald-300 cursor-pointer ml-1"
                    onClick={() => setExpanded(true)}
                >
                    +{hiddenCount} more
                </span>
            )}

            {expanded && (
                <span
                    className="text-emerald-300 cursor-pointer ml-1"
                    onClick={() => setExpanded(false)}
                >
                    show less
                </span>
            )}
        </span>
    );
}
