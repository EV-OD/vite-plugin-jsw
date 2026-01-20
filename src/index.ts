import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import type { Plugin } from 'vite';
import { compileAs } from './compiler'; 
import { generateGlue } from './glue';
import { resolveImplicitTypes } from './typeResolver'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function jswPlugin(): Plugin {
  let transformPath: string;

  return {
    name: 'vite-plugin-jsw',
    enforce: 'pre',

    configResolved(config) {
      // Instead of resolving to the plugin folder, let's resolve to the current project's temp dir
      // This makes the path relative to the playground-react project
      const projectRoot = config.root; 
      const tempFolder = join(projectRoot, 'node_modules', '.jsw');
      if (!existsSync(tempFolder)) mkdirSync(tempFolder, { recursive: true });

      transformPath = join(tempFolder, 'indexCastTransform.mjs');

      // Read the original from the plugin and write it to the playground's local temp
      const sourcePath = resolve(__dirname, '../public/indexCastTransform.mjs');
      const code = readFileSync(sourcePath, 'utf-8');
      writeFileSync(transformPath, code);
    },

    async buildStart() {
      if (!this.meta.watchMode) { 
        const sourcePath = resolve(__dirname, '../public/indexCastTransform.mjs');
        const transformCode = readFileSync(sourcePath, 'utf-8');

        this.emitFile({
          type: 'asset',
          fileName: 'indexCastTransform.mjs', // Change extension here
          source: transformCode
        });
      }
    },

    async transform(code, id) {
      const hasUseWasmDirective = code.includes('"use wasm"') || code.includes("'use wasm'");
      const isWasmFile = id.endsWith('.jsw') || id.endsWith('.tsw') || id.endsWith('.ts');

      if (!hasUseWasmDirective || !isWasmFile) return null;

      // 1. Use TypeScript to resolve f64/i32/any types
      const strictCode = resolveImplicitTypes(code, id);
      
      // 2. Compile using the absolute path to the transform
      const { wasm, glue } = await compileAs(strictCode, transformPath);
      
      const finalCode = generateGlue(wasm, glue);
      
      return {
        code: finalCode,
        map: null
      };
    },
  };
}