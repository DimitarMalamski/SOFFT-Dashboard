import React, { useEffect, useState } from 'react';
import MockOffersAPI from '../mock-apis/MockDataAPI';
import LineChartType from '../components/LineChartType';
import BarChartType from '../components/BarChartType';
import Leaderboard from '../components/Leaderboard.jsx';
import SalesTrendChart from '../components/Charts/SalesTrendChart.jsx';
import ConversionsCard from '../components/Charts/ConversionsChart.jsx';
import TimeToSaleCard from '../components/Charts/TimeToSaleChart.jsx';
import SalesOffersAPI from '../apis/SalesOffersAPI';

const chartOptions = [
  {
    label: 'Offers created per salesman',
    value: 'offersPerSalesman',
    chart: 'bar',
  },
  { label: 'Offers per country', value: 'offersPerCountry', chart: 'bar' },
  {
    label: 'Total value of offers over time',
    value: 'totalValueOverTime',
    chart: 'line',
  },
  {
    label: 'Conversion rate from offer to order',
    value: 'conversionRate',
    chart: 'line',
  },
  {
    label: 'Lead time analysis (from offer to acceptance)',
    value: 'leadTimeAnalysis',
    chart: 'line',
  },
];

function transformData(raw, selected) {
  switch (selected) {
      case "offersPerSalesman":{
        const counts = {};
        raw.forEach((offer) => {
          let name = "Unknown";
          if (offer.salesPersons && offer.salesPersons.length > 0 && offer.salesPersons[0].name) {
            name = offer.salesPersons[0].name;
          }

        if (!counts[name]) {
          counts[name] = 0;
        }
        counts[name]++;
          });

        return Object.entries(counts).map(([salesman, count]) => ({ salesman, count }));
      }

      case "offersPerCountry": {
        const counts = {};
        raw.forEach((offer) => {
          let country = "Unknown";
          if (offer.customerCompany && offer.customerCompany.country) {
            country = offer.customerCompany.country;
          }

          if (!counts[country]) {
            counts[country] = 0;
          }
          counts[country]++;
          });
          return Object.entries(counts).map(([country, count]) => ({ country, count }));
      }
      case "totalValueOverTime": {
        const totalsByDate = {};
          raw.forEach((offer) => {
          if (!offer.updatedAt || !offer.totalPriceExcludingVat) return;

          const date = offer.updatedAt.split(" ")[0];
          const amount = offer.totalPriceExcludingVat.amount || 0;

          if (!totalsByDate[date]) {
            totalsByDate[date] = 0;
          }
          totalsByDate[date] += amount;
          });
          return Object.entries(totalsByDate).map(([date, total]) => ({ date, total }));
      }
      case "conversionRate": {
        const statsByDate = {};
        raw.forEach((offer) => {
          if (!offer.updatedAt) return;

          const date = offer.updatedAt.split(" ")[0];
            if (!statsByDate[date]) {
              statsByDate[date] = { offers: 0, orders: 0 };
            }
            statsByDate[date].offers++;

          const accepted = offer.statusDescription === "Accepted";
          const hasOrders = offer.salesOfferOrders && offer.salesOfferOrders.length > 0;

          if (accepted && hasOrders) {
            statsByDate[date].orders++;
          }
          });
          return Object.entries(statsByDate).map(([date, stats]) => {
              const rate = stats.offers > 0 ? (stats.orders / stats.offers) * 100 : 0;
              return { date, rate };
          });
      }
      case "leadTimeAnalysis": {
        const acceptedOffers = raw.filter(
          (offer) =>
            offer.statusDescription === "Accepted" &&
            offer.salesOfferOrders &&
            offer.salesOfferOrders.length > 0
        );
        return acceptedOffers.map((offer) => {
          const offerDate = new Date(offer.createdAt);
          const orderDate = new Date(offer.salesOfferOrders[0].createdAt);
          const leadTimeDays = (orderDate - offerDate) / (1000 * 60 * 60 * 24);
          return {
            referenceId: offer.referenceId,
            leadTime: Number(leadTimeDays.toFixed(2)),
          };
        });
      }
      default:
        return [];
  }
}

function getLast7DaysOrders(raw) {
  const ordersByDay = {};
  raw.forEach((offer) => {
    if (!offer.salesOfferOrders || offer.salesOfferOrders.length === 0) return;

    const orderDate = new Date(offer.salesOfferOrders[0].createdAt);
    const dateLabel = orderDate.toLocaleDateString('en-US', { weekday: 'short' });

    if (!ordersByDay[dateLabel]) ordersByDay[dateLabel] = 0;
    ordersByDay[dateLabel]++;
  });

  // Sort days by a fixed Mon–Sun order:
  const daysOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return daysOrder.map((d) => ({ label: d, value: ordersByDay[d] || 0 }));
}

function getConversionStats(raw) {
  let total = 0;
  let wins = 0;

  raw.forEach((offer) => {
    total++;
    const accepted = offer.statusDescription === "Accepted";
    const hasOrders = offer.salesOfferOrders && offer.salesOfferOrders.length > 0;
    if (accepted && hasOrders) wins++;
  });

  return { wins, total };
}

