import React from "react";
import { useSalesData } from "../hooks/useSalesData.js";
import SalesFilters from "../components/Sales/SalesFilters.jsx";
import SalesTable from "../components/Sales/SalesTable.jsx";
import ChartSalesByPerson from "../components/Sales/ChartSalesByPerson.jsx";
import ChartSalesByDepot from "../components/Sales/ChartSalesByDepot.jsx";

export default function SalesPage() {
    const { sales, filtered, filters, setFilters, applyFilters, resetFilters } =
        useSalesData();

    return (
        <div className="p-6 flex flex-col gap-6 bg-emerald-900 min-h-screen text-emerald-50">
            <SalesFilters
                filters={filters}
                setFilters={setFilters}
                sales={sales}
                applyFilters={applyFilters}
                resetFilters={resetFilters}
            />
            <SalesTable data={filtered} />

            <div className="flex flex-col lg:flex-row gap-6">
                <ChartSalesByPerson data={filtered} />
                <ChartSalesByDepot data={filtered} />
            </div>
        </div>
    );
}
