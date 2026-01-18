export type ArgsOrFactory = any[] | (() => any[] | Promise<any[]>)
export type Variant = { fn: (...args: any[]) => any | Promise<any>, args?: ArgsOrFactory, ui?: { renderResult?: (container: HTMLElement, result: any)=>void } }
export type BenchEntry = { js?: Variant, wasm?: Variant, ui?: { renderResult?: (container: HTMLElement, result: any)=>void }, description?: string, showAllResults?: boolean, format?: 'barchart'|'linechart'|'table' }

const registry = new Map<string, BenchEntry>()

export function register(name: string, entry: BenchEntry){
  registry.set(name, entry)
}

export function getRegistry(){
  return registry
}
