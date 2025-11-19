import React, { useState } from "react";

export default function SalesModal({ people, onClose }) {
    const [query, setQuery] = useState("");

    const filtered = people.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-emerald-900 p-5 rounded-xl border border-emerald-700 max-w-md w-full">
                <h3 className="text-emerald-100 font-semibold mb-3">
                    All Salespeople
                </h3>

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search salespeople..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full px-3 py-2 mb-3 rounded-md bg-emerald-800/50
                               border border-emerald-700 text-emerald-100
                               placeholder-emerald-300/40
                               focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />

                {/* Scrollable list */}
                <div className="max-h-80 overflow-y-auto space-y-1 pr-2">
                    {filtered.length > 0 ? (
                        filtered.map((p, i) => (
                            <div
                                key={i}
                                className="px-2 py-1 bg-emerald-800/40 rounded
                                           border border-emerald-700 text-emerald-100 text-sm"
                            >
                                {p.name}
                            </div>
                        ))
                    ) : (
                        <p className="text-emerald-300 text-sm italic py-4 text-center">
                            No results found
                        </p>
                    )}
                </div>

                {/* Close button */}
                <button
                    className="mt-4 w-full py-2 bg-emerald-700 text-emerald-100 rounded
                               hover:bg-emerald-600 transition"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
}
