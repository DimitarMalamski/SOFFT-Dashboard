import DashboardMap from "../components/GEO/DashboardMap.jsx";

export default function Geo() {
    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Sales Heatmap</h2>
            <DashboardMap />
        </div>
    );
}