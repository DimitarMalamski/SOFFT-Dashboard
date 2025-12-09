import React from "react";
import MultiSelectDropdown from "../../Shared/MultiSelectDropdown.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RotateCcw } from "lucide-react";
import { useOfferFilters } from "../../../hooks/offersPage/useOfferFilters.js";
import SingleSelectDropdown from "../../Shared/SingleSelectDropdown.jsx";

const DATE_RANGE_OPTIONS = [
    "All Dates",
    "Today",
    "Last 7 Days",
    "Last 30 Days",
    "Custom",
];

export default function FilterBarOffers({ offers, onFilterChange }) {
    const {
        filters,
        options,
        handleChange,
        handleReset,
        hasActiveFilters
    } = useOfferFilters(offers, onFilterChange);

    return (
        <div className="bg-emerald-900/40 border border-emerald-800 rounded-xl p-4 mb-6 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-3 items-start">
                    <SingleSelectDropdown
                        label="Date Range"
                        options={DATE_RANGE_OPTIONS}
                        selected={filters.dateRange}
                        onChange={(val) => handleChange("dateRange", val)}
                    />

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
                        className="h-[38px] px-3 flex items-center gap-2
               rounded-md border border-emerald-700
               text-emerald-200 text-xs
               hover:bg-emerald-800/40 transition"
                    >
                        <RotateCcw className="w-4 h-4 text-emerald-400" />
                        Reset
                    </button>
                )}
            </div>

            {filters.dateRange === "Custom" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                    <div className="flex flex-col">
                        <label className="text-[11px] text-emerald-200 mb-1">Start Date</label>
                        <DatePicker
                            selected={filters.startDate}
                            onChange={(date) => handleChange("startDate", date)}
                            className="bg-emerald-900 border border-emerald-700 text-white text-xs rounded-md px-2 py-1 w-full"
                            placeholderText="Select start date"
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[11px] text-emerald-200 mb-1">End Date</label>
                        <DatePicker
                            selected={filters.endDate}
                            onChange={(date) => handleChange("endDate", date)}
                            className="bg-emerald-900 border border-emerald-700 text-white text-xs rounded-md px-2 py-1 w-full"
                            placeholderText="Select end date"
                            dateFormat="yyyy-MM-dd"
                            minDate={filters.startDate}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
