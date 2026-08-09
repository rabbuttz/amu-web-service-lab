const assert=require('assert'),G=require('./logic.js');
const rows=G.parseRows('Idle,0,0\nRight,1,0\nUp,0,1\nLeft,-1,0\nDown,0,-1');
assert.equal(rows.length,5);const r=G.analyze(rows,{centerRadius:.08,oppositeTolerance:10});assert.equal(r.summary.centerCount,1);assert.equal(r.summary.directionalCount,4);assert(Math.abs(r.summary.largestGap-90)<1e-9);assert.equal(r.summary.oppositeRate,100);assert.equal(r.missingSectors.length,4);assert.equal(r.duplicates.length,0);assert.equal(r.directional.every(x=>x.hasOpposite),true);
const gap=G.analyze(G.parseRows('Idle,0,0\nRight,1,0\nUp,0,1\nLeft,-1,0'));assert.equal(gap.summary.largestGap,180);assert(gap.warnings.some(x=>x.includes('最大空白')));assert(gap.summary.oppositeRate<100);
const dup=G.analyze(G.parseRows('A,0,0\nB,0,0\nC,1,0'));assert.equal(dup.duplicates.length,1);assert(dup.warnings.some(x=>x.includes('同一座標')));
assert.equal(G.angleDiff(350,10),20);assert.throws(()=>G.parseRows('bad,1'),/3列/);assert.throws(()=>G.parseRows('bad,x,0'),/XとY/);assert.throws(()=>G.analyze(rows,{oppositeTolerance:100}),/許容角/);
const out=G.exportData(r);assert.equal(out.model,'2D blend-space directional coverage audit');assert.equal(out.samples.length,5);
console.log('PASS: parse, center split, angular gaps, wraparound, opposite pairs, sectors, duplicate coordinates, validation, export');
