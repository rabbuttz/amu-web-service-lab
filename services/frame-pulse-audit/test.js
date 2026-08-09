const assert=require('assert');require('./logic.js');const G=global.FramePulseAudit;
assert.deepEqual(G.parseSamples('16, 17\n18;19'),[16,17,18,19]);assert.throws(()=>G.parseSamples('10 20'));
const stable=G.analyze({samples:Array(100).fill(16),targetFps:60});assert.equal(stable.sampleCount,100);assert.equal(stable.missedBudget,0);assert.equal(stable.longestSpikeRun,0);assert(Math.abs(stable.onePercentLowFps-62.5)<.01);
const jank=G.analyze({samples:[16,16,40,45,50,16,70],targetFps:60});assert.equal(jank.spikeCount,4);assert.equal(jank.longestSpikeRun,3);assert(jank.p99>60);assert(jank.actions.some(x=>x.includes('連続')));assert(G.report(jank).includes('1% Low'));assert.equal(jank.bins.reduce((n,b)=>n+b.count,0),7);
console.log(`PASS: parser, percentiles, budget misses, histogram, and ${jank.longestSpikeRun}-frame jank streak verified`);
