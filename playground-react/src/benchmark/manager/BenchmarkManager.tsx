import { useEffect } from 'react'
import { useBenchmarkStore } from '../store'
import { BenchmarkItem } from './components/BenchmarkItem'
import { BenchmarkDetails } from './components/BenchmarkDetails'
import { ResultsTable } from './components/ResultsTable'

export default function BenchmarkManager() {
  const registryEntries = useBenchmarkStore(s => s.registryEntries)
  const iterations = useBenchmarkStore(s => s.iterations)
  const setIterations = useBenchmarkStore(s => s.setIterations)
  const refreshRegistry = useBenchmarkStore(s => s.refreshRegistry)
  const selected = useBenchmarkStore(s => s.selected)
  const setSelected = useBenchmarkStore(s => s.setSelected)

  useEffect(() => {
    refreshRegistry()
  }, [refreshRegistry])

  useEffect(() => {
    if (selected === null && registryEntries.length > 0) {
      setSelected(registryEntries[0][0])
    }
  }, [selected, registryEntries, setSelected])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 antialiased selection:bg-blue-500/30">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 sticky top-0 z-10 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-xl shadow-blue-500/10 border border-blue-400/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-slate-400">
                JSW Benchmark
              </h1>
              <p className="text-xs text-slate-500 font-medium tracking-tight">Performance Lab & Visualization</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-slate-800/50 p-2 rounded-lg border border-slate-700/50">
            <label htmlFor="iters" className="text-xs font-bold uppercase tracking-widest text-slate-500 pl-2">Iterations</label>
            <input
              id="iters"
              type="number"
              value={iterations}
              onChange={(e) => setIterations(Math.max(1, parseInt(e.target.value) || 0))}
              className="w-28 bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 lg:p-10 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Top-Left Column: List */}
          <div className="lg:col-span-4 sticky top-32">
            <section>
              <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-500">Selection</h2>
                <span className="text-[10px] bg-slate-900 text-slate-600 px-2 py-0.5 rounded-full border border-slate-800">
                  {registryEntries.length} Available
                </span>
              </div>
              <div className="space-y-3">
                {registryEntries.map(([name, entry]) => (
                  <BenchmarkItem key={name} name={name} entry={entry} />
                ))}
              </div>
            </section>
          </div>

          {/* Top-Right Column: History */}
          <div className="lg:col-span-8">
            <ResultsTable />
          </div>
        </div>

        {/* Bottom Full-Width Area: Details & Analysis */}
        <section className="pt-8 border-t border-slate-900">
          <div className="flex items-center gap-4 mb-8 px-1">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-500">Live Analysis & Comparison</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-slate-800 to-transparent"></div>
          </div>
          <div className="w-full">
            <BenchmarkDetails />
          </div>
        </section>
      </main>

      <footer className="mt-20 border-t border-slate-900 py-10 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs text-slate-600 font-medium tracking-wide uppercase">
            Built with React 19 • Tailwind CSS 4 • Zustand 5 • vite-plugin-jsw
          </p>
        </div>
      </footer>
    </div>
  )
}
