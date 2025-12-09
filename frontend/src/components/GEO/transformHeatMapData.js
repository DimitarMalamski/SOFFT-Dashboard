// src/utils/GEOPage/transformHeatmapData.js

// Leaflet.heat expects [lat, lng, intensity]
export function transformHeatmapDataFromOffers(offers) {
  if (!offers || offers.length === 0) return [];

  return offers.map((offer) => [
    offer.latitude,
    offer.longitude,
    // You can scale intensity by value if you like, but 1 is fine for now
    1,
  ]);
}

