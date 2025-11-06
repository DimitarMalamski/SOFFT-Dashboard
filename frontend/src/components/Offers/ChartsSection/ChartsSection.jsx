import React from "react";
import StatusChart from "./charts/StatusChart.jsx";
import SalespersonChart from "./charts/SalespersonChart.jsx";
import TimelineChart from "./charts/TimelineChart.jsx";
import { transformChartData } from "../../../utils/transformChartData.js";

export default function ChartsSection({ offers, variant = "overview" }) {
    const { statusCounts, salesByPerson, offersByDate } =
        transformChartData(offers);

    if (variant === "overview") {
        return (
            <div className="grid lg:grid-cols-3 gap-6 mb-10">
                <StatusChart data={statusCounts} />
                <SalespersonChart data={salesByPerson} />
                <TimelineChart data={offersByDate} />
            </div>
        );
    }

    if (variant === "timeline") {
        return (
            <div className="mb-10">
                <TimelineChart data={offersByDate} />
            </div>
        );
    }

    return null;
}