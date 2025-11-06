import React from "react";
import OfferCard from "./OfferCard.jsx";

export default function OffersGrid({ offers, layout }) {
    return (
        <section>
            <h2 className="text-emerald-100 font-semibold mb-3 text-sm uppercase">
                Offer Details
            </h2>

            <div
                className={`grid ${
                    layout === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                } gap-6`}
            >
                {offers.map((offer) => (
                    <OfferCard key={offer.uuid} offer={offer} />
                ))}
            </div>
        </section>
    );
}
