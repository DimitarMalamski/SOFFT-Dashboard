import React, { useEffect, useState } from 'react';
import MockOffersAPI from '../mock-apis/MockDataAPI';
import LineChartType from '../components/LineChartType';
import BarChartType from '../components/BarChartType';
import Leaderboard from '../components/Leaderboard.jsx';

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
    case 'offersPerSalesman': {
      const counts = {};
      raw.forEach((offer) => {
        const name = offer.salesPersons[0]?.name ?? 'Unknown';
        counts[name] = (counts[name] || 0) + 1;
      });
      return Object.entries(counts).map(([salesman, count]) => ({
        salesman,
        count,
      }));
    }
    case 'offersPerCountry': {
      const counts = {};
      raw.forEach((offer) => {
        const country = offer.customerCompany?.country ?? 'Unknown';
        counts[country] = (counts[country] || 0) + 1;
      });
      return Object.entries(counts).map(([country, count]) => ({
        country,
        count,
      }));
    }
    case 'totalValueOverTime': {
      const byDate = {};
      raw.forEach((offer) => {
        const date = offer.updatedAt.split(' ')[0];
        byDate[date] =
          (byDate[date] || 0) + offer.totalPriceExcludingVat.amount;
      });
      return Object.entries(byDate).map(([date, total]) => ({
        date,
        total,
      }));
    }
    case 'conversionRate': {
      const byDate = {};
      raw.forEach((offer) => {
        const date = offer.updatedAt.split(' ')[0];
        if (!byDate[date]) byDate[date] = { offers: 0, orders: 0 };
        byDate[date].offers += 1;
        if (
          offer.statusDescription === 'Accepted' &&
          offer.salesOfferOrders.length > 0
        ) {
          byDate[date].orders += 1;
        }
      });
      return Object.entries(byDate).map(([date, stats]) => ({
        date,
        rate: stats.offers ? (stats.orders / stats.offers) * 100 : 0,
      }));
    }
    case 'leadTimeAnalysis': {
      return raw
        .filter(
          (offer) =>
            offer.statusDescription === 'Accepted' &&
            offer.salesOfferOrders.length > 0
        )
        .map((offer) => {
          const offerDate = new Date(offer.createdAt);
          const orderDate = new Date(offer.salesOfferOrders[0].createdAt);
          const leadTime = (orderDate - offerDate) / (1000 * 60 * 60 * 24);
          return {
            referenceId: offer.referenceId,
            leadTime: Number(leadTime.toFixed(2)),
          };
        });
    }
    default:
      return [];
  }
}

import SalesTrendChart from '../components/Charts/SalesTrendChart.jsx';
import ConversionsCard from '../components/Charts/ConversionsChart.jsx';
import TimeToSaleCard from '../components/Charts/TimeToSaleChart.jsx';

const demoTrend = [
  { label: 'Mon', value: 120 },
  { label: 'Tue', value: 98 },
  { label: 'Wed', value: 160 },
  { label: 'Thu', value: 130 },
  { label: 'Fri', value: 90 },
  { label: 'Sat', value: 200 },
  { label: 'Sun', value: 340 },
];

const demoConversions = { wins: 18, total: 42, prevWins: 12, prevTotal: 40 };

const demoTtsPoints = [
  { label: 'D1', value: 12 },
  { label: 'D2', value: 9 },
  { label: 'D3', value: 14 },
  { label: 'D4', value: 11 },
  { label: 'D5', value: 10 },
];
const prevAvgTts = 12.8;

export default function Dashboard() {
  const [offers, setOffers] = useState([]);
  const [selectedChart, setSelectedChart] = useState(chartOptions[0].value);

  useEffect(() => {
    MockOffersAPI.getOffers().then((data) => setOffers(data));
  }, []);

  const chartConfig = chartOptions.find((opt) => opt.value === selectedChart);
  const chartData = transformData(offers, selectedChart);
  console.log('Chart:', selectedChart, 'Transformed Data:', chartData);

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
        <SalesTrendChart title='Orders (last 7 days)' points={demoTrend} />
        <ConversionsCard
          title='Conversion rate'
          wins={demoConversions.wins}
          total={demoConversions.total}
          prevWins={demoConversions.prevWins}
          prevTotal={demoConversions.prevTotal}
        />
        <TimeToSaleCard
          title='Avg time to sale'
          points={demoTtsPoints}
          prevAvg={prevAvgTts}
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

          {/* Right: leaderboard (1/3 on lg+, below on mobile) */}
          <aside className='bg-emerald-950 rounded-md shadow-sm p-2 sm:p-2.5 min-h-0'>
            <Leaderboard />
          </aside>
        </div>
      </div>
    </div>
  );
}
