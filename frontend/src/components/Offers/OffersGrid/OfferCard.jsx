import React from "react";
import { getStatusColor, getStatusIcon } from "../../../utils/offersPage/offerStatusHelpers.jsx";

export default function OfferCard({ offer }) {
    const customerName = offer.customerCompanyName ?? "Unknown Company";
    const status = offer.status ?? "Unknown";
    const depot = offer.depotName ?? "N/A";
    const expiresAt = offer.expiresAt ? offer.expiresAt.split("T")[0] : "N/A";
    const totalPrice = Number(offer.totalPrice) || 0;

    const salesPersons =
        offer.salesPersonName?.length > 0
            ? offer.salesPersonName.map((p) => p.name).join(", ")
            : "N/A";

    return (
        <div
            key={offer.uuid}
            className="bg-emerald-900/30 border border-emerald-800 rounded-2xl p-5 shadow-lg hover:shadow-emerald-800/50 hover:-translate-y-1 transition-transform cursor-pointer"
        >
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-emerald-50">{customerName}</h3>
                <span
                    className={`flex items-center gap-1 px-2 py-1 rounded-md border text-xs font-semibold uppercase ${getStatusColor(
                        status
                    )}`}
                >
          {getStatusIcon(status)}
                    {status}
        </span>
            </div>

            <div className="text-emerald-100 text-sm space-y-1 mb-4">
                <p>Salesperson: {salesPersons}</p>
                <p>Depot: {depot}</p>
                <p>Expires: {expiresAt}</p>
            </div>

            <div className="border-t border-emerald-800 pt-3 flex justify-between items-center">
                <p className="text-2xl font-bold text-emerald-300">
                    €{totalPrice.toLocaleString()}
                </p>
            </div>
        </div>
    );
}