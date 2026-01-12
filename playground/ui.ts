import Chart from 'chart.js/auto';

let chartInstance: Chart | null = null;

export const UI = {
  getInputs: () => ({
    n: Number((document.getElementById('matrix-size') as HTMLInputElement).value) || 64,
    iters: Number((document.getElementById('iterations') as HTMLInputElement).value) || 1,
    nnIters: Number((document.getElementById('nn-iterations') as HTMLInputElement).value) || 1000,
    dataPointsSize: Number((document.getElementById('data-points-size') as HTMLInputElement).value) || 100,
  }),

  setOutputNN: (arr: Float64Array, n: number) => {
    const el = document.getElementById('nn-output');
    if (!el) return;
    
    // Format a small preview (max 4 values)
    const limit = Math.min(n, 4);
    let s = '';
    for (let i = 0; i < limit; i++) {
        s += arr[i].toFixed(4) + '\n';
    }
    el.textContent = s + (n > 4 ? '...' : '');
  },

  updateResult: (id: 'js' | 'js-nn' | 'wasm' | 'wasm-nn', time: number) => {
    const el = document.getElementById(`${id}-result`);
    if (el) el.querySelector('span')!.textContent = `${time.toFixed(2)} ms`;
  },

  updateChart: (runs: number[], jsTimes: number[], wasmTimes: number[]) => {
    const ctx = document.getElementById('nn-chart') as HTMLCanvasElement;
    if (!ctx) return;

    if (chartInstance) {
      chartInstance.data.labels = runs;
      chartInstance.data.datasets[0].data = jsTimes;
      chartInstance.data.datasets[1].data = wasmTimes;
      chartInstance.update();
    } else {
      chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: runs,
          datasets: [
            {
              label: 'JS Execution Time (ms)',
              data: jsTimes,
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.1
            },
            {
              label: 'JSW Execution Time (ms)',
              data: wasmTimes,
              borderColor: 'rgb(54, 162, 235)',
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 500
          },
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  return context.dataset.label + ': ' + context.parsed.y.toFixed(2) + ' ms';
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Time (ms)'
              },
              grid: {
                color: '#f3f4f6'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Run #'
              },
              grid: {
                display: false
              }
            }
          }
        }
      });
    }
  },

  setOutput: (arr: Float64Array, n: number) => {
    const el = document.getElementById('matrix-output');
    if (!el) return;
    
    // Format a small preview (max 4x4)
    const limit = Math.min(n, 4);
    let s = '';
    for (let r = 0; r < limit; r++) {
      const row = [];
      for (let c = 0; c < limit; c++) row.push(arr[r * n + c].toFixed(2));
      s += row.join(', ') + '\n';
    }
    el.textContent = s + (n > 4 ? '...' : '');
  }
};