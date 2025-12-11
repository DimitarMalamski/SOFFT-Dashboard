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
import OrderTypeSelector from "./OrderTypeSelector.jsx";

const options = {
  statuses: [
    { label: "All", value: "ALL" },
    { label: "Pending", value: "Pending" },
    { label: "Confirmed", value: "Confirmed" },
    { label: "Declined", value: "Declined" },
    { label: "Canceled", value: "Canceled" },
    { label: "Draft", value: "Draft" }
  ],
};

const MARKER_MIN_ZOOM = 10;

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

  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredOffers = useMemo(() => {
    if (statusFilter === "ALL") return offerPoints;
    return offerPoints.filter((o) => o.status === statusFilter);
  }, [statusFilter]);


  const heatData = useMemo(
    () => transformHeatmapDataFromOffers(filteredOffers),
    [filteredOffers]
  );



  function handleSelectOffer(offer) {
    setSelectedOffer(offer);
    // Later: navigate(`/salesoffers/${offer.id}`);
    console.log("Selected offer from map:", offer);
  }

  const showHeatmap = zoom < MARKER_MIN_ZOOM;

  return (
    <>
    <div className="flex max-w-2xs pb-2">
      <OrderTypeSelector
        label="Select Order Type"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        options={options.statuses}
      />
    </div>
      

      {/* Layout: Map on left, details on right */}
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
              points={filteredOffers}
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
            </div>
          ) : (
            <p>
              Zoom in on the map and click a marker to see offer details here.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default GeoDashboardPage;
