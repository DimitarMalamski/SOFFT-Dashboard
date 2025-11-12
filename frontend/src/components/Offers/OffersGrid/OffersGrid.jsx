import React from "react";
import OfferCard from "./OfferCard.jsx";
import PaginationControls from "./PaginationControls.jsx";
import { usePagination } from "../../../hooks/usePagination.js";
import { AlertCircle } from "lucide-react";

export default function OffersGrid({ offers }) {
    const {
        currentPage,
        totalPages,
        currentData: currentOffers,
        nextPage,
        prevPage,
    } = usePagination(offers, 4);

    const hasData = currentOffers.length > 0;

    return (
        <section>
            <h2 className="text-emerald-100 font-semibold mb-3 text-sm uppercase">
                Offer Details
            </h2>

            {hasData ? (
                <>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {currentOffers.map((offer) => (
                            <OfferCard key={offer.uuid} offer={offer} />
                        ))}
                    </div>

                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onNext={nextPage}
                        onPrev={prevPage}
                    />
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-16 bg-emerald-900/30 border border-emerald-800 rounded-xl">
                    <AlertCircle className="w-10 h-10 text-emerald-400 mb-3" />
                    <p className="text-emerald-100 text-lg font-medium">
                        No offers found
                    </p>
                    <p className="text-emerald-400 text-sm mt-1">
                        Try adjusting your filters or check back later.
                    </p>
                </div>
            )}
        </section>
    );
}
