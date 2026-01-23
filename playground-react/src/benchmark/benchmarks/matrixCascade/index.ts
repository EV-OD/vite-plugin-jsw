import { matrixCascadeJs } from "./matrix_js";
import { matrixCascadeWasm } from "./matrix_jsw";
import { register, type BenchEntry, type BenchResult } from "../../register";

/**
 * Higher-Order Function to sync data between JS and WASM runs.
 * It stores generated data in a cache so that when the second 
 * suite runs, it pulls the exact same matrices.
 */
function createSyncArgs(rows: number, cols: number) {
  const cache: Record<number, { m1: Float64Array; m2: Float64Array }> = {};
  let jsCounter = 0;
  let wasmCounter = 0;

  return {
    getJsArgs: () => {
      const id = jsCounter++;
      const m1 = new Float64Array(rows * cols).map(() => Math.random() * 3);
      const m2 = new Float64Array(rows * cols).map(() => Math.random() * 3);
      
      // Store in cache for WASM to use later
      cache[id] = { m1: m1.slice(), m2: m2.slice() };
      return [m1, m2, rows, cols];
    },
    
    getWasmArgs: () => {
      const id = wasmCounter++;
      const cached = cache[id];
      
      if (!cached) {
        // Fallback in case WASM runs first or cache is missing
        return [new Float64Array(rows * cols), new Float64Array(rows * cols), rows, cols];
      }
      
      // Return fresh copies of the exact same data JS used
      return [cached.m1.slice(), cached.m2.slice(), rows, cols];
    }
  };
}

const sync = createSyncArgs(4,4);

const entry: BenchEntry = {
  description: 'Matrix Cascade: Synchronized random data using a HOF and shared cache.',
  js: {
    fn: matrixCascadeJs as (...args: unknown[]) => unknown,
    args: sync.getJsArgs, // Increments jsCounter, creates data
  },
  wasm: {
    fn: matrixCascadeWasm as (...args: unknown[]) => unknown,
    args: sync.getWasmArgs, // Increments wasmCounter, pulls from cache
  },
  showAllResults: true,
  outputFormat: 'table',
  showOutput: true,
  formatOutput: (results) => {
    return {
      header: ['Rows', 'Cols', 'Check (Sum)'],
      data: results.map(r => {
        const output = r.output as Float64Array;
        console.log('Matrix Cascade output:', output);
        const sum = output ? output.reduce((a, b) => a + b, 0).toFixed(8) : "0";
        return [2, 2, sum];
      }),
    }
  }
};

register('Matrix Cascade', entry);