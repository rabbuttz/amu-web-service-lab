const assert=require('assert'),L=require('./logic');
assert.deepStrictEqual(L.normalize({stop:-5,shake:99,flash:60.4,scale:12.6}),{stop:0,shake:20,flash:60,scale:13});
assert.strictEqual(L.impact({stop:0,shake:0,flash:0,scale:0}),0);
assert.strictEqual(L.impact({stop:120,shake:20,flash:180,scale:30}),100);
assert.strictEqual(L.label(24),'軽い');assert.strictEqual(L.label(25),'標準');assert.strictEqual(L.label(55),'強い');assert.strictEqual(L.label(80),'極端');
assert.deepStrictEqual(L.makePreset({stop:55,shake:8,flash:90,scale:15}),{hitStopMs:55,cameraShakePx:8,flashMs:90,punchScale:1.15});
assert.ok(L.presetText({stop:55,shake:8,flash:90,scale:15}).includes('"hitStopMs": 55'));
console.log('Hit Feel Lab logic: 10 assertions passed');
