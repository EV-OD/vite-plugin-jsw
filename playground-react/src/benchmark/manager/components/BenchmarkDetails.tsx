import { useState, useEffect } from 'react'
import { getRegistry } from '../../register'
import { useBenchmarkStore } from '../../store'
import { BenchmarkChart } from './Chart'
import { resolveArgs } from '../../runner'
import { OutputTable } from './OutputTable'

export function BenchmarkDetails() {
  const selected = useBenchmarkStore(s => s.selected)
  const runs = useBenchmarkStore(s => s.runs)
  const runBoth = useBenchmarkStore(s => s.runBoth)
  const setFormat = useBenchmarkStore(s => s.setFormat)
  const formatOverrides = useBenchmarkStore(s => s.formatOverrides)
  const entry = selected ? getRegistry().get(selected) : null
  
  const [jsArgs, setJsArgs] = useState<unknown[]>([])
  const [wasmArgs, setWasmArgs] = useState<unknown[]>([])

  useEffect(() => {
    if (entry) {
      resolveArgs(entry.js?.args).then(setJsArgs)
      resolveArgs(entry.wasm?.args).then(setWasmArgs)
    }
  }, [entry])

  const currentFormat = selected ? (formatOverrides[selected] || entry?.format || 'barchart') : 'barchart'

  if (!selected || !entry) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-500 p-8 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/50">
        <svg className="w-12 h-12 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        <p className="text-sm font-medium">Select a benchmark</p>
        <p className="text-xs mt-1">to view details and analysis</p>
      </div>
    )
  }

  // Find runs for this benchmark and group by batch
  const batchMap = runs.filter(r => r.name === selected && r.status === 'done').reduce((acc, r) => {
    if (!acc[r.batchId]) acc[r.batchId] = { id: r.batchId, js: null, wasm: null, timestamp: parseInt(r.id.split(':').pop()!) }
    if (r.variant === 'js') acc[r.batchId].js = r.res || null
    if (r.variant === 'wasm') acc[r.batchId].wasm = r.res || null
    return acc
  }, {} as Record<string, { id: string, js: any, wasm: any, timestamp: number }>)

  const sortedBatches = Object.values(batchMap).sort((a, b) => b.timestamp - a.timestamp)
  const displayedBatches = sortedBatches.slice(0, 1) // Just show latest comparison for now, or allow toggle

  const isJsRunning = runs.some(r => r.name === selected && r.variant === 'js' && r.status === 'running')
  const isWasmRunning = runs.some(r => r.name === selected && r.variant === 'wasm' && r.status === 'running')
  const isAnyRunning = isJsRunning || isWasmRunning

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col text-left">
            <h2 className="text-xl font-bold text-slate-100">{selected}</h2>
            <div className="flex items-center gap-3 mt-1">
              <div className="flex bg-slate-900/50 p-0.5 rounded-md border border-slate-700">
                {(['barchart', 'linechart', 'table'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setFormat(selected, f)}
                    className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded transition-all ${
                      currentFormat === f 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {f.replace('chart', '')}
                  </button>
                ))}
              </div>

              {entry.js && entry.wasm && (
                <button
                  disabled={isAnyRunning}
                  onClick={() => runBoth(selected)}
                  className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase transition-all ${
                    isAnyRunning 
                      ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                  }`}
                >
                  {isAnyRunning ? 'Running...' : 'Run Both'}
                </button>
              )}
            </div>
          </div>
        </div>
        
        {entry.description && (
          <p className="text-sm text-slate-300 mb-4 leading-relaxed italic text-left">{entry.description}</p>
        )}

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50 text-left">
            <div className="text-[10px] uppercase font-bold text-slate-500 mb-1 flex justify-between">
              <span>JS Variant</span>
              <span className="text-blue-400/50">{entry.js?.fn.name || '(anon)'}</span>
            </div>
            <div className="text-[11px] font-mono text-slate-400 break-all leading-tight">
              <span className="text-slate-600 mr-1 italic">args:</span>
              {JSON.stringify(jsArgs)}
            </div>
          </div>
          <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50 text-left">
            <div className="text-[10px] uppercase font-bold text-slate-500 mb-1 flex justify-between">
              <span>WASM Variant</span>
              <span className="text-emerald-400/50">{entry.wasm?.fn.name || '(anon)'}</span>
            </div>
            <div className="text-[11px] font-mono text-slate-400 break-all leading-tight">
              <span className="text-slate-600 mr-1 italic">args:</span>
              {JSON.stringify(wasmArgs)}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {displayedBatches.map(batch => (
            <div key={batch.id} className="space-y-4">
               <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-black uppercase tracking-tighter text-slate-200">Latest Execution Comparison</h3>
                  <span className="px-2 py-0.5 rounded-full bg-slate-900 text-[10px] font-mono text-slate-500 border border-slate-700">
                    {batch.js?.iters || batch.wasm?.iters} Iterations
                  </span>
                </div>
                <div className="h-px flex-1 bg-linear-to-r from-slate-700 to-transparent mx-4"></div>
              </div>
              
              <BenchmarkChart 
                results={[
                  ...(batch.js ? [{ ...batch.js, color: 'text-blue-500', fill: 'bg-blue-500' }] : []),
                  ...(batch.wasm ? [{ ...batch.wasm, color: 'text-emerald-500', fill: 'bg-emerald-500' }] : [])
                ]} 
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {batch.js?.formattedOutput && (
                  <OutputTable formattedOutput={batch.js.formattedOutput} variant="js" />
                )}
                {batch.wasm?.formattedOutput && (
                  <OutputTable formattedOutput={batch.wasm.formattedOutput} variant="wasm" />
                )}
              </div>
            </div>
          ))}

          {sortedBatches.length === 0 && (
            <div className="py-12 bg-slate-900/30 rounded-lg border border-slate-800 border-dashed text-center">
              <p className="text-xs text-slate-500 italic">No execution data available yet.</p>
              <p className="text-[10px] text-slate-600 mt-1">Run a variant to see performance visualization stack.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
