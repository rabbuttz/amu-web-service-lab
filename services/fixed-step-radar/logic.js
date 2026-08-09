(function(root){
'use strict';
const round=(n,d=2)=>Number(n.toFixed(d));
function parseFrames(text){
 const tokens=String(text||'').split(/[\s,;]+/).filter(Boolean),frames=tokens.map(Number);
 if(!frames.length)throw new Error('フレーム時間を1件以上入力してね');
 if(frames.some(x=>!Number.isFinite(x)||x<=0))throw new Error('フレーム時間は0より大きい数値にしてね');
 if(frames.length>300)throw new Error('一度に分析できるのは300フレームまでだよ');
 return frames;
}
function analyze(frames,settings={}){
 const fixedMs=Number(settings.fixedMs),maxDeltaMs=Number(settings.maxDeltaMs),warnSteps=Math.max(1,Math.floor(Number(settings.warnSteps)||3));
 if(!Number.isFinite(fixedMs)||fixedMs<=0)throw new Error('Fixed Timestepは0より大きくしてね');
 if(!Number.isFinite(maxDeltaMs)||maxDeltaMs<fixedMs)throw new Error('Maximum Delta TimeはFixed Timestep以上にしてね');
 let accumulator=0,simulationMs=0,wallMs=0,droppedMs=0,totalSteps=0,peakSteps=0;
 const rows=frames.map((frameMs,index)=>{
  const acceptedMs=Math.min(frameMs,maxDeltaMs),dropped=Math.max(0,frameMs-maxDeltaMs);wallMs+=frameMs;droppedMs+=dropped;accumulator+=acceptedMs;
  const steps=Math.floor((accumulator+1e-9)/fixedMs);accumulator-=steps*fixedMs;simulationMs+=steps*fixedMs;totalSteps+=steps;peakSteps=Math.max(peakSteps,steps);
  const level=dropped>0?'capped':steps>=warnSteps?'burst':steps===0?'skip':'normal';
  return {index:index+1,frameMs:round(frameMs),acceptedMs:round(acceptedMs),steps,backlogMs:round(accumulator),droppedMs:round(dropped),level};
 });
 const burstFrames=rows.filter(x=>x.level==='burst'||x.level==='capped').length,cappedFrames=rows.filter(x=>x.level==='capped').length,simLagMs=Math.max(0,wallMs-simulationMs-accumulator);
 let verdict='安定';if(cappedFrames)verdict='時間欠落あり';else if(burstFrames)verdict='追いつき負荷あり';
 return {settings:{fixedMs,maxDeltaMs,warnSteps},summary:{frames:frames.length,totalSteps,peakSteps,burstFrames,cappedFrames,droppedMs:round(droppedMs),simLagMs:round(simLagMs),verdict},rows};
}
function exportData(result){return {tool:'Fixed Step Radar',version:1,createdAt:new Date().toISOString(),note:'フレーム時間列に対する固定更新の簡易モデル。実機の処理時間、timeScale、エンジン版固有挙動はProfilerで確認が必要。',...result}}
root.FixedStepRadar={parseFrames,analyze,exportData};
})(typeof window!=='undefined'?window:globalThis);
