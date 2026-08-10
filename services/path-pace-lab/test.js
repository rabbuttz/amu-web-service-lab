const assert=require('assert'),P=require('./logic.js');
const straight=[{x:0,y:0},{x:33.333333,y:0},{x:66.666667,y:0},{x:100,y:0}],s=P.analyze(straight,10);
assert(Math.abs(s.total-100)<1e-5);assert(Math.abs(s.paced.at(-1).x-100)<1e-8);assert(s.pacedStats.cv<1e-6);
const curve=[{x:0,y:0},{x:20,y:120},{x:180,y:-40},{x:200,y:100}],r=P.analyze(curve,16);
assert(r.total>200);assert(r.parameterStats.cv>.1);assert(r.pacedStats.cv<.01);assert(r.pacedStats.cv<r.parameterStats.cv/10);
const lines=P.csv(r).trim().split('\n');assert.equal(lines.length,18);assert(lines[0].includes('distance'));
assert.throws(()=>P.analyze(curve,2),/4〜100/);
console.log(`PASS length=${r.total.toFixed(3)} parameterCV=${(r.parameterStats.cv*100).toFixed(2)}% pacedCV=${(r.pacedStats.cv*100).toFixed(2)}% rows=${lines.length-1}`);
