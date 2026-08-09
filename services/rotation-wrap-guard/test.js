const assert=require('assert');require('./logic.js');const G=global.RotationWrapGuard;
assert.equal(G.shortestDelta(350,10),20);assert.equal(G.shortestDelta(10,350),-20);assert.deepEqual(G.unwrap([350,10,25]),[350,370,385]);
const q0=G.quaternion(0,0,0),q1=G.quaternion(10,0,0);assert(Math.abs(G.angleBetween(q0,q1)-10)<1e-9);
const sample='time,yaw,pitch,roll\n0,350,0,0\n0.1,355,0,0\n0.2,2,0,0\n0.3,8,0,0\n0.4,120,0,0';const r=G.analyze(sample,{speedLimit:500,accelLimit:5000});assert.equal(r.rows.length,5);assert.equal(r.wraps.length,1);assert(r.peakSpeed>1000);assert(r.flagged.some(s=>s.flags.includes('角速度超過')));assert(G.correctedCsv(r).includes('0.2,362,0,0'));
assert.throws(()=>G.parse('0,0,0,0\n0,1,0,0\n1,2,0,0'));assert.throws(()=>G.parse('0,0,0,0\n1,1,0,0'));
console.log(`PASS: CSV parsing, shortest-angle unwrap, quaternion angle, wrap classification, speed spike, corrected CSV, and validation verified (${r.wraps.length} wrap / ${r.peakSpeed.toFixed(1)} deg/s peak)`);
