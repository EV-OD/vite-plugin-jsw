export function multiplyMatricesJS(a: Float64Array, b: Float64Array, n: number): Float64Array {
  const result = new Float64Array(n * n);
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      let sum = 0.0;
      for (let k = 0; k < n; k++) {
        sum += a[row * n + k] * b[k * n + col];
      }
      result[row * n + col] = sum;
    }
  }
  return result;
}

export function cascadeMultiplyJS(a: Float64Array, b: Float64Array, n: number, iterations: number): Float64Array {
  // iterations: number of cascade steps. iterations=1 => A*B
  if (iterations <= 0) return a;

  let result: Float64Array = multiplyMatricesJS(a, b, n);
  for (let i = 1; i < iterations; i++) {
    // alternate multiplying by `A` then `B`: A*B, (A*B)*A, ((A*B)*A)*B...
    if (i % 2 === 1) {
      result = multiplyMatricesJS(result, a, n);
    } else {
      result = multiplyMatricesJS(result, b, n);
    }
  }
  return result;
}
