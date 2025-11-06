import React from "react";
import { BarChart3, Clock, CheckCircle, XCircle, Euro } from "lucide-react";

export default function StatsBar({ offers }) {
    const total = offers.length;
    const pending = offers.filter(o => o.status === "Pending").length;
    const approved = offers.filter(o => o.status === "Approved").length;
    const cancelled = offers.filter(o => o.status === "Cancelled").length;
    const totalValue = offers.reduce((sum, o) => sum + o.totalPrice, 0);

    const cards = [
        {
            label: "Total Offers",
            value: total,
            icon: <BarChart3 className="w-6 h-6 text-emerald-300" />,
            color: "from-emerald-800 to-emerald-700",
        },
        {
            label: "Pending",
            value: pending,
            icon: <Clock className="w-6 h-6 text-amber-300" />,
            color: "from-amber-700 to-amber-600",
        },
        {
            label: "Approved",
            value: approved,
            icon: <CheckCircle className="w-6 h-6 text-emerald-300" />,
            color: "from-emerald-600 to-emerald-500",
        },
        {
            label: "Cancelled",
            value: cancelled,
            icon: <XCircle className="w-6 h-6 text-rose-300" />,
            color: "from-rose-700 to-rose-600",
        },
        {
            label: "Total Value (€)",
            value: `€${totalValue.toLocaleString()}`,
            icon: <Euro className="w-6 h-6 text-emerald-300" />,
            color: "from-emerald-700 to-emerald-600",
        },
    ];

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-8">
            {cards.map((card) => (
                <div
                    key={card.label}
                    className={`rounded-xl bg-gradient-to-br ${card.color} p-4 shadow-lg hover:shadow-emerald-800/50 transition-transform hover:-translate-y-1`}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-emerald-100/80">{card.label}</p>
                            <p className="text-2xl font-semibold text-emerald-50 mt-1">
                                {card.value}
                            </p>
                        </div>
                        {card.icon}
                    </div>
                </div>
            ))}
        </div>
    );
}
