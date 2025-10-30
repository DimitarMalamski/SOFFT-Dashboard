import React, { useEffect, useState } from 'react';
import MockOffersAPI from '../mock-apis/MockDataAPI';
import LineChartType from '../components/LineChartType';
import BarChartType from '../components/BarChartType';
import Leaderboard from '../components/Leaderboard.jsx';
import SalesTrendChart from '../components/Charts/SalesTrendChart.jsx';
import ConversionsCard from '../components/Charts/ConversionsChart.jsx';
import TimeToSaleCard from '../components/Charts/TimeToSaleChart.jsx';
import SalesOffersAPI from '../apis/SalesOffersAPI';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
// import mockDataAPI from "../mock-apis/MockDataAPI";
// import error from "eslint-plugin-react/lib/util/error.js";

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
          if (
              offer.salesOfferLine &&
              offer.salesOfferLine.length > 0 &&
              offer.salesOfferLine[0].delivery &&
              offer.salesOfferLine[0].delivery.destinationCountryCode) {
            country = offer.salesOfferLine[0].delivery.destinationCountryCode;
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
              const date = offer.expiresAt ? offer.expiresAt.split("T")[0] : "Unknown";
              let total = 0;
              if (offer.salesOfferLine && offer.salesOfferLine.length > 0) {
                  total = offer.salesOfferLine.reduce(
                      (sum, line) => sum + (line.productPrice?.amount || 0),
                      0
                  );
              }

              if (!totalsByDate[date]) totalsByDate[date] = 0;
              totalsByDate[date] += total;
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

  const [filters, setFilters] = useState({
      dateRange: '',
      startDate: null,
      endDate: null,
      productType: '',
      brand: '',
      salesman: '',
      incoterm: '',
      country: '',
  });

  const [salesmen, setSalesmen] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [productBrands, setProductBrands] = useState([]);
  const [incoterms, setIncoterms] = useState([]);
  const [countries, setCountries] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);

  // -- MockApi useEffect hoock
  // useEffect(() => {
  //     MockOffersAPI.getOffers().then((data) => {
  //         setOffers(data);
  //         setFilteredOffers(data);
  //         console.log('Fetched mock offers:', data);
  //     });
  //
  //     // SalesOffersAPI.getSalesOffers().then((data) => {
  //     //     setOffers(data);
  //     //     setFilteredOffers(data);
  //     // });
  // }, []);

    useEffect(() => {
        SalesOffersAPI.getSalesOffers()
            .then((data) => {
                setOffers(data);
                setFilteredOffers(data);

                const salesmenSet = new Set();
                const productTypesSet = new Set();
                const brandSet = new Set();
                const incotermSet = new Set();
                const countrySet = new Set();

                data.forEach((offer) => {
                    if (offer.salesPersons && offer.salesPersons.length > 0) {
                        salesmenSet.add(offer.salesPersons[0].name);
                    }

                    if (offer.salesOfferLine?.[0]?.delivery?.destinationCountryCode) {
                        countrySet.add(offer.salesOfferLine[0].delivery.destinationCountryCode);
                    }

                    if (offer.salesOfferLine?.[0]?.product?.productType) {
                        productTypesSet.add(offer.salesOfferLine[0].product.productType.toUpperCase());
                    }
                    if (offer.salesOfferLine?.[0]?.product?.brand) {
                        brandSet.add(offer.salesOfferLine[0].product.brand.toUpperCase());
                    }
                    if (offer.salesOfferLine?.[0]?.delivery?.incoterm) {
                        incotermSet.add(offer.salesOfferLine[0].delivery.incoterm.toUpperCase());
                    }
                });

                setSalesmen([...salesmenSet]);
                setProductTypes([...productTypesSet]);
                setProductBrands([...brandSet]);
                setIncoterms([...incotermSet]);
                setCountries([...countrySet]);
            })
            .catch((error) => {
                console.error('Error fetching offers from API:', error);
            })

    }, []);

    useEffect(() => {
        if (offers.length === 0) return;

        if (!filters.productType) {
            const allBrands = new Set();
            offers.forEach((offer) => {
                const line = offer.salesOfferLine?.[0];
                if (line?.product?.brand) {
                    allBrands.add(line.product.brand);
                }
            });
            setProductBrands([...allBrands]);
        }
        else {
            const filteredBrands = new Set();
            offers.forEach((offer) => {
                const line = offer.salesOfferLine?.[0];
                if (
                    line?.product?.productType?.toLowerCase() ===
                        filters.productType.toLowerCase() &&
                    line?.product?.brand
                ) {
                    filteredBrands.add(line.product.brand);
                }
            });
            setProductBrands([...filteredBrands]);
        }
    }, [filters.productType, offers]);

    useEffect(() => {
        setFilters((prev) => ({...prev, brand: ''}));
    }, [filters.productType]);

  const handleApplyFilters = () => {
      const filtered = offers.filter((offer) => {
          const matchesSalesman =
              !filters.salesman ||
              (offer.salesPersons?.[0]?.name || '')
                  .includes(filters.salesman);

          const matchesProductType =
              !filters.productType ||
              (offer.salesOfferLine?.[0]?.product?.productType || '')
                  .toLowerCase()
                  .includes(filters.productType.toLowerCase());

          const matchesBrand =
              !filters.brand ||
              (offer.salesOfferLine?.[0]?.product?.brand || '')
                  .toLowerCase()
                  .includes(filters.brand.toLowerCase());

          const matchesIncoterm =
              !filters.incoterm ||
              (offer.salesOfferLine?.[0]?.delivery?.incoterm || '')
                  .toUpperCase()
                  .includes(filters.incoterm.toUpperCase());

          const matchesCountry =
              !filters.country ||
              (offer.salesOfferLine?.[0]?.delivery?.destinationCountryCode || '')
                  .toUpperCase()
                  .includes(filters.country.toUpperCase());

          let matchesDate = true;
          const offerDate = offer.expiresAt ? new Date(offer.expiresAt) : null;

          if (filters.startDate && filters.endDate && offerDate) {
              matchesDate =
                  offerDate >= new Date(filters.startDate) &&
                  offerDate <= new Date(filters.endDate);
          } else if (filters.dateRange && offerDate) {
              const now = new Date();
              const days = parseInt(filters.dateRange.replace('d', ''), 10);
              const cutoff = new Date(now.setDate(now.getDate() - days));
              matchesDate = offerDate >= cutoff;
          }

          return (
              matchesSalesman &&
              matchesProductType &&
              matchesBrand &&
              matchesIncoterm &&
              matchesCountry &&
              matchesDate
          );
      });

      setFilteredOffers(filtered);
  }

  // useEffect(() => {
  //   MockOffersAPI.getOffers().then((data) => setOffers(data));
  //   SalesOffersAPI.getSalesOffers().then((data) => setOffers(data));
  //   console.log('Fetched offers:', offers);
  // }, []);

  const chartConfig = chartOptions.find((opt) => opt.value === selectedChart);
  const chartData = transformData(filteredOffers, selectedChart);
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
                            {countries.map((c) => (
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
                            {productTypes.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex-1'>
                        <select
                            disabled={!filters.productType && productBrands.length === 0}
                            value={filters.brand}
                            onChange={(e) => setFilters({...filters, brand: e.target.value})}
                            className={`w-full bg-emerald-950 text-white border border-emerald-700 rounded-md px-3 py-2 ${
                                !filters.productType && productBrands.length === 0
                                    ? 'opacity-50 cursor-not-allowed'
                                    : ''
                            }`}
                        >
                            <option value=''>All Brands</option>
                            {productBrands.map((b) => (
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
                            {salesmen.map((s) => (
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
                            {incoterms.map((i) => (
                                <option key={i} value={i}>{i}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={handleApplyFilters}
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
            <Leaderboard />
          </aside>
        </div>
      </div>
    </div>
  );
}