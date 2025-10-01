import * as React from "react";
import { LineChart } from "@mui/x-charts";

function LineChartType({ data, xKey, yKey, label }) {
  return (
    <LineChart
      dataset={data}
      xAxis={[{ dataKey: xKey, label: xKey }]}
      series={[{ dataKey: yKey, label }]}
      height={350}
    />
  );
}

export default LineChartType;

// function LineChartType() {
//   const [offers, setOffers] = React.useState([]);

//   React.useEffect(() => {
//       MockOffersAPI.getOffers().then((data) => {
//         const formatted = data.map((offer) => ({
//           salesman: offer.salesPersons[0]?.name ?? "Unknown",
//           updatedAt: new Date(offer.updatedAt),
//           total: offer.totalPriceExcludingVat.amount,
//         }));
//         setOffers(formatted);
//       });
//     }, []);
//   return (
//     <LineChart
//         xAxis={[
//             {
//                 dataKey: 'updatedAt',
//                 valueFormatter: (value) => value.toString(),
//                 label: { value: 'Date', position: 'insideBottom', offset: -5 },
//             }
//         ]}
//         series={[
//             {
//                 dataKey: 'total',
//                 label: 'Total Price Excl. VAT',
//                 color: 'blue',
//                 showMark: true,
//             }
//         ]}
//         dataset={offers}
//         height={350}
//         yAxis={[{ width: 60, label: { value: 'Total Price', angle: -90, position: 'insideLeft' } }]}
//         experimentalFeatures={{ preferStrictDomainInLineCharts: true }}
//     />
//   );
// }

// export default LineChartType;
