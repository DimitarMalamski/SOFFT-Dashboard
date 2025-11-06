import React, { useEffect, useState } from "react";
import SalesTable from "../components/Sales/SalesTable.jsx";
import mockData from "../mock-data/salesData.json";

export default function SalesPage() {
    const [sales, setSales] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setSales(mockData);
        }, 500);
    }, []);

    return (
        <div className="p-6 flex flex-col gap-6 bg-emerald-900 min-h-screen text-emerald-50">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-emerald-800/70 pb-3">
                <h1 className="text-2xl font-semibold text-emerald-50">
                    Sales Overview
                </h1>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-600 transition">
                        Export CSV
                    </button>
                    <button className="px-4 py-2 border border-emerald-600 text-emerald-400 rounded-lg hover:bg-emerald-800/60 transition">
                        Add Offer
                    </button>
                </div>
            </div>

            <SalesTable data={sales} />
        </div>
    );
}
