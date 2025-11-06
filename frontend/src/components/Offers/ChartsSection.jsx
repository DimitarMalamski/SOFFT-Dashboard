import React from "react";
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    LineChart, Line,
} from "recharts";

const COLORS = {
    Pending: "#fbbf24",
    Approved: "#10b981",
    Cancelled: "#f43f5e",
};

export default function ChartsSection({ offers, variant = "overview" }) {
    // --- Data transforms ---
    const statusCounts = ["Pending", "Approved", "Cancelled"].map(status => ({
        name: status,
        value: offers.filter(o => o.status === status).length,
    }));

    const salesByPerson = Object.entries(
        offers.reduce((acc, o) => {
            acc[o.salesperson] = (acc[o.salesperson] || 0) + 1;
            return acc;
        }, {})
    ).map(([name, count]) => ({ name, count }));

    const offersByDate = Object.entries(
        offers.reduce((acc, o) => {
            const date = o.createdAt.slice(0, 10);
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {})
    )
        .sort(([a], [b]) => new Date(a) - new Date(b))
        .map(([date, count]) => ({ date, count }));

    // --- Chart Components ---
    const StatusChart = (
        <div className="bg-emerald-900/30 border border-emerald-800 rounded-xl p-4 shadow-md">
            <h2 className="text-emerald-100 font-semibold mb-3 text-sm uppercase">
                Offers by Status
            </h2>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={statusCounts}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={90}
                        innerRadius={50}
                        label
                    >
                        {statusCounts.map((entry, idx) => (
                            <Cell key={idx} fill={COLORS[entry.name]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );

    const SalespersonChart = (
        <div className="bg-emerald-900/30 border border-emerald-800 rounded-xl p-4 shadow-md">
            <h2 className="text-emerald-100 font-semibold mb-3 text-sm uppercase">
                Offers per Salesperson
            </h2>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={salesByPerson}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#064e3b" />
                    <XAxis dataKey="name" stroke="#a7f3d0" />
                    <YAxis stroke="#a7f3d0" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );

    const TimelineChart = (
        <div className="bg-emerald-900/30 border border-emerald-800 rounded-xl p-4 shadow-md lg:col-span-3">
            <h2 className="text-emerald-100 font-semibold mb-3 text-sm uppercase">
                Offers Over Time
            </h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={offersByDate}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#064e3b" />
                    <XAxis dataKey="date" stroke="#a7f3d0" />
                    <YAxis stroke="#a7f3d0" />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#34d399"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );

    // --- Layout logic ---
    if (variant === "overview") {
        return (
            <div className="grid lg:grid-cols-3 gap-6 mb-10">
                {StatusChart}
                {SalespersonChart}
                {TimelineChart}
            </div>
        );
    }

    if (variant === "timeline") {
        return (
            <div className="mb-10">
                {TimelineChart}
            </div>
        );
    }

    return null;
}
