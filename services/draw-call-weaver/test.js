const assert=require('assert');const W=require('./logic');
const rows=W.parseRows('Trees,120,Bark,Tree_A,LM0,true,false\nGrass,800,GrassMat,GrassBlade,none,false,true\nRocks A,36,RockMat,Rock_A,none,false,false\nRocks B,24,RockMat,Rock_A,none,false,false\nSigns,12,SignMat,Sign,LM1,true,false');
assert.equal(rows.length,5);assert.equal(rows[0].isStatic,true);assert.equal(rows[1].instancing,true);
const result=W.analyze(rows);assert.equal(result.baseline,992);assert.equal(result.estimated,63);assert.equal(result.saved,929);assert.equal(result.groups.filter(g=>g.mode==='Static batch').length,2);assert.equal(result.groups.find(g=>g.mode==='GPU instancing').instances,800);assert.deepEqual(result.opportunities.map(x=>x.potentialSaved),[59]);
const split=W.analyze(W.parseRows('A,2,Mat,Mesh,LM0,true,false\nB,3,Mat,Mesh,LM1,true,false'));assert.equal(split.estimated,2,'different lightmaps must split static batches');
const instanced=W.analyze(W.parseRows('A,2,Mat,Mesh,none,false,true\nB,3,Mat,Mesh,none,false,true'));assert.equal(instanced.estimated,1,'matching material and mesh should instance together');
assert.throws(()=>W.parseRows('bad,row'),/7列/);assert.throws(()=>W.parseRows('A,0,Mat,Mesh,none,false,false'),/1〜100000/);
const exported=W.exportData(result);assert.equal(exported.summary.estimated_draw_calls,63);assert.equal(exported.assumptions.length,4);
console.log('PASS Draw Call Weaver: parsing, static split, instancing, opportunities, validation and export');
