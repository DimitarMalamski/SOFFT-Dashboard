import React from "react";
import MultiSelectDropdown from "../Shared/MultiSelectDropdown.jsx";

export default function SalesFilters({
     filters,
     setFilters,
     sales,
     resetFilters,
}) {
    const allSalespersons = sales.flatMap(
        (s) => s.salesPersons?.map((p) => p.name) || []
    );
    const uniqueSalespersons = [...new Set(allSalespersons)];

    const uniqueStatuses = [...new Set(sales.map((s) => s.status).filter(Boolean))];
    const uniqueDepots = [...new Set(sales.map((s) => s.depotName).filter(Boolean))];

    return (
        <div className="bg-emerald-800/50 border border-emerald-800 rounded-xl p-4 flex flex-wrap items-center gap-4 overflow-visible">

            <MultiSelectDropdown
                label="Status"
                options={uniqueStatuses}
                selected={filters.statuses || []}
                onChange={(newSelected) =>
                    setFilters((prev) => ({ ...prev, statuses: newSelected }))
                }
                data-testid="status-dropdown"
            />

            <MultiSelectDropdown
                label="Salesperson"
                options={uniqueSalespersons}
                selected={filters.salespersons || []}
                onChange={(newSelected) =>
                    setFilters((prev) => ({ ...prev, salespersons: newSelected }))
                }
            />

            <MultiSelectDropdown
                label="Depot"
                options={uniqueDepots}
                selected={filters.depots || []}
                onChange={(newSelected) =>
                    setFilters((prev) => ({ ...prev, depots: newSelected }))
                }
            />

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