function getTimeToSale(raw) {
  const acceptedOffers = raw.filter(
    (offer) =>
      offer.statusDescription === "Accepted" &&
      offer.salesOfferOrders &&
      offer.salesOfferOrders.length > 0
  );

  const points = acceptedOffers.map((offer, idx) => {
    const offerDate = new Date(offer.createdAt);
    const orderDate = new Date(offer.salesOfferOrders[0].createdAt);
    const diffDays = (orderDate - offerDate) / (1000 * 60 * 60 * 24);
    return { label: `D${idx + 1}`, value: Number(diffDays.toFixed(1)) };
  });

  const avg = points.length
    ? points.reduce((sum, p) => sum + p.value, 0) / points.length
    : 0;

  return { points, avg };
}

// const demoTrend = [
//   { label: 'Mon', value: 120 },
//   { label: 'Tue', value: 98 },
//   { label: 'Wed', value: 160 },
//   { label: 'Thu', value: 130 },
//   { label: 'Fri', value: 90 },
//   { label: 'Sat', value: 200 },
//   { label: 'Sun', value: 340 },
// ];

// const demoConversions = { wins: 18, total: 42, prevWins: 12, prevTotal: 40 };

// const demoTtsPoints = [
//   { label: 'D1', value: 12 },
//   { label: 'D2', value: 9 },
//   { label: 'D3', value: 14 },
//   { label: 'D4', value: 11 },
//   { label: 'D5', value: 10 },
// ];
// const prevAvgTts = 12.8;

export default function Dashboard() {
  const [offers, setOffers] = useState([]);
  const [selectedChart, setSelectedChart] = useState(chartOptions[0].value);

  useEffect(() => {
    // MockOffersAPI.getOffers().then((data) => setOffers(data));
    SalesOffersAPI.getSalesOffers().then((data) => {
      console.log('Raw API response:', data);
      setOffers(data);
    });
  }, []);

  const chartConfig = chartOptions.find((opt) => opt.value === selectedChart);
  const chartData = transformData(offers, selectedChart);
  console.log('Chart:', selectedChart, 'Transformed Data:', chartData);

  const trendPoints = getLast7DaysOrders(offers);
  const conversions = getConversionStats(offers);
  const { points: ttsPoints, avg: avgTts } = getTimeToSale(offers);

  let chartProps = {};
  switch (selectedChart) {
    case 'offersPerSalesman':
      chartProps = {
        data: chartData,
        xKey: 'salesman',
        yKey: 'count',
        label: 'Offers',
      };
      break;
    case 'offersPerCountry':
      chartProps = {
        data: chartData,
        xKey: 'country',
        yKey: 'count',
        label: 'Offers',
      };
      break;
    case 'totalValueOverTime':
      chartProps = {
        data: chartData,
        xKey: 'date',
        yKey: 'total',
        label: 'Total Value',
      };
      break;
    case 'conversionRate':
      chartProps = {
        data: chartData,
        xKey: 'date',
        yKey: 'rate',
        label: 'Conversion Rate (%)',
      };
      break;
    case 'leadTimeAnalysis':
      chartProps = {
        data: chartData,
        xKey: 'referenceId',
        yKey: 'leadTime',
        label: 'Lead Time (days)',
      };
      break;
    default:
      chartProps = {};
  }

  return (
    <div className='h-dvh max-h-dvh min-h-0 overflow-y-auto'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <SalesTrendChart title='Orders (last 7 days)' points={trendPoints} />
        <ConversionsCard
          title='Conversion rate'
          wins={conversions.wins}
          total={conversions.total}
          prevWins={conversions.wins * 0.8}
          prevTotal={conversions.total}
        />
        <TimeToSaleCard
          title='Avg time to sale'
          points={ttsPoints}
          prevAvg={avgTts + 1.2}
        />
      </div>

      <div className='bg-emerald-900 p-4 shadow-md rounded-md mt-4 min-h-0'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0'>
          {/* Left: select + big chart (2/3 on lg+) */}
          <section className='lg:col-span-2 min-h-0'>
            <div className='mb-2'>
              <label
                htmlFor='chart-select'
                className='block mb-2 text-xs/5 text-emerald-100'
              >
                Select chart:
              </label>
              <select
                id='chart-select'
                value={selectedChart}
                onChange={(e) => setSelectedChart(e.target.value)}
                className='bg-emerald-950 text-white border border-emerald-700 rounded-md px-3 py-2 shadow-sm'
              >
                {chartOptions.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className='bg-emerald-950 text-white'
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className='bg-emerald-950 rounded-md shadow-sm p-2 sm:p-2.5 min-h-[400px] flex items-center justify-center overflow-hidden'>
              {chartData.length === 0 ? (
                <div className='text-emerald-100 text-xl text-center'>
                  No data to display for this chart.
                </div>
              ) : chartConfig.chart === 'line' ? (
                <LineChartType {...chartProps} />
              ) : (
                <BarChartType {...chartProps} />
              )}
            </div>
          </section>
          <aside className='bg-emerald-950 rounded-md shadow-sm p-2 sm:p-2.5 min-h-0'>
            <Leaderboard />
          </aside>
        </div>
      </div>
    </div>
  );
}