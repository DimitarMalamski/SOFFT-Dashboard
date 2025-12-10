// src/utils/GEOPage/transformHeatmapData.js

// Leaflet.heat expects [lat, lng, intensity]
export function transformHeatmapDataFromOffers(offers) {
  if (!offers || offers.length === 0) return [];

  const maxOffers = 10; // adjust for your project scaling
  const intensityScale = Math.min(offers.length / maxOffers, 1);

  return offers.map((offer) => [
    offer.latitude,
    offer.longitude,
    0.3 * intensityScale // reduces strength dramatically
  ]);
}

