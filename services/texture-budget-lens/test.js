const assert=require('assert'),T=require('./logic');
assert.deepEqual(T.fitSize(4096,2048,1024),{width:1024,height:512,scale:.25});
assert.deepEqual(T.fitSize(320,200,1024),{width:320,height:200,scale:1});
assert.equal(T.levelBytes(10,10,'astc6'),64);assert.equal(T.levelBytes(10,10,'etc2'),144);assert.equal(T.levelBytes(10,10,'rgba32'),400);
assert.deepEqual(T.memoryBytes(4,4,'rgba32',true),{bytes:84,levels:3});assert.deepEqual(T.memoryBytes(4,4,'rgba32',false),{bytes:64,levels:1});
const p=T.plan(3000,1500,[2048,1024], 'astc6',false);assert.equal(p.length,2);assert.equal(p[0].width,2048);assert.equal(p[0].height,1024);assert.ok(p[0].bytes>p[1].bytes);
assert.equal(T.gradientEnergy(Uint8Array.from([0,10,20,30]),2,2),15);
assert.throws(()=>T.fitSize(0,10,5),/不正/);assert.throws(()=>T.gradientEnergy(new Uint8Array(2),2,2),/長さ/);
console.log('Texture Budget Lens logic: 15 assertions passed');
