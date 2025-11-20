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
        const persons = sale.salesPersonName?.length
            ? sale.salesPersonName.map((p) => p.name)
            : ["Unknown"]

        persons.forEach((name) => {
            if (!name) return;
            acc[name] = (acc[name] || 0) + (sale.totalPrice || 0);
        });

        return acc;
    }, {});

    const chartData = Object.entries(totals)
        .map(([name, total]) => ({ name, total }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 5);

    return (
        <div className="bg-emerald-800/40 border border-emerald-800 rounded-xl p-4 flex-1">
            <h2 className="text-lg font-semibold mb-4 text-emerald-100">
                Sales by Salesperson
            </h2>
            {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={chartData}
                        margin={{ top: 10, right: 20, left: 0, bottom: 40 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#065f46" />
                        <XAxis
                            dataKey="name"
                            tick={{ fill: "#d1fae5" }}
                            tickMargin={10}
                            dy={5}
                        />
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
            ) : (
                <p className="text-emerald-300 text-sm italic">No sales data available</p>
            )}
        </div>
    );
}