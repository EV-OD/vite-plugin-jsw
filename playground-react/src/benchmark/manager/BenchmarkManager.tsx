import React, { useEffect, useMemo, useRef, useState } from 'react'
import { getRegistry, type BenchEntry } from '../register'

function fmt(n: number){ return n.toFixed(3) }

async function resolveArgs(argsOrFactory?: any[]|(()=>any[]|Promise<any[]>)){
  if(!argsOrFactory) return []
  if(typeof argsOrFactory === 'function'){
    const r = (argsOrFactory as Function)()
    return r instanceof Promise ? await r : r
  }
  return argsOrFactory
}

async function runVariant(fn: (...args:any[])=>any, argsOrFactory: any[]|(()=>any[]|Promise<any[]>)|undefined, iterations: number, collectSamples=false){
  const args = await resolveArgs(argsOrFactory)
  let lastReturn: any
  for(let i=0;i<10;i++){
    const r = fn(...args)
    lastReturn = r instanceof Promise ? await r : r
  }
  const samples: number[] = []
  const start = performance.now()
  if(collectSamples){
    for(let i=0;i<iterations;i++){
      const itStart = performance.now()
      const r = fn(...args)
      lastReturn = r instanceof Promise ? await r : r
      const itEnd = performance.now()
      samples.push(itEnd - itStart)
    }
  } else {
    for(let i=0;i<iterations;i++){
      const r = fn(...args)
      lastReturn = r instanceof Promise ? await r : r
    }
  }
  const end = performance.now()
  const total = end - start
  const avg = total / iterations
  return { total, avg, lastReturn, samples }
}

function RenderByFormat({name, variant, format, res}:{name:string,variant:string,format:'barchart'|'linechart'|'table',res:any}){
  const ref = useRef<HTMLDivElement|null>(null)
  useEffect(()=>{
    const container = ref.current!
    container.innerHTML = ''
    const header = document.createElement('div')
    header.className = 'mb-2'
    header.innerHTML = `<div class="font-semibold">${name} — ${variant}</div><div class="text-sm text-gray-400">avg: ${fmt(res.avg)} ms — total: ${fmt(res.total)} ms</div>`
    container.appendChild(header)
    const samples: number[] = res.samples || []
    if(samples.length===0){
      const p = document.createElement('div')
      p.className = 'text-sm text-gray-400'
      p.textContent = 'No per-iteration samples available.'
      container.appendChild(p)
      return
    }
    if(format==='table'){
      const t = document.createElement('table')
      t.className = 'w-full table-auto text-sm'
      t.innerHTML = `<thead><tr><th class="text-left p-1">#</th><th class="text-left p-1">ms</th></tr></thead>`
      const tb = document.createElement('tbody')
      samples.forEach((s,i)=>{ const tr = document.createElement('tr'); tr.innerHTML = `<td class="p-1">${i+1}</td><td class="p-1">${fmt(s)}</td>`; tb.appendChild(tr) })
      t.appendChild(tb)
      container.appendChild(t)
      return
    }
    // simple svg charts
    const width = 480
    const height = 120
    const svgNS = 'http://www.w3.org/2000/svg'
    const svg = document.createElementNS(svgNS,'svg')
    svg.setAttribute('width', String(width))
    svg.setAttribute('height', String(height))
    svg.classList.add('block','mt-2')
    const max = Math.max(...samples)
    if(format==='barchart'){
      const barW = Math.max(2, Math.floor(width / samples.length))
      samples.forEach((s,i)=>{
        const h = (s / max) * (height - 10)
        const rect = document.createElementNS(svgNS,'rect')
        rect.setAttribute('x', String(i * barW))
        rect.setAttribute('y', String(height - h))
        rect.setAttribute('width', String(barW-1))
        rect.setAttribute('height', String(h))
        rect.setAttribute('fill', '#4caf50')
        svg.appendChild(rect)
      })
    } else {
      const points = samples.map((s,i)=>{
        const x = (i / (samples.length - 1 || 1)) * (width - 2)
        const y = height - (s / max) * (height - 10)
        return `${x},${y}`
      }).join(' ')
      const poly = document.createElementNS(svgNS,'polyline')
      poly.setAttribute('points', points)
      poly.setAttribute('fill','none')
      poly.setAttribute('stroke','#2196f3')
      poly.setAttribute('stroke-width','2')
      svg.appendChild(poly)
      samples.forEach((s,i)=>{
        const x = (i / (samples.length - 1 || 1)) * (width - 2)
        const y = height - (s / max) * (height - 10)
        const c = document.createElementNS(svgNS,'circle')
        c.setAttribute('cx', String(x))
        c.setAttribute('cy', String(y))
        c.setAttribute('r','2')
        c.setAttribute('fill','#2196f3')
        svg.appendChild(c)
      })
    }
    container.appendChild(svg)
  },[name,variant,format,res])
  return <div ref={ref}></div>
}

