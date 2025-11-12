import React from "react";
import LineChartType from "../LineChartType";
import BarChartType from "../BarChartType";

export default function ChartSection({ selectedChart, chartOptions, chartData }) {
    const chartConfig = chartOptions.find((opt) => opt.value === selectedChart);

    let chartProps = {};
    switch (selectedChart) {
        case "offersPerSalesman":
            chartProps = { data: chartData, xKey: "salesman", yKey: "count", label: "Offers" };
            break;
        case "offersPerCountry":
            chartProps = { data: chartData, xKey: "country", yKey: "count", label: "Offers" };
            break;
        case "totalValueOverTime":
            chartProps = { data: chartData, xKey: "date", yKey: "total", label: "Total Value" };
            break;
        case "conversionRate":
            chartProps = { data: chartData, xKey: "date", yKey: "rate", label: "Conversion Rate (%)" };
            break;
        case "leadTimeAnalysis":
            chartProps = { data: chartData, xKey: "referenceId", yKey: "leadTime", label: "Lead Time (days)" };
            break;
        default:
            chartProps = {};
    }

    return (
        <div className="bg-emerald-950 rounded-md shadow-sm p-2 sm:p-2.5 min-h-[400px] flex items-center justify-center overflow-hidden">
            {chartData.length === 0 ? (
                <div className="text-emerald-100 text-xl text-center">No data to display for this chart.</div>
            ) : chartConfig.chart === "line" ? (
                <LineChartType {...chartProps} />
            ) : (
                <BarChartType {...chartProps} />
            )}
        </div>
    );
}
