import React from "react";
import { useSalesData } from "../hooks/salesPage/useSalesData.js";
import { usePagination } from "../hooks/shared/usePagination.js";
import SalesFilters from "../components/Sales/SalesFilters.jsx";
import SalesTable from "../components/Sales/SalesTable.jsx";
import ChartSalesByPerson from "../components/Sales/ChartSalesByPerson.jsx";
import ChartSalesByDepot from "../components/Sales/ChartSalesByDepot.jsx";

export default function SalesPage() {
    const {
        sales,
        filtered,
        filters,
        setFilters,
        resetFilters,
        loading,
        error,
    } = useSalesData();

    const {
        currentPage,
        totalPages,
        currentData,
        nextPage,
        prevPage,
        resetPage,
    } = usePagination(filtered, 3);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-dvh bg-emerald-900">
                <div
                    role="status"
                    aria-label="Loading..."
                    className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-dvh bg-emerald-900">
                <div className="text-red-400 text-lg">
                    Failed to load sales data. Please try again later.
                </div>
            </div>
        );
    }

    if (!sales.length) {
        return (
            <div className="flex flex-col items-center justify-center h-dvh bg-emerald-900 text-emerald-200">
                <p className="text-lg">No sales data available.</p>
            </div>
        );
    }

    return (
        <div className="p-6 flex flex-col gap-6 bg-emerald-900 min-h-screen text-emerald-50">
            <SalesFilters
                filters={filters}
                setFilters={setFilters}
                sales={sales}
                resetFilters={resetFilters}
            />
            <SalesTable
                data={currentData}
                currentPage={currentPage}
                totalPages={totalPages}
                onNext={nextPage}
                onPrev={prevPage}
            />

            <div className="flex flex-col lg:flex-row gap-6">
                <ChartSalesByPerson data={sales} />
                <ChartSalesByDepot data={sales} />
            </div>
        </div>
    );
}
