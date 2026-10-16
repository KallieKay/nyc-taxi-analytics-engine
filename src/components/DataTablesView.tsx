import { useState, useMemo, type FC } from 'react';
import {
  DailyRevenue,
  PeakHoursTipping,
  StagingTrip,
  PassengerDistribution,
  PaymentBreakdown,
  DayOfWeekMetric,
} from '../types';
import { Search, Download, ArrowUpDown, ChevronDown, ChevronUp, Database } from 'lucide-react';

interface DataTablesViewProps {
  dailyData: DailyRevenue[];
  peakData: PeakHoursTipping[];
  stagingData: StagingTrip[];
  passengerData?: PassengerDistribution[];
  paymentData?: PaymentBreakdown[];
  dayOfWeekData?: DayOfWeekMetric[];
}

export const DataTablesView: FC<DataTablesViewProps> = ({
  dailyData,
  peakData,
  stagingData,
  passengerData = [],
  paymentData = [],
  dayOfWeekData = [],
}) => {
  const [selectedTable, setSelectedTable] = useState<
    'daily' | 'peak' | 'silver' | 'passengers' | 'payment' | 'dow'
  >('daily');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const exportCSV = (filename: string, rows: any[]) => {
    if (!rows.length) return;
    const headers = Object.keys(rows[0]).join(',');
    const csvContent = [
      headers,
      ...rows.map((row) =>
        Object.values(row)
          .map((v) => (typeof v === 'string' ? `"${v}"` : v))
          .join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Filtered & sorted daily data
  const filteredDaily = useMemo(() => {
    let list = dailyData.filter((d) => d.pickup_date.includes(searchTerm));
    if (sortField) {
      list = [...list].sort((a: any, b: any) => {
        const valA = a[sortField];
        const valB = b[sortField];
        return sortOrder === 'asc' ? (valA > valB ? 1 : -1) : valA < valB ? 1 : -1;
      });
    }
    return list;
  }, [dailyData, searchTerm, sortField, sortOrder]);

  // Filtered & sorted peak data
  const filteredPeak = useMemo(() => {
    let list = peakData.filter((d) => d.hour_of_day.toString().includes(searchTerm));
    if (sortField) {
      list = [...list].sort((a: any, b: any) => {
        const valA = a[sortField];
        const valB = b[sortField];
        return sortOrder === 'asc' ? (valA > valB ? 1 : -1) : valA < valB ? 1 : -1;
      });
    }
    return list;
  }, [peakData, searchTerm, sortField, sortOrder]);

  // Filtered & sorted staging data
  const filteredSilver = useMemo(() => {
    let list = stagingData.filter(
      (d) =>
        d.pickup_zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.dropoff_zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.vendor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.payment_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (sortField) {
      list = [...list].sort((a: any, b: any) => {
        const valA = a[sortField];
        const valB = b[sortField];
        return sortOrder === 'asc' ? (valA > valB ? 1 : -1) : valA < valB ? 1 : -1;
      });
    }
    return list;
  }, [stagingData, searchTerm, sortField, sortOrder]);

  return (
    <div className="space-y-4">
      {/* Table Selector & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-900/70 border border-slate-800 p-4 rounded-xl">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setSelectedTable('daily');
              setSortField('');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedTable === 'daily'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            🥇 fct_daily_revenue (Gold)
          </button>
          <button
            onClick={() => {
              setSelectedTable('peak');
              setSortField('');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedTable === 'peak'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            🥇 fct_peak_hours_tipping (Gold)
          </button>
          <button
            onClick={() => {
              setSelectedTable('passengers');
              setSortField('');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedTable === 'passengers'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            👥 passenger_distribution
          </button>
          <button
            onClick={() => {
              setSelectedTable('payment');
              setSortField('');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedTable === 'payment'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            💳 payment_breakdown
          </button>
          <button
            onClick={() => {
              setSelectedTable('dow');
              setSortField('');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedTable === 'dow'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            📅 day_of_week_revenue
          </button>
          <button
            onClick={() => {
              setSelectedTable('silver');
              setSortField('');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedTable === 'silver'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            🥈 stg_taxi_trips (Silver Sample)
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search / filter data..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-950/80 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 w-52 sm:w-60"
            />
          </div>

          <button
            onClick={() => {
              if (selectedTable === 'daily') exportCSV('fct_daily_revenue', dailyData);
              else if (selectedTable === 'peak') exportCSV('fct_peak_hours_tipping', peakData);
              else if (selectedTable === 'passengers') exportCSV('passenger_distribution', passengerData);
              else if (selectedTable === 'payment') exportCSV('payment_breakdown', paymentData);
              else if (selectedTable === 'dow') exportCSV('day_of_week_revenue', dayOfWeekData);
              else exportCSV('stg_taxi_trips_sample', stagingData);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm shadow-md">
        <div className="p-3 bg-slate-950/50 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-amber-400" />
            <span className="font-mono text-slate-200">
              {selectedTable === 'daily' && 'main.fct_daily_revenue (31 rows)'}
              {selectedTable === 'peak' && 'main.fct_peak_hours_tipping (24 rows)'}
              {selectedTable === 'passengers' && 'main.passenger_distribution (6 rows)'}
              {selectedTable === 'payment' && 'main.payment_breakdown (4 rows)'}
              {selectedTable === 'dow' && 'main.day_of_week_revenue (7 rows)'}
              {selectedTable === 'silver' && 'main.stg_taxi_trips (Cleaned Silver Layer)'}
            </span>
          </div>
          <span className="text-[11px] text-slate-500">Click column header to sort</span>
        </div>

        <div className="overflow-x-auto max-h-[550px]">
          {selectedTable === 'daily' && (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/90 text-slate-400 uppercase text-[10px] tracking-wider sticky top-0 border-b border-slate-800 z-10">
                <tr>
                  <th
                    onClick={() => handleSort('pickup_date')}
                    className="p-3 cursor-pointer hover:text-white"
                  >
                    <div className="flex items-center gap-1">
                      pickup_date
                      {sortField === 'pickup_date' ? (
                        sortOrder === 'asc' ? (
                          <ChevronUp className="w-3 h-3 text-amber-400" />
                        ) : (
                          <ChevronDown className="w-3 h-3 text-amber-400" />
                        )
                      ) : (
                        <ArrowUpDown className="w-3 h-3 opacity-40" />
                      )}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('total_trips')}
                    className="p-3 cursor-pointer hover:text-white text-right"
                  >
                    <div className="flex items-center justify-end gap-1">
                      total_trips
                      <ArrowUpDown className="w-3 h-3 opacity-40" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('daily_revenue')}
                    className="p-3 cursor-pointer hover:text-white text-right"
                  >
                    <div className="flex items-center justify-end gap-1">
                      daily_revenue ($)
                      <ArrowUpDown className="w-3 h-3 opacity-40" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('avg_trip_distance')}
                    className="p-3 cursor-pointer hover:text-white text-right"
                  >
                    <div className="flex items-center justify-end gap-1">
                      avg_trip_distance (mi)
                      <ArrowUpDown className="w-3 h-3 opacity-40" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('avg_revenue_per_trip')}
                    className="p-3 cursor-pointer hover:text-white text-right"
                  >
                    <div className="flex items-center justify-end gap-1">
                      avg_revenue_per_trip ($)
                      <ArrowUpDown className="w-3 h-3 opacity-40" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {filteredDaily.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-semibold text-amber-300">{row.pickup_date}</td>
                    <td className="p-3 text-right text-slate-300">{row.total_trips.toLocaleString()}</td>
                    <td className="p-3 text-right text-emerald-400 font-medium">
                      ${row.daily_revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="p-3 text-right text-slate-300">{row.avg_trip_distance.toFixed(2)}</td>
                    <td className="p-3 text-right text-slate-300">${row.avg_revenue_per_trip.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {selectedTable === 'peak' && (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/90 text-slate-400 uppercase text-[10px] tracking-wider sticky top-0 border-b border-slate-800 z-10">
                <tr>
                  <th
                    onClick={() => handleSort('hour_of_day')}
                    className="p-3 cursor-pointer hover:text-white"
                  >
                    <div className="flex items-center gap-1">
                      hour_of_day (0-23)
                      <ArrowUpDown className="w-3 h-3 opacity-40" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('total_trips')}
                    className="p-3 cursor-pointer hover:text-white text-right"
                  >
                    <div className="flex items-center justify-end gap-1">
                      total_trips
                      <ArrowUpDown className="w-3 h-3 opacity-40" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('total_revenue')}
                    className="p-3 cursor-pointer hover:text-white text-right"
                  >
                    <div className="flex items-center justify-end gap-1">
                      total_revenue ($)
                      <ArrowUpDown className="w-3 h-3 opacity-40" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('avg_tip_percentage')}
                    className="p-3 cursor-pointer hover:text-white text-right"
                  >
                    <div className="flex items-center justify-end gap-1">
                      avg_tip_percentage (%)
                      <ArrowUpDown className="w-3 h-3 opacity-40" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('avg_trip_distance')}
                    className="p-3 cursor-pointer hover:text-white text-right"
                  >
                    <div className="flex items-center justify-end gap-1">
                      avg_trip_distance (mi)
                      <ArrowUpDown className="w-3 h-3 opacity-40" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {filteredPeak.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-semibold text-amber-300">
                      {row.hour_of_day.toString().padStart(2, '0')}:00
                    </td>
                    <td className="p-3 text-right text-slate-300">{row.total_trips.toLocaleString()}</td>
                    <td className="p-3 text-right text-emerald-400">
                      ${row.total_revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="p-3 text-right text-amber-400 font-bold">
                      {row.avg_tip_percentage.toFixed(2)}%
                    </td>
                    <td className="p-3 text-right text-slate-300">{row.avg_trip_distance.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {selectedTable === 'passengers' && (
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950/90 text-slate-400 uppercase text-[10px] tracking-wider sticky top-0 border-b border-slate-800 z-10">
                <tr>
                  <th className="p-3">Party Size</th>
                  <th className="p-3 text-right">Total Trips</th>
                  <th className="p-3 text-right">Share (%)</th>
                  <th className="p-3 text-right">Avg Fare ($)</th>
                  <th className="p-3 text-right">Avg Tip ($)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {passengerData.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-sky-400">
                      {row.passenger_count} {row.passenger_count === 1 ? 'passenger' : 'passengers'}
                    </td>
                    <td className="p-3 text-right text-slate-200">{row.total_trips.toLocaleString()}</td>
                    <td className="p-3 text-right text-amber-300 font-semibold">{row.trip_percentage}%</td>
                    <td className="p-3 text-right text-emerald-400">${row.avg_fare.toFixed(2)}</td>
                    <td className="p-3 text-right text-slate-300">${row.avg_tip.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {selectedTable === 'payment' && (
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950/90 text-slate-400 uppercase text-[10px] tracking-wider sticky top-0 border-b border-slate-800 z-10">
                <tr>
                  <th className="p-3">Code & Name</th>
                  <th className="p-3 text-right">Total Trips</th>
                  <th className="p-3 text-right">Trip Share (%)</th>
                  <th className="p-3 text-right">Total Revenue ($)</th>
                  <th className="p-3 text-right">Avg Electronic Tip (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {paymentData.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-emerald-400">
                      Code {row.payment_type} — {row.payment_name}
                    </td>
                    <td className="p-3 text-right text-slate-200">{row.total_trips.toLocaleString()}</td>
                    <td className="p-3 text-right text-amber-300 font-semibold">{row.trip_percentage}%</td>
                    <td className="p-3 text-right text-emerald-400">
                      ${row.total_revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="p-3 text-right text-slate-300">{row.avg_tip_percentage.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {selectedTable === 'dow' && (
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950/90 text-slate-400 uppercase text-[10px] tracking-wider sticky top-0 border-b border-slate-800 z-10">
                <tr>
                  <th className="p-3">Day of Week</th>
                  <th className="p-3 text-right">Total Trips</th>
                  <th className="p-3 text-right">Total Revenue ($)</th>
                  <th className="p-3 text-right">Avg Fare ($)</th>
                  <th className="p-3 text-right">Avg Tip (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {dayOfWeekData.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-amber-400">{row.day_name}</td>
                    <td className="p-3 text-right text-slate-200">{row.total_trips.toLocaleString()}</td>
                    <td className="p-3 text-right text-emerald-400 font-semibold">
                      ${row.total_revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="p-3 text-right text-slate-300">${row.avg_fare.toFixed(2)}</td>
                    <td className="p-3 text-right text-amber-300">{row.avg_tip_percentage.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {selectedTable === 'silver' && (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/90 text-slate-400 uppercase text-[10px] tracking-wider sticky top-0 border-b border-slate-800 z-10">
                <tr>
                  <th className="p-3">Vendor</th>
                  <th className="p-3">Pickup Time</th>
                  <th className="p-3">Route (From → To)</th>
                  <th className="p-3 text-center">Pass.</th>
                  <th className="p-3 text-right">Distance</th>
                  <th className="p-3 text-center">Payment</th>
                  <th className="p-3 text-right">Fare</th>
                  <th className="p-3 text-right">Tip</th>
                  <th className="p-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredSilver.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-medium text-slate-300">
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono mr-1.5">
                        ID {row.vendor_id}
                      </span>
                      {row.vendor_name}
                    </td>
                    <td className="p-3 font-mono text-slate-400 text-[11px]">
                      {row.pickup_datetime}
                    </td>
                    <td className="p-3 text-slate-200">
                      <div className="flex items-center gap-1 font-sans">
                        <span className="text-amber-400 font-medium">{row.pickup_zone}</span>
                        <span className="text-slate-500">→</span>
                        <span className="text-sky-400 font-medium">{row.dropoff_zone}</span>
                      </div>
                    </td>
                    <td className="p-3 text-center font-mono text-slate-300">
                      {row.passenger_count}
                    </td>
                    <td className="p-3 text-right font-mono text-slate-300">
                      {row.trip_distance.toFixed(2)} mi
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                          row.payment_type === 1
                            ? 'bg-blue-950/80 text-blue-400 border border-blue-500/30'
                            : 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {row.payment_name}
                      </span>
                    </td>
                    <td className="p-3 text-right font-mono text-slate-300">
                      ${row.fare_amount.toFixed(2)}
                    </td>
                    <td className="p-3 text-right font-mono text-amber-300 font-semibold">
                      ${row.tip_amount.toFixed(2)}
                    </td>
                    <td className="p-3 text-right font-mono text-emerald-400 font-bold">
                      ${row.total_amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
