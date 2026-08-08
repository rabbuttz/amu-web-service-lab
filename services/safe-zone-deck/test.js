const assert=require('assert'),Z=require('./logic');
const els=Z.parseElements('name,x,y,width,height\nBack,3,4,12,6\nCenter,40,40,20,20');
assert.equal(els.length,2);assert.equal(els[0].name,'Back');
const safe=Z.safePercent(Z.PRESETS.iphone15p);assert(Math.abs(safe.top-6.9248)<.001);assert(Math.abs(safe.bottom-96.009)<.001);
let c=Z.inspectElement(els[0],'iphone15p');assert.equal(c.ok,false);assert(c.move.y>2.9&&c.move.y<3);
c=Z.inspectElement(els[1],'iphone15p');assert.equal(c.ok,true);assert.equal(c.visible_ratio,1);
const r=Z.analyze(els,['iphone15p','pixel8']);assert.equal(r.summary.checks,4);assert.equal(r.summary.unsafe,1);assert.equal(r.summary.safe,3);assert.equal(r.summary.coverage,.75);
assert.throws(()=>Z.parseElements('bad,one,2,3,4'),/数値/);assert.throws(()=>Z.parseElements(''),/1件/);
console.log('Safe Zone Deck logic: 13 assertions passed');
