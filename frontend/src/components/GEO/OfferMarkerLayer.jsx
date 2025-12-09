// src/components/GEO/OfferMarkersLayer.jsx

import { Fragment } from "react";
import { Marker, Popup } from "react-leaflet";

function OfferMarkersLayer({ points, currentZoom, minZoom = 7, onSelectOffer }) {
    if (currentZoom < minZoom) return null;

    return (
        <Fragment>
            {points.map((offer) => (
                <Marker
                    key={offer.id}
                    position={[offer.latitude, offer.longitude]}
                    eventHandlers={{
                        click() {
                            if (onSelectOffer) onSelectOffer(offer);
                        },
                    }}
                >
                    <Popup>
                        <div style={{ minWidth: "180px" }}>
                            <strong>{offer.id}</strong>
                            <br />
                            {offer.customerName}
                            <br />
                            Status: {offer.status}
                            <br />
                            Value: €{offer.offerValue.toLocaleString("nl-NL")}
                            <br />
                            <button
                                style={{
                                    marginTop: "8px",
                                    padding: "4px 8px",
                                    borderRadius: "4px",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    if (onSelectOffer) onSelectOffer(offer);
                                }}
                            >
                                View details
                            </button>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </Fragment>
    );
}

export default OfferMarkersLayer;
