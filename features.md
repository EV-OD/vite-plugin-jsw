# Features

## 1. TypeScript Type Resolver
The Type Resolver acts as a pre-processor in the `vite-plugin-jsw` pipeline. It converts implicit TypeScript code into the explicit format required by AssemblyScript by leveraging the TypeScript Compiler API.

### Automatic Return Type Injection
Analyzes function bodies using the TypeScript TypeChecker to determine the actual return type and injects it into the function declaration.
- **Example:**
  ```typescript
  // Input
  function add(a: f64, b: f64) {
    return a + b;
  }

  // Output
  function add(a: f64, b: f64): f64 {
    return a + b;
  }
  ```

### Variable Type Inference
Detects variable declarations without explicit types and injects the correct type definition based on the initializer.
- **Example:**
  ```typescript
  // Input
  let x = 1.5;

  // Output
  let x: f64 = 1.5;
  ```

### Literal-to-Base Type Mapping
Ensures that literal types (like the literal `0`) are broadened to their base types (like `number` or `f64`) before injection, ensuring compatibility with AssemblyScript's type system.

### TS-to-AS Type Mapping
Handles the translation of standard TypeScript types into AssemblyScript-compatible types:
- `number` $\rightarrow$ `f64` (default behavior for math-heavy code)
- `boolean` $\rightarrow$ `bool`
- Maintains support for **TypedArrays**: `Float64Array`, `Float32Array`, `Int32Array`.

### Virtual Source Processing
Operates entirely in memory using a virtual file system. It uses `ts.createCompilerHost` to intercept file reads, meaning no temporary files are written to disk during analysis.

---

## 2. AssemblyScript Transform
The AssemblyScript Transform modifies the Abstract Syntax Tree (AST) during the actual compilation process using the AssemblyScript `Transform` API.

### Automatic Index Casting (Auto-i32)
Specifically targets `ElementAccess` nodes (array indexing) to ensure the index is an integer.
- **Problem:** In AssemblyScript, attempting to use a `f64` (the default `number` type) as an array index results in an **AS200** error.
- **Solution:** Automatically wraps indices in an `i32()` constructor.
- **Example:**
  ```typescript
  // Input
  let value = myArr[i]; // where i is f64

  // Transformed (Internal AST Representation)
  let value = myArr[i32(i)];
  ```

### Safe Integer Conversion
Prevents compilation failures by ensuring that all dynamic index expressions are treated as `i32`, maintaining strict type safety without requiring the user to manually cast every index.

### Recursive AST Walking
Deeply traverses the code structure (expressions, statements, and blocks) to find nested array accesses, ensuring that even complex patterns like `matrix[i][j]` are correctly handled.

### Library Exclusion
Smartly identifies and skips the standard library (`~lib/`). This ensures the transform only modifies user logic and prevents interference with internal AssemblyScript compiler functions.

### Infinite Loop Protection
Includes logic to prevent "double-wrapping" of nodes. By specifically visiting the base expression and skipping the newly injected `i32()` call's inner parts during recursion, it avoids redundant transformations.
