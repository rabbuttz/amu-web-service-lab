const assert=require('assert');const P=require('./logic.js');
const r=P.calculate({takeHome:300000,fixedCosts:50000,workHours:160,billableRate:50,feeRate:10,reserveRate:20,revisionRate:25,jobHours:20,currentPrice:80000});
assert(Math.abs(r.keepRate-.72)<1e-9);assert(Math.abs(r.monthlyGross-486111.111)<.01);assert.strictEqual(r.billableHours,80);assert(Math.abs(r.hourlyFloor-6076.388)<.01);assert.strictEqual(r.quotedHours,25);assert(Math.abs(r.quoteFloor-151909.722)<.01);assert.strictEqual(r.jobsNeeded,4);assert(r.gap<0);assert.strictEqual(r.currentJobs,7);
const zero=P.calculate({});assert(Number.isFinite(zero.monthlyGross));assert(Number.isFinite(zero.hourlyFloor));assert.strictEqual(P.exportData(r).tool,'Price Floor Studio');
console.log('PASS price-floor-studio: 12 assertions; waterfall, billable capacity, revision buffer, quote floor and edge case verified');
