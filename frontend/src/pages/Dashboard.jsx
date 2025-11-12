import React, { useState } from 'react';
import useOffersDataOverview from "../hooks/useOffersDataOverview.js";
import FilterBar from "../components/Dashboard/FilterBar.jsx";
import ChartSection from "../components/Dashboard/ChartSection.jsx";
import { chartOptions } from "../config/chartOptions.js";
import ChartSelector from "../components/Dashboard/ChartSelector.jsx";
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

export default function Dashboard() {
    const [selectedChart, setSelectedChart] = useState(chartOptions[0].value);

    const {
        offers,
        filteredOffers,
        filters,
        setFilters,
        options,
        applyFilters,
        loading,
        error
    } = useOffersDataOverview();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-dvh">
                <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-dvh">
                <div className="text-red-400 text-lg">
                    Failed to load data. Please try again later.
                </div>
            </div>
        );
    }

    const chartData = transformData(filteredOffers, selectedChart);
  const trendPoints = getLast7DaysOrders(offers);
  const conversions = getConversionStats(offers);
  const { points: ttsPoints, avg: avgTts } = getTimeToSale(offers);

  return (
    <div className='min-h-0 flex flex-col gap-4'>
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
            <section className='lg:col-span-2 min-h-0'>
                <ChartSelector
                    selectedChart={selectedChart}
                    setSelectedChart={setSelectedChart}
                    chartOptions={chartOptions}
                />

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