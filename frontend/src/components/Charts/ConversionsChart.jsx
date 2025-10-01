import { PieChart } from '@mui/x-charts/PieChart';
import { useMemo } from 'react';

export default function ConversionsCard({
  title = 'Conversion rate',
  wins = 42,
  total = 100,
  prevWins,
  prevTotal,
  color = 'white',
}) {
  const rate = total > 0 ? (wins / total) * 100 : 0;
  const prevRate = prevTotal > 0 ? (prevWins / prevTotal) * 100 : null;
  const deltaPct = prevRate == null ? null : rate - prevRate;
  const deltaDir =
    deltaPct == null ? 0 : deltaPct > 0 ? 1 : deltaPct < 0 ? -1 : 0;

  const deltaLabel =
    deltaPct == null
      ? '—'
      : `${deltaDir > 0 ? '↑' : deltaDir < 0 ? '↓' : '→'} ${Math.abs(
          deltaPct
        ).toFixed(1)}%`;

  const deltaClasses =
    deltaDir > 0
      ? 'text-emerald-300 border-emerald-700 bg-emerald-900/30'
      : deltaDir < 0
      ? 'text-rose-300 border-rose-700 bg-rose-900/30'
      : 'text-slate-300 border-slate-700 bg-slate-800/40';

  const data = useMemo(
    () => [
      {
        id: 0,
        label: 'Converted',
        value: Math.max(0, Math.min(wins, total)),
        color, // emerald
      },
      {
        id: 1,
        label: 'Remaining',
        value: Math.max(0, total - wins),
        color: 'rgba(255,255,255,0.08)', // subtle remainder
      },
    ],
    [wins, total, color]
  );

  return (
    <div className='rounded-none bg-emerald-950 text-white p-2 sm:p-2.5 shadow-sm'>
      <div className='flex items-center justify-between'>
        <div className='text-xs/5 text-emerald-100'>{title}</div>
        <span
          className={`inline-flex items-center rounded-none border px-1.5 py-0.5 text-[10px] sm:text-xs font-medium ${deltaClasses}`}
          title='Change vs previous'
        >
          {deltaLabel}
        </span>
      </div>

      <div className='relative h-28 mt-1'>
        {/* center label */}
        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
          <div className='text-2xl sm:text-3xl font-semibold leading-none tracking-tight'>
            {Math.round(rate)}%
          </div>
        </div>

        <PieChart
          height={112}
          colors={[color, 'rgba(255,255,255,0.08)']}
          series={[
            {
              data,
              innerRadius: 40,
              cornerRadius: 0, // sharp edges
              paddingAngle: 0,
              startAngle: -90,
              endAngle: 270,
              valueFormatter: () => '',
            },
          ]}
          slotProps={{ legend: { hidden: true } }}
          sx={{
            '& .MuiChartsLegend-root': { display: 'none' },
            '& .MuiPieArc-root': {
              stroke: 'transparent',
            },
            '& text': { display: 'none' },
          }}
        />
      </div>

      <div className='mt-1.5 text-[11px] text-emerald-100/80'>
        {wins}/{total} converted
      </div>
    </div>
  );
}
