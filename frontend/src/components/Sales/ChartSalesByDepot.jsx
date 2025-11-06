import React from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

export default function ChartSalesByDepot({ data }) {
    const totals = data.reduce((acc, sale) => {
        const name = sale.depotName || "Unknown";
        acc[name] = (acc[name] || 0) + sale.totalPrice;
        return acc;
    }, {});

    const chartData = Object.entries(totals).map(([name, total]) => ({
        name,
        value: total,
    }));

    const colors = [
        "#34d399",
        "#10b981",
        "#059669",
        "#047857",
        "#065f46",
    ];

    return (
        <div className="bg-emerald-800/40 border border-emerald-800 rounded-xl p-4 flex-1">
            <h2 className="text-lg font-semibold mb-4 text-emerald-100">
                Sales by Depot
            </h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                        fill="#10b981"
                        label={({ name }) => name}
                    >
                        {chartData.map((_, i) => (
                            <Cell key={i} fill={colors[i % colors.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#064e3b",
                            border: "1px solid #065f46",
                            color: "#d1fae5",
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
