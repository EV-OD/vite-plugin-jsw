import { cascadeMultiplyJS, createRandomMatrix, cascadeMultiply, createNN, SimpleNNJs, generateData } from './benchmark';
import { UI } from './ui';

function initPlayground() {
  const actions = {
    output: {
      "js": [],
      "jsw": []
    },
    run_nn: async () => {
      const { dataPointsSize, nnIters } = UI.getInputs();
      const { points, labels } = generateData(dataPointsSize);

      // JS Neural Network
      const nnJs = new SimpleNNJs(2, 0.1);
      const t0 = performance.now();
      for (let iter = 0; iter < nnIters; iter++) {
        for (let i = 0; i < points.length; i++) {
          nnJs.train(points[i], labels[i]);
        }
      }
      const durationJs = performance.now() - t0;
      console.log(`JS NN time: ${durationJs} ms`);
      // UI.updateResult('js-nn', durationJs);

      // WASM Neural Network
      const nnWasm = createNN(2, 0.1);
      console.log(nnWasm);
      const t1 = performance.now();
      for (let iter = 0; iter < nnIters; iter++) {
        for (let i = 0; i < points.length; i++) {
          nnWasm.train(points[i], labels[i]);
        }
      }
      const durationWasm = performance.now() - t1;
      // UI.updateResult('wasm-nn', durationWasm);
      console.log(`WASM NN time: ${durationWasm} ms`);

      // Output weights as a simple correctness check
      const weightsJs = nnJs.weights;
      const weightsWasm = nnWasm.weights;

      let correct = true;
      for (let i = 0; i < weightsJs.length; i++) {
        if (Math.abs(weightsJs[i] - weightsWasm[i]) > 1e-6) {
          correct = false;
          break;
        }
      }
      if (correct) {
        console.log(`Neural Network weights match.`);
      } else {
        console.error(`Neural Network weights differ.`);
      }

      UI.setOutputNN(weightsWasm, weightsWasm.length);

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
      const resWasm = cascadeMultiply(a, b, n, iters);
      const durationWasm = performance.now() - t1;

      UI.updateResult('wasm', durationWasm);
      UI.setOutput(resWasm, n);
      actions.output.jsw.push({res: resWasm, n, duration: durationWasm});

      let js_res = actions.output.js[actions.output.js.length - 1];
      let wasm_res = actions.output.jsw[actions.output.jsw.length - 1];
      
      // Simple correctness check
      let correct = true;
      for (let i = 0; i < js_res.res.length; i++) {
        if (Math.abs(js_res.res[i] - wasm_res.res[i]) > 1e-6) {
          correct = false;
          break;
        }
      }
      if (correct) {
        console.log(`Results match for n=${js_res.n}`);
      } else {
        console.error(`Results differ for n=${js_res.n}`);
      }
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