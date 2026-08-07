const assert=require('assert'),D=require('./logic.js');
const src='ミナ: おはよう。\nロウ: 今日はどこへ行く？\n[pause 1.5]\n? 森へ行く\n? 街に残る';
const parsed=D.parseScript(src);assert.equal(parsed.length,5);assert.equal(parsed[2].type,'pause');assert.equal(parsed[3].type,'choice');
const result=D.analyze(src,{cps:5,gap:.5,choiceSeconds:2});assert.equal(result.summary.speechCount,2);assert.equal(result.summary.choiceCount,2);assert.equal(result.summary.speakerCount,2);assert(result.summary.totalSeconds>6);assert.equal(result.timeline[1].start,result.timeline[0].end+.5);
const long=D.analyze('A: これはとてもとてもとてもとてもとてもとてもとてもとても長い台詞です',{cps:3});assert(long.warnings.some(x=>x.type==='long'));
const exported=JSON.parse(D.exportText(src,{cps:8}));assert.equal(exported.format,'dialogue-tempo/v1');assert.equal(exported.analysis.timeline.length,5);
console.log('Dialogue Tempo: 10 assertions passed');
