export function generateGlue(wasmBuffer: Uint8Array, asGeneratedGlue: string) {
  const base64Wasm = Buffer.from(wasmBuffer).toString('base64');

  // We take the 'asGeneratedGlue' (which contains all the logic for strings/arrays)
  // and inject our base64 WASM into it.
  
  return asGeneratedGlue.replace(
    /new URL\("module\.wasm", import\.meta\.url\)/g, 
    `"data:application/wasm;base64,${base64Wasm}"`
  );
}