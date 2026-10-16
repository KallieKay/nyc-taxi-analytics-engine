import type { FC } from 'react';
import { Database, BarChart3, Table2, GitBranch, Terminal } from 'lucide-react';

interface HeaderProps {
  activeTab: 'dashboard' | 'tables' | 'pipeline' | 'sql';
  setActiveTab: (tab: 'dashboard' | 'tables' | 'pipeline' | 'sql') => void;
  isRunningPipeline: boolean;
  onRunPipeline: () => void;
}

export const Header: FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isRunningPipeline,
  onRunPipeline,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-3xl select-none" role="img" aria-label="taxi">
              🚕
            </span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                NYC Taxi Analytics Engine
              </h1>
              <p className="text-sm text-slate-400">
                Interactive dashboard powered by a local Medallion Data Pipeline (DuckDB + dbt).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2" />
              DuckDB Connected • Medallion Built
            </div>

            <button
              onClick={onRunPipeline}
              disabled={isRunningPipeline}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95 disabled:opacity-50"
            >
              <Database className="w-3.5 h-3.5" />
              {isRunningPipeline ? 'Running dbt pipeline...' : 'Run Pipeline'}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-2 border-t border-slate-800/80 pt-2 pb-2 text-sm overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-slate-800 text-amber-400 shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Analytics Dashboard
          </button>

          <button
            onClick={() => setActiveTab('tables')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === 'tables'
                ? 'bg-slate-800 text-amber-400 shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Table2 className="w-3.5 h-3.5" />
            Gold & Silver Data Tables
          </button>

          <button
            onClick={() => setActiveTab('pipeline')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === 'pipeline'
                ? 'bg-slate-800 text-amber-400 shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            Medallion Architecture & Tests
          </button>

          <button
            onClick={() => setActiveTab('sql')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === 'sql'
                ? 'bg-slate-800 text-amber-400 shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            SQL Models & Schema
          </button>
        </nav>
      </div>
    </header>
  );
};
