const fs=require('fs'),vm=require('vm'),assert=require('assert');vm.runInThisContext(fs.readFileSync(__dirname+'/logic.js','utf8'));
const rows=GCPaceMeter.parseSources('A, 1024, 60\nB, 2048, 1');assert.equal(rows.length,2);
const r=GCPaceMeter.analyze({fps:60,heapMB:1,pauseMs:20},rows);assert.equal(r.summary.totalKBps,62);assert.equal(r.summary.bytesPerFrame,1058.13);assert.equal(r.summary.intervalSeconds,16.52);assert.equal(r.summary.lostFrames,2);assert.equal(r.rows[0].name,'A');assert.equal(r.rows[0].share,96.8);
const z=GCPaceMeter.analyze({fps:30,heapMB:8,pauseMs:0},GCPaceMeter.parseSources('idle, 0, 0'));assert.equal(z.summary.intervalSeconds,null);assert.equal(z.summary.lostFrames,0);
assert.throws(()=>GCPaceMeter.parseSources('bad, x, 2'),/bytes/);assert.throws(()=>GCPaceMeter.analyze({fps:0,heapMB:1,pauseMs:1},rows),/FPS/);console.log('GC Pace Meter logic tests: 10 assertions passed');
