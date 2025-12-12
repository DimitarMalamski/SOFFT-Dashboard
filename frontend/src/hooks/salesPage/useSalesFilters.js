import { useState, useMemo } from "react";

const DATE_RANGE_OPTIONS = [
    "All Dates",
    "Today",
    "Last 7 Days",
    "Last 30 Days",
    "Custom",
];

export function useSalesFilters(sales) {
    const [filters, setFilters] = useState({
        statuses: [],
        salespersons: [],
        depots: [],
        dateRange: "All Dates",
        startDate: null,
        endDate: null,
    });

    function applyDateFilters(list, f) {
        let filtered = [...list];
        const now = new Date();

        const getCompletedDate = (s) => new Date(s.completedAt || s.createdAt);

        if (f.dateRange === "Today") {
            filtered = filtered.filter(s => {
                const d = getCompletedDate(s);
                return d.toDateString() === now.toDateString();
            });
        }

        if (f.dateRange === "Last 7 Days") {
            const past = new Date(now);
            past.setDate(now.getDate() - 7);
            filtered = filtered.filter(s => getCompletedDate(s) >= past);
        }

        if (f.dateRange === "Last 30 Days") {
            const past = new Date(now);
            past.setDate(now.getDate() - 30);
            filtered = filtered.filter(s => getCompletedDate(s) >= past);
        }

        if (f.dateRange === "Custom" && f.startDate && f.endDate) {
            filtered = filtered.filter(s => {
                const d = getCompletedDate(s);
                return d >= f.startDate && d <= f.endDate;
            });
        }

        return filtered;
    }

    function applyAllFilters(list, f) {
        let filtered = [...list];

        if (f.statuses.length > 0) {
            filtered = filtered.filter(s => f.statuses.includes(s.status));
        }

        if (f.salespersons.length > 0) {
            filtered = filtered.filter(s =>
                s.salesPersons?.some(p => f.salespersons.includes(p.name))
            );
        }

        if (f.depots.length > 0) {
            filtered = filtered.filter(s => f.depots.includes(s.depotName));
        }

        filtered = applyDateFilters(filtered, f);
        return filtered;
    }

    const filtered = useMemo(() => applyAllFilters(sales, filters), [sales, filters]);

    function updateFilter(field, value) {
        let updated = { ...filters, [field]: value };

        // If switching away from custom, clear dates
        if (field === "dateRange" && value !== "Custom") {
            updated.startDate = null;
            updated.endDate = null;
        }

        setFilters(updated);
    }

    function resetFilters() {
        setFilters({
            statuses: [],
            salespersons: [],
            depots: [],
            dateRange: "All Dates",
            startDate: null,
            endDate: null,
        });
    }

    const hasActiveFilters =
        filters.statuses.length > 0 ||
        filters.salespersons.length > 0 ||
        filters.depots.length > 0 ||
        filters.dateRange !== "All Dates" ||
        filters.startDate !== null ||
        filters.endDate !== null;

    return {
        filters,
        filtered,
        updateFilter,
        resetFilters,
        hasActiveFilters,
        DATE_RANGE_OPTIONS,
    };
}
