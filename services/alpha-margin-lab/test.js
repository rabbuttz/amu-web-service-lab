const assert=require('assert'),A=require('./logic');
const alpha=new Uint8Array(8*4);function fill(x0,y0,x1,y1){for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++)alpha[y*8+x]=255}
fill(1,1,2,2);fill(4,0,6,2);let r=A.analyze(alpha,8,4,2,1,1);
assert.equal(r.total,2);assert.equal(r.empty,0);assert.equal(r.edgeRisk,1);assert.equal(r.cells[0].padding.left,1);assert.equal(r.cells[0].padding.right,1);assert.deepEqual(r.cells[1].bounds,{x:0,y:0,width:3,height:3});assert.equal(r.ranges.left,1);assert.equal(r.cells[1].touchesEdge,true);
const empty=A.analyze(new Uint8Array(16),4,4,2,2);assert.equal(empty.empty,4);assert.equal(empty.edgeRisk,0);
assert.deepEqual([...A.alphaFromRgba(Uint8Array.from([1,2,3,4,5,6,7,8]))],[4,8]);
assert.throws(()=>A.analyze(alpha,8,4,3,1),/割り切れない/);assert.throws(()=>A.analyze(new Uint8Array(2),2,2,1,1),/長さ/);
console.log('Alpha Margin Lab logic: 13 assertions passed');
