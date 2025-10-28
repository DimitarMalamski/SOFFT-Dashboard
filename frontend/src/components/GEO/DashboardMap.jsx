import { MapContainer, TileLayer } from 'react-leaflet';
import HeatmapLayer from './HeatmapLayer';

function DashboardMap() {
    // Mock Data
    const heatData = [
        [51.505, -0.09, 0.8],
        [48.8566, 2.3522, 0.6],
        [52.3676, 4.9041, 0.9],
    ];

    return (
        <div style={{ height: '600px', width: '100%' }}>
            <MapContainer
                center={[50, 5]}
                zoom={5}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <HeatmapLayer points={heatData} />
            </MapContainer>
        </div>
    );
}

export default DashboardMap;
