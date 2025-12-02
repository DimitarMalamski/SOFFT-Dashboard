import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = {
    Pending: "#fcd34d",
    Declined: "#FCA5A5",
};

export default function StatusChart({ data }) {
    return (
        <div className="bg-emerald-900/30 border border-emerald-800 rounded-xl p-4 shadow-md">
            <h2 className="text-emerald-100 font-semibold mb-3 text-sm uppercase">
                Offers by Status
            </h2>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={90}
                        innerRadius={50}
                        label
                    >
                        {data.map((entry, idx) => (
                            <Cell key={idx} fill={COLORS[entry.name]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
