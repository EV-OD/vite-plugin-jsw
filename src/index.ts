import type { Plugin } from 'vite';
import { compileAs } from './compiler'; 
import { generateGlue } from './glue';

export default function jswPlugin(): Plugin {
  return {
    name: 'vite-plugin-jsw',
    enforce: 'pre', // Ensures we run before standard JS transpilation

    async transform(code, id) {
      // Check for the "use wasm" directive
    const hasUseWasmDirective = code.includes('"use wasm"') || code.includes("'use wasm'");
    const isWasmFile = id.endsWith('.jsw') || id.endsWith('.tsw') || id.endsWith('.ts');
    console.log(hasUseWasmDirective, isWasmFile)
    if (!hasUseWasmDirective || !isWasmFile) {
        console.log(`skipping non-TSW/JSW file: ${id}`);
        return null;
    }

      // 1. Convert JS/AS code to WASM binary
      const { wasm, glue } = await compileAs(code);
      console.log(`Compiled ${id} to WASM, size: ${wasm.length} bytes`);
      const finalCode = generateGlue(wasm, glue);
      
      // 2. Wrap in Glue Code
      return {
        code: finalCode,
        map: null
      };
    },
  };
}
