import React from "react";

export default function PaginationControls({
   currentPage,
   totalPages,
   onNext,
   onPrev,
}) {
    return (
        <div className="flex items-center justify-between mt-6">
            <button
                onClick={onPrev}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-emerald-700 text-emerald-100 hover:bg-emerald-700/30 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
                ← Prev
            </button>
            <span className="text-emerald-300 text-sm font-medium">
        Page {currentPage} of {totalPages}
      </span>
            <button
                onClick={onNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-emerald-700 text-emerald-100 hover:bg-emerald-700/30 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
                Next →
            </button>
        </div>
    );
}
