import { useState, useMemo } from "react";
import { extractFilterOptions } from "../../utils/offersPage/extractFilterOptions.js";

export function useOfferFilters(offers, onFilterChange) {
    const [filters, setFilters] = useState({
        statuses: [],
        salespersons: [],
        depots: [],
    });

    const options = useMemo(() => extractFilterOptions(offers), [offers]);

    const handleChange = (field, value) => {
        const updated = { ...filters, [field]: value };
        setFilters(updated);
        onFilterChange(updated);
    };

    const handleReset = () => {
        const reset = { statuses: [], salespersons: [], depots: [] };
        setFilters(reset);
        onFilterChange(reset);
    };

    const hasActiveFilters =
        filters.statuses.length > 0 ||
        filters.salespersons.length > 0 ||
        filters.depots.length > 0;

    return { filters, options, handleChange, handleReset, hasActiveFilters };
}