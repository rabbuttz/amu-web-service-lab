const assert=require('assert'),L=require('./logic.js');
let c=L.coverCrop(1600,900,1,1,.5,.5);
assert.deepStrictEqual(c,{x:350,y:0,width:900,height:900,targetWidth:1,targetHeight:1});
c=L.coverCrop(900,1600,16,9,.5,.5);
assert.strictEqual(c.width,900);assert.strictEqual(c.height,506.25);assert.strictEqual(c.x,0);assert.strictEqual(c.y,546.875);
c=L.coverCrop(1600,900,1,1,0,1);assert.strictEqual(c.x,0);assert.strictEqual(c.y,0);
assert.deepStrictEqual(L.safeRect(1000,500,.1),{x:100,y:50,width:800,height:400});
assert.deepStrictEqual(L.parseRatio('16:9'),{width:16,height:9});assert.strictEqual(L.parseRatio('bad'),null);
console.log('Key Art Cropper logic: 12 assertions passed');
