import React from "react";

export default function LayoutButton({ active, onClick, title, icon: Icon }) {
    return (
        <button
            onClick={onClick}
            title={title}
            className={`p-2 rounded-lg border transition ${
                active
                    ? "bg-emerald-700/40 border-emerald-500"
                    : "bg-transparent border-emerald-800 hover:border-emerald-600"
            }`}
        >
            <Icon className="w-5 h-5 text-emerald-200" />
        </button>
    );
}
