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
            icon: <BarChart3 className="w-6 h-6 text-emerald-400" />,
            color: "from-neutral-900 to-emerald-800",
        },
        {
            label: "Pending",
            value: stats.pending,
            icon: <Clock className="w-6 h-6 text-emerald-300" />,
            color: "from-neutral-900 to-emerald-800",
        },
        {
            label: "Approved",
            value: stats.approved,
            icon: <CheckCircle className="w-6 h-6 text-emerald-300" />,
            color: "from-neutral-900 to-emerald-800",
        },
        {
            label: "Cancelled",
            value: stats.cancelled,
            icon: <XCircle className="w-6 h-6 text-gray-300" />,
            color: "from-neutral-900 to-emerald-800",
        },
        {
            label: "Total Value (€)",
            value: `€${stats.totalValue.toLocaleString()}`,
            icon: <Euro className="w-6 h-6 text-emerald-400" />,
            color: "from-neutral-900 to-emerald-800",
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
