const assert=require('assert'),L=require('./logic.js');let n=0;function test(name,fn){fn();n++;console.log('✓ '+name)}
test('2x2を平均して1画素へ縮小',()=>{const r=L.downsample([0,1,1,0],2,2);assert.deepEqual(r,{alpha:[.5],width:1,height:1})});
test('奇数寸法の端を保持',()=>{const r=L.downsample([1,0,1],3,1);assert.deepEqual(r,{alpha:[.5,1],width:2,height:1})});
test('cutoff以上を被覆として計測',()=>assert.equal(L.coverage([0,.49,.5,1],.5),.5));
test('二値マスクはミップで被覆を失う',()=>{const r=L.analyze({alpha:[1,0,0,0],width:2,height:2,cutoff:.5,levels:2});assert.equal(r.levels[0].coverage,.25);assert.equal(r.levels[1].coverage,0);assert.equal(r.risk,'high')});
test('全不透明は全レベルで安定',()=>{const r=L.analyze({alpha:new Array(16).fill(1),width:4,height:4,levels:3});assert.equal(r.risk,'low');assert(r.levels.every(x=>x.coverage===1))});
test('調整cutoffは目標被覆に最も近い',()=>assert.equal(L.preserveCutoff([.2,.4,.6,.8],.5),.41));
test('寸法と配列不一致を拒否',()=>assert.throws(()=>L.analyze({alpha:[1],width:2,height:2})));console.log(`${n} tests passed`);
