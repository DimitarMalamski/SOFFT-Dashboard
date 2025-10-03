import { useEffect, useRef, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function SalesTrendChart({
  title = 'Event count',
  points = [],
  stat,
  color = '#10B981',
}) {
  const defaultPoints = [
    { label: 'Mon', value: 400 },
    { label: 'Tue', value: 98 },
    { label: 'Wed', value: 160 },
    { label: 'Thu', value: 130 },
    { label: 'Fri', value: 130 },
  ];
  const pts = Array.isArray(points) && points.length ? points : defaultPoints;

  const dataset = pts.map((p) => ({
    x: String(p.label ?? ''),
    y: Number(p.value ?? 0),
  }));

  const lastVal = dataset.length ? dataset[dataset.length - 1].y : 0;
  const rawStat = stat ?? lastVal;
  const pretty =
    typeof rawStat === 'number'
      ? new Intl.NumberFormat('en', {
          notation: 'compact',
          maximumFractionDigits: 1,
        }).format(rawStat)
      : rawStat;

  const prevVal = dataset.length > 1 ? dataset[dataset.length - 2].y : null;
  const deltaPct =
    prevVal && Math.abs(prevVal) > 0
      ? ((lastVal - prevVal) / prevVal) * 100
      : null;

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

  const containerRef = useRef(null);
  const [width, setWidth] = useState(220);
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (cr?.width) setWidth(Math.max(140, Math.floor(cr.width)));
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div className='rounded-none bg-emerald-950 text-white p-2 sm:p-2.5 shadow-sm'>
      <div className='text-xs/5 text-emerald-100'>{title}</div>

      <div className='mt-0.5 grid grid-cols-[auto_1fr] items-end gap-2'>
        <div className='flex items-end gap-2'>
          <div className='text-2xl sm:text-3xl font-semibold leading-none tracking-tight'>
            {pretty}
          </div>
          <span
            className={`inline-flex items-center rounded-none border px-1.5 py-0.5 text-[10px] sm:text-xs font-medium ${deltaClasses}`}
            aria-label='delta vs previous point'
            title='Change vs previous'
          >
            {deltaLabel}
          </span>
        </div>

        <div ref={containerRef} className='h-12 sm:h-14 w-full'>
          <LineChart
            width={width}
            height={56}
            dataset={dataset}
            xAxis={[{ dataKey: 'x', scaleType: 'band' }]}
            series={[
              {
                dataKey: 'y',
                label: 'Trend',
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
