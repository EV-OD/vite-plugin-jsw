import { useBenchmarkStore } from '../../store'

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

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-lg">
      <div className="px-4 py-3 bg-slate-700/50 border-b border-slate-600 flex justify-between items-center">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300">Execution History</h3>
        <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded-full text-slate-500 font-mono">
          {runs.length} Records
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="text-slate-500 bg-slate-800/50">
            <tr>
              <th className="px-4 py-2 font-semibold">Benchmark</th>
              <th className="px-4 py-2 font-semibold">Variant</th>
              <th className="px-4 py-2 font-semibold text-right">Iters</th>
              <th className="px-4 py-2 font-semibold text-right">Total (ms)</th>
              <th className="px-4 py-2 font-semibold text-right">Avg (ms)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {runs.map(r => (
              <tr key={r.id} className="hover:bg-slate-700/30 transition-colors">
                <td className="px-4 py-2 font-medium text-slate-200">{r.name}</td>
                <td className="px-4 py-2 italic font-mono uppercase text-[10px]">
                  <span className={r.variant === 'js' ? 'text-blue-400' : 'text-emerald-400'}>
                    {r.variant}
                  </span>
                </td>
                <td className="px-4 py-2 text-right text-slate-400 font-mono">
                  {r.status === 'done' ? r.res?.iters : '...'}
                </td>
                <td className="px-4 py-2 text-right font-mono font-bold text-slate-100">
                  {r.status === 'done' ? r.res?.total.toFixed(3) : (
                    <span className="animate-pulse text-blue-500">RUNNING</span>
                  )}
                  {r.status === 'error' && (
                    <span className="text-red-500" title={r.error}>ERROR</span>
                  )}
                </td>
                <td className="px-4 py-2 text-right font-mono text-slate-400">
                  {r.status === 'done' ? r.res?.avg.toFixed(3) : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
