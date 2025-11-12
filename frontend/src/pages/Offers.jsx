import React, { useState } from "react";
import StatsBar from "../components/Offers/StatsBar/StatsBar.jsx";
import ChartsSection from "../components/Offers/ChartsSection/ChartsSection.jsx";
import OffersGrid from "../components/Offers/OffersGrid/OffersGrid.jsx";
import FilterBar from "../components/Offers/FilterBar/FilterBar.jsx";
import LayoutButton from "../components/Offers/FilterBar/LayoutButton.jsx";
import { LayoutGrid, BarChart3 } from "lucide-react";
import useOffersData from "../hooks/useOffersData.js";

export default function OffersPage() {
    const {
        offers,
        filteredOffers,
        setFilters,
        loading,
        error,
    } = useOffersData();

    const [layout, setLayout] = useState("charts");

    if (loading)
        return (
            <div className="flex items-center justify-center h-dvh bg-emerald-950">
                <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin" />
            </div>
        );

    if (error)
        return (
            <div className="flex items-center justify-center h-dvh bg-emerald-950 text-red-400 text-lg">
                Failed to load offers.
            </div>
        );

    if (!offers.length)
        return (
            <div className="flex items-center justify-center h-dvh bg-emerald-950 text-emerald-200">
                No offers found.
            </div>
        );

    return (
        <div className="p-6 bg-emerald-950 min-h-screen text-emerald-50">
            <StatsBar offers={offers} />

            <div className="flex justify-end mb-4">
                <div className="flex gap-2">
                    <LayoutButton
                        active={layout === "charts"}
                        onClick={() => setLayout("charts")}
                        title="Charts view"
                        icon={BarChart3}
                    />
                    <LayoutButton
                        active={layout === "grid"}
                        onClick={() => setLayout("grid")}
                        title="Grid view"
                        icon={LayoutGrid}
                    />
                </div>
            </div>

            {layout === "grid" && (
                <FilterBar offers={offers} onFilterChange={setFilters} />
            )}

            {layout === "charts" ? (
                <ChartsSection offers={offers} />
            ) : (
                <OffersGrid offers={filteredOffers} />
            )}
        </div>
    );
}
