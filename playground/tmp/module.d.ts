/** Exported memory */
export declare const memory: WebAssembly.Memory;
// Exported runtime interface
export declare function __new(size: number, id: number): number;
export declare function __pin(ptr: number): number;
export declare function __unpin(ptr: number): void;
export declare function __collect(): void;
export declare const __rtti_base: number;
/**
 * module/cascadeMultiply
 * @param a `~lib/typedarray/Float64Array`
 * @param b `~lib/typedarray/Float64Array`
 * @param n `i32`
 * @param iterations `i32`
 * @returns `~lib/typedarray/Float64Array`
 */
export declare function cascadeMultiply(a: Float64Array, b: Float64Array, n: number, iterations: number): Float64Array;
