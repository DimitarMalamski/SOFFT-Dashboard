import React from "react";
import MultiSelectDropdown from "../../Shared/MultiSelectDropdown.jsx";
import { RotateCcw } from "lucide-react";
import { useOfferFilters } from "../../../hooks/offersPage/useOfferFilters.js";

export default function FilterBar({ offers, onFilterChange }) {
    const { filters, options, handleChange, handleReset, hasActiveFilters } =
        useOfferFilters(offers, onFilterChange);

    return (
        <div className="bg-emerald-900/40 border border-emerald-800 rounded-xl p-4 mb-6 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-3 items-center">
                    <MultiSelectDropdown
                        label="Statuses"
                        options={options.statuses}
                        selected={filters.statuses}
                        onChange={(val) => handleChange("statuses", val)}
                    />

                    <MultiSelectDropdown
                        label="Salespersons"
                        options={options.salespeople}
                        selected={filters.salespersons}
                        onChange={(val) => handleChange("salespersons", val)}
                    />

                    <MultiSelectDropdown
                        label="Depots"
                        options={options.depots}
                        selected={filters.depots}
                        onChange={(val) => handleChange("depots", val)}
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
