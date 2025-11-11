import { useState, useEffect, useMemo } from "react";
import SalesAPI from "../apis/SalesAPI.js";

export function useSalesData() {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        status: "All",
        salesperson: "All",
        depot: "All",
    });

    useEffect(() => {
        const loadSales = async () => {
            try {
                const data = await SalesAPI.getAllSales();
                setSales(data);
                setError(null);
            } catch (error) {
                console.error("Error fetching sales data:", error);
                setError(error);
                setSales([]);
            } finally {
                setLoading(false);
            }
        };
        loadSales();
    }, []);

    const filtered = useMemo(() => {
        let result = [...sales];
        if (filters.status !== "All") {
            result = result.filter((s) => s.status === filters.status);
        }
        if (filters.salesperson !== "All") {
            result = result.filter((s) =>
                s.salesPersonName?.some(
                    (p) => p.name === filters.salesperson
                )
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
        resetFilters,
        loading,
        error,
    };
}