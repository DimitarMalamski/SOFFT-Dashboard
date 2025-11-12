import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import HeatmapLayer from "./HeatmapLayer.jsx";
import SalesOffersAPI from "../../apis/SalesOffersAPI.js";
import { transformHeatmapData } from "../../utils/GEOPage/transformHeatmapData.js";

function DashboardMap() {
    const [heatData, setHeatData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await SalesOffersAPI.getSalesOffersPerCountry();

                const transformed = transformHeatmapData(data, "country");

                setHeatData(transformed);
            } catch (error) {
                console.error("Error leading heatmap data: ", error);
            }
        }

        fetchData();
    }, []);

    return (
        <div style={{ height: "600px", width: "100%" }}>
            <MapContainer
                center={[50, 5]}
                zoom={4}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />

                {heatData.length > 0 && <HeatmapLayer points={heatData} />}
            </MapContainer>
        </div>
    );
}

export default DashboardMap;