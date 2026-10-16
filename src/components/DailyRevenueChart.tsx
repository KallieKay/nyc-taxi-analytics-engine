import { useState, useMemo, type FC } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { DailyRevenue } from '../types';
import { Calendar, Filter, Download, Check } from 'lucide-react';

interface DailyRevenueChartProps {
  data: DailyRevenue[];
}

export const DailyRevenueChart: FC<DailyRevenueChartProps> = ({ data }) => {
  const [filter, setFilter] = useState<'all' | 'w1' | 'w2' | 'w3' | 'w4' | 'weekends'>('all');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const filteredData = useMemo(() => {
    switch (filter) {
      case 'w1':
        return data.slice(0, 7);
      case 'w2':
        return data.slice(7, 14);
      case 'w3':
        return data.slice(14, 21);
      case 'w4':
        return data.slice(21);
      case 'weekends':
        return data.filter((d) => {
          const day = new Date(d.pickup_date).getDay();
          return day === 5 || day === 6; // Sat or Sun
        });
      default:
        return data;
    }
  }, [data, filter]);

  const handleDownloadCSV = () => {
    const filterLabels: Record<string, string> = {
      all: 'all_month',
      w1: 'jan_1_7',
      w2: 'jan_8_14',
      w3: 'jan_15_21',
      w4: 'jan_22_31',
      weekends: 'weekends',
    };
    const filterSuffix = filterLabels[filter] || 'filtered';
    const filename = `nyc_taxi_daily_revenue_${filterSuffix}`;

    const headers = [
      'pickup_date',
      'total_trips',
      'daily_revenue',
      'avg_trip_distance',
      'avg_revenue_per_trip',
    ];
    const csvRows = [
      headers.join(','),
      ...filteredData.map((row) =>
        [
          row.pickup_date,
          row.total_trips,
          row.daily_revenue.toFixed(2),
          row.avg_trip_distance.toFixed(2),
          row.avg_revenue_per_trip.toFixed(2),
        ].join(',')
      ),
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2000);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const item: DailyRevenue = payload[0].payload;
      return (
        <div className="bg-slate-900/95 border border-slate-700 p-3 rounded-lg shadow-xl text-xs backdrop-blur font-sans">
          <div className="font-semibold text-amber-400 mb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {label}
          </div>
          <div className="space-y-1 text-slate-200">
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Daily Revenue:</span>
              <span className="font-mono font-bold text-emerald-400">
                ${item.daily_revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Total Trips:</span>
              <span className="font-mono">{item.total_trips.toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Avg Trip Distance:</span>
              <span className="font-mono">{item.avg_trip_distance} mi</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Avg Rev / Trip:</span>
              <span className="font-mono">${item.avg_revenue_per_trip.toFixed(2)}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 mb-6 backdrop-blur-sm shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            📈 Daily Revenue Trends
          </h2>
          <p className="text-xs text-slate-400">
            Source: <code className="text-amber-400/90 font-mono">main.fct_daily_revenue</code> (Gold Layer)
          </p>
        </div>

        {/* Filter controls & CSV Download */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-lg border border-slate-800 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-1" />
            <button
              onClick={() => setFilter('all')}
              className={`px-2 py-1 rounded transition-colors ${
                filter === 'all' ? 'bg-amber-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Month
            </button>
            <button
              onClick={() => setFilter('w1')}
              className={`px-2 py-1 rounded transition-colors ${
                filter === 'w1' ? 'bg-amber-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Jan 1-7
            </button>
            <button
              onClick={() => setFilter('w2')}
              className={`px-2 py-1 rounded transition-colors ${
                filter === 'w2' ? 'bg-amber-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Jan 8-14
            </button>
            <button
              onClick={() => setFilter('w3')}
              className={`px-2 py-1 rounded transition-colors ${
                filter === 'w3' ? 'bg-amber-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Jan 15-21
            </button>
            <button
              onClick={() => setFilter('w4')}
              className={`px-2 py-1 rounded transition-colors ${
                filter === 'w4' ? 'bg-amber-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Jan 22-31
            </button>
            <button
              onClick={() => setFilter('weekends')}
              className={`px-2 py-1 rounded transition-colors ${
                filter === 'weekends' ? 'bg-amber-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Weekends
            </button>
          </div>

          <button
            onClick={handleDownloadCSV}
            title={`Download ${filteredData.length} filtered daily records as CSV`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700 text-slate-200 text-xs font-medium transition-all shadow-sm"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300 font-semibold">Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Download CSV</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData} margin={{ top: 10, right: 20, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="pickup_date"
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickFormatter={(val) => {
                const parts = val.split('-');
                return parts.length === 3 ? `${parts[1]}/${parts[2]}` : val;
              }}
            />
            <YAxis
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickFormatter={(val) => `$${(val / 1_000_000).toFixed(1)}M`}
              domain={['auto', 'auto']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="daily_revenue"
              stroke="#f59e0b"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#f59e0b', stroke: '#0f172a', strokeWidth: 1.5 }}
              activeDot={{ r: 6, fill: '#fbbf24', stroke: '#fff', strokeWidth: 2 }}
              name="Daily Revenue ($)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-3 mt-1">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-0.5 bg-amber-500 inline-block rounded-full" />
          Plotted metric: Total Daily Revenue in USD ($)
        </span>
        <span>Peak Day: Jan 27 ($3.11M / 112k trips)</span>
      </div>
    </div>
  );
};
