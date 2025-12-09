import React from "react";
import MultiSelectDropdown from "../Shared/MultiSelectDropdown.jsx";
import SingleSelectDropdown from "../Shared/SingleSelectDropdown.jsx";
import DatePicker from "react-datepicker";
import { RotateCcw } from "lucide-react";

export default function SalesFilters({
 filters,
 updateFilter,
 resetFilters,
 sales,
 hasActiveFilters,
 DATE_RANGE_OPTIONS,
}) {
    const allPersons = sales.flatMap(s => s.salesPersons?.map(p => p.name) || []);
    const uniquePersons = [...new Set(allPersons)];

    const uniqueStatuses = [...new Set(sales.map(s => s.status).filter(Boolean))];
    const uniqueDepots = [...new Set(sales.map(s => s.depotName).filter(Boolean))];

    return (
        <div className="bg-emerald-800/50 border border-emerald-700 rounded-xl p-4 flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-3 items-start">
                    <SingleSelectDropdown
                        label="Date Range"
                        options={DATE_RANGE_OPTIONS}
                        selected={filters.dateRange}
                        onChange={val => updateFilter("dateRange", val)}
                    />

                    <MultiSelectDropdown
                        label="Status"
                        options={uniqueStatuses}
                        selected={filters.statuses}
                        onChange={val => updateFilter("statuses", val)}
                    />

                    <MultiSelectDropdown
                        label="Salespersons"
                        options={uniquePersons}
                        selected={filters.salespersons}
                        onChange={val => updateFilter("salespersons", val)}
                    />

                    <MultiSelectDropdown
                        label="Depots"
                        options={uniqueDepots}
                        selected={filters.depots}
                        onChange={val => updateFilter("depots", val)}
                    />
                </div>

                {hasActiveFilters && (
                    <button
                        onClick={resetFilters}
                        className="
                h-[38px] px-3 flex items-center gap-2
                rounded-md border border-emerald-700
                text-emerald-200 text-xs
                hover:bg-emerald-800/40 transition
            "
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
                            onChange={d => updateFilter("startDate", d)}
                            className="bg-emerald-900 border border-emerald-700 text-white text-xs rounded-md px-2 py-1 w-full"
                            placeholderText="Select start date"
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[11px] text-emerald-200 mb-1">End Date</label>
                        <DatePicker
                            selected={filters.endDate}
                            onChange={d => updateFilter("endDate", d)}
                            minDate={filters.startDate}
                            className="bg-emerald-900 border border-emerald-700 text-white text-xs rounded-md px-2 py-1 w-full"
                            placeholderText="Select end date"
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>

                </div>
            )}
        </div>
    );
}
