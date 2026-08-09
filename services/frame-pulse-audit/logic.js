(function(root){'use strict';
const percentile=(sorted,p)=>{const i=(sorted.length-1)*p,l=Math.floor(i),h=Math.ceil(i);return sorted[l]+(sorted[h]-sorted[l])*(i-l)};
function parseSamples(text){
 const values=String(text??'').split(/[\s,;]+/).map(Number).filter(Number.isFinite);
 if(values.length<3)throw new Error('3件以上のフレーム時間を入力してね');
 if(values.some(v=>v<=0||v>10000))throw new Error('フレーム時間は0より大きいミリ秒で入力してね');
 return values;
}
function analyze(input){
 const values=Array.isArray(input.samples)?input.samples.map(Number):parseSamples(input.text),targetFps=Math.min(1000,Math.max(1,Number(input.targetFps)||60)),budget=1000/targetFps,sorted=[...values].sort((a,b)=>a-b),mean=values.reduce((a,b)=>a+b,0)/values.length;
 const threshold=budget*1.5;let longest=0,current=0,spikeCount=0;
 values.forEach(v=>{if(v>threshold){spikeCount++;current++;longest=Math.max(longest,current)}else current=0});
 const bins=[{label:`≤ ${budget.toFixed(1)} ms`,min:0,max:budget,count:0},{label:`≤ ${(budget*1.5).toFixed(1)} ms`,min:budget,max:budget*1.5,count:0},{label:`≤ ${(budget*2).toFixed(1)} ms`,min:budget*1.5,max:budget*2,count:0},{label:`> ${(budget*2).toFixed(1)} ms`,min:budget*2,max:Infinity,count:0}];
 values.forEach(v=>{const bin=bins.find((b,i)=>v<=b.max&&(i===0||v>b.min));bin.count++});
 const p50=percentile(sorted,.5),p95=percentile(sorted,.95),p99=percentile(sorted,.99),missed=values.filter(v=>v>budget).length,oneLow=1000/p99;
 const actions=[];if(p99>budget*2)actions.push('P99が予算の2倍超。該当フレーム前後のメインスレッド・GPUマーカーを採取');if(longest>=3)actions.push(`${longest}フレーム連続のスパイクあり。単発GCよりロード・同期処理・持続的GPU負荷を優先確認`);if(spikeCount&&longest<3)actions.push('スパイクは主に単発。GC、シェーダー初回コンパイル、動的生成を優先確認');if(mean<=budget&&p95>budget)actions.push('平均は予算内でも裾が長い。平均FPSではなくP95/P99を回帰指標にする');if(!actions.length)actions.push('大きなジッターは未検出。より長い実機区間と負荷の高い場面でも確認');
 return{targetFps,budget,sampleCount:values.length,durationMs:values.reduce((a,b)=>a+b,0),mean,p50,p95,p99,onePercentLowFps:oneLow,missedBudget:missed,missedRate:missed/values.length,spikeThreshold:threshold,spikeCount,longestSpikeRun:longest,bins,actions};
}
function report(r){return `# Frame Pulse Audit\n\n- サンプル: ${r.sampleCount}\n- 目標: ${r.targetFps} FPS / ${r.budget.toFixed(2)} ms\n- P50 / P95 / P99: ${r.p50.toFixed(2)} / ${r.p95.toFixed(2)} / ${r.p99.toFixed(2)} ms\n- 1% Low: ${r.onePercentLowFps.toFixed(1)} FPS\n- 予算超過: ${r.missedBudget} (${(r.missedRate*100).toFixed(1)}%)\n- 最長スパイク列: ${r.longestSpikeRun} frames\n\n## 次の確認\n${r.actions.map(x=>`- ${x}`).join('\n')}\n`}
root.FramePulseAudit={parseSamples,analyze,report,percentile};})(typeof window!=='undefined'?window:globalThis);
