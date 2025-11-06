import React from "react";
import { Clock, CheckCircle, XCircle } from "lucide-react";

export default function OffersGrid({ offers, layout  }) {
    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "bg-amber-500/20 text-amber-300 border-amber-500/40";
            case "Approved":
                return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
            case "Cancelled":
                return "bg-rose-500/20 text-rose-300 border-rose-500/40";
            default:
                return "bg-emerald-800/20 text-emerald-100 border-emerald-700";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "Pending":
                return <Clock className="w-4 h-4" />;
            case "Approved":
                return <CheckCircle className="w-4 h-4" />;
            case "Cancelled":
                return <XCircle className="w-4 h-4" />;
            default:
                return null;
        }
    };

    return (
        <div>
            <h2 className="text-emerald-100 font-semibold mb-3 text-sm uppercase">
                Offer Details
            </h2>

            <div className={`grid ${layout === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}>
                {offers.map((offer) => (
                    <div
                        key={offer.uuid}
                        className="bg-emerald-900/30 border border-emerald-800 rounded-2xl p-5 shadow-lg hover:shadow-emerald-800/50 hover:-translate-y-1 transition-transform cursor-pointer"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-lg font-semibold text-emerald-50">
                                {offer.customer}
                            </h3>
                            <span
                                className={`flex items-center gap-1 px-2 py-1 rounded-md border text-xs font-semibold uppercase ${getStatusColor(
                                    offer.status
                                )}`}
                            >
                {getStatusIcon(offer.status)}
                                {offer.status}
              </span>
                        </div>

                        {/* Info section */}
                        <div className="text-emerald-100 text-sm space-y-1 mb-4">
                            <p>💼 Salesperson: {offer.salesperson}</p>
                            <p>🏢 Depot: {offer.depot}</p>
                            <p>🕓 Expires: {offer.expiresAt.split("T")[0]}</p>
                        </div>

                        {/* Price */}
                        <div className="border-t border-emerald-800 pt-3 flex justify-between items-center">
                            <p className="text-2xl font-bold text-emerald-300">
                                €{offer.totalPrice.toLocaleString()}
                            </p>
                            <button className="text-sm bg-emerald-700/30 hover:bg-emerald-700/50 text-white px-3 py-1.5 rounded-lg transition">
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
