"use wasm";

export const FLOAT64_ID = idof<Float64Array>();

// Activation function: Sigmoid maps any value to a range between 0 and 1
function sigmoid(x: f64): f64 {
  return 1.0 / (1.0 + Math.exp(-x));
}

export function createNN(inputSize: i32, learningRate: f64 = 0.1): SimpleNN {
  return new SimpleNN(inputSize, learningRate);
}

class SimpleNN {
  public weights: Float64Array;
  public bias: f64;
  public learningRate: f64;

  constructor(inputSize: i32, learningRate: f64 = 0.1) {
    this.weights = new Float64Array(inputSize);
    this.bias = 0.0;
    this.learningRate = learningRate;

    // Initialize weights with small random-like values
    for (let i = 0; i < inputSize; i++) {
      this.weights[i] = 0.1; 
    }
  }

  /**
   * Predicts the class (0 or 1) for a given input array.
   */
  predict(inputs: Float64Array): f64 {
    let sum = this.bias;
    for (let i = 0; i < this.weights.length; i++) {
      sum += inputs[i] * this.weights[i];
    }
    return sigmoid(sum);
  }

  /**
   * Trains the network using a single data point (Stochastic Gradient Descent).
   * @param inputs Features of the data point
   * @param target The actual label (0.0 or 1.0)
   */
  train(inputs: Float64Array, target: f64): void {
    const prediction = this.predict(inputs);
    
    // Calculate Error: (Actual - Predicted)
    const error = target - prediction;

    // Update weights and bias based on the error gradient
    // Formula: weight = weight + (learningRate * error * input)
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] += this.learningRate * error * inputs[i];
    }
    this.bias += this.learningRate * error;
  }
}

export { SimpleNN };