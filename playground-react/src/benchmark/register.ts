export type ArgsOrFactory = unknown[] | (() => unknown[] | Promise<unknown[]>)
export type Variant = { 
  fn: (...args: unknown[]) => unknown | Promise<unknown>, 
  args?: ArgsOrFactory, 
  ui?: { renderResult?: (container: HTMLElement, result: BenchResult) => void } 
}

export interface BenchResult {
  total: number
  avg: number
  lastReturn: unknown
  samples: number[]
  iterationArgs?: unknown[][]
  args?: unknown[]
  name: string
  variant: string
  iters: number
  format?: 'barchart' | 'linechart' | 'table'
}

export type BenchEntry = { 
  js?: Variant, 
  wasm?: Variant, 
  ui?: { renderResult?: (container: HTMLElement, result: BenchResult) => void }, 
  description?: string, 
  showAllResults?: boolean, 
  format?: 'barchart' | 'linechart' | 'table' 
}

const registry = new Map<string, BenchEntry>()

export function register(name: string, entry: BenchEntry){
  registry.set(name, entry)
}

export function getRegistry(){
  return registry
}
