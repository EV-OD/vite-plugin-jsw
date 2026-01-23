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
  console.log('BenchmarkChart results:', results)
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
              <th className="px-3 py-2 border-r border-slate-700 w-10 text-center">#</th>
              {results.map(r => (
                <th key={r.variant} className="px-3 py-2 border-r border-slate-700">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${r.fill}`}></span>
                    <span className={`${r.color} uppercase text-[10px] font-black`}>{r.variant}</span>
                  </div>
                </th>
              ))}
              <th className="px-3 py-2 border-r border-slate-700 text-center font-bold text-[10px] uppercase">Ratio</th>
              <th className="px-3 py-2 text-right font-bold text-[10px] uppercase">Inputs</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {Array.from({ length: Math.min(maxSamples, 100) }).map((_, i) => {
              const v1 = results[0]?.samples?.[i] || 0
              const v2 = results[1]?.samples?.[i] || 0
              const ratio = (v1 > 0 && v2 > 0) ? (v1 / v2) : null

              return (
                <tr key={i} className="hover:bg-slate-800/50 transition-colors group">
                  <td className="px-3 py-2 text-gray-500 font-mono border-r border-slate-700 text-center">{i + 1}</td>
                  {results.map(r => (
                    <td key={r.variant} className="px-3 py-2 font-mono border-r border-slate-700 text-slate-200">
                      {r.samples?.[i] !== undefined ? r.samples[i].toFixed(5) : '-'}
                    </td>
                  ))}
                  <td className="px-3 py-2 font-mono border-r border-slate-700 text-center">
                    {ratio ? (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${ratio > 1 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                        {ratio.toFixed(2)}x
                      </span>
                    ) : '-'}
                  </td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">
                    <button 
                      onClick={() => setInspectIndex(i)}
                      className="text-[10px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white transition-all uppercase font-bold"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              )
            })}
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

  const width = 1000
  const height = 400
  const margin = { top: 40, right: 40, bottom: 60, left: 80 }
  const chartW = width - margin.left - margin.right
  const chartH = height - margin.top - margin.bottom

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget
    const rect = svg.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * width - margin.left
    const index = Math.round((x / chartW) * (maxSamples - 1))
    if (index >= 0 && index < maxSamples) {
      setHoverIndex(index)
    }
  }

  return (
    <div className="mt-4 bg-slate-900 p-6 rounded-2xl border border-slate-700 shadow-2xl">
      {/* Legend */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-4 text-[11px] font-bold uppercase tracking-widest">
          {results.map(r => (
            <div key={r.variant} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700">
              <span className={`w-3 h-3 rounded-full ${r.fill}`}></span>
              <span className="text-slate-300">{r.variant}</span>
              <span className="text-slate-100 font-mono text-xs">{r.avg.toFixed(4)}ms avg</span>
            </div>
          ))}
        </div>
        <div className="text-[10px] font-mono text-slate-500 bg-black/20 px-2 py-1 rounded">
          Max: {globalMax.toFixed(4)}ms
        </div>
      </div>

      <div className="relative">
        <svg
          width="100%"
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverIndex(null)}
        >
          {/* Y Axis Grid & Labels */}
          {[0, 0.25, 0.5, 0.75, 1].map(p => {
            const val = globalMax * p
            const y = margin.top + (1-p) * chartH
            return (
              <g key={p}>
                <line 
                  x1={margin.left} 
                  x2={width - margin.right} 
                  y1={y} y2={y} 
                  className="stroke-slate-800" 
                  strokeWidth="1"
                />
                <text 
                  x={margin.left - 12} 
                  y={y + 4} 
                  className="fill-slate-500 font-mono text-[10px]" 
                  textAnchor="end"
                >
                  {val.toFixed(3)}
                </text>
              </g>
            )
          })}

          {/* X Axis Label */}
          <text 
            x={margin.left + chartW / 2} 
            y={height - 10} 
            className="fill-slate-500 font-bold uppercase tracking-widest text-[10px]" 
            textAnchor="middle"
          >
            Iteration Samples ({maxSamples})
          </text>
          
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {format === 'linechart' ? (
              results.map((r, ri) => {
                console.log('Rendering line for result:', r)
                return (
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
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`${r.color} drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]`}
                />
                  )
})
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
                      width={Math.max(2, barSpacing - 1)}
                      height={h}
                      className={`${r.fill} opacity-60 hover:opacity-100 transition-opacity`}
                    />
                  )
                })
              })
            )}

            {/* Hover Indicator */}
            {hoverIndex !== null && (
              <g>
                <line 
                  x1={(hoverIndex / (maxSamples - 1 || 1)) * chartW} 
                  x2={(hoverIndex / (maxSamples - 1 || 1)) * chartW}
                  y1={0} y2={chartH}
                  className="stroke-slate-600/50"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
                {results.map((r, ri) => {
                  const s = r.samples?.[hoverIndex] || 0
                  return (
                    <circle
                      key={ri}
                      cx={(hoverIndex / (maxSamples - 1 || 1)) * chartW}
                      cy={chartH - (s / globalMax) * chartH}
                      r="4"
                      className={`${r.fill} stroke-slate-900 stroke-2 shadow-xl`}
                    />
                  )
                })}
              </g>
            )}
          </g>
        </svg>

        {/* Floating Tooltip - Centered relative to hover */}
        {hoverIndex !== null && (
          <div 
            className="absolute pointer-events-none bg-slate-800/95 backdrop-blur-sm border border-slate-600 p-3 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 transition-all duration-75 min-w-[140px]"
            style={{ 
              left: Math.min(Math.max(margin.left + (hoverIndex / (maxSamples - 1 || 1)) * chartW - 70, 0), width - 150),
              top: -10
            }}
          >
            <div className="font-bold border-b border-slate-700/50 pb-2 mb-2 text-white flex justify-between items-center">
              <span className="text-[10px] uppercase tracking-wider text-slate-400">Sample</span>
              <span className="font-mono text-xs">#{hoverIndex + 1}</span>
            </div>
            <div className="space-y-1.5">
              {results.map(r => (
                <div key={r.variant} className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${r.fill}`}></span>
                    <span className={`text-[10px] font-bold ${r.color} uppercase`}>{r.variant}</span>
                  </div>
                  <span className="font-mono text-xs text-slate-100">{r.samples?.[hoverIndex]?.toFixed(4)} ms</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
