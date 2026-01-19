import type { ArgsOrFactory } from './register'

export async function resolveArgs(argsOrFactory?: ArgsOrFactory): Promise<unknown[]> {
  if(!argsOrFactory) return []
  if(typeof argsOrFactory === 'function'){
    const res = argsOrFactory()
    return res instanceof Promise ? await res : res
  }
  return argsOrFactory
}

export async function runVariant(
  fn: (...args: any[]) => any, 
  argsOrFactory: ArgsOrFactory | undefined, 
  iterations: number, 
  collectSamples = false,
  collectOutputs = false
) {
  const baseArgs = await resolveArgs(argsOrFactory)
  // warmup and capture a sample return value
  let lastReturn: unknown = undefined
  for(let i=0;i<10;i++){
    const r = fn(...baseArgs)
    lastReturn = r instanceof Promise ? await r : r
  }

  const samples: number[] = []
  const iterationArgs: unknown[][] = []
  const outputs: unknown[] = []
  
  const start = performance.now()
  if(collectSamples || collectOutputs){
    for(let i=0;i<iterations;i++){
      const currentArgs = typeof argsOrFactory === 'function' 
        ? await resolveArgs(argsOrFactory) 
        : baseArgs
      
      // Auto-scaling inner loop for high-precision on fast functions
      // We run it 10 times and divide if it's likely to be sub-resolution
      const innerRuns = 10
      const itStart = performance.now()
      let itReturn: unknown = undefined
      for(let j=0; j<innerRuns; j++) {
        const r = fn(...currentArgs)
        itReturn = r instanceof Promise ? await r : r
      }
      const itEnd = performance.now()
      
      lastReturn = itReturn
      if (collectSamples) samples.push((itEnd - itStart) / innerRuns)
      if (collectOutputs) outputs.push(itReturn)
      iterationArgs.push(currentArgs)
    }
  } else {
    for(let i=0;i<iterations;i++){
      const r = fn(...baseArgs)
      lastReturn = r instanceof Promise ? await r : r
    }
  }
  const end = performance.now()
  const total = end - start
  const avg = total / iterations
  
  return { 
    total, 
    avg, 
    lastReturn, 
    samples, 
    outputs: collectOutputs ? outputs : undefined,
    args: baseArgs,
    iterationArgs: (collectSamples || collectOutputs) ? iterationArgs : undefined 
  }
}

export async function runBoth(
  js: { fn: (...args: any[]) => any, args?: ArgsOrFactory } | undefined,
  wasm: { fn: (...args: any[]) => any, args?: ArgsOrFactory } | undefined,
  iterations: number,
  collectSamples = false,
  collectOutputs = false
) {
  const results: { js?: any, wasm?: any } = {}
  
  if (js) {
    results.js = await runVariant(js.fn, js.args, iterations, collectSamples, collectOutputs)
  }
  
  if (wasm) {
    results.wasm = await runVariant(wasm.fn, wasm.args, iterations, collectSamples, collectOutputs)
  }
  
  return results
}

export default { resolveArgs, runVariant, runBoth }
