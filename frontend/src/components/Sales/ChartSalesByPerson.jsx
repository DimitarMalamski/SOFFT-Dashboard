import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function ChartSalesByPerson({ data }) {
    const totals = data.reduce((acc, sale) => {
        const name = sale.salesPersonName || "Unknown";
        acc[name] = (acc[name] || 0) + sale.totalPrice;
        return acc;
    }, {});

    const chartData = Object.entries(totals).map(([name, total]) => ({
        name,
        total
    }));

    return (
        <div className="bg-emerald-800/40 border border-emerald-800 rounded-xl p-4 flex-1">
            <h2 className="text-lg font-semibold mb-4 text-emerald-100">
                Sales by Salesperson
            </h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#065f46" />
                    <XAxis dataKey="name" tick={{ fill: "#d1fae5" }} />
                    <YAxis tick={{ fill: "#d1fae5" }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#064e3b",
                            border: "1px solid #065f46",
                            color: "#d1fae5",
                        }}
                    />
                    <Bar dataKey="total" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}