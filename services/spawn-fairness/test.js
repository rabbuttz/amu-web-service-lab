const assert=require('assert'),S=require('./logic.js');
assert.equal(S.clamp(12,0,10),10);assert.equal(S.distance({x:0,y:0},{x:3,y:4}),5);assert.equal(S.nearest({x:0,y:0},[{x:6,y:8},{x:3,y:4}]),5);
const balanced=S.analyze([{id:'A',x:10,y:30},{id:'B',x:90,y:30}],[{x:50,y:30}],100,60);assert.equal(balanced.summary.objectiveScore,100);assert.equal(balanced.summary.safetyScore,100);assert.equal(balanced.summary.overall,100);
const uneven=S.analyze([{id:'A',x:2,y:2},{id:'B',x:25,y:30},{id:'C',x:95,y:55}],[{x:50,y:30}],100,60);assert(uneven.summary.overall<100);assert(uneven.summary.edgeRisks>=1);assert(uneven.issues.some(x=>x.includes('外周')));
const empty=S.analyze([],[],100,60);assert(empty.issues.length>=2);const report=S.report([{id:'A',x:10,y:30},{id:'B',x:90,y:30}],[{x:50,y:30}],100,60);assert(report.includes('Fairness score: 100/100'));assert(report.includes('objective 40.0m'));console.log('Spawn Fairness: 12 assertions passed');
