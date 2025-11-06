import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function TimelineChart({ data }) {
    return (
        <div className="bg-emerald-900/30 border border-emerald-800 rounded-xl p-4 shadow-md lg:col-span-3">
            <h2 className="text-emerald-100 font-semibold mb-3 text-sm uppercase">
                Offers Over Time
            </h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#064e3b" />
                    <XAxis
                        dataKey="date"
                        stroke="#a7f3d0"
                        interval="preserveStartEnd"
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis
                        stroke="#a7f3d0"
                        label={{
                            value: "Offers",
                            angle: -90,
                            position: "insideLeft",
                            fill: "#a7f3d0",
                        }}
                    />
                    <Tooltip formatter={(value) => [`${value}`, "Offers"]} />
                    <Line
                        type="monotone"
                        dataKey="offers"
                        stroke="#34d399"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
