const assert=require('assert'),T=require('./logic');
function image(w,h,fn){const d=new Uint8ClampedArray(w*h*4);for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=(y*w+x)*4,[r,g,b]=fn(x,y);d.set([r,g,b,255],i)}return d}
let d=image(4,4,()=>[90,120,150]);let r=T.analyze(d,4,4,1);assert.equal(r.continuity,100);assert.equal(r.grade,'良好');assert.equal(r.left_right_difference,0);assert.equal(r.top_bottom_difference,0);
d=image(4,4,(x,y)=>[x*80,y*80,0]);r=T.analyze(d,4,4,1);assert(r.left_right_difference>50);assert(r.top_bottom_difference>50);assert.equal(r.grade,'継ぎ目が目立つ可能性');assert.equal(r.worst_row.index,0);assert.equal(r.worst_column.index,0);
r=T.analyze(image(6,4,(x,y)=>[x===0||x===5?20:22,y===0||y===3?30:32,40]),6,4,2);assert.equal(r.band,2);assert(r.continuity>99);
const p=T.offsetPlan(5,7);assert.equal(p.length,4);assert.deepEqual(p[0],{sx:2,sy:3,sw:3,sh:4,dx:0,dy:0});assert.equal(p.reduce((n,q)=>n+q.sw*q.sh,0),35);
assert.throws(()=>T.analyze(new Uint8Array(3),2,2),/寸法/);assert.throws(()=>T.analyze(new Uint8Array(4),1,1),/2 × 2/);
console.log('Tile Seam Lab logic: 15 assertions passed');
