// src/pages/GeoDashboardPage.jsx

import { use, useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

import HeatmapLayer from "../GEO/HeatmapLayer.jsx";
import OfferMarkersLayer from "../GEO/OfferMarkerLayer.jsx";

import { offerPoints } from "../GEO/mock/MockGeoData.js";
import { transformHeatmapDataFromOffers } from "../GEO/transformHeatMapData.js";
import GeoFilterSelector from "./GeoFilterSelector.jsx";

const salesPeople = [
  "John de Vries",
  "Emma Jansen",
  "Lucas van Dijk",
  "Sophie Müller",
  "Mark Thompson",
  "Isabella Rossi",
  "Liam Smith",
  "Olivia Johnson",
  "Noah Brown",
  "Ava Davis",
];

const options = {
  statuses: [
    { label: "All", value: "ALL" },
    { label: "Pending", value: "Pending" },
    { label: "Confirmed", value: "Confirmed" },
    { label: "Declined", value: "Declined" },
    { label: "Canceled", value: "Canceled" },
    { label: "Draft", value: "Draft" }
  ],
  salesPeople: [
    { label: "All", value: "ALL" },
    ...salesPeople.map((name) => ({ label: name, value: name })),
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
  const [query, setQuery] = useState("");

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [salesPersonFilter, setSalesPersonFilter] = useState("ALL");


  const filteredOffers = useMemo(() => {
    return offerPoints.filter((offer) => {
      const salesPersonMatch =
        salesPersonFilter === "ALL" || offer.salesPerson === salesPersonFilter;

      const statusMatch =
        statusFilter === "ALL" || offer.status === statusFilter;

      return salesPersonMatch && statusMatch;
    });
  }, [offerPoints, salesPersonFilter, statusFilter]);



  function resetFilters() {
    setStatusFilter("ALL");
    setSalesPersonFilter("ALL");
    setFilteredOffers(offerPoints);
  }


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
      <div className="flex justify-between">
        <div className="flex flex-row gap-4">
          <div className="flex max-w-2xs pb-2">
            <GeoFilterSelector
              label="Select Order Type"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={options.statuses}
            />
          </div>
          <div className="flex max-w-2xs pb-2">
            <GeoFilterSelector
              label="Select Sales Person"
              value={salesPersonFilter}
              onChange={(e) => setSalesPersonFilter(e.target.value)}
              options={options.salesPeople}
            />
          </div>
        </div>
        <div className="pt-7 ">
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 
            text-emerald-100 rounded-lg shadow-md 
            hover:shadow-lg transition-shadow duration-200 hover:cursor-pointer"
          >
            Reset Filters
          </button>
        </div>

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
                <strong>Sales Person:</strong> {selectedOffer.salesPerson}
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
