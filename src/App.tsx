import { useState } from 'react';
import { Header } from './components/Header';
import { MetricCards } from './components/MetricCards';
import { DailyRevenueChart } from './components/DailyRevenueChart';
import { PeakTippingChart } from './components/PeakTippingChart';
import { HourlyDemandChart } from './components/HourlyDemandChart';
import { HourlyDistanceChart } from './components/HourlyDistanceChart';
import { PassengerDistributionChart } from './components/PassengerDistributionChart';
import { DayOfWeekChart } from './components/DayOfWeekChart';
import { PaymentBreakdownChart } from './components/PaymentBreakdownChart';
import { DataTablesView } from './components/DataTablesView';
import { PipelineViewer } from './components/PipelineViewer';
import { SqlModelViewer } from './components/SqlModelViewer';
import {
  DAILY_REVENUE_DATA,
  PEAK_HOURS_DATA,
  PASSENGER_DISTRIBUTION,
  PAYMENT_BREAKDOWN,
  DAY_OF_WEEK_DATA,
  SAMPLE_STAGING_TRIPS,
  DBT_TESTS,
  PIPELINE_STAGES,
} from './data/taxiData';
import { Info, Sparkles, CheckCircle2, LayoutGrid, Clock, Users } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tables' | 'pipeline' | 'sql'>('dashboard');
  const [graphSectionFilter, setGraphSectionFilter] = useState<'all' | 'hourly' | 'fleet'>('all');
  const [isRunningPipeline, setIsRunningPipeline] = useState(false);
  const [pipelineSuccessNotice, setPipelineSuccessNotice] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    '>>> Pipeline initialized with DuckDB in-memory engine',
    '[1. Bronze Ingestion]: yellow_tripdata_2023-01.parquet verified (3,066,762 rows)',
    '[2. Silver Cleaning]: dbt run --select stg_taxi_trips -> SUCCESS (2,991,480 valid trips)',
    '[3. Gold Business Marts]: dbt run --select fct_daily_revenue fct_peak_hours_tipping -> SUCCESS',
    '[4. dbt test]: Running 5 schema validation tests -> ALL 5 PASSED [100% OK]',
    '>>> DuckDB analytical tables ready for querying in 0.88s',
  ]);

  const handleRunPipeline = () => {
    if (isRunningPipeline) return;
    setIsRunningPipeline(true);
    setPipelineSuccessNotice(false);

    const timestamp = new Date().toLocaleTimeString();
    const newLogs: string[] = [
      `[${timestamp}] Starting NYC Taxi Data Pipeline Execution...`,
      `[${timestamp}] 1. Extracting Raw Bronze Data (yellow_tripdata_2023-01.parquet)...`,
    ];
    setLogs(newLogs);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Bronze extraction complete. 3,066,762 raw records loaded into DuckDB.`,
        `[${new Date().toLocaleTimeString()}] 2. Running Silver model transformation (stg_taxi_trips.sql)...`,
      ]);
    }, 900);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Silver layer cleaned: 75,282 invalid rows dropped (trip_distance <= 0 or fare <= 0).`,
        `[${new Date().toLocaleTimeString()}] 3. Running Gold Marts models (fct_daily_revenue, fct_peak_hours_tipping)...`,
      ]);
    }, 1800);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Gold marts materialized into main.fct_daily_revenue & main.fct_peak_hours_tipping.`,
        `[${new Date().toLocaleTimeString()}] 4. Running dbt tests (not_null, accepted_values)...`,
        `[${new Date().toLocaleTimeString()}] PASS: vendor_id not_null (0 nulls)`,
        `[${new Date().toLocaleTimeString()}] PASS: pickup_datetime not_null (0 nulls)`,
        `[${new Date().toLocaleTimeString()}] PASS: passenger_count not_null (COALESCE 1)`,
        `[${new Date().toLocaleTimeString()}] PASS: payment_type in [1, 2, 3, 4, 5, 6]`,
        `[${new Date().toLocaleTimeString()}] PIPELINE COMPLETE: All tests passed cleanly!`,
      ]);
      setIsRunningPipeline(false);
      setPipelineSuccessNotice(true);
      setTimeout(() => setPipelineSuccessNotice(false), 5000);
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isRunningPipeline={isRunningPipeline}
        onRunPipeline={handleRunPipeline}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Pipeline Success Alert */}
        {pipelineSuccessNotice && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-sm flex items-center justify-between shadow-lg animate-fade-in">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <strong>Pipeline executed successfully!</strong> Raw Parquet ingested, Silver cleaned, and Gold fact tables re-materialized with all 5 dbt tests passing.
              </div>
            </div>
            <button
              onClick={() => setActiveTab('pipeline')}
              className="text-xs font-semibold underline hover:text-white px-2 py-1"
            >
              View Execution Logs
            </button>
          </div>
        )}

        {/* Global Metric Cards (Present across all views for instant insight) */}
        <MetricCards dailyData={DAILY_REVENUE_DATA} peakData={PEAK_HOURS_DATA} />

        {/* Tab 1: Analytics Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Top Chart: Daily Revenue Trends */}
            <DailyRevenueChart data={DAILY_REVENUE_DATA} />

            {/* Metric Category Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-800/80 pt-6">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-semibold text-slate-200 uppercase tracking-wider font-mono">
                  ANALYTICAL MART VISUALIZATIONS
                </span>
              </div>

              <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800 text-xs self-start sm:self-auto">
                <button
                  onClick={() => setGraphSectionFilter('all')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                    graphSectionFilter === 'all'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  All Metrics (6)
                </button>
                <button
                  onClick={() => setGraphSectionFilter('hourly')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                    graphSectionFilter === 'hourly'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  Hourly Patterns (3)
                </button>
                <button
                  onClick={() => setGraphSectionFilter('fleet')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                    graphSectionFilter === 'fleet'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  Fleet & Passengers (3)
                </button>
              </div>
            </div>

            {/* Hourly Metrics Section */}
            {(graphSectionFilter === 'all' || graphSectionFilter === 'hourly') && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    24-Hour Diurnal Cycles & Gratuity Marts
                  </h3>
                  <span className="text-xs font-mono text-slate-500">Source: main.fct_peak_hours_tipping</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <PeakTippingChart data={PEAK_HOURS_DATA} />
                  <HourlyDemandChart data={PEAK_HOURS_DATA} />
                  <HourlyDistanceChart data={PEAK_HOURS_DATA} />
                </div>
              </div>
            )}

            {/* Fleet & Passenger Dynamics Section */}
            {(graphSectionFilter === 'all' || graphSectionFilter === 'fleet') && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <Users className="w-4 h-4 text-sky-400" />
                    Fleet Demographics, Payment Channels & Weekly Rhythms
                  </h3>
                  <span className="text-xs font-mono text-slate-500">Source: Silver stg_taxi_trips & marts</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <PassengerDistributionChart data={PASSENGER_DISTRIBUTION} />
                  <PaymentBreakdownChart data={PAYMENT_BREAKDOWN} />
                  <DayOfWeekChart data={DAY_OF_WEEK_DATA} />
                </div>
              </div>
            )}

            {/* Business Insights Card */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 backdrop-blur-sm mt-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Key Analytical Takeaways for NYC Taxi Fleet Operations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-300">
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <div className="font-semibold text-amber-400 mb-1">
                    Prime Tipping Window (8 PM - 10 PM)
                  </div>
                  <p className="text-slate-400">
                    Average tip percentage peaks at <strong>21.75% at 9 PM (21:00)</strong>, primarily driven by dining and entertainment trips in Midtown and Lower Manhattan.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <div className="font-semibold text-sky-400 mb-1">
                    Commuter Rush Peak (5 PM - 7 PM)
                  </div>
                  <p className="text-slate-400">
                    Evening commuter rush generates over <strong>225,000 trips at 6 PM (18:00)</strong>, representing the highest revenue generating single hour of the day.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <div className="font-semibold text-emerald-400 mb-1">
                    Friday Revenue Climax
                  </div>
                  <p className="text-slate-400">
                    Fridays yield the highest revenue of the week (<strong>$13.4M across 485k trips</strong>) with average fares climbing to $27.63.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <div className="font-semibold text-amber-300 mb-1">
                    Airport Dawn Long-Haul
                  </div>
                  <p className="text-slate-400">
                    Average trip distance jumps to <strong>4.35 miles at 5:00 AM</strong> as JFK and LaGuardia outbound airport runs dominate light early traffic.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Gold & Silver Data Tables */}
        {activeTab === 'tables' && (
          <DataTablesView
            dailyData={DAILY_REVENUE_DATA}
            peakData={PEAK_HOURS_DATA}
            stagingData={SAMPLE_STAGING_TRIPS}
            passengerData={PASSENGER_DISTRIBUTION}
            paymentData={PAYMENT_BREAKDOWN}
            dayOfWeekData={DAY_OF_WEEK_DATA}
          />
        )}

        {/* Tab 3: Medallion Architecture & Tests */}
        {activeTab === 'pipeline' && (
          <PipelineViewer
            stages={PIPELINE_STAGES}
            tests={DBT_TESTS}
            isRunning={isRunningPipeline}
            onRunPipeline={handleRunPipeline}
            logs={logs}
          />
        )}

        {/* Tab 4: SQL Models & Schema */}
        {activeTab === 'sql' && <SqlModelViewer />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 text-slate-500 text-xs py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span>🚕 NYC Taxi Analytics Engine</span>
            <span>•</span>
            <span>Local Medallion Architecture (DuckDB + dbt)</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Info className="w-3.5 h-3.5" />
            <span>Data source: NYC Taxi & Limousine Commission (TLC) Trip Record Data</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
