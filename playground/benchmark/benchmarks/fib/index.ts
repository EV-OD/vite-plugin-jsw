import { fibJs } from "./js";
import { fibWasm } from "./wasm";

const entry = {
  description: 'Naive Fibonacci implementation used to demonstrate timing and UI rendering.',
  js: {
    fn: (n: number) => fibJs(n),
    args: [50],
    ui: {
      renderResult(container: HTMLElement, result: any){
        container.innerHTML = ''
        const r = document.createElement('div')
        r.innerHTML = `<div style="font-weight:600">JS result</div><div class="muted">value: ${result.lastReturn}</div><div style="margin-top:6px">total: <span class="result">${result.total.toFixed(3)}</span> ms — avg: ${result.avg.toFixed(3)} ms</div>`
        container.appendChild(r)
      }
    }
  },
  wasm: {
    fn: async (n: number) => fibWasm(n),
    args: [50],
    ui: {
      renderResult(container: HTMLElement, result: any){
        container.innerHTML = ''
        const r = document.createElement('div')
        r.innerHTML = `<div style="font-weight:600">WASM result</div><div class="muted">value: ${result.lastReturn}</div><div style="margin-top:6px">total: <span class="result">${result.total.toFixed(3)}</span> ms — avg: ${result.avg.toFixed(3)} ms</div>`
        container.appendChild(r)
      }
    }
  }
}

export default entry