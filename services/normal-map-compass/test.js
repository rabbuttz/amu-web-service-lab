const assert=require('assert'),L=require('./logic.js');let n=0;function test(name,fn){fn();n++;console.log('✓ '+name)}
function pixels(items){return Uint8ClampedArray.from(items.flatMap(v=>[...v,255]))}
test('平面法線は良好',()=>{const r=L.analyze(pixels([[128,128,255],[128,128,255]]),2,1);assert.equal(r.grade,'良好');assert(r.flatRate===1)});
test('長さ異常を検出',()=>{const r=L.analyze(pixels([[255,255,255],[128,128,255]]),2,1);assert.equal(r.invalid,1)});
test('後ろ向き法線を検出',()=>{const r=L.analyze(pixels([[128,128,0]]),1,1);assert.equal(r.back,1)});
test('Green反転はGだけ変更',()=>{const x=pixels([[10,20,30]]),y=L.flipGreen(x);assert.deepEqual([...y],[10,235,30,255]);assert.deepEqual([...x],[10,20,30,255])});
test('Y反転で照明結果が変わる',()=>{const x=pixels([[128,255,128]]),a=L.shade(x,1,1,90,false),b=L.shade(x,1,1,90,true);assert(a[0]>b[0])});
test('レポートは出力方向を記録',()=>{const r={...L.analyze(pixels([[128,128,255]]),1,1),width:1,height:1};assert.equal(L.report(r,'x',true).green_channel,'flipped for export')});
test('透明画像を拒否',()=>assert.throws(()=>L.analyze(Uint8ClampedArray.from([0,0,0,0]),1,1)));
console.log(`${n} tests passed`);
