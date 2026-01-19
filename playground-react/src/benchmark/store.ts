import { create } from 'zustand'
import { getRegistry, type BenchEntry, type BenchResult } from './register'
import { runVariant, runBoth } from './runner'

type VariantKey = 'js' | 'wasm'

export type RunRecord = {
  id: string
  batchId: string
  name: string
  variant: VariantKey
  status: 'running' | 'done' | 'error'
  res?: BenchResult
  error?: string
}

type BenchmarkState = {
  selected: string | null
  iterations: number
  runs: RunRecord[]
  groupState: Record<string, boolean>
  formatOverrides: Record<string, 'barchart' | 'linechart' | 'table'>
  registryEntries: Array<[string, BenchEntry]>
  setSelected: (s: string | null) => void
  setIterations: (n: number) => void
  setFormat: (name: string, format: 'barchart' | 'linechart' | 'table') => void
  toggleGroup: (name: string, v: VariantKey) => void
  run: (name: string, v: VariantKey) => Promise<void>
  runBoth: (name: string) => Promise<void>
  refreshRegistry: () => void
}

export const useBenchmarkStore = create<BenchmarkState>((set, get) => ({
  selected: null,
  iterations: 1,
  runs: [],
  groupState: {},
  formatOverrides: {},
  registryEntries: [],
  setSelected: (s) => set({ selected: s }),
  setIterations: (n) => set({ iterations: n }),
  setFormat: (name, format) => set(state => ({ 
    formatOverrides: { ...state.formatOverrides, [name]: format } 
  })),
  refreshRegistry: () => set({ registryEntries: Array.from(getRegistry().entries()) }),
  toggleGroup: (name, v) => set(state => {
    const k = `${name}:${v}`
    return { groupState: { ...state.groupState, [k]: !state.groupState[k] } }
  }),
  run: async (name, v) => {
    const entry = getRegistry().get(name)
    if (!entry) return
    const variant = entry[v]
    if (!variant) return
    const batchId = `batch:${Date.now()}`
    const id = `${name}:${v}:${Date.now()}`
    set(state => ({ runs: [{ id, batchId, name, variant: v, status: 'running' }, ...state.runs] }))
    try {
      const runRes = await runVariant(variant.fn, variant.args, get().iterations, !!entry.showAllResults, !!entry.showOutput)
      
      let formattedOutput = undefined
      if (entry.showOutput && entry.outputFormat && entry.formatOutput && runRes.outputs && runRes.iterationArgs) {
        const results = runRes.outputs.map((output, i) => ({
          input: runRes.iterationArgs![i],
          output
        }))
        formattedOutput = entry.formatOutput(results)
      }

      const res: BenchResult = {
        ...runRes,
        name,
        variant: v,
        iters: get().iterations,
        format: get().formatOverrides[name] || entry.format,
        formattedOutput
      }
      set(state => ({ runs: state.runs.map(r => r.id === id ? { ...r, status: 'done', res } : r) }))
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err)
      set(state => ({ runs: state.runs.map(r => r.id === id ? { ...r, status: 'error', error: errorMsg } : r) }))
    }
  },
  runBoth: async (name) => {
    const entry = getRegistry().get(name)
    if (!entry) return
    
    const batchId = `batch:${Date.now()}`
    const jsId = `${name}:js:${Date.now()}`
    const wasmId = `${name}:wasm:${Date.now()}`
    
    const pendingRuns: RunRecord[] = []
    if (entry.js) pendingRuns.push({ id: jsId, batchId, name, variant: 'js', status: 'running' })
    if (entry.wasm) pendingRuns.push({ id: wasmId, batchId, name, variant: 'wasm', status: 'running' })
    
    set(state => ({ runs: [...pendingRuns, ...state.runs] }))
    
    try {
      const results = await runBoth(
        entry.js,
        entry.wasm,
        get().iterations,
        !!entry.showAllResults,
        !!entry.showOutput
      )
      
      const format = get().formatOverrides[name] || entry.format
      const updates: Partial<RunRecord>[] = []
      
      const processResult = (variantKey: 'js' | 'wasm', runRes: BenchResult) => {
        let formattedOutput = undefined
        if (entry.showOutput && entry.outputFormat && entry.formatOutput && runRes.outputs && runRes.iterationArgs) {
          const results = runRes.outputs.map((output: unknown, i: number) => ({
            input: runRes.iterationArgs![i],
            output
          }))
          formattedOutput = entry.formatOutput(results)
        }
        return { 
          ...runRes, 
          name, 
          variant: variantKey, 
          iters: get().iterations, 
          format,
          formattedOutput 
        }
      }

      if (results.js) {
        updates.push({ id: jsId, status: 'done', res: processResult('js', results.js) })
      }
      if (results.wasm) {
        updates.push({ id: wasmId, status: 'done', res: processResult('wasm', results.wasm) })
      }
      
      set(state => ({
        runs: state.runs.map(r => {
          const up = updates.find(u => u.id === r.id)
          return up ? { ...r, ...up } : r
        })
      }))
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err)
      set(state => ({
        runs: state.runs.map(r => {
          if (r.id === jsId || r.id === wasmId) return { ...r, status: 'error', error: errorMsg }
          return r
        })
      }))
    }
  }
}))

export default useBenchmarkStore
