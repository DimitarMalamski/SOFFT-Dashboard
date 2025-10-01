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
  { label: 'Sun', value: 150 },
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
  return (
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
  );
}
