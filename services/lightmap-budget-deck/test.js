const assert=require('assert'),G=require('./logic.js');
const rows=G.parseRows('Floor,10,10,1,10\nProps,1,2,5,20');
assert.equal(rows.length,2);assert.equal(rows[1].count,5);
const r=G.analyze(rows,{atlas:128,padding:0,bytesPerTexel:4,mipFactor:1,budget:1});
assert.equal(r.summary.totalArea,110);assert.equal(r.summary.totalTexels,14000);assert.equal(r.summary.atlases,1);assert(Math.abs(r.summary.occupancy-85.44921875)<1e-9);assert.equal(r.items[0].name,'Floor');
const over=G.analyze(rows,{atlas:128,padding:20,bytesPerTexel:8,mipFactor:1.333,budget:1});assert.equal(over.status,'over');assert(over.summary.recommendedDensity>11&&over.summary.recommendedDensity<12);
assert.throws(()=>G.parseRows('Bad,0,1,1,20'),/幅と高さ/);assert.throws(()=>G.analyze(rows,{atlas:64}),/Atlas/);
const out=G.exportData(r);assert.equal(out.items.length,2);assert.equal(out.settings.atlas,128);
console.log('PASS: parse, texel area, atlas count, occupancy, density budget, validation, export');
