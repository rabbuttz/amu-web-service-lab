const assert=require('assert'),G=require('./logic.js');
const rows=G.parseRows('core,Assets/UI/Atlas.png,800\nlevel-1,Assets/UI/Atlas.png,800\nlevel-2,Assets/UI/Atlas.png,800\nlevel-1,Assets/Tree.prefab,250\nlevel-2,Assets/Tree.prefab,300\ncore,Assets/Font.ttf,1200');
assert.equal(rows.length,6);
const r=G.analyze(rows,{minSavingsKB:400});
assert.equal(r.summary.assetCount,3);assert.equal(r.summary.bundleCount,3);assert.equal(r.summary.totalKB,4150);assert.equal(r.summary.duplicateKB,1850);assert(Math.abs(r.summary.duplicateRate-44.578313253)<1e-6);assert.equal(r.summary.candidateCount,1);assert.equal(r.duplicates[0].asset,'Assets/UI/Atlas.png');assert.equal(r.duplicates[0].savingsKB,1600);assert.equal(r.duplicates[1].sizeMismatch,true);
assert.throws(()=>G.parseRows('bad,row,0'),/Size KB/);assert.throws(()=>G.analyze(G.parseRows('a,x,1\na,x,1')),/重複/);assert.throws(()=>G.analyze(rows,{minSavingsKB:-1}),/しきい値/);
const out=G.exportData(r);assert.equal(out.summary.optimizedKB,2300);assert.equal(out.duplicates.length,2);
console.log('PASS: parse, unique pairs, bundle totals, duplicate savings, mismatched sizes, threshold, validation, export');
