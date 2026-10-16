import type { FC } from 'react';
import { PipelineStage, DbtTest } from '../types';
import { CheckCircle2, Play, Terminal, Layers, ShieldCheck } from 'lucide-react';

interface PipelineViewerProps {
  stages: PipelineStage[];
  tests: DbtTest[];
  isRunning: boolean;
  onRunPipeline: () => void;
  logs: string[];
}

export const PipelineViewer: FC<PipelineViewerProps> = ({
  stages,
  tests,
  isRunning,
  onRunPipeline,
  logs,
}) => {
  return (
    <div className="space-y-6">
      {/* Medallion Flow Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 backdrop-blur-sm shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              Medallion Data Pipeline Flow
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Strict Bronze (Ingestion) → Silver (Cleaning) → Gold (Business Aggregation) architecture
            </p>
          </div>

          <button
            onClick={onRunPipeline}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow active:scale-95 disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-spin' : ''}`} />
            {isRunning ? 'Executing Pipeline Steps...' : 'Re-run ELT Pipeline & Tests'}
          </button>
        </div>

        {/* Visual Lineage Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
          {stages.map((stage, idx) => {
            const isBronze = stage.tier === 'bronze';
            const isSilver = stage.tier === 'silver';
            const isGold = stage.tier === 'gold';

            const borderCol = isBronze
              ? 'border-amber-700/40'
              : isSilver
              ? 'border-slate-500/40'
              : 'border-yellow-500/40';

            const bgCol = isBronze
              ? 'bg-amber-950/20'
              : isSilver
              ? 'bg-slate-800/40'
              : 'bg-yellow-950/20';

            const badgeBg = isBronze
              ? 'bg-amber-900/60 text-amber-300'
              : isSilver
              ? 'bg-slate-700/70 text-slate-200'
              : 'bg-yellow-900/60 text-yellow-300';

            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border ${borderCol} ${bgCol} flex flex-col justify-between relative`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${badgeBg}`}>
                      {isBronze && '🥉 Bronze'}
                      {isSilver && '🥈 Silver'}
                      {isGold && '🥇 Gold'}
                    </span>
                    <span className="flex items-center text-[11px] text-emerald-400 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                      {stage.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-sm mb-1">{stage.name}</h3>
                  <p className="text-xs text-slate-400 mb-3">{stage.description}</p>
                </div>

                <div className="space-y-1.5 text-[11px] border-t border-slate-800/60 pt-2 font-mono">
                  <div className="text-slate-400 truncate">
                    <span className="text-slate-500">Tool:</span> {stage.tool}
                  </div>
                  <div className="text-slate-400 truncate">
                    <span className="text-slate-500">Output:</span> {stage.output}
                  </div>
                  <div className="text-amber-400 font-semibold truncate">
                    <span className="text-slate-500">Rows:</span> {stage.rowCount}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Terminal Logs & DBT Tests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Terminal Execution Logs */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-md font-mono text-xs flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-3 text-slate-400">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-amber-400" />
              <span className="text-slate-200 font-semibold">DuckDB & dbt Execution Console</span>
            </div>
            <span className="text-[10px] text-slate-500">run_pipeline.sh replica</span>
          </div>

          <div className="bg-slate-900/90 rounded-lg p-3 text-slate-300 space-y-1 max-h-64 overflow-y-auto leading-relaxed border border-slate-800">
            {logs.map((log, index) => (
              <div
                key={index}
                className={
                  log.includes('COMPLETE') || log.includes('PASS')
                    ? 'text-emerald-400'
                    : log.includes('Starting') || log.includes('Running')
                    ? 'text-amber-400'
                    : log.includes('>>>')
                    ? 'text-sky-400 font-bold'
                    : 'text-slate-400'
                }
              >
                {log}
              </div>
            ))}
          </div>
        </div>

        {/* dbt Test Suite Results */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 shadow-md flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-bold text-white">dbt Data Quality Tests</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-mono">
              5/5 Passed
            </span>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {tests.map((test, i) => (
              <div
                key={i}
                className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-start justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-xs font-semibold text-slate-200">
                      {test.model}.{test.column}
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-slate-800 text-amber-400 text-[10px] font-mono">
                      {test.test_type}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">{test.message}</div>
                </div>
                <span className="shrink-0 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                  PASS
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
