import React from "react";

export default function SalesTable({ data }) {
    return (
        <div className="bg-emerald-800/40 border border-emerald-800 rounded-xl shadow-md overflow-x-auto">
            <table className="min-w-full border-collapse text-sm text-emerald-50">
                <thead className="bg-emerald-800/80 text-left text-emerald-100 uppercase text-xs">
                <tr>
                    <th className="p-3 font-semibold">Reference ID</th>
                    <th className="p-3 font-semibold">Customer</th>
                    <th className="p-3 font-semibold">Salesperson</th>
                    <th className="p-3 font-semibold">Depot</th>
                    <th className="p-3 font-semibold">Status</th>
                    <th className="p-3 font-semibold">Total (€)</th>
                    <th className="p-3 font-semibold">Discount (€)</th>
                    <th className="p-3 font-semibold">Created</th>
                    <th className="p-3 font-semibold">Expires</th>
                </tr>
                </thead>

                <tbody>
                {data.map((sale) => (
                    <tr
                        key={sale.uuid}
                        className="border-t border-emerald-700/60 hover:bg-emerald-700/40 transition"
                    >
                        <td className="p-3">{sale.referenceId}</td>
                        <td className="p-3">{sale.customerCompanyName}</td>
                        <td className="p-3">{sale.salesPersonName}</td>
                        <td className="p-3">{sale.depotName}</td>
                        <td className="p-3">
                <span
                    className={`px-2 py-1 rounded-md text-xs font-medium ${
                        sale.status === "Pending"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : sale.status === "Cancelled"
                                ? "bg-red-500/20 text-red-300"
                                : "bg-emerald-500/20 text-emerald-300"
                    }`}
                >
                  {sale.status}
                </span>
                        </td>
                        <td className="p-3 font-medium text-white">
                            {sale.totalPrice.toLocaleString()} {sale.currency}
                        </td>
                        <td className="p-3 text-emerald-100">{sale.discount}</td>
                        <td className="p-3 text-emerald-100">{sale.createdAt}</td>
                        <td className="p-3 text-emerald-100">
                            {sale.expiresAt || <span className="text-emerald-600">—</span>}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {data.length === 0 && (
                <div className="p-6 text-center text-emerald-300">
                    Loading sales data...
                </div>
            )}
        </div>
    );
}
