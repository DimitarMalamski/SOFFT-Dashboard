import React from "react";
import StatusChart from "./charts/StatusChart.jsx";
import SalespersonChart from "./charts/SalespersonChart.jsx";
import TimelineChart from "./charts/TimelineChart.jsx";
import { transformChartData } from "../../../utils/offersPage/transformChartData.js";

export default function ChartsSection({ offers }) {
    const { statusCounts, salesByPerson, offersByDate } =
        transformChartData(offers);

    return (
        <section className="flex flex-col gap-6 mb-10">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:basis-[40%]">
                    <StatusChart data={statusCounts} />
                </div>
                <div className="lg:basis-[60%]">
                    <SalespersonChart data={salesByPerson} />
                </div>
            </div>

            <TimelineChart data={offersByDate} />
        </section>
    );
}