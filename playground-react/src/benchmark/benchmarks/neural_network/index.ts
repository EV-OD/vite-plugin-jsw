import { trainJs } from "./neural_js";
import { train } from "./neural_jsw";

import { register, type BenchEntry, type BenchResult } from "../../register";

export const createRandomMatrix = (n: number): Float64Array => {
  return new Float64Array(n * n).map(() => Math.random() * 10);
};


/**
 * Generates flattened data for AssemblyScript.
 * @param {number} count - Number of data points
 * @returns {Object} { flatData: Float64Array, labels: Float64Array }
 */
function generateData(count: number) {
  const inputSize = 2; // x and y
  
  // Create two flat buffers
  // flatData will look like: [x1, y1, x2, y2, x3, y3...]
  const flatData = new Float64Array(count * inputSize);
  const labels = new Float64Array(count);

  for (let i = 0; i < count; i++) {
    const x = Math.random() * 2 - 1;
    const y = Math.random() * 2 - 1;

    // Fill flatData at the correct offsets
    const offset = i * inputSize;
    flatData[offset] = x;
    flatData[offset + 1] = y;

    // Fill label
    labels[i] = y > x ? 1.0 : 0.0;
  }

  return { flatData, labels };
}

const data = generateData(10);

const argsData = () => {
  return [data.flatData, data.labels, 2, 0.1, 50];
}

const entry: BenchEntry = {
  description: 'Neural Network Training: Train a simple neural network to classify points based on their (x,y) coordinates using logistic regression. The dataset consists of points labeled based on whether y > x.',
  js: {
    fn: ((flatData: Float64Array, labels: Float64Array, inputSize: number, learningRate: number, epochs: number) => trainJs(flatData, labels, inputSize, learningRate, epochs)) as (...args: unknown[]) => unknown,
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
    fn: (async (flatData: Float64Array, labels: Float64Array, inputSize: number, learningRate: number, epochs: number) => train(flatData, labels, inputSize, learningRate, epochs)) as (...args: unknown[]) => unknown,
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
  showOutput: true,
  outputFormat: 'table',
  formatOutput: (results) => {
    return {
      header: ['Epochs', 'LR', 'w0', 'w1', 'bias'],
      data: results.map(r => {
        const input = r.input as [Float64Array, Float64Array, number, number, number];
        const lr = input[3];
        const epochs = input[4];
        const weights = r.output as Float64Array;
        return [epochs, lr, weights[0].toFixed(4), weights[1].toFixed(4), weights[2].toFixed(4)];
      })
    }
  },
  // preferred output format for renderers: 'linechart' | 'barchart' | 'table'
  format: 'linechart'
}

register('Neural Network', entry);