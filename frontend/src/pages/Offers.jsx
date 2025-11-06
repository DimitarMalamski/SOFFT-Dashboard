import React, { useState, useEffect } from "react";
import StatsBar from "../components/Offers/StatsBar/StatsBar.jsx";
import ChartsSection from "../components/Offers/ChartsSection/ChartsSection.jsx";
import OffersGrid from "../components/Offers/OffersGrid/OffersGrid.jsx";
import FilterBar from "../components/Offers/FilterBar/FilterBar.jsx";
import mockData from "../mock-data/mockOffersData.json";

export default function OffersDashboard() {
    const [offers, setOffers] = useState([]);
    const [filteredOffers, setFilteredOffers] = useState([]);
    const [layout, setLayout] = useState("charts");

    useEffect(() => {
        setOffers(mockData);
        setFilteredOffers(mockData);
    }, []);

    const handleFilterChange = (filters) => {
        let filtered = [...offers];
        if (filters.status)
            filtered = filtered.filter((o) => o.status === filters.status);
        if (filters.salesperson)
            filtered = filtered.filter((o) => o.salesperson === filters.salesperson);
        if (filters.depot)
            filtered = filtered.filter((o) => o.depot === filters.depot);

        setFilteredOffers(filtered);
    };

    return (
        <div className="p-6 bg-emerald-950 min-h-screen text-emerald-50">
            {offers.length > 0 ? (
                <>
                    <StatsBar offers={filteredOffers} />
                    <FilterBar
                        offers={offers}
                        onFilterChange={handleFilterChange}
                        layout={layout}
                        setLayout={setLayout}
                    />

                    {/* Only one layout visible at a time */}
                    {layout === "charts" ? (
                        <ChartsSection offers={filteredOffers} variant="overview" />
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
