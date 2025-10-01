import * as React from "react";
import { LineChart } from "@mui/x-charts";

function LineChartType({ data, xKey, yKey, label }) {
  return (
    <LineChart
      dataset={data}
      xAxis={[{ dataKey: xKey, label: xKey, scaleType: 'band' }]}
      series={[{ dataKey: yKey, label, color: '#10B981' }]}
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

export default LineChartType;