const assert=require('assert'),G=require('./logic.js');
let f=G.fitSize(1000,500,400,300);assert.deepStrictEqual({width:f.width,height:f.height},{width:400,height:200});
f=G.fitSize(100,80,400,300);assert.deepStrictEqual({width:f.width,height:f.height},{width:100,height:80});
const r=G.layout([{name:'a',width:800,height:600},{name:'b',width:600,height:800},{name:'c',width:100,height:100}],{columns:2,cellWidth:400,cellHeight:240,gap:16,padding:20,labels:true});
assert.strictEqual(r.width,856);assert.strictEqual(r.height,612);assert.strictEqual(r.rows,2);assert.strictEqual(r.cells[0].width,320);assert.strictEqual(r.cells[0].height,240);assert.strictEqual(r.cells[1].width,180);assert.strictEqual(r.cells[1].height,240);assert.strictEqual(r.cells[2].x,170);assert.throws(()=>G.layout([]),/1枚以上/);assert.strictEqual(G.manifest(r).images.length,3);console.log('PASS: fit, no-upscale, grid layout, labels, validation, manifest');
