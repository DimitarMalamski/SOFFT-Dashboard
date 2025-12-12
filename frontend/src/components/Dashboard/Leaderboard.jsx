import React from "react";

const medalColors = [
    "text-yellow-300",
    "text-slate-300",
    "text-amber-500",
];

export default function Leaderboard({ salesmanData }) {
    return (
        <div className="flex flex-col h-full">

            <h2 className="text-base sm:text-lg font-semibold mb-4 text-emerald-100">
                Leaderboard
            </h2>

            {/* ONLY this div should scroll */}
            <div className="overflow-y-auto flex-1 pr-1 space-y-1">
                {salesmanData.map((data, index) => (
                    <div
                        key={data.salesman}
                        className="flex items-center gap-4 p-2 rounded hover:bg-emerald-800/40 transition"
                    >
                        <div
                            className={`text-lg font-bold w-6 text-center ${
                                medalColors[index] || "text-emerald-300"
                            }`}
                        >
                            {index + 1}
                        </div>

                        <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center text-sm font-semibold">
                            {data.salesman[0]}
                        </div>

                        <div className="flex flex-col">
                            <span className="text-sm sm:text-base font-medium">
                                {data.salesman}
                            </span>
                            <span className="text-xs text-emerald-400 font-medium">
                                {data.count} offers
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

