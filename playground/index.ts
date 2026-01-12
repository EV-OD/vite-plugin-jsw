// @ts-ignore - since it's a virtual WASM module
import { cascadeMultiply } from './math.ts';
import { cascadeMultiplyJS } from './jsMath';

function jsMultiplyMatrices(a: Float64Array, b: Float64Array, n: number): Float64Array {
  const result = new Float64Array(n * n);
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      let sum = 0.0;
      for (let k = 0; k < n; k++) {
        sum += a[row * n + k] * b[k * n + col];
      }
      result[row * n + col] = sum;
    }
  }
  return result;
}

function randomMatrixFlat(n: number): Float64Array {
  const out = new Float64Array(n * n);
  for (let i = 0; i < out.length; i++) out[i] = Math.random() * 10;
  return out;
}

function formatMatrixFlat(arr: Float64Array, n: number): string {
  let s = '';
  for (let r = 0; r < n; r++) {
    const row = [];
    for (let c = 0; c < n; c++) row.push(arr[r * n + c].toFixed(2));
    s += row.join(', ') + '\n';
  }
  return s;
}

async function runBenchmarkWasm(n: number): Promise<{ time: number; result: Float64Array }> {
  const a = randomMatrixFlat(n);
  const b = randomMatrixFlat(n);
  const t0 = performance.now();
  const res = cascadeMultiplyWasm(a, b, n, 1);
  const t1 = performance.now();
  // If result is a typed array or JS array, coerce to Float64Array
  const out = res instanceof Float64Array ? res : new Float64Array(res);
  return { time: t1 - t0, result: out };
}

function runBenchmarkJs(n: number): { time: number; result: Float64Array } {
  const a = randomMatrixFlat(n);
  const b = randomMatrixFlat(n);
  const t0 = performance.now();
  const res = jsMultiplyMatrices(a, b, n);
  const t1 = performance.now();
  return { time: t1 - t0, result: res };
}

function setText(id: string, text: string) {
  const el = document.getElementById(id);
  if (el) el.querySelector('span')!.textContent = text;
}

function setOutput(text: string) {
  const el = document.getElementById('matrix-output');
  if (el) el.textContent = text;
}

function attachHandlers() {
  console.log('[playground] attaching handlers');
  const runJs = document.getElementById('run-js') as HTMLButtonElement | null;
  const runWasm = document.getElementById('run-wasm') as HTMLButtonElement | null;
  const runBoth = document.getElementById('run-both') as HTMLButtonElement | null;
  const sizeInput = document.getElementById('matrix-size') as HTMLInputElement | null;
  const iterInput = document.getElementById('iterations') as HTMLInputElement | null;

  if (!runJs || !runWasm || !runBoth || !sizeInput) {
    console.warn('[playground] UI elements not found yet');
    return false;
  }

  runJs.addEventListener('click', () => {
    const n = Number(sizeInput.value) || 64;
    const iters = Number(iterInput?.value) || 1;
    const a = randomMatrixFlat(n);
    const b = randomMatrixFlat(n);
    const t0 = performance.now();
    const res = cascadeMultiplyJS(a, b, n, iters);
    const t1 = performance.now();
    setText('js-result', `${(t1 - t0).toFixed(2)} ms`);
    setOutput(formatMatrixFlat(res.slice(0, Math.min(res.length, 16)), n > 4 ? Math.min(n, 4) : n));
  });

  runWasm.addEventListener('click', async () => {
    const n = Number(sizeInput.value) || 64;
    const iters = Number(iterInput?.value) || 1;
    const a = randomMatrixFlat(n);
    const b = randomMatrixFlat(n);
    const t0 = performance.now();
    const res = cascadeMultiply(a, b, n, iters);
    const t1 = performance.now();
    setText('wasm-result', `${(t1 - t0).toFixed(2)} ms`);
    setOutput(formatMatrixFlat(res.slice(0, Math.min(res.length, 16)), n > 4 ? Math.min(n, 4) : n));
  });

  runBoth.addEventListener('click', async () => {
    const n = Number(sizeInput.value) || 64;
    const iters = Number(iterInput?.value) || 1;
    const a = randomMatrixFlat(n);
    const b = randomMatrixFlat(n);

    const t0 = performance.now();
    const jsRes = cascadeMultiplyJS(a, b, n, iters);
    const t1 = performance.now();
    setText('js-result', `${(t1 - t0).toFixed(2)} ms`);

    const t2 = performance.now();
    const wasmRes = cascadeMultiply(a, b, n, iters);
    const t3 = performance.now();
    setText('wasm-result', `${(t3 - t2).toFixed(2)} ms`);

    setOutput(formatMatrixFlat(wasmRes.slice(0, Math.min(wasmRes.length, 16)), n > 4 ? Math.min(n, 4) : n));
  });

  return true;
}

// Try immediate attach (script tag is at end of body). If elements aren't ready yet,
// fall back to waiting for DOMContentLoaded.
if (!attachHandlers()) {
  document.addEventListener('DOMContentLoaded', () => {
    if (!attachHandlers()) console.error('[playground] failed to attach handlers after DOMContentLoaded');
  });
}

// show simple initial info
// document.body.insertAdjacentHTML('beforeend', `\n  <div style="font-family: sans-serif; margin-top: 20px;">\n    <strong>Quick checks:</strong><br>\n    sum: ${add(10,5)}<br>\n    greet: ${greet('Rabin')}<br>\n  </div>\n`);