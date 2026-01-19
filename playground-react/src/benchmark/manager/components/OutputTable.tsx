import React from 'react'

interface OutputTableProps {
  formattedOutput: {
    header: string[]
    data: any[][]
  }
  variant: string
}

export function OutputTable({ formattedOutput, variant }: OutputTableProps) {
  return (
    <div className="mt-4 border border-slate-700 rounded-lg overflow-hidden bg-slate-900/30">
      <div className="px-3 py-2 bg-slate-800/50 border-b border-slate-700 flex justify-between items-center">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          Result Data: <span className={variant === 'js' ? 'text-blue-400' : 'text-emerald-400'}>{variant.toUpperCase()}</span>
        </span>
      </div>
      <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
        <table className="w-full text-[10px] text-left border-collapse">
          <thead className="sticky top-0 bg-slate-800 shadow-sm text-slate-500">
            <tr>
              {formattedOutput.header.map((h, i) => (
                <th key={i} className="px-3 py-2 font-bold border-b border-slate-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {formattedOutput.data.map((row, i) => (
              <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                {row.map((cell, j) => (
                  <td key={j} className="px-3 py-1.5 font-mono text-slate-300">
                    {String(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
