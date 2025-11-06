import React from "react";
import { getStatusColor, getStatusIcon } from "../../../utils/offerStatusHelpers.jsx";

export default function OfferCard({ offer }) {
    return (
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

            {/* Info */}
            <div className="text-emerald-100 text-sm space-y-1 mb-4">
                <p>💼 Salesperson: {offer.salesperson}</p>
                <p>🏢 Depot: {offer.depot}</p>
                <p>🕓 Expires: {offer.expiresAt.split("T")[0]}</p>
            </div>

            {/* Footer */}
            <div className="border-t border-emerald-800 pt-3 flex justify-between items-center">
                <p className="text-2xl font-bold text-emerald-300">
                    €{offer.totalPrice.toLocaleString()}
                </p>
            </div>
        </div>
    );
}
