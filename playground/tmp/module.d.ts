/** Exported memory */
export declare const memory: WebAssembly.Memory;
/**
 * module/train
 * @param flatData `~lib/typedarray/Float64Array`
 * @param labels `~lib/typedarray/Float64Array`
 * @param inputSize `i32`
 * @param lr `f64`
 * @param epochs `i32`
 * @returns `~lib/typedarray/Float64Array`
 */
export declare function train(flatData: Float64Array, labels: Float64Array, inputSize: number, lr: number, epochs: number): Float64Array;
