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

  updateResult: (id: 'js' | 'wasm', time: number) => {
    const el = document.getElementById(`${id}-result`);
    if (el) el.querySelector('span')!.textContent = `${time.toFixed(2)} ms`;
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