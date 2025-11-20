import React from "react";
import PropTypes from "prop-types";

export default function ChartSelector({ selectedChart, setSelectedChart, chartOptions }) {
    return (
        <div className="mb-2">
            <label htmlFor="chart-select" className="block mb-2 text-xs/5 text-emerald-100">
                Select chart:
            </label>
            <select
                id="chart-select"
                value={selectedChart}
                onChange={(e) => setSelectedChart(e.target.value)}
                className="bg-emerald-950 text-white border border-emerald-700 rounded-md px-3 py-2 shadow-sm"
            >
                {chartOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-emerald-950 text-white">
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

ChartSelector.propTypes = {
    selectedChart: PropTypes.string.isRequired,
    setSelectedChart: PropTypes.func.isRequired,
    chartOptions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            chart: PropTypes.string.isRequired,
        })
    ).isRequired,
};
