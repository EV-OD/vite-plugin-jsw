import { cascadeMultiplyJS } from './jsMath';
import {cascadeMultiply } from './math';
import { SimpleNNJs } from './neural_js';
import { createNN } from './neural_jsw';

/**
 * Utility to generate random data
 */
export const createRandomMatrix = (n: number): Float64Array => {
  return new Float64Array(n * n).map(() => Math.random() * 10);
};


/**
 * Generates random 2D points for binary classification.
 * Rule: If y > x, label is 1. If y <= x, label is 0.
 * @param {number} count - Number of data points to generate
 */
function generateData(count) {
  const points = [];
  const labels = [];

  for (let i = 0; i < count; i++) {
    // Generate random coordinates between -1 and 1
    const x = Math.random() * 2 - 1;
    const y = Math.random() * 2 - 1;

    // The "True" rule our AI needs to discover:
    const label = y > x ? 1.0 : 0.0;

    // We use Float64Array because that's what our AssemblyScript expects
    const features = new Float64Array([x, y]);
    
    points.push(features);
    labels.push(label);
  }

  return { points, labels };
}


export { cascadeMultiply, cascadeMultiplyJS, generateData, createNN, SimpleNNJs };