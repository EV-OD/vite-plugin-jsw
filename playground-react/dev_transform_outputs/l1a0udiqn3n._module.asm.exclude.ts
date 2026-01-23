"use wasm";
/**
 * Batch Training Function
 * @param flatData - All data points in one 1D array [x1, y1, x2, y2, ...]
 * @param labels - The correct labels for each point [1.0, 0.0, ...]
 * @param inputSize - How many features per point (e.g., 2 for x and y)
 * @param lr - Learning rate
 * @param epochs - How many times to loop over the whole dataset
 */
export function train(flatData: Float64Array, labels: Float64Array, inputSize: i32, lr: f64, epochs: i32): Float64Array {
    // 1. Prepare the result array: [weights..., bias]
    const result = new Float64Array(inputSize + 1);
    // Initialize weights to 0.1 and bias (last element) to 0.0
    for (let w: number = 0; w < inputSize; w++)
        result[w] = 0.1;
    result[inputSize] = 0.0;
    const numPoints = labels.length;
    // 2. Main Training Loop (Epochs)
    for (let e: number = 0; e < epochs; e++) {
        for (let i: number = 0; i < numPoints; i++) {
            // Offset tells us where the current data point starts in the flat array
            const offset: number = i * inputSize;
            // --- Forward Pass ---
            let sum = result[inputSize]; // Start with current bias
            for (let j: number = 0; j < inputSize; j++) {
                sum += unchecked(flatData[offset + j] * result[j]);
            }
            const prediction: number = 1.0 / (1.0 + Math.exp(-sum));
            // --- Backward Pass ---
            const error: number = unchecked(labels[i]) - prediction;
            // Update Weights
            for (let j: number = 0; j < inputSize; j++) {
                unchecked(result[j] += lr * error * flatData[offset + j]);
            }
            // Update Bias
            result[inputSize] += lr * error;
        }
    }
    return result;
}
