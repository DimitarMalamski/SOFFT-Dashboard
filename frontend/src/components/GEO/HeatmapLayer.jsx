import { useEffect } from "react";
import { useMap } from "react-leaflet";
import 'leaflet.heat';

function HeatmapLayer({ points }) {
    const map = useMap();

    useEffect(() => {
        if (!map || !points || points.length === 0) return;

        const heatLayer = window.L.heatLayer(points, {
            radius: 25,
            blur: 15,
            maxZoom: 10,
            max: 1.0,
        }).addTo(map);

        return () => {
            map.removeLayer(heatLayer);
        };
    }, [map, points]);

    return null;
}

export default HeatmapLayer;