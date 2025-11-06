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

export default function SalespersonChart({ data }) {
    return (
        <div className="bg-emerald-900/30 border border-emerald-800 rounded-xl p-4 shadow-md">
            <h2 className="text-emerald-100 font-semibold mb-3 text-sm uppercase">
                Offers per Salesperson
            </h2>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#064e3b" />
                    <XAxis dataKey="offers" stroke="#a7f3d0" />
                    <YAxis stroke="#a7f3d0" label={{ value: "Offers", angle: -90, position: "insideLeft", fill: "#a7f3d0" }} />
                    <Tooltip formatter={(value) => [`${value}`, "Offers"]} />
                    <Bar dataKey="offers" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
