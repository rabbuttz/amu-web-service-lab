const assert=require('assert'),G=require('./logic');
const rows=G.parseRows('Attack_A,1.0,Hit,0.42\nAttack_A,1.0,Recover,0.78\nAttack_B,1.5,Hit,0.90\nAttack_B,1.5,Hit,0.905');
assert.equal(rows.length,4);assert.equal(rows[0].normalized,.42);assert.deepEqual(G.parseRequired('Hit, Recover,Hit'),['Hit','Recover']);
const result=G.analyze(rows,['Hit','Recover'],8);assert.equal(result.summary.clipCount,2);assert.equal(result.summary.errors,2);assert.equal(result.summary.warnings,1);assert(result.issues.some(x=>x.type==='missing'));assert(result.issues.some(x=>x.type==='duplicate'));assert(result.issues.some(x=>x.type==='timing-spread'));
const aligned=G.analyze(G.parseRows('A,1,Step,0.5\nB,2,Step,1'),['Step'],1);assert.equal(aligned.status,'ok');assert.equal(aligned.eventStats[0].spread,0);
assert.throws(()=>G.parseRows('A,1,Hit,2'),/範囲/);assert.throws(()=>G.parseRows('bad,row'),/4列/);assert.throws(()=>G.analyze(rows,[],101),/0〜100/);
const exported=G.exportData(result);assert.equal(exported.summary.eventCount,4);assert.equal(exported.clips.length,2);
console.log('PASS Animation Event Guard: parsing, normalized comparison, missing, duplicate, validation and export');
