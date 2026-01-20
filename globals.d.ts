declare type i32 = number;
declare type i64 = bigint;
declare type f32 = number;
declare type f64 = number;
declare type u32 = number;
declare type u64 = bigint;

declare function unchecked<T>(expr: T): T;
declare function idof<T>(): i32;
declare function changetype<T>(val: any): T;
declare function i32(val: any): i32;
declare function f64(val: any): f64;

declare module "*.ts" {
  const exports: any;
  export default exports;
}