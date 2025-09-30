import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import SalesTrendChart from './Charts/SalesTrendChart.jsx';
import ConversionsCard from './Charts/ConversionsChart.jsx';
import TimeToSaleCard from './Charts/TimeToSaleChart.jsx';

export default function Layout() {
  const [open, setOpen] = useState(true);

  const demoTrend = [];
  const demoConversions = { wins: 18, total: 42, prevWins: 12, prevTotal: 40 };
  const demoTtsPoints = [
    { label: 'D1', value: 12 },
    { label: 'D2', value: 9 },
    { label: 'D3', value: 14 },
    { label: 'D4', value: 11 },
    { label: 'D5', value: 10 },
  ];
  const prevAvgTts = 12.8;

  return (
    <div className='min-h-screen grid grid-rows-[auto_1fr] grid-cols-[260px_1fr] bg-emerald-950 text-state-100'>
      <div className='col-span-2'>
        <Header title='OVERVIEW' userName='John Doe' />
      </div>
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <main id='main' className='p-4 min-w-0'>
        <div className='mx-auto max-w-7xl'>
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
          <div className='mt-6'>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
