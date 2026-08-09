const assert=require('assert'),G=require('./logic.js');
const keys=G.parse('time,value,inTangent,outTangent\n0,0,0,6\n1,1,-6,0\n2,2,1,0');
assert.strictEqual(keys.length,3);assert(Math.abs(G.evaluate(keys[0],keys[1],.5)-2)<1e-9);
const report=G.analyze(keys);assert.strictEqual(report.problemSegments,1);assert(report.maxOvershoot>.9);
const fixed=G.clampMonotone(keys),after=G.analyze(fixed);assert.strictEqual(after.problemSegments,0);assert(after.maxOvershoot<1e-9);
const sample=G.samples(fixed,10);assert.strictEqual(sample.length,21);assert(G.csv(fixed).startsWith('time,value,inTangent,outTangent'));
assert.throws(()=>G.parse('time,value\n0,0'),/2個以上/);assert.throws(()=>G.parse('time,value\n0,0\n0,1'),/重複/);
console.log('PASS: CSV parse, Hermite evaluation, exact extrema, overshoot detection, monotone tangent clamp, export');
