import { useState, type FC } from 'react';
import { SQL_MODELS } from '../data/taxiData';
import { Copy, Check, FileCode2, Layers } from 'lucide-react';

export const SqlModelViewer: FC = () => {
  const [activeModel, setActiveModel] = useState<'stg' | 'daily' | 'peak' | 'schema'>('stg');
  const [copied, setCopied] = useState(false);

  const modelContent =
    activeModel === 'stg'
      ? SQL_MODELS.stg_taxi_trips
      : activeModel === 'daily'
      ? SQL_MODELS.fct_daily_revenue
      : activeModel === 'peak'
      ? SQL_MODELS.fct_peak_hours_tipping
      : `version: 2

models:
  - name: stg_taxi_trips
    description: "Cleaned Silver layer for NYC Yellow Taxi trip records."
    columns:
      - name: vendor_id
        description: "A code indicating the TPEP provider that provided the record."
        tests:
          - not_null
          
      - name: pickup_datetime
        description: "Date and time when the meter was engaged."
        tests:
          - not_null
          
      - name: passenger_count
        description: "The number of passengers in the vehicle."
        tests:
          - not_null
          
      - name: payment_type
        description: "A numeric code signifying how the passenger paid for the trip."
        tests:
          - not_null
          - accepted_values:
              values: [1, 2, 3, 4, 5, 6]`;

  const copyCode = () => {
    navigator.clipboard.writeText(modelContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm shadow-md">
      <div className="p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileCode2 className="w-4 h-4 text-amber-400" />
          <h2 className="text-base font-bold text-white">dbt Transformation Models & SQL</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveModel('stg')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              activeModel === 'stg'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            stg_taxi_trips.sql (Silver)
          </button>
          <button
            onClick={() => setActiveModel('daily')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              activeModel === 'daily'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            fct_daily_revenue.sql (Gold)
          </button>
          <button
            onClick={() => setActiveModel('peak')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              activeModel === 'peak'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            fct_peak_hours_tipping.sql (Gold)
          </button>
          <button
            onClick={() => setActiveModel('schema')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              activeModel === 'schema'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            schema.yml (Tests)
          </button>
        </div>

        <button
          onClick={copyCode}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-mono transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              Copy SQL
            </>
          )}
        </button>
      </div>

      <div className="p-4 bg-slate-950/80 font-mono text-xs overflow-x-auto">
        <pre className="text-slate-300 leading-relaxed">{modelContent}</pre>
      </div>

      <div className="p-4 bg-slate-900/90 border-t border-slate-800 text-xs text-slate-400 flex items-start gap-2">
        <Layers className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          {activeModel === 'stg' && (
            <p>
              <strong className="text-white">Silver Model Logic:</strong> Ingests raw parquet files using DuckDB's <code className="text-amber-400">read_parquet()</code>, renames columns to snake_case, coalesces null passenger count to 1, and filters out trips with negative or zero distance/fare and invalid payment codes.
            </p>
          )}
          {activeModel === 'daily' && (
            <p>
              <strong className="text-white">Gold Fact Model Logic:</strong> References <code className="text-amber-400">stg_taxi_trips</code>, aggregates daily total trips, sums total revenue, and calculates average distance and revenue per trip grouped by pickup date.
            </p>
          )}
          {activeModel === 'peak' && (
            <p>
              <strong className="text-white">Gold Hourly Mart Logic:</strong> Extracts the hour of the day (0-23) using <code className="text-amber-400">EXTRACT(HOUR FROM pickup_datetime)</code> and calculates average tip percentage with <code className="text-amber-400">NULLIF(fare_amount, 0)</code> to safely prevent division by zero.
            </p>
          )}
          {activeModel === 'schema' && (
            <p>
              <strong className="text-white">dbt Quality Suite:</strong> Defines automated constraints ensuring non-null values for critical columns and enforces accepted values for payment types ([1, 2, 3, 4, 5, 6]).
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
