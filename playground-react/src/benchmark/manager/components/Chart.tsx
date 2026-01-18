import { useState } from 'react'
import { type BenchResult } from '../../register'

interface ChartProps {
  res: BenchResult
}

export function BenchmarkChart({ res }: ChartProps) {
  const [inspectIndex, setInspectIndex] = useState<number | null>(null)
  
  const samples = res.samples || []
  const iterationArgs = res.iterationArgs || []
  const format = res.format || 'barchart'

  if (samples.length === 0) {
    return <div className="text-sm text-gray-400 italic">No per-iteration samples available.</div>
  }

  if (format === 'table') {
    return (
      <div className="mt-4 overflow-hidden rounded border border-slate-700 relative">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-800 text-gray-400">
            <tr>
              <th className="px-2 py-1">#</th>
              <th className="px-2 py-1">Time (ms)</th>
              <th className="px-2 py-1 text-right">Inputs</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700 bg-slate-900">
            {samples.slice(0, 100).map((s: number, i: number) => (
              <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                <td className="px-2 py-1 text-gray-500 font-mono">{i + 1}</td>
                <td className="px-2 py-1 font-mono">{s.toFixed(4)}</td>
                <td className="px-2 py-1 text-right">
                  {iterationArgs[i] && (
                    <button 
                      onClick={() => setInspectIndex(i)}
                      className="text-[9px] px-1.5 py-0.5 rounded bg-slate-700 hover:bg-blue-600 text-slate-300 hover:text-white transition-all uppercase font-bold"
                    >
                      Inspect
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {samples.length > 100 && (
              <tr>
                <td colSpan={3} className="px-2 py-1 text-center text-gray-500 italic">
                  Showing first 100 samples...
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Mini Modal for Inspection */}
        {inspectIndex !== null && (
          <div className="absolute inset-0 bg-slate-900/95 flex flex-col p-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                Iteration {inspectIndex + 1} Inputs
              </h4>
              <button 
                onClick={() => setInspectIndex(null)}
                className="text-slate-500 hover:text-white"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 bg-black/40 rounded p-3 overflow-auto font-mono text-[11px] text-slate-300 leading-relaxed shadow-inner border border-white/5">
              {iterationArgs[inspectIndex].map((arg, idx) => (
                <div key={idx} className="mb-2 last:mb-0">
                  <span className="text-slate-600 mr-2">arg[{idx}]:</span>
                  <span className="text-emerald-400 break-all">
                    {typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const width = 480
  const height = 120
  const max = Math.max(...samples)
  const margin = 10

  return (
    <div className="mt-4 bg-slate-900 p-2 rounded border border-slate-700">
      <div className="mb-2 flex items-center justify-between text-xs text-gray-400">
        <span className="font-mono">Samples: {samples.length}</span>
        <span className="font-mono">Max: {max.toFixed(4)}ms</span>
      </div>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="block"
      >
        {format === 'barchart' ? (
          samples.map((s: number, i: number) => {
            const h = (s / max) * (height - margin)
            const barW = width / samples.length
            return (
              <rect
                key={i}
                x={i * barW}
                y={height - h}
                width={Math.max(1, barW - 0.5)}
                height={h}
                className="fill-blue-500/80 hover:fill-blue-400 transition-colors"
              >
                 <title>{`${s.toFixed(4)}ms`}</title>
              </rect>
            )
          })
        ) : (
          <>
            <polyline
              points={samples
                .map((s: number, i: number) => {
                  const x = (i / (samples.length - 1 || 1)) * width
                  const y = height - (s / max) * (height - margin)
                  return `${x},${y}`
                })
                .join(' ')}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-blue-500"
            />
            {samples.length < 50 && samples.map((s: number, i: number) => {
              const x = (i / (samples.length - 1 || 1)) * width
              const y = height - (s / max) * (height - margin)
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="2"
                  className="fill-blue-400"
                />
              )
            })}
          </>
        )}
      </svg>
    </div>
  )
}
