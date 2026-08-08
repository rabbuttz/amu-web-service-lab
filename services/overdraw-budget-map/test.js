const assert=require('assert'),G=require('./logic.js');
const rows=G.parseRows('Smoke,25,8,20\nHUD Glass,100,1,0');
assert.equal(rows.length,2);assert.equal(rows[0].layers,8);
const r=G.analyze(rows,1000,1000,60);
assert.equal(r.summary.transparentPixels,2600000);assert.equal(r.summary.equivalentLayers,2.6);assert.equal(r.summary.mpPerFrame,2.6);assert.equal(r.status,'ok');assert.equal(r.items[0].name,'Smoke');
assert.throws(()=>G.parseRows('Bad,120,1,0'),/占有率/);assert.throws(()=>G.analyze(rows,12,1080,60),/解像度/);
const out=G.exportData(r);assert.equal(out.items.length,2);assert.equal(out.settings.fps,60);
console.log('PASS: parse, workload estimate, risk ordering, validation, export');
