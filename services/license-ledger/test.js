const assert=require('assert'),L=require('./logic.js');
const sample='Forest Tiles | Aki Studio | CC BY 4.0 | https://example.com/forest | 色調変更\nPixel Font | Font Smith | OFL-1.1 | https://example.com/font | なし\nClick Sound |  | CC0 | https://example.com/click | 音量調整';
const parsed=L.parse(sample);assert.equal(parsed.items.length,3);assert.equal(parsed.errors.length,0);
const result=L.analyze(sample);assert.equal(result.summary.total,3);assert.equal(result.summary.complete,3);assert.equal(result.summary.licenses,3);assert.equal(result.summary.issueCount,0);
const missing=L.analyze('Hero | | CC BY 4.0 | | crop');assert.equal(missing.summary.issueCount,2);assert(missing.issues.some(x=>x.message.includes('作者名')));assert(missing.issues.some(x=>x.message.includes('出典URL')));
const unknown=L.analyze('Logo | Me | My License | ftp://example.com | none');assert(unknown.issues.some(x=>x.type==='unknown'));assert(unknown.issues.some(x=>x.type==='url'));
const malformed=L.parse('name only');assert.equal(malformed.errors.length,1);
const md=L.markdown(sample);assert(md.includes('# Third-Party Notices'));assert(md.includes('Forest Tiles'));assert(md.includes('CC BY 4.0'));
console.log('License Ledger: 15 assertions passed');
