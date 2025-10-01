import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

function BarChartType({ data, xKey, yKey, label }) {
  return (
    <BarChart
      dataset={data}
      xAxis={[{ scaleType: "band", dataKey: xKey }]}
      series={[{ dataKey: yKey, label }]}
      height={350}
    />
  );
}

export default BarChartType;