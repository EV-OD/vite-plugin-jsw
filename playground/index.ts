// @ts-ignore - since it's a virtual WASM module
import {add, greet, multiplyMatrices, multiplyMatrices2D} from './math.tsw';
// Force the compiler to include Array RTTI (Runtime Type Information)
// This makes __newArray and __getArray available to the Proxy

console.log("--- JSW Plugin Test ---");
const sum = add(10, 5);
const greeting = greet("Rabin");
const n = 2;
const a = new Float64Array([1, 2, 3, 4]);
const b = new Float64Array([5, 6, 7, 8]);

const matrixA = [
  new Float64Array([1, 2]),
  new Float64Array([3, 4])
];

const matrixB = [
  new Float64Array([5, 6]),
  new Float64Array([7, 8])
];

const result = multiplyMatrices(a, b, n);
console.log("Success! Matrix result:", result);

const result1 = multiplyMatrices2D(matrixA, matrixB);
console.table(result.map(row => Array.from(row)));

console.log(`Sum: ${sum}`);
console.log(`Greeting: ${greeting}`);
// console.log(`Matrix multiplication result: ${result}`);

document.body.innerHTML += `
  <div style="font-family: sans-serif; margin-top: 20px;">
    <strong>Result from WASM:</strong><br>
    10 + 5 = ${sum}<br>
    Greeting length: ${greeting}<br>
  </div>
`;