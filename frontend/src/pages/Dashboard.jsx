import React, { useState } from 'react';
import useOffersData from "../hooks/useOffersData.js";
import {
    transformData,
    getLast7DaysOrders,
    getConversionStats,
    getTimeToSale,
    transformSalesMan,
} from '../utils/offerTransformations';
import LineChartType from '../components/LineChartType';
import BarChartType from '../components/BarChartType';
import Leaderboard from '../components/Leaderboard.jsx';
import SalesTrendChart from '../components/Charts/SalesTrendChart.jsx';
import ConversionsCard from '../components/Charts/ConversionsChart.jsx';
import TimeToSaleCard from '../components/Charts/TimeToSaleChart.jsx';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

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

  const chartConfig = chartOptions.find((opt) => opt.value === selectedChart);
  const chartData = transformData(filteredOffers, selectedChart);

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

                {/* --- Filter bar (dropdowns + Apply button) --- */}
                <div className='flex flex-wrap items-center gap-3 mb-4'>
                    <div className='flex items-center gap-2 flex-1'>
                        <DatePicker
                            selected={filters.startDate}
                            onChange={(date) => setFilters({ ...filters, startDate: date })}
                            selectsStart
                            startDate={filters.startDate}
                            endDate={filters.endDate}
                            placeholderText='Start date'
                            className='w-full bg-emerald-950 text-white border border-emerald-700 rounded-md px-3 py-2'
                        />
                        <DatePicker
                            selected={filters.endDate}
                            onChange={(date) => setFilters({ ...filters, endDate: date })}
                            selectsEnd
                            startDate={filters.startDate}
                            endDate={filters.endDate}
                            minDate={filters.startDate}
                            placeholderText='End date'
                            className='w-full bg-emerald-950 text-white border border-emerald-700 rounded-md px-3 py-2'
                        />
                    </div>
                    <div className='flex-1'>
                        <select
                            value={filters.country}
                            onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                            className='w-full bg-emerald-950 text-white border border-emerald-700 rounded-md px-3 py-2'
                        >
                            <option value=''>All Countries</option>
                            {options.countries.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex-1'>
                        <select
                            value={filters.productType}
                            onChange={(e) => setFilters({...filters, productType: e.target.value})}
                            className='w-full bg-emerald-950 text-white border border-emerald-700 rounded-md px-3 py-2'
                        >
                            <option value=''>All Types</option>
                            {options.productTypes.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex-1'>
                        <select
                            disabled={!filters.productType && options.brands.length === 0}
                            value={filters.brand}
                            onChange={(e) => setFilters({...filters, brand: e.target.value})}
                            className={`w-full bg-emerald-950 text-white border border-emerald-700 rounded-md px-3 py-2 ${
                                !filters.productType && options.brands.length === 0
                                    ? 'opacity-50 cursor-not-allowed'
                                    : ''
                            }`}
                        >
                            <option value=''>All Brands</option>
                            {options.brands.map((b) => (
                                <option key={b} value={b}>{b}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex-1'>
                        <select
                            value={filters.salesman}
                            onChange={(e) => setFilters({...filters, salesman: e.target.value})}
                            className='w-full bg-emerald-950 text-white border border-emerald-700 rounded-md px-3 py-2'
                        >
                            <option value=''>All Salesmen</option>
                            {options.salesmen.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex-1'>
                        <select
                            value={filters.incoterm}
                            onChange={(e) => setFilters({...filters, incoterm: e.target.value})}
                            className='w-full bg-emerald-950 text-white border border-emerald-700 rounded-md px-3 py-2'
                        >
                            <option value=''>All Incoterms</option>
                            {options.incoterms.map((i) => (
                                <option key={i} value={i}>{i}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={applyFilters}
                        className='bg-emerald-700 text-white px-3 py-2 rounded-md hover:bg-emerald-600 transition'
                    >
                        Apply
                    </button>
                </div>

                {/* --- Chart container --- */}
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
            <Leaderboard salesmanData={transformSalesMan(offers)} />
          </aside>
        </div>
      </div>
    </div>
  );
}