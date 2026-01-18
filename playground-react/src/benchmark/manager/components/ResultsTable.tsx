import { useBenchmarkStore, type RunRecord } from '../../store'

export function ResultsTable() {
  const runs = useBenchmarkStore(s => s.runs)

  if (runs.length === 0) {
    return (
      <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 text-center">
        <div className="text-slate-500 mb-2 italic">Result history is empty</div>
        <div className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">Start a benchmark to see data</div>
      </div>
    )
  }

  // Parse runs into unique execution batches
  const batches = runs.reduce((acc, run) => {
    if (!acc[run.batchId]) {
      acc[run.batchId] = {
        batchId: run.batchId,
        name: run.name,
        iters: run.res?.iters || 0,
        args: run.res?.args,
        js: undefined as RunRecord | undefined,
        wasm: undefined as RunRecord | undefined,
        timestamp: parseInt(run.id.split(':').pop()!)
      }
    }
    
    const b = acc[run.batchId]
    if (run.variant === 'js') b.js = run
    if (run.variant === 'wasm') b.wasm = run
    if (run.res) {
      if (!b.iters) b.iters = run.res.iters
      if (!b.args) b.args = run.res.args
    }
    return acc
  }, {} as Record<string, { batchId: string, name: string, iters: number, args?: any[], js?: RunRecord, wasm?: RunRecord, timestamp: number }>)

  const sortedBatches = Object.values(batches).sort((a, b) => b.timestamp - a.timestamp)

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-lg">
      <div className="px-4 py-3 bg-slate-700/50 border-b border-slate-600 flex justify-between items-center">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300">Execution History</h3>
        <div className="flex items-center gap-3">
          <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded-full text-slate-500 font-mono">
            {sortedBatches.length} Sessions
          </span>
          <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded-full text-slate-600 font-mono">
            {runs.length} Runs
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead className="text-slate-500 bg-slate-800/50">
            <tr>
              <th className="px-4 py-2 font-semibold">Benchmark</th>
              <th className="px-4 py-2 font-semibold">Inputs</th>
              <th className="px-4 py-2 font-semibold text-right">Iters</th>
              <th className="px-4 py-2 font-semibold text-right whitespace-nowrap">JS (ms)</th>
              <th className="px-4 py-2 font-semibold text-right whitespace-nowrap">WASM (ms)</th>
              <th className="px-4 py-2 font-semibold text-right">Speedup</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {sortedBatches.map(b => {
              const jsAvg = b.js?.status === 'done' ? b.js.res?.avg : null
              const wasmAvg = b.wasm?.status === 'done' ? b.wasm.res?.avg : null
              const speedup = (jsAvg && wasmAvg) ? jsAvg / wasmAvg : null

              return (
                <tr key={b.batchId} className="hover:bg-slate-700/30 transition-colors group">
                  <td className="px-4 py-2 font-medium text-slate-200">{b.name}</td>
                  <td className="px-4 py-2 max-w-[150px] truncate text-slate-500 font-mono text-[10px]" title={JSON.stringify(b.args)}>
                    {b.args ? JSON.stringify(b.args) : <span className="italic opacity-50">resolving...</span>}
                  </td>
                  <td className="px-4 py-2 text-right text-slate-400 font-mono">
                    {b.iters || '-'}
                  </td>
                  
                  {/* JS Column */}
                  <td className="px-4 py-2 text-right font-mono">
                    {b.js ? (
                      b.js.status === 'done' ? (
                        <span className="text-blue-400 font-bold">{b.js.res?.avg.toFixed(4)}</span>
                      ) : b.js.status === 'running' ? (
                        <span className="animate-pulse text-blue-500 text-[10px] font-bold">RUNNING</span>
                      ) : (
                        <span className="text-red-500" title={b.js.error}>ERROR</span>
                      )
                    ) : (
                      <span className="text-slate-700">-</span>
                    )}
                  </td>

                  {/* WASM Column */}
                  <td className="px-4 py-2 text-right font-mono">
                    {b.wasm ? (
                      b.wasm.status === 'done' ? (
                        <span className="text-emerald-400 font-bold">{b.wasm.res?.avg.toFixed(4)}</span>
                      ) : b.wasm.status === 'running' ? (
                        <span className="animate-pulse text-emerald-500 text-[10px] font-bold">RUNNING</span>
                      ) : (
                        <span className="text-red-500" title={b.wasm.error}>ERROR</span>
                      )
                    ) : (
                      <span className="text-slate-700">-</span>
                    )}
                  </td>

                  {/* Speedup Column */}
                  <td className="px-4 py-2 text-right font-mono font-bold">
                    {speedup ? (
                      <span className={speedup > 1 ? 'text-emerald-500' : 'text-amber-500'}>
                        {speedup.toFixed(2)}x
                      </span>
                    ) : (
                      <span className="text-slate-700">-</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
