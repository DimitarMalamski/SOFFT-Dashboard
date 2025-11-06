import React from "react";

export default function SalesFilters({
                                         filters,
                                         setFilters,
                                         sales,
                                         applyFilters,
                                         resetFilters,
                                     }) {
    const statuses = ["All", ...new Set(sales.map((s) => s.status))];
    const salespeople = ["All", ...new Set(sales.map((s) => s.salesPersonName))];
    const depots = ["All", ...new Set(sales.map((s) => s.depotName))];

    return (
        <div className="bg-emerald-800/50 border border-emerald-800 rounded-xl p-4 flex flex-wrap items-center gap-4">
            {/* Status */}
            <div className="flex flex-col">
                <label className="text-xs mb-1 text-emerald-200">Status</label>
                <select
                    className="bg-emerald-900 border border-emerald-700 text-emerald-50 rounded-md p-2"
                    value={filters.status}
                    onChange={(e) =>
                        setFilters((prev) => ({ ...prev, status: e.target.value }))
                    }
                >
                    {statuses.map((s) => (
                        <option key={s}>{s}</option>
                    ))}
                </select>
            </div>

            {/* Salesperson */}
            <div className="flex flex-col">
                <label className="text-xs mb-1 text-emerald-200">Salesperson</label>
                <select
                    className="bg-emerald-900 border border-emerald-700 text-emerald-50 rounded-md p-2"
                    value={filters.salesperson}
                    onChange={(e) =>
                        setFilters((prev) => ({ ...prev, salesperson: e.target.value }))
                    }
                >
                    {salespeople.map((s) => (
                        <option key={s}>{s}</option>
                    ))}
                </select>
            </div>

            {/* Depot */}
            <div className="flex flex-col">
                <label className="text-xs mb-1 text-emerald-200">Depot</label>
                <select
                    className="bg-emerald-900 border border-emerald-700 text-emerald-50 rounded-md p-2"
                    value={filters.depot}
                    onChange={(e) =>
                        setFilters((prev) => ({ ...prev, depot: e.target.value }))
                    }
                >
                    {depots.map((d) => (
                        <option key={d}>{d}</option>
                    ))}
                </select>
            </div>

            {/* Buttons */}
            <div className="flex items-end gap-2 ml-auto">
                <button
                    className="px-4 py-2 border border-emerald-600 text-emerald-300 rounded-md hover:bg-emerald-800/60"
                    onClick={resetFilters}
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
