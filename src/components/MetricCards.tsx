import type { FC } from 'react';
import { DollarSign, Car, Percent, Compass, TrendingUp } from 'lucide-react';
import { DailyRevenue, PeakHoursTipping } from '../types';

interface MetricCardsProps {
  dailyData: DailyRevenue[];
  peakData: PeakHoursTipping[];
}

export const MetricCards: FC<MetricCardsProps> = ({ dailyData, peakData }) => {
  const totalRevenue = dailyData.reduce((acc, curr) => acc + curr.daily_revenue, 0);
  const totalTrips = dailyData.reduce((acc, curr) => acc + curr.total_trips, 0);
  const avgTripDistance =
    dailyData.reduce((acc, curr) => acc + curr.avg_trip_distance * curr.total_trips, 0) /
    (totalTrips || 1);
  const avgRevenuePerTrip = totalRevenue / (totalTrips || 1);

  // Overall average tip percentage weighted by trips from peak hours
  const peakTotalTrips = peakData.reduce((acc, curr) => acc + curr.total_trips, 0);
  const overallAvgTip =
    peakData.reduce((acc, curr) => acc + curr.avg_tip_percentage * curr.total_trips, 0) /
    (peakTotalTrips || 1);

  const metrics = [
    {
      label: 'Total Revenue (Jan 2023)',
      value: `$${(totalRevenue / 1_000_000).toFixed(2)}M`,
      subValue: `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-950/40 border-emerald-500/20',
    },
    {
      label: 'Total Cleaned Trips',
      value: `${(totalTrips / 1_000_000).toFixed(2)}M`,
      subValue: `${totalTrips.toLocaleString()} trips`,
      icon: Car,
      color: 'text-amber-400',
      bgColor: 'bg-amber-950/40 border-amber-500/20',
    },
    {
      label: 'Average Tip Percentage',
      value: `${overallAvgTip.toFixed(2)}%`,
      subValue: 'Peak: 21.75% at 9 PM',
      icon: Percent,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-950/40 border-cyan-500/20',
    },
    {
      label: 'Average Trip Distance',
      value: `${avgTripDistance.toFixed(2)} mi`,
      subValue: 'Filtered trip_distance > 0',
      icon: Compass,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-950/40 border-indigo-500/20',
    },
    {
      label: 'Avg Revenue / Trip',
      value: `$${avgRevenuePerTrip.toFixed(2)}`,
      subValue: 'Fare + Tips + Tolls + Surcharges',
      icon: TrendingUp,
      color: 'text-violet-400',
      bgColor: 'bg-violet-950/40 border-violet-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div
            key={idx}
            className={`p-3.5 rounded-xl border ${m.bgColor} backdrop-blur-sm transition-all hover:border-slate-600`}
          >
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-medium truncate">{m.label}</span>
              <Icon className={`w-4 h-4 ${m.color} shrink-0`} />
            </div>
            <div className="text-xl font-bold tracking-tight text-white mb-0.5">{m.value}</div>
            <div className="text-[11px] text-slate-400 font-mono truncate">{m.subValue}</div>
          </div>
        );
      })}
    </div>
  );
};
