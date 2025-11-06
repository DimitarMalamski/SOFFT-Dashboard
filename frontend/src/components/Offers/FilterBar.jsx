import React, { useState } from "react";
import { Filter, LayoutGrid, BarChart3 } from "lucide-react";

export default function FilterBar({
                                      offers,
                                      onFilterChange,
                                      layout,
                                      setLayout,
                                  }) {
    const statuses = [...new Set(offers.map((o) => o.status))];
    const salespeople = [...new Set(offers.map((o) => o.salesperson))];
    const depots = [...new Set(offers.map((o) => o.depot))];

    const [filters, setFilters] = useState({
        status: "",
        salesperson: "",
        depot: "",
    });

    const handleChange = (field, value) => {
        const updated = { ...filters, [field]: value };
        setFilters(updated);
        onFilterChange(updated);
    };

    return (
        <div className="bg-emerald-900/40 border border-emerald-800 rounded-xl p-4 mb-6 shadow-md">
            <div className="flex flex-wrap gap-4 items-center justify-between">
                {/* Left side: Filters */}
                <div className="flex flex-wrap gap-3 items-center">
                    <Filter className="w-5 h-5 text-emerald-400" />
                    {/* Status */}
                    <select
                        value={filters.status}
                        onChange={(e) => handleChange("status", e.target.value)}
                        className="bg-emerald-950/70 border border-emerald-800 text-emerald-100 text-sm rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                        <option value="">All Statuses</option>
                        {statuses.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>

                    {/* Salesperson */}
                    <select
                        value={filters.salesperson}
                        onChange={(e) => handleChange("salesperson", e.target.value)}
                        className="bg-emerald-950/70 border border-emerald-800 text-emerald-100 text-sm rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                        <option value="">All Salespersons</option>
                        {salespeople.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>

                    {/* Depot */}
                    <select
                        value={filters.depot}
                        onChange={(e) => handleChange("depot", e.target.value)}
                        className="bg-emerald-950/70 border border-emerald-800 text-emerald-100 text-sm rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                        <option value="">All Depots</option>
                        {depots.map((d) => (
                            <option key={d} value={d}>
                                {d}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Right side: Layout toggle */}
                <div className="flex gap-2 items-center">
                    <button
                        className={`p-2 rounded-lg border transition ${
                            layout === "charts"
                                ? "bg-emerald-700/40 border-emerald-500"
                                : "bg-transparent border-emerald-800 hover:border-emerald-600"
                        }`}
                        onClick={() => setLayout("charts")}
                        title="Charts view"
                    >
                        <BarChart3 className="w-5 h-5 text-emerald-200" />
                    </button>

                    <button
                        className={`p-2 rounded-lg border transition ${
                            layout === "grid"
                                ? "bg-emerald-700/40 border-emerald-500"
                                : "bg-transparent border-emerald-800 hover:border-emerald-600"
                        }`}
                        onClick={() => setLayout("grid")}
                        title="Grid view"
                    >
                        <LayoutGrid className="w-5 h-5 text-emerald-200" />
                    </button>
                </div>
            </div>
        </div>
    );
}
