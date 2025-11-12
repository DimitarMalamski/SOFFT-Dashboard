import React from "react";
import { Clock, CheckCircle, XCircle } from "lucide-react";

export const STATUS_STYLES = {
    Pending: {
        color: "bg-amber-500/20 text-amber-300 border-amber-500/40",
        icon: <Clock className="w-4 h-4" />,
    },
    Declined: {
        color: "bg-rose-500/20 text-rose-300 border-rose-500/40",
        icon: <XCircle className="w-4 h-4" />,
    },
    Default: {
        color: "bg-emerald-800/20 text-emerald-100 border-emerald-700",
        icon: null,
    },
};

export function getStatusColor(status) {
    return STATUS_STYLES[status]?.color || STATUS_STYLES.Default.color;
}

export function getStatusIcon(status) {
    return STATUS_STYLES[status]?.icon || STATUS_STYLES.Default.icon;
}
