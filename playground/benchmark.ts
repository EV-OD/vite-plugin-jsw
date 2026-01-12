import { cascadeMultiplyJS } from './jsMath';
// import {cascadeMultiply } from './math';
import { trainJs } from './neural_js';
import { train } from './neural_jsw';

/**
 * Utility to generate random data
 */
export const createRandomMatrix = (n: number): Float64Array => {
  return new Float64Array(n * n).map(() => Math.random() * 10);
};


/**
 * Generates flattened data for AssemblyScript.
 * @param {number} count - Number of data points
 * @returns {Object} { flatData: Float64Array, labels: Float64Array }
 */
function generateData(count) {
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



export { cascadeMultiplyJS, generateData, trainJs, train };