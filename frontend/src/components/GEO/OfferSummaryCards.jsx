import { useEffect, useMemo } from "react";
import { offerPoints } from "../GEO/mock/MockGeoData.js";
import { BarChart3, Clock, Earth, XCircle } from "lucide-react";
import StatCard from "../Offers/StatsBar/StatCard.jsx";
import { getCountrySalesStats } from "../GEO/getCountrySalesStats.js";

function getOfferStats(offers) {
  const totalOffers = offers.length;

  const pending = offers.filter((o) => o.status === "Pending").length;
  const declined = offers.filter((o) => o.status === "Declined").length;


  const { stats: countrySalesStats, topCountry } = getCountrySalesStats(offers);

  return {
    totalOffers,
    pending,
    declined,
    topCountry,        
    countrySalesStats, 
  };
}

function OfferSummaryCards() {
  const stats = useMemo(() => getOfferStats(offerPoints), []);

  useEffect(() => {
    console.log("stats:", stats);
  }, []); // log once on mount

  const cards = [
    {
      label: "Top selling country",
      value: stats.topCountry
        ? `${stats.topCountry.countryCode} (${stats.topCountry.soldCount})`
        : "N/A",
      icon: <Earth className="w-6 h-6 text-emerald-400" />,
      color: "from-neutral-900 to-emerald-800",
    },
    {
      label: "Total Offers",
      value: stats.totalOffers,
      icon: <BarChart3 className="w-6 h-6 text-emerald-400" />,
      color: "from-neutral-900 to-emerald-800",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: <Clock className="w-6 h-6 text-emerald-300" />,
      color: "from-neutral-900 to-emerald-800",
    },
    {
      label: "Declined",
      value: stats.declined,
      icon: <XCircle className="w-6 h-6 text-gray-300" />,
      color: "from-neutral-900 to-emerald-800",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
}

export default OfferSummaryCards;
