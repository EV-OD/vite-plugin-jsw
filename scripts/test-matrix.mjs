import fs from 'fs/promises';
import vm from 'vm';

async function main(){
  const wasm = await fs.readFile(new URL('../build/math.wasm', import.meta.url));
  const loaderSrc = await fs.readFile(new URL('../src/loader.ts', import.meta.url), 'utf8');

  // Wrap loader source so it returns the `loader` variable it defines
  const wrapped = `(function(){\n${loaderSrc}\n return (typeof loader !== 'undefined') ? loader : (typeof module !== 'undefined' && module.exports) ? module.exports : null;\n})()`;

  const loader = vm.runInThisContext(wrapped);
  if (!loader || typeof loader.instantiate !== 'function'){
    console.error('failed to obtain loader from src/loader.ts');
    process.exit(2);
  }

  const {exports} = await loader.instantiate(wasm);
  console.log('exports keys:', Object.keys(exports));

  const a = new Float64Array([1,2,3,4]);
  const b = new Float64Array([5,6,7,8]);
  const n = 2;

  try {
    const aPtr = exports.__newArray(exports.FLOAT64_ID, a);
    const bPtr = exports.__newArray(exports.FLOAT64_ID, b);
    console.log('aPtr, bPtr', aPtr, bPtr);
    const resPtr = exports.multiplyMatrices(aPtr, bPtr, n);
    console.log('raw result pointer:', resPtr);

    if (typeof exports.__getArrayView === 'function'){
      const view = exports.__getArrayView(resPtr);
      console.log('view:', view);
      console.log('as array:', Array.from(view));
    } else if (typeof exports.__getArray === 'function'){
      console.log('getArray:', exports.__getArray(resPtr));
    } else {
      console.log('no array getters available');
    }
  } catch (e) {
    console.error('wasm call threw', e);
    process.exitCode = 1;
  }
}

main().catch(err=>{console.error(err); process.exit(1)});
