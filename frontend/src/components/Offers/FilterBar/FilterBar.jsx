import React, { useState, useMemo } from "react";
import { Filter, LayoutGrid, BarChart3 } from "lucide-react";
import Dropdown from "./Dropdown.jsx";
import LayoutButton from "./LayoutButton.jsx";
import { extractFilterOptions } from "../../../utils/extractFilterOptions.js";

export default function FilterBar({ offers, onFilterChange, layout, setLayout }) {
    const options = useMemo(() => extractFilterOptions(offers), [offers]);

    const [filters, setFilters] = useState({
        status: "",
        salesperson: "",
        depot: "",
    });

    const handleFilterUpdate = (field, value) => {
        const updated = { ...filters, [field]: value };
        setFilters(updated);
        onFilterChange(updated);
    };

    return (
        <div className="bg-emerald-900/40 border border-emerald-800 rounded-xl p-4 mb-6 shadow-md">
            <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-3 items-center">
                    <Filter className="w-5 h-5 text-emerald-400" />
                    <Dropdown
                        label="Statuses"
                        value={filters.status}
                        onChange={(val) => handleFilterUpdate("status", val)}
                        options={options.statuses}
                    />
                    <Dropdown
                        label="Salespersons"
                        value={filters.salesperson}
                        onChange={(val) => handleFilterUpdate("salesperson", val)}
                        options={options.salespeople}
                    />
                    <Dropdown
                        label="Depots"
                        value={filters.depot}
                        onChange={(val) => handleFilterUpdate("depot", val)}
                        options={options.depots}
                    />
                </div>

                <div className="flex gap-2 items-center">
                    <LayoutButton
                        active={layout === "charts"}
                        onClick={() => setLayout("charts")}
                        title="Charts view"
                        icon={BarChart3}
                    />
                    <LayoutButton
                        active={layout === "grid"}
                        onClick={() => setLayout("grid")}
                        title="Grid view"
                        icon={LayoutGrid}
                    />
                </div>
            </div>
        </div>
    );
}
