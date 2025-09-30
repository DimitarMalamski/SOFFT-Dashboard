import { useEffect, useRef, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function TimeToSaleCard({
  title = 'Avg time to sale',
  points = [
    { label: 'D1', value: 12 },
    { label: 'D2', value: 9 },
    { label: 'D3', value: 14 },
    { label: 'D4', value: 11 },
    { label: 'D5', value: 10 },
  ],
  prevAvg, // e.g., 13.2
  color = '#10B981',
}) {
  const dataset = points.map((p) => ({
    x: String(p.label ?? ''),
    y: Number(p.value ?? 0),
  }));
  const avg = dataset.length
    ? dataset.reduce((s, d) => s + d.y, 0) / dataset.length
    : 0;

  const delta = typeof prevAvg === 'number' ? avg - prevAvg : null;
  const deltaDir = delta == null ? 0 : delta > 0 ? 1 : delta < 0 ? -1 : 0;
  const deltaLabel =
    delta == null
      ? '—'
      : `${deltaDir > 0 ? '↑' : deltaDir < 0 ? '↓' : '→'} ${Math.abs(
          delta
        ).toFixed(1)}d`;

  const deltaClasses =
    deltaDir > 0
      ? 'text-rose-300 border-rose-700 bg-rose-900/30'
      : deltaDir < 0
      ? 'text-emerald-300 border-emerald-700 bg-emerald-900/30'
      : 'text-slate-300 border-slate-700 bg-slate-800/40';

  // ensure chart width > 0
  const ref = useRef(null);
  const [width, setWidth] = useState(220);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((e) => {
      const w = e[0]?.contentRect?.width;
      if (w) setWidth(Math.max(140, Math.floor(w)));
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

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

      <div className='mt-0.5 grid grid-cols-[auto_1fr] items-end gap-2'>
        <div className='text-2xl sm:text-3xl font-semibold leading-none tracking-tight'>
          {avg.toFixed(1)}d
        </div>
        <div ref={ref} className='h-12 sm:h-14 w-full'>
          <LineChart
            width={width}
            height={56}
            dataset={dataset}
            xAxis={[{ dataKey: 'x', scaleType: 'band' }]}
            series={[
              {
                dataKey: 'y',
                label: 'Days',
                color,
                area: true,
                showMark: false,
                curve: 'linear',
              },
            ]}
            margin={{ top: 6, right: 0, bottom: 0, left: 0 }}
            slotProps={{ legend: { hidden: true } }}
            sx={{
              '& .MuiChartsAxis-root': { display: 'none' },
              '& .MuiChartsLegend-root': { display: 'none' },
              '& .MuiLineElement-root': {
                strokeWidth: 2,
                strokeLinecap: 'butt',
                strokeLinejoin: 'miter',
              },
              '& .MuiAreaElement-root': { fillOpacity: 0.18, fill: color },
            }}
          />
        </div>
      </div>
    </div>
  );
}
