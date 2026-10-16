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
import { getAmberColor } from '../utils/colors';
import { Compass } from 'lucide-react';

interface HourlyDistanceChartProps {
  data: PeakHoursTipping[];
}

export const HourlyDistanceChart: FC<HourlyDistanceChartProps> = ({ data }) => {
  const minDist = Math.min(...data.map((d) => d.avg_trip_distance));
  const maxDist = Math.max(...data.map((d) => d.avg_trip_distance));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: PeakHoursTipping = payload[0].payload;
      const formattedHour = `${item.hour_of_day.toString().padStart(2, '0')}:00 - ${item.hour_of_day.toString().padStart(2, '0')}:59`;
      return (
        <div className="bg-slate-900/95 border border-slate-700 p-3 rounded-lg shadow-xl text-xs backdrop-blur font-sans">
          <div className="font-semibold text-amber-400 mb-1 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            {formattedHour}
          </div>
          <div className="space-y-1 text-slate-200">
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Avg Distance:</span>
              <span className="font-mono font-bold text-amber-300">
                {item.avg_trip_distance.toFixed(2)} miles
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
            ✈️ Avg Trip Distance by Hour
          </h2>
          <p className="text-xs text-slate-400">
            Distance in miles across 24 hours • Airport surges at dawn
          </p>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-950/70 border border-amber-500/30 text-amber-400">
          Peak: 05:00 (4.35 mi)
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
              domain={[2.5, 4.6]}
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              tickFormatter={(val) => `${val.toFixed(1)}m`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="avg_trip_distance" radius={[3, 3, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-dist-${index}`}
                  fill={getAmberColor(entry.avg_trip_distance, minDist, maxDist)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Amber Legend */}
      <div className="mt-auto pt-3 border-t border-slate-800/80">
        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
          <span>Short Trips ({minDist.toFixed(2)} mi)</span>
          <span className="font-semibold text-slate-300">Amber Continuous Scale</span>
          <span>Airport Runs ({maxDist.toFixed(2)} mi)</span>
        </div>
        <div
          className="h-2 rounded w-full"
          style={{
            background:
              'linear-gradient(to right, rgb(254, 243, 199), rgb(245, 158, 11), rgb(217, 119, 6), rgb(180, 83, 9))',
          }}
        />
      </div>
    </div>
  );
};
