import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

function BarChartType({ data, xKey, yKey, label }) {
  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: xKey, scaleType: 'band' }]}
      series={[{ dataKey: yKey, label, color: '#10B981'}]}
      height={350}
      sx={{
        '& .MuiChartsAxis-line': { stroke: '#047857' },
        '& .MuiChartsAxis-tick': { stroke: '#047857', color: '#047857' },
        '& .MuiChartsAxis-label': { fill: '#d1fae5', color: '#d1fae5' },
        '& .MuiChartsAxis-tickLabel': { fill: '#d1fae5', color: '#d1fae5' },
        '& .MuiChartsLegend-label': { fill: '#d1fae5', color: '#d1fae5' },
      }}
    />
  );
}

export default BarChartType;