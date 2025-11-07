import React, { useState, useMemo } from "react";
import Dropdown from "./Dropdown.jsx";
import { extractFilterOptions } from "../../../utils/extractFilterOptions.js";

export default function FilterBar({ offers, onFilterChange }) {
    const [filters, setFilters] = useState({
        status: "",
        salesperson: "",
        depot: "",
    });

    const { statuses, salespeople, depots } = useMemo(
        () => extractFilterOptions(offers),
        [offers]
    );

    const handleChange = (field, value) => {
        const updated = { ...filters, [field]: value };
        setFilters(updated);
        onFilterChange(updated);
    };

    return (
        <div className="bg-emerald-900/40 border border-emerald-800 rounded-xl p-4 mb-6 shadow-md">
            <div className="flex flex-wrap gap-3 items-center">
                <Dropdown
                    label="Statuses"
                    value={filters.status}
                    onChange={(val) => handleChange("status", val)}
                    options={statuses}
                />
                <Dropdown
                    label="Salespersons"
                    value={filters.salesperson}
                    onChange={(val) => handleChange("salesperson", val)}
                    options={salespeople}
                />
                <Dropdown
                    label="Depots"
                    value={filters.depot}
                    onChange={(val) => handleChange("depot", val)}
                    options={depots}
                />
            </div>
        </div>
    );
}
