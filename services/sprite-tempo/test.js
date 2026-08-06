const assert=require('node:assert/strict');const S=require('./logic.js');
const c=S.config({columns:6,rows:1,from:2,to:5,fpsA:8,fpsB:12});assert.deepEqual(c,{columns:6,rows:1,total:6,from:2,to:5,fpsA:8,fpsB:12,frames:4});
assert.equal(S.frameAt(0,8,2,4),1);assert.equal(S.frameAt(125,8,2,4),2);assert.equal(S.frameAt(500,8,2,4),1);
assert.deepEqual(S.rect(4,3,2,300,100),{x:100,y:50,w:100,h:50});
assert.deepEqual(S.config({columns:0,rows:50,from:99,to:-2,fpsA:0,fpsB:90}),{columns:1,rows:32,total:32,from:32,to:32,fpsA:1,fpsB:60,frames:1});
const m=S.manifest({columns:4,rows:2,from:1,to:8,fpsA:10,fpsB:12},'B');assert.equal(m.timing.fps,12);assert.equal(m.timing.frameDurationMs,83.33);assert.equal(m.range.to,8);
console.log('PASS: grid clamp, frame looping, crop geometry, A/B selection, manifest timing');
