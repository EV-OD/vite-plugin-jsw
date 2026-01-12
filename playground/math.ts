"use wasm";

function multiplyInternal(a: Float64Array, b: Float64Array, target: Float64Array, n: i32): void {
  for (let row: i32 = 0; row < n; row++) {
    const rowOff = row * n;
    for (let col: i32 = 0; col < n; col++) {
      let sum: f64 = 0.0;
      for (let k: i32 = 0; k < n; k++) {
        sum += unchecked(a[rowOff + k]) * unchecked(b[k * n + col]);
      }
      unchecked(target[rowOff + col] = sum);
    }
  }
}

export function cascadeMultiply(a: Float64Array, b: Float64Array, n: i32, iterations: i32): Float64Array {
  const size = n * n;
  // Pre-allocate buffers inside WASM
  let res = new Float64Array(size);
  let tmp = new Float64Array(size);
  
  // Do the first multiplication
  multiplyInternal(a, b, res, n);

  for (let i: i32 = 1; i < iterations; i++) {
    if (i % 2 === 1) {
      multiplyInternal(res, a, tmp, n);
    } else {
      multiplyInternal(res, b, tmp, n);
    }
    // swap buffers by reference to avoid copying the whole matrix
    const swap = res;
    res = tmp;
    tmp = swap;
  }
  return res;
}