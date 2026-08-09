const assert=require('assert');require('./logic.js');const G=global.TransformKeySieve;
const rows=G.parse('0,0,0,0\n0.5,0.5,0,0\n1,1,0,0');assert.equal(rows.length,3);assert.throws(()=>G.parse('0,0,0,0\n0,1,0,0\n1,2,0,0'));
const line=G.analyze({points:Array.from({length:11},(_,i)=>({t:i/10,x:i/10,y:0,z:0})),tolerance:.001});assert.equal(line.keyCount,2);assert(line.maxError<1e-9);assert.equal(G.csv(line.keys).split('\n').length,4);
const bend=G.analyze({points:[{t:0,x:0,y:0,z:0},{t:.5,x:.5,y:1,z:0},{t:1,x:1,y:0,z:0}],tolerance:.1});assert.equal(bend.keyCount,3);assert.equal(bend.removed,0);
const noisy=G.analyze({points:Array.from({length:21},(_,i)=>({t:i/20,x:i/20,y:Math.sin(i/20*Math.PI)*.02,z:0})),tolerance:.005});assert(noisy.keyCount<21);assert(noisy.maxError<=.005000001);
console.log(`PASS: parser, temporal interpolation, tolerance sieve, error bounds, and CSV export verified (${noisy.keyCount}/21 keys)`);
