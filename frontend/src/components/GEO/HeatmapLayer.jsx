// src/components/GEO/HeatmapLayer.jsx

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet.heat";

function HeatmapLayer({ points }) {
    const map = useMap();

    useEffect(() => {
        if (!map || !points || points.length === 0) return;

        const heatLayer = window.L.heatLayer(points, {
            radius: 20,
            blur: 12,
            maxZoom: 6,
            max: 0.4
        });

        heatLayer.addTo(map);

        return () => {
            heatLayer.remove();
        };
    }, [map, points]);

    return null;
}

export default HeatmapLayer;
