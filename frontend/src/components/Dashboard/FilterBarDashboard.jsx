import React, {useRef, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import CompactMultiSelect from "../Shared/CompactMultiSelect.jsx";
import CompactSingleSelect from "../Shared/CompactSingleSelect.jsx";

const DATE_RANGE_MAP = {
    "All Dates": "",
    "Today": "today",
    "Last 7 Days": "7d",
    "Last 30 Days": "30d",
    "Custom": "custom"
};

const REVERSE_DATE_RANGE_MAP = Object.fromEntries(
    Object.entries(DATE_RANGE_MAP).map(([label, value]) => [value, label])
);

export default function FilterBarDashboard({
  filters,
  setFilters,
  options,
  applyFilters,
  resetFilter
}) {

    const [isOpen, setIsOpen] = useState(true);
    const contentRef = useRef(null);

    const handleDateRangeChange = (rangeValue) => {
        setFilters((prev) => ({
            ...prev,
            dateRange: rangeValue,
            ...(rangeValue !== "custom" && { startDate: null, endDate: null })
        }));
    };

    return (
        <div className="bg-emerald-800/40 border border-emerald-700 rounded-xl p-4">

            <button
                onClick={() => setIsOpen(o => !o)}
                className="w-full flex justify-between items-center text-emerald-200 text-sm font-semibold mb-2"
            >
                <span>Filters</span>

                <span
                    className={`transform transition-transform duration-200 ${
                        isOpen ? "rotate-180" : "rotate-0"
                    }`}
                >
                    ▼
                </span>
            </button>

            <div
                ref={contentRef}
                className={`transition-all duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
                }`}
            >
                <div className="pt-3 pb-1 flex flex-col gap-4">

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                        <CompactSingleSelect
                            label="Date Range"
                            options={Object.keys(DATE_RANGE_MAP)}
                            selected={REVERSE_DATE_RANGE_MAP[filters.dateRange] || "All Dates"}
                            onChange={(label) => {
                                handleDateRangeChange(DATE_RANGE_MAP[label]);
                            }}
                        />

                        <CompactMultiSelect
                            label="Salesmen"
                            options={options.salesmen}
                            selected={filters.salesmen}
                            onChange={(sel) =>
                                setFilters(prev => ({ ...prev, salesmen: sel }))
                            }
                        />

                        <CompactMultiSelect
                            label="Country"
                            options={options.countries}
                            selected={filters.countries}
                            onChange={(sel) =>
                                setFilters(prev => ({ ...prev, countries: sel }))
                            }
                        />

                        <div className="flex items-end gap-2">
                            <button
                                onClick={applyFilters}
                                className="flex-1 bg-emerald-700 text-white px-3 py-1.5 rounded-md text-xs hover:bg-emerald-600 transition h-[32px]"
                            >
                                Apply
                            </button>

                            <button
                                onClick={resetFilter}
                                className="flex-1 bg-emerald-800 text-emerald-300 px-3 py-1.5 rounded-md text-xs hover:bg-emerald-700 transition h-[32px] border border-emerald-700"
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    {/* ---------- CUSTOM DATE RANGE ---------- */}
                    {filters.dateRange === "custom" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div className="flex flex-col">
                                <label className="text-[11px] text-emerald-200 mb-1">Start Date</label>
                                <DatePicker
                                    selected={filters.startDate ? new Date(filters.startDate) : null}
                                    onChange={(date) =>
                                        setFilters(prev => ({ ...prev, startDate: date }))
                                    }
                                    className="bg-emerald-900 border border-emerald-700 text-white text-xs rounded-md px-2 py-1 w-full"
                                    placeholderText="Select start date"
                                    dateFormat="yyyy-MM-dd"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-[11px] text-emerald-200 mb-1">End Date</label>
                                <DatePicker
                                    selected={filters.endDate ? new Date(filters.endDate) : null}
                                    onChange={(date) =>
                                        setFilters(prev => ({ ...prev, endDate: date }))
                                    }
                                    className="bg-emerald-900 border border-emerald-700 text-white text-xs rounded-md px-2 py-1 w-full"
                                    placeholderText="Select end date"
                                    dateFormat="yyyy-MM-dd"
                                    minDate={filters.startDate ? new Date(filters.startDate) : null}
                                />
                            </div>

                        </div>
                    )}

                    {/* ---------- FILTER ROW 2 ---------- */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        <CompactMultiSelect
                            label="Vehicle Type"
                            options={options.productTypes}
                            selected={filters.productTypes}
                            onChange={(sel) =>
                                setFilters(prev => ({ ...prev, productTypes: sel }))
                            }
                        />

                        <CompactMultiSelect
                            label="Brand"
                            options={options.brands}
                            selected={filters.brands}
                            onChange={(sel) =>
                                setFilters(prev => ({ ...prev, brands: sel }))
                            }
                        />

                        <CompactMultiSelect
                            label="Incoterm"
                            options={options.incoterms}
                            selected={filters.incoterms}
                            onChange={(sel) =>
                                setFilters(prev => ({ ...prev, incoterms: sel }))
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
