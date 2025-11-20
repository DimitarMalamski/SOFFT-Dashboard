import React from "react";

export default function Dropdown({ label, value, onChange, options }) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-emerald-950/70 border border-emerald-800 text-emerald-100 text-sm rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        >
            <option value="">{`All ${label.toLowerCase()}`}</option>
            {options.map((opt) => (
                <option key={opt} value={opt}>
                    {opt}
                </option>
            ))}
        </select>
    );
}
