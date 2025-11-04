import React, { useState } from 'react';
import useOffersData from "../hooks/useOffersData.js";
import FilterBar from "../components/Dashboard/FilterBar.jsx";
import ChartSection from "../components/Dashboard/ChartSection.jsx";
import {
    transformData,
    getLast7DaysOrders,
    getConversionStats,
    getTimeToSale,
    transformSalesMan,
} from '../utils/offerTransformations';
import Leaderboard from '../components/Leaderboard.jsx';
import SalesTrendChart from '../components/Charts/SalesTrendChart.jsx';
import ConversionsCard from '../components/Charts/ConversionsChart.jsx';
import TimeToSaleCard from '../components/Charts/TimeToSaleChart.jsx';
import 'react-datepicker/dist/react-datepicker.css';

const chartOptions = [
    { label: "Offers created per salesman", value: "offersPerSalesman", chart: "bar" },
    { label: "Offers per country", value: "offersPerCountry", chart: "bar" },
    { label: "Total value of offers over time", value: "totalValueOverTime", chart: "line" },
    { label: "Conversion rate from offer to order", value: "conversionRate", chart: "line" },
    { label: "Lead time analysis (from offer to acceptance)", value: "leadTimeAnalysis", chart: "line" },
];

export default function Dashboard() {
    const [selectedChart, setSelectedChart] = useState(chartOptions[0].value);

    const {
        offers,
        filteredOffers,
        filters,
        setFilters,
        options,
        applyFilters,
    } = useOffersData();

    const chartData = transformData(filteredOffers, selectedChart);
  const trendPoints = getLast7DaysOrders(offers);
  const conversions = getConversionStats(offers);
  const { points: ttsPoints, avg: avgTts } = getTimeToSale(offers);

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
                {/* --- Chart selector --- */}
                <div className='mb-2'>
                    <label htmlFor='chart-select' className='block mb-2 text-xs/5 text-emerald-100'>
                        Select chart:
                    </label>
                    <select
                        id='chart-select'
                        value={selectedChart}
                        onChange={(e) => setSelectedChart(e.target.value)}
                        className='bg-emerald-950 text-white border border-emerald-700 rounded-md px-3 py-2 shadow-sm'
                    >
                        {chartOptions.map((opt) => (
                            <option key={opt.value} value={opt.value} className='bg-emerald-950 text-white'>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                <FilterBar
                    filters={filters}
                    setFilters={setFilters}
                    options={options}
                    applyFilters={applyFilters}
                />

                <ChartSection
                    selectedChart={selectedChart}
                    chartOptions={chartOptions}
                    chartData={chartData}
                />
            </section>
          <aside className='bg-emerald-950 rounded-md shadow-sm p-2 sm:p-2.5 min-h-0'>
            <Leaderboard salesmanData={transformSalesMan(offers)} />
          </aside>
        </div>
      </div>
    </div>
  );
}