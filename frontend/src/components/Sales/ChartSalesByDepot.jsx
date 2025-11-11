import React, { useMemo } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

export default function ChartSalesByDepot({ data }) {
    const colors = ["#34d399", "#10b981", "#059669", "#047857", "#065f46"];

    // Aggregate total sales per depot safely
    const chartData = useMemo(() => {
        const totals = data.reduce((acc, sale) => {
            const name = sale.depotName?.trim() || "Unknown";
            acc[name] = (acc[name] || 0) + (sale.totalPrice || 0);
            return acc;
        }, {});

        return Object.entries(totals)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5);
    }, [data]);

    return (
        <div className="bg-emerald-800/40 border border-emerald-800 rounded-xl p-4 flex-1">
            <h2 className="text-lg font-semibold mb-4 text-emerald-100">
                Sales by Depot
            </h2>
            {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={100}
                            fill="#10b981"
                            label={({ name }) =>
                                name.length > 12 ? name.slice(0, 12) + "…" : name
                            }
                            isAnimationActive={false} // ✅ no animation at all
                        >
                            {chartData.map((_, i) => (
                                <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) =>
                                value.toLocaleString(undefined, { minimumFractionDigits: 2 })
                            }
                            contentStyle={{
                                backgroundColor: "#064e3b",
                                border: "1px solid #065f46",
                                color: "#d1fae5",
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            ) : (
                <p className="text-emerald-300 text-sm italic">No depot data available</p>
            )}
        </div>
    );
}
