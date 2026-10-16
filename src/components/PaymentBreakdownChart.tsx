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
import { PaymentBreakdown } from '../types';
import { CreditCard } from 'lucide-react';

interface PaymentBreakdownChartProps {
  data: PaymentBreakdown[];
}

export const PaymentBreakdownChart: FC<PaymentBreakdownChartProps> = ({ data }) => {
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: PaymentBreakdown = payload[0].payload;
      return (
        <div className="bg-slate-900/95 border border-slate-700 p-3 rounded-lg shadow-xl text-xs backdrop-blur font-sans">
          <div className="font-semibold text-emerald-400 mb-1 flex items-center gap-1.5">
            <CreditCard className="w-3.5 h-3.5" />
            {item.payment_name} (Code {item.payment_type})
          </div>
          <div className="space-y-1 text-slate-200">
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Total Trips:</span>
              <span className="font-mono font-bold text-white">
                {item.total_trips.toLocaleString()} ({item.trip_percentage}%)
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Total Revenue:</span>
              <span className="font-mono text-emerald-400 font-bold">
                ${(item.total_revenue / 1_000_000).toFixed(2)}M
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Avg Digital Tip:</span>
              <span className="font-mono text-amber-300 font-semibold">
                {item.avg_tip_percentage.toFixed(2)}%
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
            💳 Payment Method & Tip Share
          </h2>
          <p className="text-xs text-slate-400">
            Credit card vs Cash vs Dispute • dbt accepted_values test
          </p>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/30 text-emerald-400">
          81.1% Card Share
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -5, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="payment_name"
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            <YAxis
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              tickFormatter={(val) => `${(val / 1_000_000).toFixed(1)}M`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="total_trips" radius={[4, 4, 0, 0]}>
              {data.map((_, index) => (
                <Cell key={`cell-pay-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-auto pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span>Cash tips unrecorded in TLC electronic logs</span>
        <span className="font-mono text-emerald-400">payment_type in (1,2,3,4,5,6)</span>
      </div>
    </div>
  );
};
