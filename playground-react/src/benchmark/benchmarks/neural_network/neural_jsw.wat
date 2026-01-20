(module
 (type $0 (func))
 (type $1 (func (param i32 i32 i32 i32)))
 (type $2 (func (param i32 i32) (result i32)))
 (type $3 (func (param i32 i32 f64)))
 (type $4 (func (param i32 i32) (result f64)))
 (type $5 (func (param i32 i32 i32 f64 i32) (result i32)))
 (type $6 (func (param i32) (result i32)))
 (type $7 (func (param i32)))
 (import "env" "abort" (func $~lib/builtins/abort (param i32 i32 i32 i32)))
 (global $~lib/rt/stub/offset (mut i32) (i32.const 0))
 (global $~lib/rt/__rtti_base i32 (i32.const 3504))
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
 (data $7 (i32.const 1470) "\f0?n\bf\88\1aO;\9b<53\fb\a9=\f6\ef?]\dc\d8\9c\13`q\bca\80w>\9a\ec\ef?\d1f\87\10z^\90\bc\85\7fn\e8\15\e3\ef?\13\f6g5R\d2\8c<t\85\15\d3\b0\d9\ef?\fa\8e\f9#\80\ce\8b\bc\de\f6\dd)k\d0\ef?a\c8\e6aN\f7`<\c8\9bu\18E\c7\ef?\99\d33[\e4\a3\90<\83\f3\c6\ca>\be\ef?m{\83]\a6\9a\97<\0f\89\f9lX\b5\ef?\fc\ef\fd\92\1a\b5\8e<\f7Gr+\92\ac\ef?\d1\9c/p=\be><\a2\d1\d32\ec\a3\ef?\0bn\90\894\03j\bc\1b\d3\fe\aff\9b\ef?\0e\bd/*RV\95\bcQ[\12\d0\01\93\ef?U\eaN\8c\ef\80P\bc\cc1l\c0\bd\8a\ef?\16\f4\d5\b9#\c9\91\bc\e0-\a9\ae\9a\82\ef?\afU\\\e9\e3\d3\80<Q\8e\a5\c8\98z\ef?H\93\a5\ea\15\1b\80\bc{Q}<\b8r\ef?=2\deU\f0\1f\8f\bc\ea\8d\8c8\f9j\ef?\bfS\13?\8c\89\8b<u\cbo\eb[c\ef?&\eb\11v\9c\d9\96\bc\d4\\\04\84\e0[\ef?`/:>\f7\ec\9a<\aa\b9h1\87T\ef?\9d8\86\cb\82\e7\8f\bc\1d\d9\fc\"PM\ef?\8d\c3\a6DAo\8a<\d6\8cb\88;F\ef?}\04\e4\b0\05z\80<\96\dc}\91I?\ef?\94\a8\a8\e3\fd\8e\96<8bunz8\ef?}Ht\f2\18^\87<?\a6\b2O\ce1\ef?\f2\e7\1f\98+G\80<\dd|\e2eE+\ef?^\08q?{\b8\96\bc\81c\f5\e1\df$\ef?1\ab\tm\e1\f7\82<\e1\de\1f\f5\9d\1e\ef?\fa\bfo\1a\9b!=\bc\90\d9\da\d0\7f\18\ef?\b4\n\0cr\827\8b<\0b\03\e4\a6\85\12\ef?\8f\cb\ce\89\92\14n<V/>\a9\af\0c\ef?\b6\ab\b0MuM\83<\15\b71\n\fe\06\ef?Lt\ac\e2\01B\86<1\d8L\fcp\01\ef?J\f8\d3]9\dd\8f<\ff\16d\b2\08\fc\ee?\04[\8e;\80\a3\86\bc\f1\9f\92_\c5\f6\ee?hPK\cc\edJ\92\bc\cb\a9:7\a7\f1\ee?\8e-Q\1b\f8\07\99\bcf\d8\05m\ae\ec\ee?\d26\94>\e8\d1q\bc\f7\9f\e54\db\e7\ee?\15\1b\ce\b3\19\19\99\bc\e5\a8\13\c3-\e3\ee?mL*\a7H\9f\85<\"4\12L\a6\de\ee?\8ai(z`\12\93\bc\1c\80\ac\04E\da\ee?[\89\17H\8f\a7X\bc*.\f7!\n\d6\ee?\1b\9aIg\9b,|\bc\97\a8P\d9\f5\d1\ee?\11\ac\c2`\edcC<-\89a`\08\ce\ee?\efd\06;\tf\96<W\00\1d\edA\ca\ee?y\03\a1\da\e1\ccn<\d0<\c1\b5\a2\c6\ee?0\12\0f?\8e\ff\93<\de\d3\d7\f0*\c3\ee?\b0\afz\bb\ce\90v<\'*6\d5\da\bf\ee?w\e0T\eb\bd\1d\93<\r\dd\fd\99\b2\bc\ee?\8e\a3q\004\94\8f\bc\a7,\9dv\b2\b9\ee?I\a3\93\dc\cc\de\87\bcBf\cf\a2\da\b6\ee?_8\0f\bd\c6\dex\bc\82O\9dV+\b4\ee?\f6\\{\ecF\12\86\bc\0f\92]\ca\a4\b1\ee?\8e\d7\fd\18\055\93<\da\'\b56G\af\ee?\05\9b\8a/\b7\98{<\fd\c7\97\d4\12\ad\ee?\tT\1c\e2\e1c\90<)TH\dd\07\ab\ee?\ea\c6\19P\85\c74<\b7FY\8a&\a9\ee?5\c0d+\e62\94<H!\ad\15o\a7\ee?\9fv\99aJ\e4\8c\bc\t\dcv\b9\e1\a5\ee?\a8M\ef;\c53\8c\bc\85U:\b0~\a4\ee?\ae\e9+\89xS\84\bc \c3\cc4F\a3\ee?XXVx\dd\ce\93\bc%\"U\828\a2\ee?d\19~\80\aa\10W<s\a9L\d4U\a1\ee?(\"^\bf\ef\b3\93\bc\cd;\7ff\9e\a0\ee?\82\b94\87\ad\12j\bc\bf\da\0bu\12\a0\ee?\ee\a9m\b8\efgc\bc/\1ae<\b2\9f\ee?Q\88\e0T=\dc\80\bc\84\94Q\f9}\9f\ee?\cf>Z~d\1fx\bct_\ec\e8u\9f\ee?\b0}\8b\c0J\ee\86\bct\81\a5H\9a\9f\ee?\8a\e6U\1e2\19\86\bc\c9gBV\eb\9f\ee?\d3\d4\t^\cb\9c\90<?]\deOi\a0\ee?\1d\a5M\b9\dc2{\bc\87\01\ebs\14\a1\ee?k\c0gT\fd\ec\94<2\c10\01\ed\a1\ee?Ul\d6\ab\e1\ebe<bN\cf6\f3\a2\ee?B\cf\b3/\c5\a1\88\bc\12\1a>T\'\a4\ee?47;\f1\b6i\93\bc\13\ceL\99\89\a5\ee?\1e\ff\19:\84^\80\bc\ad\c7#F\1a\a7\ee?nWr\d8P\d4\94\bc\ed\92D\9b\d9\a8\ee?\00\8a\0e[g\ad\90<\99f\8a\d9\c7\aa\ee?\b4\ea\f0\c1/\b7\8d<\db\a0*B\e5\ac\ee?\ff\e7\c5\9c`\b6e\bc\8cD\b5\162\af\ee?D_\f3Y\83\f6{<6w\15\99\ae\b1\ee?\83=\1e\a7\1f\t\93\bc\c6\ff\91\0b[\b4\ee?)\1el\8b\b8\a9]\bc\e5\c5\cd\b07\b7\ee?Y\b9\90|\f9#l\bc\0fR\c8\cbD\ba\ee?\aa\f9\f4\"CC\92\bcPN\de\9f\82\bd\ee?K\8ef\d7l\ca\85\bc\ba\07\cap\f1\c0\ee?\'\ce\91+\fc\afq<\90\f0\a3\82\91\c4\ee?\bbs\n\e15\d2m<##\e3\19c\c8\ee?c\"b\"\04\c5\87\bce\e5]{f\cc\ee?\d51\e2\e3\86\1c\8b<3-J\ec\9b\d0\ee?\15\bb\bc\d3\d1\bb\91\bc]%>\b2\03\d5\ee?\d21\ee\9c1\cc\90<X\b30\13\9e\d9\ee?\b3Zsn\84i\84<\bf\fdyUk\de\ee?\b4\9d\8e\97\cd\df\82\bcz\f3\d3\bfk\e3\ee?\873\cb\92w\1a\8c<\ad\d3Z\99\9f\e8\ee?\fa\d9\d1J\8f{\90\bcf\b6\8d)\07\ee\ee?\ba\ae\dcV\d9\c3U\bc\fb\15O\b8\a2\f3\ee?@\f6\a6=\0e\a4\90\bc:Y\e5\8dr\f9\ee?4\93\ad8\f4\d6h\bcG^\fb\f2v\ff\ee?5\8aXk\e2\ee\91\bcJ\06\a10\b0\05\ef?\cd\dd_\n\d7\fft<\d2\c1K\90\1e\0c\ef?\ac\98\92\fa\fb\bd\91\bc\t\1e\d7[\c2\12\ef?\b3\0c\af0\aens<\9cR\85\dd\9b\19\ef?\94\fd\9f\\2\e3\8e<z\d0\ff_\ab \ef?\acY\t\d1\8f\e0\84<K\d1W.\f1\'\ef?g\1aN8\af\cdc<\b5\e7\06\94m/\ef?h\19\92l,kg<i\90\ef\dc 7\ef?\d2\b5\cc\83\18\8a\80\bc\fa\c3]U\0b?\ef?o\fa\ff?]\ad\8f\bc|\89\07J-G\ef?I\a9u8\ae\r\90\bc\f2\89\r\08\87O\ef?\a7\07=\a6\85\a3t<\87\a4\fb\dc\18X\ef?\0f\"@ \9e\91\82\bc\98\83\c9\16\e3`\ef?\ac\92\c1\d5PZ\8e<\852\db\03\e6i\ef?Kk\01\acY:\84<`\b4\01\f3!s\ef?\1f>\b4\07!\d5\82\bc_\9b{3\97|\ef?\c9\rG;\b9*\89\bc)\a1\f5\14F\86\ef?\d3\88:`\04\b6t<\f6?\8b\e7.\90\ef?qr\9dQ\ec\c5\83<\83L\c7\fbQ\9a\ef?\f0\91\d3\8f\12\f7\8f\bc\da\90\a4\a2\af\a4\ef?}t#\e2\98\ae\8d\bc\f1g\8e-H\af\ef?\08 \aaA\bc\c3\8e<\'Za\ee\1b\ba\ef?2\eb\a9\c3\94+\84<\97\bak7+\c5\ef?\ee\85\d11\a9d\8a<@En[v\d0\ef?\ed\e3;\e4\ba7\8e\bc\14\be\9c\ad\fd\db\ef?\9d\cd\91M;\89w<\d8\90\9e\81\c1\e7\ef?\89\cc`A\c1\05S<\f1q\8f+\c2\f3\ef?")
 (data $8 (i32.const 3504) "\05\00\00\00 \00\00\00 \00\00\00 \00\00\00\00\00\00\00\01\1a")
 (export "train" (func $module/train))
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
 (func $module/train (param $0 i32) (param $1 i32) (param $2 i32) (param $3 f64) (param $4 i32) (result i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 f64)
  (local $8 f64)
  (local $9 i64)
  (local $10 f64)
  (local $11 f64)
  (local $12 f64)
  (local $13 f64)
  (local $14 i32)
  (local $15 i32)
  (local $16 i64)
  (local $17 f64)
  (local $18 f64)
  i32.const 12
  i32.const 4
  call $~lib/rt/stub/__new
  local.tee $5
  i32.eqz
  if
   i32.const 12
   i32.const 3
   call $~lib/rt/stub/__new
   local.set $5
  end
  local.get $5
  i32.const 0
  i32.store
  local.get $5
  i32.const 0
  i32.store offset=4
  local.get $5
  i32.const 0
  i32.store offset=8
  local.get $2
  i32.const 1
  i32.add
  local.tee $6
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
  local.get $6
  i32.const 3
  i32.shl
  local.tee $6
  i32.const 1
  call $~lib/rt/stub/__new
  local.tee $14
  i32.const 0
  local.get $6
  memory.fill
  local.get $5
  local.get $14
  i32.store
  local.get $5
  local.get $14
  i32.store offset=4
  local.get $5
  local.get $6
  i32.store offset=8
  loop $for-loop|0
   local.get $8
   local.get $2
   f64.convert_i32_s
   f64.lt
   if
    local.get $5
    local.get $8
    i32.trunc_sat_f64_s
    f64.const 0.1
    call $~lib/typedarray/Float64Array#__set
    local.get $8
    f64.const 1
    f64.add
    local.set $8
    br $for-loop|0
   end
  end
  local.get $5
  local.get $2
  f64.const 0
  call $~lib/typedarray/Float64Array#__set
  local.get $1
  i32.load offset=8
  i32.const 3
  i32.shr_u
  local.set $14
  loop $for-loop|1
   local.get $11
   local.get $4
   f64.convert_i32_s
   f64.lt
   if
    f64.const 0
    local.set $10
    loop $for-loop|2
     local.get $10
     local.get $14
     f64.convert_i32_s
     f64.lt
     if
      local.get $10
      local.get $2
      f64.convert_i32_s
      f64.mul
      local.set $12
      local.get $5
      local.get $2
      call $~lib/typedarray/Float64Array#__get
      local.set $8
      f64.const 0
      local.set $7
      loop $for-loop|3
       local.get $7
       local.get $2
       f64.convert_i32_s
       f64.lt
       if
        local.get $8
        local.get $0
        i32.load offset=4
        local.get $12
        local.get $7
        f64.add
        i32.trunc_sat_f64_s
        i32.const 3
        i32.shl
        i32.add
        f64.load
        local.get $5
        i32.load offset=4
        local.get $7
        i32.trunc_sat_f64_s
        i32.const 3
        i32.shl
        i32.add
        f64.load
        f64.mul
        f64.add
        local.set $8
        local.get $7
        f64.const 1
        f64.add
        local.set $7
        br $for-loop|3
       end
      end
      local.get $1
      i32.load offset=4
      local.get $10
      i32.trunc_sat_f64_s
      i32.const 3
      i32.shl
      i32.add
      f64.load
      f64.const 1
      block $~lib/util/math/exp_lut|inlined.0 (result f64)
       local.get $8
       f64.neg
       local.tee $7
       i64.reinterpret_f64
       local.tee $9
       i64.const 52
       i64.shr_u
       i32.wrap_i64
       i32.const 2047
       i32.and
       local.tee $6
       i32.const 969
       i32.sub
       local.tee $15
       i32.const 63
       i32.ge_u
       if
        f64.const 1
        local.get $15
        i32.const -2147483648
        i32.ge_u
        br_if $~lib/util/math/exp_lut|inlined.0
        drop
        local.get $6
        i32.const 1033
        i32.ge_u
        if
         f64.const 0
         local.get $9
         i64.const -4503599627370496
         i64.eq
         br_if $~lib/util/math/exp_lut|inlined.0
         drop
         local.get $7
         f64.const 1
         f64.add
         local.get $6
         i32.const 2047
         i32.ge_u
         br_if $~lib/util/math/exp_lut|inlined.0
         drop
         f64.const 0
         f64.const inf
         local.get $9
         i64.const 0
         i64.lt_s
         select
         br $~lib/util/math/exp_lut|inlined.0
        end
        i32.const 0
        local.set $6
       end
       local.get $7
       f64.const 184.6649652337873
       f64.mul
       f64.const 6755399441055744
       f64.add
       local.tee $8
       i64.reinterpret_f64
       local.tee $16
       i64.const 127
       i64.and
       i64.const 1
       i64.shl
       i32.wrap_i64
       i32.const 3
       i32.shl
       i32.const 1456
       i32.add
       local.tee $15
       i64.load offset=8
       local.get $16
       i64.const 45
       i64.shl
       i64.add
       local.set $9
       local.get $7
       local.get $8
       f64.const -6755399441055744
       f64.add
       local.tee $7
       f64.const -0.005415212348111709
       f64.mul
       f64.add
       local.get $7
       f64.const -1.2864023111638346e-14
       f64.mul
       f64.add
       local.tee $7
       local.get $7
       f64.mul
       local.set $8
       local.get $15
       f64.load
       local.get $7
       f64.add
       local.get $8
       local.get $7
       f64.const 0.16666666666665886
       f64.mul
       f64.const 0.49999999999996786
       f64.add
       f64.mul
       f64.add
       local.get $8
       local.get $8
       f64.mul
       local.get $7
       f64.const 0.008333335853059549
       f64.mul
       f64.const 0.0416666808410674
       f64.add
       f64.mul
       f64.add
       local.set $7
       local.get $6
       i32.eqz
       if
        block $~lib/util/math/specialcase|inlined.0 (result f64)
         local.get $16
         i64.const 2147483648
         i64.and
         i64.eqz
         if
          local.get $9
          i64.const 4544132024016830464
          i64.sub
          f64.reinterpret_i64
          local.tee $8
          local.get $8
          local.get $7
          f64.mul
          f64.add
          f64.const 5486124068793688683255936e279
          f64.mul
          br $~lib/util/math/specialcase|inlined.0
         end
         local.get $9
         i64.const 4602678819172646912
         i64.add
         local.tee $9
         f64.reinterpret_i64
         local.tee $13
         local.get $7
         f64.mul
         local.set $17
         local.get $13
         local.get $17
         f64.add
         local.tee $18
         f64.abs
         f64.const 1
         f64.lt
         if (result f64)
          f64.const 1
          local.get $18
          f64.copysign
          local.tee $7
          local.get $18
          f64.add
          local.tee $8
          local.get $7
          local.get $8
          f64.sub
          local.get $18
          f64.add
          local.get $13
          local.get $18
          f64.sub
          local.get $17
          f64.add
          f64.add
          f64.add
          local.get $7
          f64.sub
          local.tee $7
          f64.const 0
          f64.eq
          if (result f64)
           local.get $9
           i64.const -9223372036854775808
           i64.and
           f64.reinterpret_i64
          else
           local.get $7
          end
         else
          local.get $18
         end
         f64.const 2.2250738585072014e-308
         f64.mul
        end
        br $~lib/util/math/exp_lut|inlined.0
       end
       local.get $9
       f64.reinterpret_i64
       local.tee $8
       local.get $8
       local.get $7
       f64.mul
       f64.add
      end
      f64.const 1
      f64.add
      f64.div
      f64.sub
      local.set $8
      f64.const 0
      local.set $7
      loop $for-loop|4
       local.get $7
       local.get $2
       f64.convert_i32_s
       f64.lt
       if
        local.get $5
        i32.load offset=4
        local.get $7
        i32.trunc_sat_f64_s
        i32.const 3
        i32.shl
        i32.add
        local.tee $6
        local.get $6
        f64.load
        local.get $3
        local.get $8
        f64.mul
        local.get $0
        i32.load offset=4
        local.get $12
        local.get $7
        f64.add
        i32.trunc_sat_f64_s
        i32.const 3
        i32.shl
        i32.add
        f64.load
        f64.mul
        f64.add
        f64.store
        local.get $7
        f64.const 1
        f64.add
        local.set $7
        br $for-loop|4
       end
      end
      local.get $5
      local.get $2
      local.get $5
      local.get $2
      call $~lib/typedarray/Float64Array#__get
      local.get $3
      local.get $8
      f64.mul
      f64.add
      call $~lib/typedarray/Float64Array#__set
      local.get $10
      f64.const 1
      f64.add
      local.set $10
      br $for-loop|2
     end
    end
    local.get $11
    f64.const 1
    f64.add
    local.set $11
    br $for-loop|1
   end
  end
  local.get $5
 )
 (func $~lib/rt/stub/__pin (param $0 i32) (result i32)
  local.get $0
 )
 (func $~lib/rt/stub/__unpin (param $0 i32)
 )
 (func $~lib/rt/stub/__collect
 )
 (func $~start
  i32.const 3532
  global.set $~lib/rt/stub/offset
 )
)
