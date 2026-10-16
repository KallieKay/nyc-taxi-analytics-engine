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
import { PeakHoursTipping } from '../types';
import { getViridisColor } from '../utils/colors';
import { Clock } from 'lucide-react';

interface PeakTippingChartProps {
  data: PeakHoursTipping[];
}

export const PeakTippingChart: FC<PeakTippingChartProps> = ({ data }) => {
  const minTip = Math.min(...data.map((d) => d.avg_tip_percentage));
  const maxTip = Math.max(...data.map((d) => d.avg_tip_percentage));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: PeakHoursTipping = payload[0].payload;
      const formattedHour = `${item.hour_of_day.toString().padStart(2, '0')}:00 - ${item.hour_of_day.toString().padStart(2, '0')}:59`;
      return (
        <div className="bg-slate-900/95 border border-slate-700 p-3 rounded-lg shadow-xl text-xs backdrop-blur font-sans">
          <div className="font-semibold text-emerald-400 mb-1 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {formattedHour}
          </div>
          <div className="space-y-1 text-slate-200">
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Average Tip:</span>
              <span className="font-mono font-bold text-amber-300">
                {item.avg_tip_percentage.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Total Trips:</span>
              <span className="font-mono">{item.total_trips.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Total Revenue:</span>
              <span className="font-mono text-emerald-400">
                ${(item.total_revenue / 1_000_000).toFixed(2)}M
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Avg Trip Dist:</span>
              <span className="font-mono">{item.avg_trip_distance} mi</span>
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
            🕒 Peak Tipping Hours
          </h2>
          <p className="text-xs text-slate-400">
            Average tip % by hour (0–23) • Viridis scale
          </p>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/30 text-emerald-400">
          Peak: 21:00 (21.75%)
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="hour_of_day"
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              tickFormatter={(h) => `${h}h`}
            />
            <YAxis
              stroke="#64748b"
              domain={[14, 24]}
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              tickFormatter={(val) => `${val}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="avg_tip_percentage" radius={[3, 3, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getViridisColor(entry.avg_tip_percentage, minTip, maxTip)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Viridis Colorbar Legend */}
      <div className="mt-auto pt-3 border-t border-slate-800/80">
        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
          <span>Min Tip ({minTip.toFixed(1)}%)</span>
          <span className="font-semibold text-slate-300">Viridis Continuous Color Scale</span>
          <span>Max Tip ({maxTip.toFixed(1)}%)</span>
        </div>
        <div
          className="h-2 rounded w-full"
          style={{
            background:
              'linear-gradient(to right, rgb(68, 1, 84), rgb(59, 82, 139), rgb(33, 145, 140), rgb(94, 201, 98), rgb(253, 231, 37))',
          }}
        />
      </div>
    </div>
  );
};
