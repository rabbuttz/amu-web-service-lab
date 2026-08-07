const assert=require('assert'),S=require('./logic.js');
const good=`start: Boot\ngoals: Result\nstates: Boot, Menu, Play, Pause, Result\nBoot -> Menu : loaded\nMenu -> Play : start\nPlay -> Pause : pause\nPause -> Play : resume\nPlay -> Result : clear`;
let r=S.analyze(good);assert.equal(r.errors.length,0);assert.equal(r.summary.states,5);assert.equal(r.summary.transitions,5);assert.equal(r.summary.reachable,5);assert.deepEqual(r.unreachable,[]);assert.deepEqual(r.deadEnds,[]);assert.deepEqual(r.traps,[]);
r=S.analyze(`start: A\ngoal: D\nstates: A, B, C, D, Hidden\nA -> B : go\nB -> C : loop\nC -> B : back`);assert.deepEqual(r.unreachable,['D','Hidden']);assert.deepEqual(r.deadEnds,[]);assert.deepEqual(r.traps,['A','B','C']);
r=S.analyze(`start: A\ngoal: C\nstates: A, B, C\nA -> B : go`);assert.deepEqual(r.deadEnds,['B']);assert.deepEqual(r.traps,['A','B']);
r=S.analyze(`start: A\ngoal: B\nstates: A, B\nA -> Typo : go\nA -> B : ok\nA -> B : ok`);assert.equal(r.errors.length,1);assert.equal(r.warnings.length,1);assert.equal(r.summary.transitions,2);
r=S.analyze('states: A\nA -> A');assert.ok(r.errors.some(e=>e.reason.includes('開始')));assert.equal(r.warnings.length,1);
const out=S.report(S.analyze(good));assert.equal(out.summary.states,5);assert.ok(out.generated_at);assert.equal(out.transitions.length,5);
console.log('State Route: 18 assertions passed');
