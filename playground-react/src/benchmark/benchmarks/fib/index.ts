import { fibJs } from "./js";
import { fibWasm } from "./wasm";
import { register, type BenchEntry, type BenchResult } from "../../register";

const data = [Math.floor(Math.random() * 25) + 10]

const argsData = () => data;

const entry: BenchEntry = {
  description: 'Naive Fibonacci implementation used to demonstrate timing and UI rendering.',
  js: {
    fn: ((n: number) => fibJs(n)) as any,
    args:argsData,
    ui: {
      renderResult(container: HTMLElement, result: BenchResult){
        container.innerHTML = ''
        const r = document.createElement('div')
        r.innerHTML = `<div style="font-weight:600">JS result</div><div class="muted">value: ${result.lastReturn}</div><div style="margin-top:6px">total: <span class="result">${result.total.toFixed(3)}</span> ms — avg: ${result.avg.toFixed(3)} ms</div>`
        container.appendChild(r)
      }
    }
  },
  wasm: {
    fn: (async (n: number) => fibWasm(n)) as any,
    args:argsData,
    ui: {
      renderResult(container: HTMLElement, result: BenchResult){
        container.innerHTML = ''
        const r = document.createElement('div')
        r.innerHTML = `<div style="font-weight:600">WASM result</div><div class="muted">value: ${result.lastReturn}</div><div style="margin-top:6px">total: <span class="result">${result.total.toFixed(3)}</span> ms — avg: ${result.avg.toFixed(3)} ms</div>`
        container.appendChild(r)
      }
    }
  },
  // showAllResults will collect per-iteration timings and pass as `samples` to renderers
  showAllResults: true,
  // preferred output format for renderers: 'linechart' | 'barchart' | 'table'
  format: 'linechart'
}

register('Fibonacci', entry);