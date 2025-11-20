import React from "react";

export default function LayoutButton({ active, onClick, title, icon }) {
    const Icon = icon;
    return (
        <button
            onClick={onClick}
            title={title}
            className={`p-2 rounded-lg border transition ${
                active
                    ? "bg-emerald-700/50 border-emerald-500 shadow-md"
                    : "bg-transparent border-emerald-800 hover:border-emerald-600"
            }`}
        >
            <Icon className="w-5 h-5 text-emerald-100" />
        </button>
    );
}
