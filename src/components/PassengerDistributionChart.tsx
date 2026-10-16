import type { FC } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { PassengerDistribution } from '../types';
import { Users } from 'lucide-react';

interface PassengerDistributionChartProps {
  data: PassengerDistribution[];
}

export const PassengerDistributionChart: FC<PassengerDistributionChartProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: PassengerDistribution = payload[0].payload;
      return (
        <div className="bg-slate-900/95 border border-slate-700 p-3 rounded-lg shadow-xl text-xs backdrop-blur font-sans">
          <div className="font-semibold text-sky-400 mb-1 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            {item.passenger_count} {item.passenger_count === 1 ? 'Passenger' : 'Passengers'}
          </div>
          <div className="space-y-1 text-slate-200">
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Total Trips:</span>
              <span className="font-mono font-bold text-white">
                {item.total_trips.toLocaleString()} ({item.trip_percentage}%)
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Average Fare:</span>
              <span className="font-mono text-emerald-400 font-bold">
                ${item.avg_fare.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Average Tip:</span>
              <span className="font-mono text-amber-300 font-semibold">
                ${item.avg_tip.toFixed(2)}
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
            👥 Trips by Passenger Count
          </h2>
          <p className="text-xs text-slate-400">
            Party size breakdown (1 to 6 riders) • Silver layer coalesce logic
          </p>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-sky-950/70 border border-sky-500/30 text-sky-400">
          72.0% Solo Riders
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -5, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="passenger_count"
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickFormatter={(val) => `${val} rider${val > 1 ? 's' : ''}`}
            />
            <YAxis
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              tickFormatter={(val) => `${(val / 1_000_000).toFixed(1)}M`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="total_trips" fill="#38bdf8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-auto pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span>Group rides (5-6) average $25.00+ fare</span>
        <span className="font-mono text-emerald-400">COALESCE(passengers, 1)</span>
      </div>
    </div>
  );
};
