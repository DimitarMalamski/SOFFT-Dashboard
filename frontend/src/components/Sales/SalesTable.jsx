import React from "react";
import SalesList from "../Shared/SalesList/SalesList.jsx";

export default function SalesTable({
       data,
       currentPage,
       totalPages,
       onNext,
       onPrev,
}) {
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
                {data.length > 0 ? (
                    data.map((sale) => (
                        <tr
                            key={sale.uuid.trim()}
                            className="border-t border-emerald-700/60 hover:bg-emerald-700/40 transition"
                        >
                            <td className="p-3">{sale.referenceId}</td>
                            <td className="p-3">{sale.customerCompanyName}</td>

                            <td className="p-3">
                                <div className="max-w-[250px]">
                                    <SalesList people={sale.salesPersonName} limit={3} />
                                </div>
                            </td>

                            <td className="p-3">{sale.depotName || "-"}</td>
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
                                {sale.totalPrice?.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                })}{" "}
                                {sale.currency}
                            </td>
                            <td className="p-3 text-emerald-100">{sale.discount}</td>
                            <td className="p-3 text-emerald-100">
                                {sale.createdAt
                                    ? new Date(sale.createdAt).toLocaleDateString()
                                    : "-"}
                            </td>
                            <td className="p-3 text-emerald-100">
                                {sale.expiresAt
                                    ? new Date(sale.expiresAt).toLocaleDateString()
                                    : "—"}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan="9"
                            className="text-center text-emerald-200 py-6 italic"
                        >
                            No matching data found
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            {data.length > 0 && (
                <div className="flex justify-between items-center p-3 border-t border-emerald-800 text-emerald-100 text-sm">
                    <button
                        onClick={onPrev}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-md border border-emerald-700 transition ${
                            currentPage === 1
                                ? "opacity-40 cursor-not-allowed"
                                : "hover:bg-emerald-700/40"
                        }`}
                    >
                        ← Prev
                    </button>

                    <span>
            Page {currentPage} of {totalPages}
          </span>

                    <button
                        onClick={onNext}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-md border border-emerald-700 transition ${
                            currentPage === totalPages
                                ? "opacity-40 cursor-not-allowed"
                                : "hover:bg-emerald-700/40"
                        }`}
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>
    );
}
