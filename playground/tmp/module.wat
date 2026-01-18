(module
 (type $0 (func (param f64) (result f64)))
 (memory $0 1)
 (data $0 (i32.const 1036) ",")
 (data $0.1 (i32.const 1048) "\02\00\00\00\10\00\00\00u\00s\00e\00 \00w\00a\00s\00m")
 (export "fibWasm" (func $module/fibWasm))
 (export "memory" (memory $0))
 (func $module/fibWasm (param $0 f64) (result f64)
  local.get $0
  f64.const 2
  f64.lt
  if
   local.get $0
   return
  end
  local.get $0
  f64.const -1
  f64.add
  call $module/fibWasm
  local.get $0
  f64.const -2
  f64.add
  call $module/fibWasm
  f64.add
 )
)
