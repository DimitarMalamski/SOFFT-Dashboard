import React from "react";

export default function StatCard({ label, value, icon, color }) {
    return (
        <div
            className={`rounded-xl bg-gradient-to-br ${color} p-4 shadow-lg hover:shadow-emerald-800/50 transition-transform hover:-translate-y-1`}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-emerald-100/80">{label}</p>
                    <p className="text-2xl font-semibold text-emerald-50 mt-1">
                        {value}
                    </p>
                </div>
                {icon}
            </div>
        </div>
    );
}