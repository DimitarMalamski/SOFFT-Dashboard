import React from "react";
import OfferCard from "./OfferCard.jsx";
import PaginationControls from "./PaginationControls.jsx";
import { usePagination } from "../../../hooks/usePagination.js";

export default function OffersGrid({ offers }) {
    const {
        currentPage,
        totalPages,
        currentData: currentOffers,
        nextPage,
        prevPage,
    } = usePagination(offers, 4);

    return (
        <section>
            <h2 className="text-emerald-100 font-semibold mb-3 text-sm uppercase">
                Offer Details
            </h2>

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
        </section>
    );
}
