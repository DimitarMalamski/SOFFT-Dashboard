import { useState, useEffect, useMemo } from "react";
import SalesAPI from "../../apis/SalesAPI.js";

export function useSalesData() {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        status: "All",
        salespersons: [],
        depots: [],
    });

    useEffect(() => {
        const loadSales = async () => {
            try {
                const data = await SalesAPI.getAllSales(["Approved", "Completed"]);
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

        if (filters.salespersons.length > 0) {
            result = result.filter((s) =>
                s.salesPersonName?.some((p) =>
                    filters.salespersons.includes(p.name)
                )
            );
        }

        if (filters.depots.length > 0) {
            result = result.filter((s) =>
                filters.depots.includes(s.depotName)
            );
        }

        return result;
    }, [sales, filters]);

    const resetFilters = () => {
        setFilters({
            status: "All",
            salespersons: [],
            depots: []
        });
    };

    return {
        sales,
        filtered,
        filters,
        setFilters,
        resetFilters,
        loading,
        error,
    };
}