import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CompactMultiSelect from "../Shared/CompactMultiSelect.jsx";

export default function FilterBar({ filters, setFilters, options, applyFilters }) {

    const handleDateRangeChange = (range) => {
        setFilters((prev) => ({
            ...prev,
            dateRange: range,
            ...(range !== "custom" && { startDate: null, endDate: null })
        }));
    };

    return (
        <div className="bg-emerald-800/40 border border-emerald-700 rounded-xl p-4 flex flex-col gap-4">

            {/* -------- ROW 1 -------- */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                {/* DATE RANGE */}
                <CompactMultiSelect
                    label="Date Range"
                    options={["All Dates", "Today", "Last 7 Days", "Last 30 Days", "Custom"]}
                    selected={[filters.dateRange || "All Dates"]}
                    onChange={(sel) => {
                        const value = sel[0] === "All Dates" ? "" : sel[0].toLowerCase();
                        handleDateRangeChange(value);
                    }}
                />

                {/* SALESMEN */}
                <CompactMultiSelect
                    label="Salesmen"
                    options={options.salesmen}
                    selected={filters.salesmen}
                    onChange={(sel) => setFilters(prev => ({ ...prev, salesmen: sel }))}
                />

                {/* COUNTRY */}
                <CompactMultiSelect
                    label="Country"
                    options={options.countries}
                    selected={filters.countries}
                    onChange={(sel) => setFilters(prev => ({ ...prev, countries: sel }))}
                />

                {/* APPLY */}
                <div className="flex flex-col justify-end">
                    <button
                        onClick={applyFilters}
                        className="w-full bg-emerald-700 text-white px-3 py-1.5 rounded-md text-xs hover:bg-emerald-600 transition h-[32px]"
                    >
                        Apply
                    </button>
                </div>
            </div>

            {/* -------- ROW 2 -------- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <CompactMultiSelect
                    label="Vehicle Type"
                    options={options.productTypes}
                    selected={filters.productTypes}
                    onChange={(sel) => setFilters(prev => ({ ...prev, productTypes: sel }))}
                />

                <CompactMultiSelect
                    label="Brand"
                    options={options.brands}
                    selected={filters.brands}
                    onChange={(sel) => setFilters(prev => ({ ...prev, brands: sel }))}
                />

                <CompactMultiSelect
                    label="Incoterm"
                    options={options.incoterms}
                    selected={filters.incoterms}
                    onChange={(sel) => setFilters(prev => ({ ...prev, incoterms: sel }))}
                />
            </div>
        </div>
    );

}
