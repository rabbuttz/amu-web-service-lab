const assert=require('assert'),O=require('./logic.js');
const sample='5 | teach | 移動 | WASDで移動\n10 | practice | 移動 | 広場へ歩く\n4 | teach | 回避 | Spaceで回避\n8 | test | 回避 | 攻撃を避ける\n3 | reward | 初戦 | 薬草を獲得';
const parsed=O.parse(sample);assert.equal(parsed.errors.length,0);assert.equal(parsed.beats.length,5);assert.equal(parsed.beats[1].type,'practice');
const result=O.analyze(sample,{passiveThreshold:20});assert.equal(result.summary.totalSeconds,30);assert.equal(result.summary.activeSeconds,18);assert.equal(result.summary.teachable,2);assert.equal(result.summary.covered,1);assert(result.warnings.some(x=>x.message.includes('移動')));
const bad=O.analyze('3 | test | 攻撃 | 木人を叩く\n2 | teach | 攻撃 | クリックで攻撃');assert(bad.warnings.some(x=>x.type==='order'));
const passive=O.analyze('9 | story | 導入 | 会話\n8 | teach | 移動 | 説明',{passiveThreshold:15});assert(passive.warnings.some(x=>x.type==='passive'));
const malformed=O.parse('not valid');assert.equal(malformed.errors.length,1);
const exported=JSON.parse(O.exportText(sample,{passiveThreshold:15}));assert.equal(exported.format,'onboarding-pulse/v1');assert.equal(exported.analysis.timeline.length,5);
console.log('Onboarding Pulse: 13 assertions passed');
