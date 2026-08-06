const assert=require('assert');const S=require('./logic.js');
const basic=S.analyze({type:'illustration',options:[],revisions:1,urgent:false});assert.equal(basic.points,3);assert.equal(basic.band,'小');assert(basic.deliverables.includes('完成画像（PNG/JPG）'));
const complex=S.analyze({type:'model3d',options:['source','commercial','variants','handoff'],revisions:4,urgent:true});assert.equal(complex.points,20);assert.equal(complex.band,'大');assert(complex.risks.length>=4);const text=S.toText(complex);assert(text.includes('価格ではなく'));assert(text.includes('4回まで'));assert(text.includes('商用利用'));
const invalid=S.analyze({type:'nope',options:['nope'],revisions:0});assert.equal(invalid.label,'一枚絵');console.log('scope-canvas logic: 12 assertions passed');
