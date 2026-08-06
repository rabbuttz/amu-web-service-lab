const assert=require('assert'),L=require('./logic.js');
const parsed=L.parseInput('menu.start | Start Game | 180 | 24\nbad row\ndialog | Delete save? | 220 | 18');
assert.strictEqual(parsed.rows.length,2);assert.strictEqual(parsed.errors.length,1);assert.deepStrictEqual(parsed.rows[0],{key:'menu.start',text:'Start Game',width:180,font:24});
const p=L.pseudo('Start Game',.35);assert.ok(p.startsWith('［Šţàřţ Ğàɱë'));assert.ok(p.length>10);
assert.deepStrictEqual(L.classify(90,100,2),{status:'fit',label:'収まる',neededLines:1});assert.deepStrictEqual(L.classify(150,100,2),{status:'wrap',label:'折返し',neededLines:2});assert.deepStrictEqual(L.classify(250,100,2),{status:'danger',label:'要修正',neededLines:3});
const csv=L.toCSV([{key:'a',text:'x',pseudo:'［ẋ］',width:100,font:16,measured:42.4,label:'収まる',neededLines:1}]);assert.ok(csv.includes('"measured_px"'));assert.ok(csv.includes('"42"'));
console.log('UI Copy Stress logic: 12 assertions passed');