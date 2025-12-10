export function getCountrySalesStats(offers) {
  const counts = {};

  // Count only sold (confirmed) offers per country
  offers.forEach((o) => {
    if (o.status === "Confirmed") {
      counts[o.countryCode] = (counts[o.countryCode] || 0) + 1;
    }
  });

  const stats = Object.entries(counts).map(([countryCode, soldCount]) => ({
    countryCode,
    soldCount,
  }));

  // Sort descending by soldCount
  stats.sort((a, b) => b.soldCount - a.soldCount);

  return {
    stats,
    topCountry: stats.length > 0 ? stats[0] : null,
  };
}