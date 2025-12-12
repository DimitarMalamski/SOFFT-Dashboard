import { useState, useMemo } from "react";
import { extractFilterOptions } from "../../utils/offersPage/extractFilterOptions.js";

export function useOfferFilters(offers, onFilterChange) {
    const [filters, setFilters] = useState({
        statuses: [],
        salespersons: [],
        depots: [],
        dateRange: "All Dates",
        startDate: null,
        endDate: null,
    });

    const options = useMemo(() => extractFilterOptions(offers), [offers]);

    function applyDateFilters(list, f) {
        let filtered = [...list];
        const now = new Date();

        if (f.dateRange === "Today") {
            filtered = filtered.filter(o => {
                const created = new Date(o.createdAt);
                return created.toDateString() === now.toDateString();
            });
        }

        if (f.dateRange === "Last 7 Days") {
            const past = new Date(now);
            past.setDate(now.getDate() - 7);
            filtered = filtered.filter(o => new Date(o.createdAt) >= past);
        }

        if (f.dateRange === "Last 30 Days") {
            const past = new Date(now);
            past.setDate(now.getDate() - 30);
            filtered = filtered.filter(o => new Date(o.createdAt) >= past);
        }

        if (f.dateRange === "Custom" && f.startDate && f.endDate) {
            filtered = filtered.filter(o => {
                const created = new Date(o.createdAt);
                return created >= f.startDate && created <= f.endDate;
            });
        }

        return filtered;
    }

    function applyAllFilters(list, f) {
        let filtered = [...list];

        if (f.statuses.length > 0) {
            filtered = filtered.filter(o => f.statuses.includes(o.status));
        }

        if (f.salespersons.length > 0) {
            filtered = filtered.filter(o =>
                o.salesPersons?.some(sp => f.salespersons.includes(sp.name))
            );
        }

        if (f.depots.length > 0) {
            filtered = filtered.filter(o => f.depots.includes(o.depotName));
        }

        filtered = applyDateFilters(filtered, f);

        return filtered;
    }

    const handleChange = (field, value) => {
        let updated = { ...filters, [field]: value };

        if (field === "dateRange" && value !== "Custom") {
            updated.startDate = null;
            updated.endDate = null;
        }

        setFilters(updated);

        const filtered = applyAllFilters(offers, updated);

        onFilterChange(filtered);
    };

    const handleReset = () => {
        const reset = {
            statuses: [],
            salespersons: [],
            depots: [],
            dateRange: "All Dates",
            startDate: null,
            endDate: null
        };

        setFilters(reset);
        onFilterChange(offers);
    };

    const hasActiveFilters =
        filters.statuses.length > 0 ||
        filters.salespersons.length > 0 ||
        filters.depots.length > 0 ||
        filters.dateRange !== "All Dates" ||
        filters.startDate !== null ||
        filters.endDate !== null;

    return { filters, options, handleChange, handleReset, hasActiveFilters };
}
