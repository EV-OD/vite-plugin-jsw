import { useState } from 'react'
import { type BenchResult } from '../../register'

interface ComparisonResult extends BenchResult {
  color: string
  fill: string
}

interface ChartProps {
  results: ComparisonResult[]
}

export function BenchmarkChart({ results }: ChartProps) {
  const [inspectIndex, setInspectIndex] = useState<number | null>(null)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  
  if (results.length === 0) {
    return <div className="text-sm text-gray-400 italic">No per-iteration samples available.</div>
  }

  const format = results[0]?.format || 'barchart'
  const maxSamples = Math.max(...results.map(r => r.samples?.length || 0))
  const globalMax = Math.max(...results.flatMap(r => r.samples || [0]))

  if (format === 'table') {
    return (
      <div className="mt-4 overflow-hidden rounded border border-slate-700 relative">
        <table className="w-full text-left text-xs bg-slate-900">
          <thead className="bg-slate-800 text-gray-400">
            <tr>
              <th className="px-2 py-1 border-r border-slate-700 w-8">#</th>
              {results.map(r => (
                <th key={r.variant} className="px-2 py-1 border-r border-slate-700">
                  <span className={`${r.color} uppercase text-[9px]`}>{r.variant}</span> (ms)
                </th>
              ))}
              <th className="px-2 py-1 text-right">Inputs</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {Array.from({ length: Math.min(maxSamples, 100) }).map((_, i) => (
              <tr key={i} className="hover:bg-slate-800/50 transition-colors group">
                <td className="px-2 py-1 text-gray-500 font-mono border-r border-slate-700">{i + 1}</td>
                {results.map(r => (
                  <td key={r.variant} className="px-2 py-1 font-mono border-r border-slate-700">
                    {r.samples?.[i]?.toFixed(4) || '-'}
                  </td>
                ))}
                <td className="px-2 py-1 text-right whitespace-nowrap">
                  <button 
                    onClick={() => setInspectIndex(i)}
                    className="text-[9px] px-1.5 py-0.5 rounded bg-slate-700 hover:bg-indigo-600 text-slate-300 hover:text-white transition-all uppercase font-bold"
                  >
                    Inspect
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal remains same but uses first available iterationArgs */}
        {inspectIndex !== null && (
          <div className="absolute inset-0 bg-slate-900/95 flex flex-col p-4 animate-in fade-in duration-200 z-10">
            <div className="flex items-center justify-between mb-3 border-b border-slate-700 pb-2">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                Iteration {inspectIndex + 1} Inputs
              </h4>
              <button onClick={() => setInspectIndex(null)} className="text-slate-500 hover:text-white p-1 hover:bg-slate-800 rounded">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="flex-1 overflow-auto font-mono text-[11px] text-slate-300 leading-relaxed">
              {(results[0].iterationArgs?.[inspectIndex] || []).map((arg, idx) => (
                <div key={idx} className="mb-2 p-2 bg-black/30 rounded border border-white/5">
                  <span className="text-slate-500 block text-[9px] uppercase mb-1">Arg #{idx}</span>
                  <pre className="text-emerald-400 whitespace-pre-wrap break-all">{typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)}</pre>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const width = 600
  const height = 180
  const margin = { top: 20, right: 20, bottom: 40, left: 50 }
  const chartW = width - margin.left - margin.right
  const chartH = height - margin.top - margin.bottom

  return (
    <div className="mt-4 bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-inner">
      {/* Legend */}
      <div className="mb-4 flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-tight">
        {results.map(r => (
          <div key={r.variant} className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-sm ${r.fill}`}></span>
            <span className="text-slate-300">{r.variant}</span>
            <span className="text-slate-500 font-mono">μ={r.avg.toFixed(3)}ms</span>
          </div>
        ))}
      </div>

      <div className="relative group/svg">
        <svg
          width="100%"
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible"
          onMouseLeave={() => setHoverIndex(null)}
        >
          {/* Y Axis Grid */}
          {[0, 0.25, 0.5, 0.75, 1].map(p => (
            <g key={p} transform={`translate(0, ${margin.top + (1-p) * chartH})`}>
              <line x1={margin.left} x2={width - margin.right} className="stroke-slate-800" strokeDasharray="2,2" />
              <text x={margin.left - 8} y="4" className="fill-slate-600 font-mono text-[9px]" textAnchor="end">
                {(globalMax * p).toFixed(2)}
              </text>
            </g>
          ))}

          {/* X Axis Labels (Samples) */}
          <text x={margin.left + chartW / 2} y={height - 5} className="fill-slate-600 font-mono text-[9px]" textAnchor="middle">
            Iteration Sample History
          </text>
          
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {format === 'linechart' ? (
              results.map((r, ri) => (
                <polyline
                  key={ri}
                  points={(r.samples || [])
                    .map((s, i) => {
                      const x = (i / (maxSamples - 1 || 1)) * chartW
                      const y = chartH - (s / globalMax) * chartH
                      return `${x},${y}`
                    })
                    .join(' ')}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  className={r.color}
                />
              ))
            ) : (
              results.map((r, ri) => {
                const barGroupW = chartW / maxSamples
                const barSpacing = barGroupW / (results.length + 1)
                return (r.samples || []).map((s, i) => {
                  const h = (s / globalMax) * chartH
                  const x = i * barGroupW + (ri * barSpacing)
                  return (
                    <rect
                      key={`${ri}-${i}`}
                      x={x}
                      y={chartH - h}
                      width={Math.max(1, barSpacing - 1)}
                      height={h}
                      className={`${r.fill} opacity-80 hover:opacity-100 transition-opacity`}
                      onMouseEnter={() => setHoverIndex(i)}
                    />
                  )
                })
              })
            )}

            {/* Hover Guide Line */}
            {hoverIndex !== null && (
              <line 
                x1={(hoverIndex / (maxSamples - 1 || 1)) * chartW} 
                x2={(hoverIndex / (maxSamples - 1 || 1)) * chartW}
                y1={0} y2={chartH}
                className="stroke-white/20"
                strokeDasharray="4,4"
              />
            )}
          </g>
        </svg>

        {/* Floating Tooltip */}
        {hoverIndex !== null && (
          <div 
            className="absolute pointer-events-none bg-slate-800 border border-slate-600 p-2 rounded shadow-2xl text-[10px] z-20 transition-all duration-75"
            style={{ 
              left: Math.min(margin.left + (hoverIndex / (maxSamples - 1 || 1)) * chartW + 10, width - 120),
              top: margin.top
            }}
          >
            <div className="font-bold border-b border-slate-700 pb-1 mb-1 text-white">Sample #{hoverIndex + 1}</div>
            {results.map(r => (
              <div key={r.variant} className="flex justify-between gap-4">
                <span className={r.color}>{r.variant}:</span>
                <span className="font-mono">{r.samples?.[hoverIndex]?.toFixed(4)} ms</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