export default function BenchmarkManager(){
  const registry = useMemo(()=>Array.from(getRegistry().entries()), [])
  const [selected, setSelected] = useState<string | null>(registry[0]?.[0] || null)
  const [runs, setRuns] = useState<Array<any>>([])
  const [iterations, setIterations] = useState<number>(1000)
  const [groupState, setGroupState] = useState<Record<string,boolean>>({})

  useEffect(()=>{
    if(selected===null && registry.length) setSelected(registry[0][0])
  },[registry, selected])

  const selectedEntry = selected ? getRegistry().get(selected) as BenchEntry | undefined : undefined

  async function handleRun(name:string, variantKey: 'js'|'wasm'){
    const entry = getRegistry().get(name)
    if(!entry) return
    const variant = (entry as any)[variantKey]
    if(!variant) return
    // show loading per-run in UI by adding a temporary run
    const runId = `${name}:${variantKey}:${Date.now()}`
    setRuns(prev=>[{ id: runId, name, variant: variantKey, status: 'running' }, ...prev])
    const res = await runVariant(variant.fn, variant.args, iterations, !!entry.showAllResults)
    setRuns(prev=>prev.map(r=> r.id===runId ? { ...r, status: 'done', res } : r))
  }

  function toggleGroup(name:string, variantKey: 'js'|'wasm'){
    const k = `${name}:${variantKey}`
    setGroupState(s=>({ ...s, [k]: !s[k] }))
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Benchmark Manager (React)</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="bg-slate-800 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <div>
                <div className="text-sm text-gray-400">Registered benchmarks</div>
                <div className="text-lg font-medium">Available suites</div>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-400">Iterations</label>
                <input className="w-24 p-1 rounded bg-slate-700 text-sm" type="number" value={iterations} onChange={e=>setIterations(Number(e.target.value)||1)} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {registry.map(([name,entry])=> (
                <div key={name} className="flex items-center justify-between bg-slate-700 p-2 rounded">
                  <div>
                    <div className="font-medium">{name}</div>
                    <div className="text-sm text-gray-400">{entry.js? 'js':''} {entry.wasm? 'wasm':''}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-2 py-1 bg-slate-600 rounded" onClick={()=>setSelected(name)}>Details</button>
                    {entry.js && <>
                      <button className="px-2 py-1 bg-slate-600 rounded" onClick={()=>handleRun(name,'js')}>Run JS</button>
                      <button className="px-2 py-1 bg-slate-600 rounded" onClick={()=>toggleGroup(name,'js')}>{groupState[`${name}:js`] ? 'Ungrouped' : 'Grouped'}</button>
                    </>}
                    {entry.wasm && <>
                      <button className="px-2 py-1 bg-slate-600 rounded" onClick={()=>handleRun(name,'wasm')}>Run WASM</button>
                      <button className="px-2 py-1 bg-slate-600 rounded" onClick={()=>toggleGroup(name,'wasm')}>{groupState[`${name}:wasm`] ? 'Ungrouped' : 'Grouped'}</button>
                    </>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800 p-4 rounded-lg mt-4">
            <div className="text-sm text-gray-400 mb-2">Results</div>
            <table className="w-full text-sm table-auto">
              <thead>
                <tr className="text-left text-gray-300"><th className="p-1">Benchmark</th><th className="p-1">Variant</th><th className="p-1">Iterations</th><th className="p-1">Time (ms)</th><th className="p-1">Avg (ms)</th></tr>
              </thead>
              <tbody>
                {runs.map(r=> r.status==='done' ? (
                  <tr key={r.id} className="border-t border-slate-700"><td className="p-1">{r.name}</td><td className="p-1">{r.variant}</td><td className="p-1">{iterations}</td><td className="p-1 font-semibold">{fmt(r.res.total)}</td><td className="p-1">{fmt(r.res.avg)}</td></tr>
                ) : (
                  <tr key={r.id}><td colSpan={5} className="p-1 text-sm text-gray-300">{r.name} {r.variant} running…</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div className="bg-slate-800 p-4 rounded-lg">
            <div className="text-sm text-gray-400">Details</div>
            <div className="mt-2">
              {selectedEntry ? (
                <div>
                  <div className="font-semibold">{selected}</div>
                  {selectedEntry.description && <div className="text-sm text-gray-400">{selectedEntry.description}</div>}

                  {selectedEntry.js && (
                    <div className="mt-3">
                      <div className="font-medium">JS variant</div>
                      <pre className="bg-slate-700 p-2 rounded text-sm mt-2">args: {typeof selectedEntry.js.args === 'function' ? '(factory)' : JSON.stringify(selectedEntry.js.args||[])}\n(fn: {selectedEntry.js.fn.name || 'anonymous'})</pre>
                      <div className="flex gap-2 mt-2">
                        <button className="px-2 py-1 bg-slate-600 rounded" onClick={()=>handleRun(selected as string,'js')}>Run JS</button>
                        <button className="px-2 py-1 bg-slate-600 rounded" onClick={()=>toggleGroup(selected as string,'js')}>{groupState[`${selected}:js`] ? 'Ungrouped' : 'Grouped'}</button>
                      </div>
                      <div className="mt-3" id={`out-${selected}-js`}>
                        {/* render area - when run completes we'll render inside runs list area or here via effect */}
                      </div>
                    </div>
                  )}

                  {selectedEntry.wasm && (
                    <div className="mt-3">
                      <div className="font-medium">WASM variant</div>
                      <pre className="bg-slate-700 p-2 rounded text-sm mt-2">args: {typeof selectedEntry.wasm.args === 'function' ? '(factory)' : JSON.stringify(selectedEntry.wasm.args||[])}\n(fn: {selectedEntry.wasm.fn.name || 'anonymous'})</pre>
                      <div className="flex gap-2 mt-2">
                        <button className="px-2 py-1 bg-slate-600 rounded" onClick={()=>handleRun(selected as string,'wasm')}>Run WASM</button>
                        <button className="px-2 py-1 bg-slate-600 rounded" onClick={()=>toggleGroup(selected as string,'wasm')}>{groupState[`${selected}:wasm`] ? 'Ungrouped' : 'Grouped'}</button>
                      </div>
                      <div className="mt-3" id={`out-${selected}-wasm`} />
                    </div>
                  )}

                </div>
              ) : (
                <div className="text-sm text-gray-400">Select a benchmark to see details and run controls.</div>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
