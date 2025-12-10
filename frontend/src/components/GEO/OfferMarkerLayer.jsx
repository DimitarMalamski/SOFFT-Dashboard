// src/components/GEO/OfferMarkersLayer.jsx

import { Fragment } from "react";
import { Marker, Popup } from "react-leaflet";

function OfferMarkersLayer({ points, currentZoom, minZoom = 7, onSelectOffer }) {
    if (currentZoom < minZoom) return null;

    const greenMarker = new L.Icon({
        iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        shadowSize: [41, 41],
    });

    return (
        <Fragment>
            {points.map((offer) => (
                <Marker
                    key={offer.id}
                    position={[offer.latitude, offer.longitude]}
                    icon={greenMarker}
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
                        </div>
                    </Popup>
                </Marker>
            ))}
        </Fragment>
    );
}

export default OfferMarkersLayer;
