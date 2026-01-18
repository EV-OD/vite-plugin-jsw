import './App.css'
import BenchmarkManager from './benchmark/manager/BenchmarkManager'
import './benchmark/benchmarks/fib/index'

function App(){
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <BenchmarkManager />
    </div>
  )
}

export default App
