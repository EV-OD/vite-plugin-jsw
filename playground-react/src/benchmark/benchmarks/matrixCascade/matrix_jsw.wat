(module
 (type $0 (func (param i32) (result i32)))
 (type $1 (func))
 (type $2 (func (param i32 i32 i32 i32)))
 (type $3 (func (param i32 i32) (result i32)))
 (type $4 (func (param i32 i32 f64)))
 (type $5 (func (param i32 i32) (result f64)))
 (type $6 (func (param i32 i32 i32 i32) (result i32)))
 (type $7 (func (param i32)))
 (import "env" "abort" (func $~lib/builtins/abort (param i32 i32 i32 i32)))
 (global $~lib/rt/stub/offset (mut i32) (i32.const 0))
 (global $~lib/rt/__rtti_base i32 (i32.const 1456))
 (memory $0 1)
 (data $0 (i32.const 1036) ",")
 (data $0.1 (i32.const 1048) "\02\00\00\00\10\00\00\00u\00s\00e\00 \00w\00a\00s\00m")
 (data $1 (i32.const 1084) ",")
 (data $1.1 (i32.const 1096) "\02\00\00\00\1c\00\00\00I\00n\00v\00a\00l\00i\00d\00 \00l\00e\00n\00g\00t\00h")
 (data $2 (i32.const 1132) "<")
 (data $2.1 (i32.const 1144) "\02\00\00\00&\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00b\00u\00f\00f\00e\00r\00.\00t\00s")
 (data $3 (i32.const 1196) "<")
 (data $3.1 (i32.const 1208) "\02\00\00\00(\00\00\00A\00l\00l\00o\00c\00a\00t\00i\00o\00n\00 \00t\00o\00o\00 \00l\00a\00r\00g\00e")
 (data $4 (i32.const 1260) "<")
 (data $4.1 (i32.const 1272) "\02\00\00\00\1e\00\00\00~\00l\00i\00b\00/\00r\00t\00/\00s\00t\00u\00b\00.\00t\00s")
 (data $5 (i32.const 1324) "<")
 (data $5.1 (i32.const 1336) "\02\00\00\00$\00\00\00I\00n\00d\00e\00x\00 \00o\00u\00t\00 \00o\00f\00 \00r\00a\00n\00g\00e")
 (data $6 (i32.const 1388) "<")
 (data $6.1 (i32.const 1400) "\02\00\00\00$\00\00\00~\00l\00i\00b\00/\00t\00y\00p\00e\00d\00a\00r\00r\00a\00y\00.\00t\00s")
 (data $7 (i32.const 1456) "\05\00\00\00 \00\00\00 \00\00\00 \00\00\00\00\00\00\00\01\1a")
 (export "matrixCascadeWasm" (func $module/matrixCascadeWasm))
 (export "__new" (func $~lib/rt/stub/__new))
 (export "__pin" (func $~lib/rt/stub/__pin))
 (export "__unpin" (func $~lib/rt/stub/__unpin))
 (export "__collect" (func $~lib/rt/stub/__collect))
 (export "__rtti_base" (global $~lib/rt/__rtti_base))
 (export "memory" (memory $0))
 (start $~start)
 (func $~lib/rt/stub/__new (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  local.get $0
  i32.const 1073741804
  i32.gt_u
  if
   i32.const 1216
   i32.const 1280
   i32.const 86
   i32.const 30
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.const 16
  i32.add
  local.tee $4
  i32.const 1073741820
  i32.gt_u
  if
   i32.const 1216
   i32.const 1280
   i32.const 33
   i32.const 29
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/rt/stub/offset
  global.get $~lib/rt/stub/offset
  i32.const 4
  i32.add
  local.tee $2
  local.get $4
  i32.const 19
  i32.add
  i32.const -16
  i32.and
  i32.const 4
  i32.sub
  local.tee $4
  i32.add
  local.tee $5
  memory.size
  local.tee $6
  i32.const 16
  i32.shl
  i32.const 15
  i32.add
  i32.const -16
  i32.and
  local.tee $7
  i32.gt_u
  if
   local.get $6
   local.get $5
   local.get $7
   i32.sub
   i32.const 65535
   i32.add
   i32.const -65536
   i32.and
   i32.const 16
   i32.shr_u
   local.tee $7
   local.get $6
   local.get $7
   i32.gt_s
   select
   memory.grow
   i32.const 0
   i32.lt_s
   if
    local.get $7
    memory.grow
    i32.const 0
    i32.lt_s
    if
     unreachable
    end
   end
  end
  local.get $5
  global.set $~lib/rt/stub/offset
  local.get $4
  i32.store
  local.get $2
  i32.const 4
  i32.sub
  local.tee $3
  i32.const 0
  i32.store offset=4
  local.get $3
  i32.const 0
  i32.store offset=8
  local.get $3
  local.get $1
  i32.store offset=12
  local.get $3
  local.get $0
  i32.store offset=16
  local.get $2
  i32.const 16
  i32.add
 )
 (func $~lib/typedarray/Float64Array#constructor (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  i32.const 12
  i32.const 4
  call $~lib/rt/stub/__new
  local.tee $1
  i32.eqz
  if
   i32.const 12
   i32.const 3
   call $~lib/rt/stub/__new
   local.set $1
  end
  local.get $1
  i32.const 0
  i32.store
  local.get $1
  i32.const 0
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=8
  local.get $0
  i32.const 134217727
  i32.gt_u
  if
   i32.const 1104
   i32.const 1152
   i32.const 19
   i32.const 57
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.const 3
  i32.shl
  local.tee $0
  i32.const 1
  call $~lib/rt/stub/__new
  local.tee $2
  i32.const 0
  local.get $0
  memory.fill
  local.get $1
  local.get $2
  i32.store
  local.get $1
  local.get $2
  i32.store offset=4
  local.get $1
  local.get $0
  i32.store offset=8
  local.get $1
 )
 (func $~lib/typedarray/Float64Array#__set (param $0 i32) (param $1 i32) (param $2 f64)
  local.get $1
  local.get $0
  i32.load offset=8
  i32.const 3
  i32.shr_u
  i32.ge_u
  if
   i32.const 1344
   i32.const 1408
   i32.const 1457
   i32.const 64
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.load offset=4
  local.get $1
  i32.const 3
  i32.shl
  i32.add
  local.get $2
  f64.store
 )
 (func $~lib/typedarray/Float64Array#__get (param $0 i32) (param $1 i32) (result f64)
  local.get $1
  local.get $0
  i32.load offset=8
  i32.const 3
  i32.shr_u
  i32.ge_u
  if
   i32.const 1344
   i32.const 1408
   i32.const 1446
   i32.const 64
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.load offset=4
  local.get $1
  i32.const 3
  i32.shl
  i32.add
  f64.load
 )
 (func $module/matrixCascadeWasm (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 f64)
  (local $5 f64)
  (local $6 f64)
  (local $7 f64)
  (local $8 f64)
  (local $9 i32)
  (local $10 i32)
  (local $11 f64)
  (local $12 f64)
  (local $13 i32)
  (local $14 i32)
  (local $15 f64)
  (local $16 f64)
  local.get $2
  local.get $3
  i32.mul
  local.tee $9
  call $~lib/typedarray/Float64Array#constructor
  local.set $10
  local.get $9
  call $~lib/typedarray/Float64Array#constructor
  local.set $13
  local.get $9
  call $~lib/typedarray/Float64Array#constructor
  local.set $14
  loop $for-loop|0
   local.get $6
   local.get $2
   f64.convert_i32_s
   f64.lt
   if
    local.get $6
    local.get $3
    f64.convert_i32_s
    f64.mul
    local.set $15
    f64.const 0
    local.set $4
    loop $for-loop|1
     local.get $4
     local.get $3
     f64.convert_i32_s
     f64.lt
     if
      f64.const 0
      local.set $7
      f64.const 0
      local.set $5
      loop $for-loop|2
       local.get $5
       local.get $3
       f64.convert_i32_s
       local.tee $16
       f64.lt
       if
        local.get $7
        local.get $0
        i32.load offset=4
        local.get $15
        local.get $5
        f64.add
        i32.trunc_sat_f64_s
        i32.const 3
        i32.shl
        i32.add
        f64.load
        local.get $1
        i32.load offset=4
        local.get $5
        local.get $16
        f64.mul
        local.get $4
        f64.add
        i32.trunc_sat_f64_s
        i32.const 3
        i32.shl
        i32.add
        f64.load
        f64.mul
        f64.add
        local.set $7
        local.get $5
        f64.const 1
        f64.add
        local.set $5
        br $for-loop|2
       end
      end
      local.get $10
      local.get $15
      local.get $4
      f64.add
      i32.trunc_sat_f64_s
      local.get $7
      call $~lib/typedarray/Float64Array#__set
      local.get $4
      f64.const 1
      f64.add
      local.set $4
      br $for-loop|1
     end
    end
    local.get $6
    f64.const 1
    f64.add
    local.set $6
    br $for-loop|0
   end
  end
  loop $for-loop|3
   local.get $8
   local.get $2
   f64.convert_i32_s
   f64.lt
   if
    local.get $8
    local.get $3
    f64.convert_i32_s
    f64.mul
    local.set $7
    f64.const 0
    local.set $4
    loop $for-loop|4
     local.get $4
     local.get $3
     f64.convert_i32_s
     f64.lt
     if
      f64.const 0
      local.set $6
      f64.const 0
      local.set $5
      loop $for-loop|5
       local.get $5
       local.get $3
       f64.convert_i32_s
       local.tee $15
       f64.lt
       if
        local.get $6
        local.get $10
        i32.load offset=4
        local.get $7
        local.get $5
        f64.add
        i32.trunc_sat_f64_s
        i32.const 3
        i32.shl
        i32.add
        f64.load
        local.get $0
        i32.load offset=4
        local.get $5
        local.get $15
        f64.mul
        local.get $4
        f64.add
        i32.trunc_sat_f64_s
        i32.const 3
        i32.shl
        i32.add
        f64.load
        f64.mul
        f64.add
        local.set $6
        local.get $5
        f64.const 1
        f64.add
        local.set $5
        br $for-loop|5
       end
      end
      local.get $13
      local.get $7
      local.get $4
      f64.add
      i32.trunc_sat_f64_s
      local.get $6
      call $~lib/typedarray/Float64Array#__set
      local.get $4
      f64.const 1
      f64.add
      local.set $4
      br $for-loop|4
     end
    end
    local.get $8
    f64.const 1
    f64.add
    local.set $8
    br $for-loop|3
   end
  end
  loop $for-loop|6
   local.get $11
   local.get $2
   f64.convert_i32_s
   f64.lt
   if
    local.get $11
    local.get $3
    f64.convert_i32_s
    f64.mul
    local.set $7
    f64.const 0
    local.set $4
    loop $for-loop|7
     local.get $4
     local.get $3
     f64.convert_i32_s
     f64.lt
     if
      f64.const 0
      local.set $6
      f64.const 0
      local.set $5
      loop $for-loop|8
       local.get $5
       local.get $3
       f64.convert_i32_s
       local.tee $8
       f64.lt
       if
        local.get $6
        local.get $1
        i32.load offset=4
        local.get $7
        local.get $5
        f64.add
        i32.trunc_sat_f64_s
        i32.const 3
        i32.shl
        i32.add
        f64.load
        local.get $10
        i32.load offset=4
        local.get $5
        local.get $8
        f64.mul
        local.get $4
        f64.add
        i32.trunc_sat_f64_s
        i32.const 3
        i32.shl
        i32.add
        f64.load
        f64.mul
        f64.add
        local.set $6
        local.get $5
        f64.const 1
        f64.add
        local.set $5
        br $for-loop|8
       end
      end
      local.get $14
      local.get $7
      local.get $4
      f64.add
      i32.trunc_sat_f64_s
      local.get $6
      call $~lib/typedarray/Float64Array#__set
      local.get $4
      f64.const 1
      f64.add
      local.set $4
      br $for-loop|7
     end
    end
    local.get $11
    f64.const 1
    f64.add
    local.set $11
    br $for-loop|6
   end
  end
  local.get $9
  call $~lib/typedarray/Float64Array#constructor
  local.set $0
  loop $for-loop|9
   local.get $12
   local.get $9
   f64.convert_i32_s
   f64.lt
   if
    local.get $0
    local.get $12
    i32.trunc_sat_f64_s
    local.tee $1
    local.get $13
    local.get $1
    call $~lib/typedarray/Float64Array#__get
    local.get $14
    local.get $1
    call $~lib/typedarray/Float64Array#__get
    f64.add
    call $~lib/typedarray/Float64Array#__set
    local.get $12
    f64.const 1
    f64.add
    local.set $12
    br $for-loop|9
   end
  end
  local.get $0
 )
 (func $~lib/rt/stub/__pin (param $0 i32) (result i32)
  local.get $0
 )
 (func $~lib/rt/stub/__unpin (param $0 i32)
 )
 (func $~lib/rt/stub/__collect
 )
 (func $~start
  i32.const 1484
  global.set $~lib/rt/stub/offset
 )
)
