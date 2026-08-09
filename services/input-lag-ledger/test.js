const assert=require('assert');require('./logic.js');const G=global.InputLagLedger;
const base={pollHz:60,fps:60,displayHz:60,queueFrames:2,fixedMs:4,scanout:.5,budgetMs:100};const r=G.simulate(base);
assert.equal(r.sampleCount,10000);assert(r.min<=r.median&&r.median<=r.p95&&r.p95<=r.max);assert(r.parts.length===5);assert(r.actions.some(x=>x.includes('レンダーキュー')));assert(G.report(r).includes('P95'));
const fast=G.simulate({...base,pollHz:120,fps:120,displayHz:120,queueFrames:0,fixedMs:1});assert(fast.p95<r.p95);const c=G.compare(base,{...base,queueFrames:0});assert(c.p95Saved>20);console.log(`PASS: 10,000 phase samples, median ${r.median.toFixed(1)} ms, P95 ${r.p95.toFixed(1)} ms, queue reduction ${c.p95Saved.toFixed(1)} ms`);
