import { useState, useEffect } from "react";
import mockData from "../mock-data/salesData.json";

export function useSalesData() {
    const [sales, setSales] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [filters, setFilters] = useState({
        status: "All",
        salesperson: "All",
        depot: "All",
    });

    useEffect(() => {
        setTimeout(() => {
            setSales(mockData);
            setFiltered(mockData);
        }, 500);
    }, []);

    const applyFilters = () => {
        let result = [...sales];
        if (filters.status !== "All")
            result = result.filter((s) => s.status === filters.status);
        if (filters.salesperson !== "All")
            result = result.filter((s) => s.salesPersonName === filters.salesperson);
        if (filters.depot !== "All")
            result = result.filter((s) => s.depotName === filters.depot);
        setFiltered(result);
    };

    const resetFilters = () => {
        setFilters({
            status: "All",
            salesperson: "All",
            depot: "All"
        });
        setFiltered(sales);
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