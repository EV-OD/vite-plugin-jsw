"use wasm"

export function fibWasm(n: number): number {
  if (n < 2) return n
  return fibWasm(n - 1) + fibWasm(n - 2)
}