import React, { useState, useEffect } from "react";
import StatsBar from "../components/Offers/StatsBar/StatsBar.jsx";
import ChartsSection from "../components/Offers/ChartsSection/ChartsSection.jsx";
import OffersGrid from "../components/Offers/OffersGrid/OffersGrid.jsx";
import FilterBar from "../components/Offers/FilterBar/FilterBar.jsx";
import LayoutButton from "../components/Offers/FilterBar/LayoutButton.jsx";
import mockData from "../mock-data/mockOffersData.json";
import { LayoutGrid, BarChart3 } from "lucide-react";
import { filterOffers } from "../utils/filterOffers.js";

export default function OffersDashboard() {
    const [offers, setOffers] = useState([]);
    const [filteredOffers, setFilteredOffers] = useState([]);
    const [layout, setLayout] = useState("charts");

    useEffect(() => {
        setOffers(mockData);
        setFilteredOffers(mockData);
    }, []);

    const handleFilterChange = (filters) => {
        const filtered = filterOffers(offers, filters);
        setFilteredOffers(filtered);
    };

    useEffect(() => {
        if (layout === "charts") {
            setFilteredOffers(offers);
        }
    }, [layout, offers]);

    return (
        <div className="p-6 bg-emerald-950 min-h-screen text-emerald-50">
            {offers.length > 0 ? (
                <>
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
                        <FilterBar
                            offers={offers}
                            onFilterChange={handleFilterChange}
                        />
                    )}

                    {layout === "charts" ? (
                        <ChartsSection offers={offers} />
                    ) : (
                        <OffersGrid offers={filteredOffers} />
                    )}
                </>
            ) : (
                <p>Loading mock data...</p>
            )}
        </div>
    );
}
