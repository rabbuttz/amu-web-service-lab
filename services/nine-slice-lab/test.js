const assert=require('assert'),L=require('./logic');
assert.strictEqual(L.clamp(-1,0,10),0);assert.strictEqual(L.clamp(20,0,10),10);
assert.deepStrictEqual(L.normalize({left:12,right:12,top:10,bottom:10},64,64),{left:12,right:12,top:10,bottom:10});
const squeezed=L.normalize({left:50,right:50,top:50,bottom:50},64,64);assert.ok(squeezed.left+squeezed.right<64);assert.ok(squeezed.top+squeezed.bottom<64);
const cells=L.slices(64,64,{left:12,right:12,top:12,bottom:12},240,64);assert.strictEqual(cells.length,9);assert.deepStrictEqual(cells[0],{sx:0,sy:0,sw:12,sh:12,dx:0,dy:0,dw:12,dh:12});assert.strictEqual(cells[4].dw,216);
assert.strictEqual(L.validate(64,64,{left:12,right:12,top:12,bottom:12},[{width:240,height:64}]).level,'ok');
assert.strictEqual(L.validate(20,20,{left:10,right:10,top:10,bottom:10},[]).level,'warn');
assert.deepStrictEqual(L.unityBorder({left:8,right:9,top:10,bottom:11},64,64),{x:8,y:11,z:9,w:10});
console.log('9-Slice Lab logic: 11 assertions passed');
