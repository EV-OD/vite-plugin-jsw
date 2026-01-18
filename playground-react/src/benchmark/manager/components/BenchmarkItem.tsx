import { type BenchEntry } from '../../register'
import { useBenchmarkStore } from '../../store'

interface BenchmarkItemProps {
  name: string
  entry: BenchEntry
}

export function BenchmarkItem({ name, entry }: BenchmarkItemProps) {
  const setSelected = useBenchmarkStore(s => s.setSelected)
  const isSelected = useBenchmarkStore(s => s.selected === name)
  const groupState = useBenchmarkStore(s => s.groupState)
  const toggleGroup = useBenchmarkStore(s => s.toggleGroup)
  const run = useBenchmarkStore(s => s.run)
  const runBoth = useBenchmarkStore(s => s.runBoth)
  const runs = useBenchmarkStore(s => s.runs)

  const isJsRunning = runs.some(r => r.name === name && r.variant === 'js' && r.status === 'running')
  const isWasmRunning = runs.some(r => r.name === name && r.variant === 'wasm' && r.status === 'running')
  const isAnyRunning = isJsRunning || isWasmRunning

  return (
    <div 
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-lg border transition-all ${
        isSelected ? 'bg-slate-700/50 border-blue-500/50' : 'bg-slate-800 border-slate-700 hover:border-slate-600'
      }`}
    >
      <div className="flex-1 min-w-0 mr-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-slate-100 truncate">{name}</h3>
          <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-700 text-slate-400 font-bold border border-slate-600">
            {[entry.js && 'JS', entry.wasm && 'WASM'].filter(Boolean).join(' / ')}
          </span>
        </div>
        {entry.description && (
          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{entry.description}</p>
        )}
      </div>

      <div className="flex items-center gap-2 mt-3 sm:mt-0">
        <button
          onClick={() => setSelected(name)}
          className="px-3 py-1.5 text-xs font-medium bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-md transition-colors"
        >
          View
        </button>

        <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block" />

        {entry.js && entry.wasm && (
          <button
            disabled={isAnyRunning}
            onClick={() => runBoth(name)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              isAnyRunning 
                ? 'bg-slate-600/50 text-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm'
            }`}
          >
            Run Both
          </button>
        )}

        {entry.js && (
          <div className="flex items-center gap-1">
            <button
              disabled={isJsRunning}
              onClick={() => run(name, 'js')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-2 ${
                isJsRunning 
                  ? 'bg-blue-500/20 text-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
              }`}
            >
              {isJsRunning && (
                <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
              {isJsRunning ? 'JS...' : 'Run JS'}
            </button>
            <button
              onClick={() => toggleGroup(name, 'js')}
              title={groupState[`${name}:js`] ? 'Ungroup results' : 'Keep results grouped'}
              className={`p-1.5 rounded-md border text-[10px] font-bold transition-colors ${
                groupState[`${name}:js`] 
                  ? 'bg-amber-500/10 border-amber-500/50 text-amber-500' 
                  : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-400'
              }`}
            >
              {groupState[`${name}:js`] ? 'UNGRP' : 'GRP'}
            </button>
          </div>
        )}

        {entry.wasm && (
          <div className="flex items-center gap-1">
            <button
              disabled={isWasmRunning}
              onClick={() => run(name, 'wasm')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-2 ${
                isWasmRunning 
                  ? 'bg-emerald-500/20 text-emerald-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
              }`}
            >
              {isWasmRunning && (
                <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
              {isWasmRunning ? 'WASM...' : 'Run WASM'}
            </button>
             <button
              onClick={() => toggleGroup(name, 'wasm')}
              title={groupState[`${name}:wasm`] ? 'Ungroup results' : 'Keep results grouped'}
              className={`p-1.5 rounded-md border text-[10px] font-bold transition-colors ${
                groupState[`${name}:wasm`] 
                  ? 'bg-amber-500/10 border-amber-500/50 text-amber-500' 
                  : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-400'
              }`}
            >
              {groupState[`${name}:wasm`] ? 'UNGRP' : 'GRP'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
