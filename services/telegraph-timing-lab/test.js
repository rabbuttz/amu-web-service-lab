const assert=require('assert');require('./logic.js');const G=global.TelegraphTiming;
assert.equal(G.percentile([100,200,300],.5),200);assert.equal(G.percentile([100,200],.5),150);assert.throws(()=>G.percentile([],.9));
const fast=G.analyze([180,190,200,210,220,230,240,250],350,80,0);assert.equal(fast.count,8);assert.equal(fast.successRate,1);assert.equal(fast.recommended,350);assert.equal(fast.verdict,'現在値でも反応可能');
const mixed=G.analyze([180,220,300,360,400,420,500,600],350,100,2);assert.equal(mixed.successCount,3);assert.equal(mixed.successRate,3/8);assert(mixed.recommended>=mixed.p90+100);assert(mixed.actions.some(x=>x.includes('早押し2回')));
const partial=G.analyze([210,240],350,80);assert.equal(partial.verdict,'測定中');assert.throws(()=>G.analyze([],350,80));assert.throws(()=>G.analyze([200],20,80));
console.log(`PASS: percentile interpolation, success classification, recommendation rounding, false starts, partial state, and validation verified (P90 ${Math.round(mixed.p90)}ms)`);
