import { useState, useEffect, useMemo } from "react";
import mockData from "../mock-data/salesData.json";

export function useSalesData() {
    const [sales, setSales] = useState([]);
    const [filters, setFilters] = useState({
        status: "All",
        salesperson: "All",
        depot: "All",
    });

    useEffect(() => {
        const timer = setTimeout(() => setSales(mockData), 500);
        return () => clearTimeout(timer);
    }, []);

    const filtered = useMemo(() => {
        let result = [...sales];
        if (filters.status !== "All") {
            result = result.filter((s) => s.status === filters.status);
        }
        if (filters.salesperson !== "All") {
            result = result.filter(
                (s) => s.salesPersonName === filters.salesperson
            );
        }
        if (filters.depot !== "All") {
            result = result.filter((s) => s.depotName === filters.depot);
        }
        return result;
    }, [sales, filters]);

    const applyFilters = () => {};
    const resetFilters = () => {
        setFilters({
            status: "All",
            salesperson: "All",
            depot: "All"
        });
    };

    return {
        sales,
        filtered,
        filters,
        setFilters,
        applyFilters,
        resetFilters
    };
}