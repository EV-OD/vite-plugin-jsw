# @allwcons/vite-plugin-jsw

A Vite plugin that enables high-performance WebAssembly compilation from TypeScript-like syntax using the `"use wasm"` directive. It automatically bridges the gap between JavaScript's dynamic typing and AssemblyScript's strict typing.

## Key Features

- **Direct In-JS Compilation**: Mark any `.ts`, `.jsw`, or `.tsw` file with `"use wasm"` to compile it to WebAssembly seamlessly.
- **Type Inference & Resolution**: Automatically injects return types and infers variable types using the TypeScript Compiler API, allowing you to write cleaner code that remains compatible with AssemblyScript.
- **Auto-i32 Index Casting**: Automatically wraps array indices in `i32()` to prevent common AssemblyScript compilation errors when using `f64` (default `number`) as an index.
- **Zero Configuration**: No complex `asconfig.json` setup required for individual modules; the plugin handles the compilation and glue generation (via `as-bind`) for you.
- **Self-Contained Output**: The plugin bundles the WebAssembly binary as a base64 string directly within the JavaScript glue, eliminating the need for separate `.wasm` file loading logic.

## Installation

```bash
# pnpm
pnpm add -D @allwcons/vite-plugin-jsw assemblyscript

# npm
npm install --save-dev @allwcons/vite-plugin-jsw assemblyscript
```

## Setup

Add the plugin to your `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import jsw from '@allwcons/vite-plugin-jsw';

export default defineConfig({
  plugins: [jsw()],
});
```

To take full advantage of AssemblyScript types in your IDE, include the global definitions in your `tsconfig.json` or `vite-env.d.ts`:

```typescript
// vite-env.d.ts
/// <reference types="@allwcons/vite-plugin-jsw/globals" />
```

## Usage

### The `"use wasm"` Directive

Simply add `"use wasm"` at the top of your file. The plugin will intercept the file, resolve implicit types, compile it to WASM, and return a JavaScript module with matched bindings.

```typescript
// math.ts
"use wasm";

export function fib(n: number): number {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

export function heavyMath(arr: Float64Array): void {
  for (let i = 0; i < arr.length; i++) {
    // Note: 'i' is treated as f64 (number) by default, 
    // but the plugin automatically casts it to i32 for array access.
    arr[i] = Math.sqrt(arr[i]) * 2.0;
  }
}
```

### Type Mapping

The plugin provides a Type Resolver that maps standard TypeScript types to their AssemblyScript counterparts:
- `number` $\rightarrow$ `f64` (default)
- `boolean` $\rightarrow$ `bool`
- Full support for TypedArrays: `Float64Array`, `Float32Array`, `Int32Array`, etc.

### Automatic Enhancements

The plugin performs several AST-level transformations to ensure your code runs optimally in WASM without requiring verbose manual casting:

1. **Return Type Injection**: 
   ```typescript
   function add(a: f64, b: f64) { return a + b; }
   // Becomes: function add(a: f64, b: f64): f64 { return a + b; }
   ```

2. **Variable Inference**:
   ```typescript
   let x = 1.5;
   // Becomes: let x: f64 = 1.5;
   ```

3. **Index Casting**:
   ```typescript
   let value = myArr[i]; // where i is f64
   // Becomes: let value = myArr[i32(i)];
   ```

## Development & Release

### Semantic Versioning
This project uses `standard-version` for automated versioning and changelog management.

```bash
# Patch release (1.0.x)
npm run release:patch

# Minor release (1.x.0)
npm run release:minor

# Major release (x.0.0)
npm run release:major
```

## License

ISC
