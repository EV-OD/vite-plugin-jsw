import { registry } from './register.ts'

type Variant = { fn: (...args: any[]) => any | Promise<any>, args?: any[], ui?: { renderResult?: (container: HTMLElement, result: any)=>void } }
type BenchEntry = { js?: Variant, wasm?: Variant, ui?: { renderResult?: (container: HTMLElement, result: any)=>void }, description?: string }

function fmt(n: number){ return n.toFixed(3) }

async function runVariant(fn: (...args:any[]) => any, args: any[], iterations: number){
  // warmup and capture a sample return value
  let lastReturn: any = undefined
  for(let i=0;i<10;i++){
    const r = fn(...args)
    lastReturn = r instanceof Promise ? await r : r
  }

  const start = performance.now()
  for(let i=0;i<iterations;i++){
    const r = fn(...args)
    lastReturn = r instanceof Promise ? await r : r
  }
  const end = performance.now()
  const total = end - start
  return { total, avg: total / iterations, lastReturn }
}

export default function initManager(doc: Document){
  const benchList = doc.getElementById('benchList')!
  const detailPane = doc.getElementById('detailPane')!
  const resultsBody = doc.querySelector('#resultsTable tbody')!
  const iterationsInput = doc.getElementById('iterations') as HTMLInputElement

  function addResultRow(name: string, variant: string, iters: number, total: number, avg: number){
    const tr = document.createElement('tr')
    tr.innerHTML = `<td>${name}</td><td>${variant}</td><td>${iters}</td><td class="result">${fmt(total)}</td><td>${fmt(avg)}</td>`
    resultsBody.prepend(tr)
  }

  const outputContainers = new Map<string, HTMLElement>()

  function ensureLiveOutputArea(){
    let live = doc.getElementById('__live_output') as HTMLElement | null
    if(!live){
      live = document.createElement('div')
      live.id = '__live_output'
      live.style.marginTop = '10px'
      detailPane.appendChild(live)
    }
    return live
  }

  function showDetails(name: string, entry: BenchEntry){
    detailPane.innerHTML = ''
    const title = document.createElement('div')
    title.style.marginBottom = '8px'
    title.innerHTML = `<div style="font-weight:600">${name}</div><div class="muted">Variants: ${entry.js? 'js':''} ${entry.wasm? 'wasm':''}</div>`
    detailPane.appendChild(title)

    if(entry.description){
      const d = document.createElement('div')
      d.className = 'muted'
      d.style.marginBottom = '8px'
      d.textContent = entry.description
      detailPane.appendChild(d)
    }

    if(entry.js){
      const block = document.createElement('div')
      block.style.marginTop = '8px'
      block.innerHTML = `<div style="font-weight:600">JS variant</div>`
      const pre = document.createElement('pre')
      pre.textContent = `args: ${JSON.stringify(entry.js.args||[])}\n(fn: ${entry.js.fn.name || 'anonymous'})`
      const out = document.createElement('div')
      out.style.marginTop = '8px'
      block.appendChild(out)
      outputContainers.set(`${name}:js`, out)

      const btn = document.createElement('button')
      btn.textContent = 'Run JS'
      btn.onclick = async ()=>{
        btn.disabled = true
        const iters = Number(iterationsInput.value)||1
        const res = await runVariant(entry.js!.fn, entry.js!.args||[], iters)
        addResultRow(name,'js',iters,res.total,res.avg)
        // call custom renderer if present
        const renderer = entry.js!.ui?.renderResult || entry.ui?.renderResult
        if(renderer){ renderer(out, { name, variant: 'js', iters, ...res }) }
        btn.disabled = false
      }
      block.appendChild(pre)
      block.appendChild(btn)
      detailPane.appendChild(block)
    }

    if(entry.wasm){
      const block = document.createElement('div')
      block.style.marginTop = '8px'
      block.innerHTML = `<div style="font-weight:600">WASM variant</div>`
      const pre = document.createElement('pre')
      pre.textContent = `args: ${JSON.stringify(entry.wasm.args||[])}\n(fn: ${entry.wasm.fn.name || 'anonymous'})`
      const out = document.createElement('div')
      out.style.marginTop = '8px'
      block.appendChild(out)
      outputContainers.set(`${name}:wasm`, out)

      const btn = document.createElement('button')
      btn.textContent = 'Run WASM'
      btn.onclick = async ()=>{
        btn.disabled = true
        const iters = Number(iterationsInput.value)||1
        const res = await runVariant(entry.wasm!.fn, entry.wasm!.args||[], iters)
        addResultRow(name,'wasm',iters,res.total,res.avg)
        const renderer = entry.wasm!.ui?.renderResult || entry.ui?.renderResult
        if(renderer){ renderer(out, { name, variant: 'wasm', iters, ...res }) }
        btn.disabled = false
      }
      block.appendChild(pre)
      block.appendChild(btn)
      detailPane.appendChild(block)
    }
  }

  // populate list
  registry.forEach((entry: BenchEntry, name: string)=>{
    const el = document.createElement('div')
    el.className = 'bench-item'
    const meta = document.createElement('div')
    meta.className = 'bench-meta'
    meta.innerHTML = `<div style="font-weight:600">${name}</div><div class="muted">${entry.js? 'js':''} ${entry.wasm? 'wasm':''}</div>`
    const controls = document.createElement('div')
    controls.className = 'controls'

    const detailsBtn = document.createElement('button')
    detailsBtn.textContent = 'Details'
    detailsBtn.onclick = ()=> showDetails(name, entry)
    controls.appendChild(detailsBtn)

    if(entry.js){
      const runJs = document.createElement('button')
      runJs.textContent = 'Run JS'
      runJs.onclick = async ()=>{
        runJs.disabled = true
        const iters = Number(iterationsInput.value)||1
        const res = await runVariant(entry.js!.fn, entry.js!.args||[], iters)
        addResultRow(name,'js',iters,res.total,res.avg)
        // attempt to show output using registered output container or live area
        let out = outputContainers.get(`${name}:js`)
        if(!out){ out = ensureLiveOutputArea(); }
        const renderer = entry.js!.ui?.renderResult || entry.ui?.renderResult
        if(renderer){ renderer(out, { name, variant: 'js', iters, ...res }) }
        runJs.disabled = false
      }
      controls.appendChild(runJs)
    }

    if(entry.wasm){
      const runWasm = document.createElement('button')
      runWasm.textContent = 'Run WASM'
      runWasm.onclick = async ()=>{
        runWasm.disabled = true
        const iters = Number(iterationsInput.value)||1
        const res = await runVariant(entry.wasm!.fn, entry.wasm!.args||[], iters)
        addResultRow(name,'wasm',iters,res.total,res.avg)
        let out = outputContainers.get(`${name}:wasm`)
        if(!out){ out = ensureLiveOutputArea(); }
        const renderer = entry.wasm!.ui?.renderResult || entry.ui?.renderResult
        if(renderer){ renderer(out, { name, variant: 'wasm', iters, ...res }) }
        runWasm.disabled = false
      }
      controls.appendChild(runWasm)
    }

    el.appendChild(meta)
    el.appendChild(controls)
    benchList.appendChild(el)
  })

  return { registry }
}
