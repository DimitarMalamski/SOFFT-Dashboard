import { useState, useMemo } from "react";
import { extractFilterOptions } from "../../utils/offersPage/extractFilterOptions.js";

export function useOfferFilters(offers, onFilterChange) {
    const [filters, setFilters] = useState({
        status: "",
        salesperson: "",
        depot: "",
    });

    const options = useMemo(() => extractFilterOptions(offers), [offers]);

    const handleChange = (field, value) => {
        const updated = { ...filters, [field]: value };
        setFilters(updated);
        onFilterChange(updated);
    };

    const handleReset = () => {
        const reset = { status: "", salesperson: "", depot: "" };
        setFilters(reset);
        onFilterChange(reset);
    };

    const hasActiveFilters =
        filters.status || filters.salesperson || filters.depot;

    return { filters, options, handleChange, handleReset, hasActiveFilters };
}