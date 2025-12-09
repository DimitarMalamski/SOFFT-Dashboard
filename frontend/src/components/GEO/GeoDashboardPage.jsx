// src/pages/GeoDashboardPage.jsx

import { useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

import HeatmapLayer from "../GEO/HeatmapLayer.jsx";
import OfferMarkersLayer from "../GEO/OfferMarkerLayer.jsx";

import { offerPoints } from "../GEO/mock/MockGeoData.js";
import { transformHeatmapDataFromOffers } from "../GEO/TransformHeatMapData.js";

const MARKER_MIN_ZOOM = 7;

function ZoomWatcher({ onZoomChange }) {
  useMapEvents({
    zoomend(e) {
      onZoomChange(e.target.getZoom());
    },
  });
  return null;
}

function GeoDashboardPage() {
  const [zoom, setZoom] = useState(4);
  const [selectedOffer, setSelectedOffer] = useState(null);

  // Heatmap data derived from the same offerPoints
  const heatData = useMemo(
    () => transformHeatmapDataFromOffers(offerPoints),
    []
  );

  function handleSelectOffer(offer) {
    setSelectedOffer(offer);
    // Later: navigate(`/salesoffers/${offer.id}`);
    console.log("Selected offer from map:", offer);
  }

  const showHeatmap = zoom < MARKER_MIN_ZOOM;

  return (
    <div style={{ display: "flex", gap: "16px", height: "100%" }}>
      {/* Map */}
      <div style={{ flex: 2, minHeight: "600px", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
        <MapContainer
          center={[50, 5]}
          zoom={zoom}
          style={{ height: "100%", width: "100%" }}
        >
          <ZoomWatcher onZoomChange={setZoom} />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Heatmap at low zoom only */}
          {showHeatmap && heatData.length > 0 && (
            <HeatmapLayer points={heatData} />
          )}

          {/* Individual offers when zoomed in enough */}
          <OfferMarkersLayer
            points={offerPoints}
            currentZoom={zoom}
            minZoom={MARKER_MIN_ZOOM}
            onSelectOffer={handleSelectOffer}
          />
        </MapContainer>
      </div>

      {/* Details panel */}
      <div
        style={{
          flex: 1,
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "12px",
          minWidth: "260px",
          maxWidth: "360px",
          alignSelf: "stretch",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Selected offer</h2>
        {selectedOffer ? (
          <div>
            <p>
              <strong>ID:</strong> {selectedOffer.id}
            </p>
            <p>
              <strong>Customer:</strong> {selectedOffer.customerName}
            </p>
            <p>
              <strong>Country:</strong> {selectedOffer.countryCode}
            </p>
            <p>
              <strong>Status:</strong> {selectedOffer.status}
            </p>
            <p>
              <strong>Value:</strong> €
              {selectedOffer.offerValue.toLocaleString("nl-NL")}
            </p>
            <p>
              <strong>Location:</strong>{" "}
              {selectedOffer.latitude.toFixed(4)},{" "}
              {selectedOffer.longitude.toFixed(4)}
            </p>
          </div>
        ) : (
          <p>
            Zoom in on the map and click a marker to see offer details here.
          </p>
        )}
      </div>
    </div>
  );
}

export default GeoDashboardPage;
