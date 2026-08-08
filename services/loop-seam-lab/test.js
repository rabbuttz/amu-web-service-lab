const assert=require('assert'),L=require('./logic.js');let n=0;function test(name,fn){fn();n++;console.log('✓ '+name)}
const sr=1000,sine=Float32Array.from({length:2002},(_,i)=>Math.sin(2*Math.PI*i/100));
test('周期境界は低スコア',()=>assert(L.metrics(sine,100,1101).score<4));
test('不連続境界を検出',()=>{const x=Float32Array.from({length:100},(_,i)=>i<50?-.8:.8);assert(L.metrics(x,10,70).score>20)});
test('候補探索が改善',()=>{const initial=L.metrics(sine,113,1088);const best=L.findBest(sine,113,1088,30);assert(best.score<=initial.score)});
test('範囲を保つ',()=>{const b=L.findBest(sine,100,1101,20);assert(b.start>=80&&b.start<=120&&b.end>=1081&&b.end<=1121)});
test('クロスフェード長',()=>assert.equal(L.crossfade(sine,100,1100,20).length,1000));
test('クロスフェード末尾が先頭へ近づく',()=>{const raw=L.crossfade(sine,113,1088,0),fixed=L.crossfade(sine,113,1088,30);assert(Math.abs(fixed.at(-1)-fixed[0])<Math.abs(raw.at(-1)-raw[0]))});
test('WAVヘッダ',()=>{const w=new DataView(L.encodeWav(sine,44100));assert.equal(w.getUint32(0),0x52494646);assert.equal(w.byteLength,44+sine.length*2)});
test('不正範囲を拒否',()=>assert.throws(()=>L.metrics(sine,1,2)));
console.log(`${n} tests passed`);
