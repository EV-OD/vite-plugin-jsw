import { type BenchEntry } from '../../register'
import { useBenchmarkStore } from '../../store'

interface BenchmarkItemProps {
  name: string
  entry: BenchEntry
}

export function BenchmarkItem({ name, entry }: BenchmarkItemProps) {
  const setSelected = useBenchmarkStore(s => s.setSelected)
  const isSelected = useBenchmarkStore(s => s.selected === name)
  const run = useBenchmarkStore(s => s.run)
  const runBoth = useBenchmarkStore(s => s.runBoth)
  const runs = useBenchmarkStore(s => s.runs)

  const isJsRunning = runs.some(r => r.name === name && r.variant === 'js' && r.status === 'running')
  const isWasmRunning = runs.some(r => r.name === name && r.variant === 'wasm' && r.status === 'running')
  const isAnyRunning = isJsRunning || isWasmRunning

  return (
    <div 
      onClick={() => setSelected(name)}
      className={`group relative flex flex-col p-4 rounded-xl border transition-all cursor-pointer ${
        isSelected 
          ? 'bg-blue-600/10 border-blue-500/50 ring-1 ring-blue-500/20' 
          : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
      }`}
    >
      {/* Active Indicator Dot */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
      )}

      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0 pr-4">
          <h3 className={`font-bold text-sm tracking-tight transition-colors truncate ${isSelected ? 'text-blue-400' : 'text-slate-200 group-hover:text-white'}`}>
            {name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-all">
              {entry.js && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_4px_rgba(59,130,246,0.5)]"></span>}
              {entry.wasm && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.5)]"></span>}
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 truncate">
              {entry.format || 'Standard'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 flex-shrink-0">
          {entry.js && entry.wasm ? (
             <button
              onClick={(e) => { e.stopPropagation(); runBoth(name); }}
              disabled={isAnyRunning}
              className={`p-1.5 rounded-lg border transition-all ${
                isAnyRunning 
                  ? 'bg-slate-800 border-slate-700 opacity-50' 
                  : 'bg-indigo-600/10 border-indigo-500/30 text-indigo-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20'
              }`}
              title="Run Comparison"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </button>
          ) : (
            <button
              onClick={(e) => { e.stopPropagation(); run(name, entry.js ? 'js' : 'wasm'); }}
              disabled={isAnyRunning}
              className={`p-1.5 rounded-lg border transition-all ${
                isAnyRunning 
                  ? 'bg-slate-800 border-slate-700 opacity-50' 
                  : 'bg-blue-600/10 border-blue-500/30 text-blue-400 hover:bg-blue-600 hover:text-white'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {entry.description && (
        <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-1 italic text-left">
          {entry.description}
        </p>
      )}

      {/* Progress Line if running */}
      {isAnyRunning && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-800/10 overflow-hidden rounded-b-xl">
          <div className="h-full bg-blue-500 animate-progress"></div>
        </div>
      )}
    </div>
  )
}
