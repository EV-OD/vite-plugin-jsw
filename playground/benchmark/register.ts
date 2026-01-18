import fib from './benchmarks/fib'

// Add more imports here and register them in the map below.
export const registry = new Map<string, any>([
  ['sample-fib', fib]
])

export default registry
