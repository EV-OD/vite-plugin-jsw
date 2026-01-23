
export function matrixCascadeJs(m1: Float64Array, m2: Float64Array, rows: number, cols: number): Float64Array {
  const size: number = rows * cols;
  
  // Create temporary buffers so we don't destroy the original input data
  // while we are still performing calculations.
  const temp = new Float64Array(size);
  const outM1 = new Float64Array(size);
  const outM2 = new Float64Array(size);

  // 1. Multiply m1 and m2, store in temp
  for (let r = 0; r < rows; r++) {
    const rowOffset = r * cols;
    for (let c = 0; c < cols; c++) {
      let sum: f64 = 0;
      for (let k = 0; k < cols; k++) {
        // sum += m1[r,k] * m2[k,c]
        sum += m1[rowOffset + k] * m2[k * cols + c];
      }
      temp[rowOffset + c] = sum;
    }
  }

  // 2. Multiply temp and m1, store in outM1
  for (let r = 0; r < rows; r++) {
    const rowOffset = r * cols;
    for (let c = 0; c < cols; c++) {
      let sum: f64 = 0;
      for (let k = 0; k < cols; k++) {
        sum += temp[rowOffset + k] * m1[k * cols + c];
      }
      outM1[rowOffset + c] = sum;
    }
  }

  // 3. Multiply m2 and temp, store in outM2
  for (let r = 0; r < rows; r++) {
    const rowOffset = r * cols;
    for (let c = 0; c < cols; c++) {
      let sum: f64 = 0;
      for (let k = 0; k < cols; k++) {
        sum += m2[rowOffset + k] * temp[k * cols + c];
      }
      outM2[rowOffset + c] = sum;
    }
  }

  // 4. Final step: sum outM1 + outM2
  const result = new Float64Array(size);
  for (let i = 0; i < size; i++) {
    result[i] = outM1[i] + outM2[i];
  }

  return result;
}