import { cascadeMultiplyJS, createRandomMatrix, trainJs, generateData, train } from './benchmark';
import { UI } from './ui';
import './style.css';

function initPlayground() {
  const nnHistory = {
    runs: [] as number[],
    jsTimes: [] as number[],
    wasmTimes: [] as number[]
  };

  const actions = {
    output: {
      "js": [],
      "jsw": []
    },
    run_nn: async () => {
      const { dataPointsSize, nnIters } = UI.getInputs();
      const { flatData, labels } = generateData(dataPointsSize);
      let length = flatData.length;

      // JS Neural Network
      let jsX ;
      const t0 = performance.now();
      jsX = trainJs(flatData, labels, 2, 0.01, nnIters);
      const durationJs = performance.now() - t0;
      console.log(`JS NN time: ${durationJs} ms`);
      console.log(jsX);
      UI.updateResult('js-nn', durationJs);

      let x;
      const t1 = performance.now();
      x = train(flatData, labels, 2, 0.01, nnIters);
      const durationWasm = performance.now() - t1;
      console.log(x);
      UI.updateResult('wasm-nn', durationWasm);
      console.log(`JSW NN time: ${durationWasm} ms`);

      nnHistory.runs.push(nnHistory.runs.length + 1);
      nnHistory.jsTimes.push(durationJs);
      nnHistory.wasmTimes.push(durationWasm);
      UI.updateChart(nnHistory.runs, nnHistory.jsTimes, nnHistory.wasmTimes);
    },
    'run-both': async () => {
      const { n, iters } = UI.getInputs();
      const a = createRandomMatrix(n), b = createRandomMatrix(n);
      // Run JS
      const t0 = performance.now();
      const res = cascadeMultiplyJS(a, b, n, iters);
      const duration = performance.now() - t0;

      UI.updateResult('js', duration);
      UI.setOutput(res, n);
      actions.output.js.push({res, n, duration});

      // Run WASM
      const t1 = performance.now();
      // const resWasm = cascadeMultiply(a, b, n, iters);
      const durationWasm = performance.now() - t1;

    }
  };

  // Attach all handlers in one loop
  Object.entries(actions).forEach(([id, fn]) => {
    document.getElementById(id)?.addEventListener('click', fn);
  });
}

// Start
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPlayground);
} else {
  initPlayground();
}