import type { FC } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import { DayOfWeekMetric } from '../types';
import { getViridisColor } from '../utils/colors';
import { CalendarDays } from 'lucide-react';

interface DayOfWeekChartProps {
  data: DayOfWeekMetric[];
}

export const DayOfWeekChart: FC<DayOfWeekChartProps> = ({ data }) => {
  const minRev = Math.min(...data.map((d) => d.total_revenue));
  const maxRev = Math.max(...data.map((d) => d.total_revenue));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: DayOfWeekMetric = payload[0].payload;
      return (
        <div className="bg-slate-900/95 border border-slate-700 p-3 rounded-lg shadow-xl text-xs backdrop-blur font-sans">
          <div className="font-semibold text-amber-400 mb-1 flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5" />
            {item.day_name}
          </div>
          <div className="space-y-1 text-slate-200">
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Total Revenue:</span>
              <span className="font-mono font-bold text-emerald-400">
                ${(item.total_revenue / 1_000_000).toFixed(2)}M
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Total Trips:</span>
              <span className="font-mono">{item.total_trips.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Avg Fare:</span>
              <span className="font-mono">${item.avg_fare.toFixed(2)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Avg Tip %:</span>
              <span className="font-mono text-amber-300 font-semibold">{item.avg_tip_percentage.toFixed(2)}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 backdrop-blur-sm shadow-md flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            📅 Revenue by Day of Week
          </h2>
          <p className="text-xs text-slate-400">
            Total revenue and trip density across the week
          </p>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/30 text-emerald-400">
          Peak: Friday ($13.4M)
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="day_name"
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickFormatter={(d) => d.slice(0, 3)}
            />
            <YAxis
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              tickFormatter={(val) => `$${(val / 1_000_000).toFixed(0)}M`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="total_revenue" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-dow-${index}`}
                  fill={getViridisColor(entry.total_revenue, minRev, maxRev)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-auto pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span>Weekend nights & Friday evening surges</span>
        <span>Low: Monday ($8.47M)</span>
      </div>
    </div>
  );
};
