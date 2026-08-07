const assert=require('assert'),L=require('./logic.js');
const p=L.parse('name,size,deadline\na,10,5\nb,20,20\nbad,x,2');assert.equal(p.rows.length,2);assert.equal(p.errors.length,1);
const fast=L.analyze('a,10,5\nb,20,20',{bandwidth:80,disk:100,overhead:0});assert.equal(fast.summary.lateCount,0);assert.equal(fast.settings.effective,10);assert.equal(fast.items[0].finish,1);
const slow=L.analyze('later,20,10\nfirst,10,2',{bandwidth:8,disk:100,overhead:0});assert.equal(slow.items[0].name,'first');assert.equal(slow.summary.lateCount,2);assert.equal(slow.summary.worstLate,20);assert.equal(L.report(slow).assets[0].late,true);
const disk=L.analyze('a,10,5',{bandwidth:800,disk:1,overhead:0});assert.equal(disk.settings.effective,1);assert.equal(disk.summary.lateCount,1);console.log('Load Window: 12 assertions passed');
