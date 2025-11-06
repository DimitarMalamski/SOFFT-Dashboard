import React, { useMemo } from "react";
import { BarChart3, Clock, CheckCircle, XCircle, Euro } from "lucide-react";
import StatCard from "./StatCard.jsx";
import { calculateOfferStats } from "../../../utils/calculateStats.js";

export default function StatsBar({ offers }) {
    const stats = useMemo(() => calculateOfferStats(offers), [offers]);

    const cards = [
        {
            label: "Total Offers",
            value: stats.total,
            icon: <BarChart3 className="w-6 h-6 text-emerald-300" />,
            color: "from-emerald-800 to-emerald-700",
        },
        {
            label: "Pending",
            value: stats.pending,
            icon: <Clock className="w-6 h-6 text-amber-300" />,
            color: "from-amber-700 to-amber-600",
        },
        {
            label: "Approved",
            value: stats.approved,
            icon: <CheckCircle className="w-6 h-6 text-emerald-300" />,
            color: "from-emerald-600 to-emerald-500",
        },
        {
            label: "Cancelled",
            value: stats.cancelled,
            icon: <XCircle className="w-6 h-6 text-rose-300" />,
            color: "from-rose-700 to-rose-600",
        },
        {
            label: "Total Value (€)",
            value: `€${stats.totalValue.toLocaleString()}`,
            icon: <Euro className="w-6 h-6 text-emerald-300" />,
            color: "from-emerald-700 to-emerald-600",
        },
    ];

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-8">
            {cards.map((card) => (
                <StatCard key={card.label} {...card} />
            ))}
        </div>
    );
}