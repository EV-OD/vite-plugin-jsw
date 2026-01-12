// assembly.d.ts

export {}; // This line ensures the file is treated as a module

declare global {
  // Integer types
  type i8 = number;
  type i16 = number;
  type i32 = number;
  type i64 = bigint; // Note: i64 is usually bigint in JS
  type isize = number;
  type u8 = number;
  type u16 = number;
  type u32 = number;
  type u64 = bigint;
  type usize = number;

  // Float types
  type f32 = number;
  type f64 = number;

  // Type conversion functions (act like constructors)
  function i8(value: any): i8;
  function i16(value: any): i16;
  function i32(value: any): i32;
  function i64(value: any): i64;
  function isize(value: any): isize;
  function u8(value: any): u8;
  function u16(value: any): u16;
  function u32(value: any): u32;
  function u64(value: any): u64;
  function usize(value: any): usize;
  function f32(value: any): f32;
  function f64(value: any): f64;

  // Utility functions
  function idof<T>(): u32;
  function sizeof<T>(): usize;
  function unchecked<T>(expr: T): T;
  function changetype<T>(value: any): T;
  function assert<T>(isTrueish: T, message?: string): T;

  // This is vital for your .ts files
  module "*.ts" {
    const exports: any;
    export default exports;
  }
}