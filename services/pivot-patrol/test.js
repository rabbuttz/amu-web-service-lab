const assert=require('assert'),P=require('./logic');
let rows=P.parse('name,width,height,pivotX,pivotY\nidle_1,64,64,32,8\nidle_2,80,64,40,8\nidle_3,64,80,31,10');
assert.equal(rows.length,3);assert.equal(rows[0].nx,.5);let r=P.audit(rows,1);assert.equal(r.target.x,.5);assert.equal(r.target.y,.125);assert.equal(r.flagged,0);assert.equal(r.items[2].suggestedPivotX,32);
rows=P.parse('a\t100\t100\t50\t10\nb\t100\t100\t60\t10\nc\t100\t100\t50\t10');r=P.audit(rows,2);assert.equal(r.flagged,1);assert.equal(r.maxDrift,10);assert.equal(r.items[1].suggestedPivotX,50);assert.equal(P.median([4,1,3,2]),2.5);
assert.throws(()=>P.parse('a,1,1,0,0'),/2枚/);assert.throws(()=>P.parse('a,10,10,20,0\nb,10,10,1,1'),/画像外/);assert.throws(()=>P.parse('a,0,10,0,0\nb,10,10,1,1'),/不正/);
console.log('Pivot Patrol logic: 15 assertions passed');
