const assert=require('assert'),V=require('./logic.js');
const p=V.parse('time,duration,group,priority,name\n0,2,sfx,5,hit\ninvalid,x,sfx,1,bad');assert.equal(p.events.length,1);assert.equal(p.errors.length,1);
const peak=V.naturalPeak([{time:0,end:2},{time:1,end:3},{time:3,end:4}]);assert.equal(peak.peak,2);assert.equal(peak.at,1);
const group=V.analyze('0,5,sfx,2,low\n1,3,sfx,8,high\n2,2,music,4,bgm',{globalLimit:3,groupLimit:1});assert.equal(group.summary.naturalPeak,3);assert.equal(group.summary.culled,1);assert.match(group.culled[0].reason,/high/);assert.equal(group.accepted.find(x=>x.name==='low').decision,'stolen at 1');
const global=V.analyze('0,5,a,9,a\n0,5,b,8,b\n1,1,c,1,c',{globalLimit:2,groupLimit:2});assert.equal(global.culled[0].name,'c');assert.equal(global.culled[0].reason,'全体上限');assert.equal(V.report(global).summary.played,2);console.log('Voice Ceiling: 13 assertions passed');
