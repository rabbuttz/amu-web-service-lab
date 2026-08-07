const assert=require('assert'),A=require('./logic.js');
assert.equal(A.safeSegment('Hero Idle.PNG'),'hero_idle.png');
assert.equal(A.safeSegment('BossAttack 01.FBX','kebab'),'boss-attack-01.fbx');
assert.equal(A.proposedPath('Assets\\Player Art\\Hero Idle.PNG'),'assets/player_art/hero_idle.png');
const r=A.inspect('Assets/UI/Start Button.PNG\nassets/ui/start button.png\nAudio/CON.wav\nData/config.JSON\nREADME');
assert.equal(r.total,5);assert(r.counts.error>=2);assert(r.counts.warn>=3);assert(r.items[1].issues.some(x=>x.code==='case-collision'));assert(r.items[2].issues.some(x=>x.code==='reserved'));assert(r.items[3].issues.some(x=>x.code==='extension-case'));assert(r.items[4].issues.some(x=>x.code==='no-extension'));assert(A.plan(r).includes('Start Button.PNG -> assets/ui/start_button.png'));console.log('Asset Path Guard: 12 assertions passed');
