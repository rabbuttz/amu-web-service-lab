const assert=require('assert'),L=require('./logic.js');let n=0;function test(name,fn){fn();n++;console.log('✓ '+name)}
test('小さな移動をlow判定',()=>assert.equal(L.audit({distance:20,viewport:400,duration:400}).level,'low'));
test('大移動と回転をhigh判定',()=>assert.equal(L.audit({distance:300,viewport:400,duration:200,rotation:360,loops:9}).level,'high'));
test('縮減値は上限内',()=>{const r=L.audit({distance:500,scale:80,rotation:720,loops:20}).reduced;assert.deepEqual(r,{distance:8,duration:200,scale:2,rotation:3,loops:1})});
test('非必須動作はreducedで停止',()=>assert(L.css({distance:200,essential:false}).includes('animation: none')));
test('必須動作はreducedで状態を保持',()=>{const c=L.css({distance:200,essential:true});assert(c.includes('opacity: 1'));assert(!c.includes('animation: none'))});
test('速度をpx/sで算出',()=>assert.equal(L.audit({distance:300,duration:500,viewport:400}).velocity,600));
test('入力値を安全な範囲に制限',()=>{const v=L.normalize({distance:-1,duration:1,viewport:10,loops:0});assert.equal(v.distance,0);assert.equal(v.duration,50);assert.equal(v.viewport,240);assert.equal(v.loops,1)});
console.log(`${n} tests passed`);
