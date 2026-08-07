const assert=require('assert'),E=require('./logic');
let n=E.normalize({sessions:999,initialBalance:-3,events:[{type:'sink',amount:-5,from:8,to:2,every:0}]});
assert.strictEqual(n.sessions,365);assert.strictEqual(n.initialBalance,0);assert.strictEqual(n.events[0].amount,0);assert.strictEqual(n.events[0].from,2);assert.strictEqual(n.events[0].to,8);assert.strictEqual(n.events[0].every,1);
assert.strictEqual(E.isActive({from:2,to:8,every:3},2),true);assert.strictEqual(E.isActive({from:2,to:8,every:3},5),true);assert.strictEqual(E.isActive({from:2,to:8,every:3},4),false);
let r=E.simulate({sessions:3,initialBalance:100,events:[{id:'gain',type:'source',amount:50,from:1,to:3,every:1},{id:'cost',type:'sink',amount:80,from:2,to:3,every:1}]});
assert.strictEqual(r.summary.totalSource,150);assert.strictEqual(r.summary.totalSink,160);assert.strictEqual(r.summary.finalBalance,90);assert.strictEqual(r.timeline.length,3);assert.deepStrictEqual(r.timeline[0].applied,['gain']);assert.strictEqual(r.summary.firstNegative,null);assert.strictEqual(r.summary.status,'drain');
r=E.simulate({sessions:2,initialBalance:0,events:[{type:'sink',amount:10,from:1,to:2,every:1}]});assert.strictEqual(r.summary.firstNegative,1);assert.strictEqual(r.summary.status,'shortage');
r=E.simulate({sessions:2,initialBalance:0,events:[{type:'source',amount:100,from:1,to:2,every:1}]});assert.strictEqual(r.summary.status,'inflation');assert.ok(E.exportText({sessions:1}).includes('"generatedBy": "Economy Tide"'));
console.log('Economy Tide logic: 21 assertions passed');
