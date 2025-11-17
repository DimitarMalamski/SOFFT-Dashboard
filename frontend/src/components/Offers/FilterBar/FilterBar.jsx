import React from "react";
import Dropdown from "./Dropdown.jsx";
import { RotateCcw } from "lucide-react";
import { useOfferFilters } from "../../../hooks/offersPage/useOfferFilters.js";

export default function FilterBar({ offers, onFilterChange }) {
    const { filters, options, handleChange, handleReset, hasActiveFilters } =
        useOfferFilters(offers, onFilterChange);

    return (
        <div className="bg-emerald-900/40 border border-emerald-800 rounded-xl p-4 mb-6 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-3 items-center">
                    <Dropdown
                        label="Statuses"
                        value={filters.status}
                        onChange={(val) => handleChange("status", val)}
                        options={options.statuses}
                    />
                    <Dropdown
                        label="Salespersons"
                        value={filters.salesperson}
                        onChange={(val) => handleChange("salesperson", val)}
                        options={options.salespeople}
                    />
                    <Dropdown
                        label="Depots"
                        value={filters.depot}
                        onChange={(val) => handleChange("depot", val)}
                        options={options.depots}
                    />
                </div>

                {hasActiveFilters && (
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-emerald-700 text-emerald-100 text-sm hover:bg-emerald-800/40 transition"
                    >
                        <RotateCcw className="w-4 h-4 text-emerald-400" />
                        Reset
                    </button>
                )}
            </div>
        </div>
    );
}
