(function(root){'use strict';
const clamp=(n,a,b)=>Math.min(b,Math.max(a,Number(n)||0));
const percentile=(sorted,p)=>{const i=(sorted.length-1)*p,l=Math.floor(i),h=Math.ceil(i);return sorted[l]+(sorted[h]-sorted[l])*(i-l)};
function simulate(input){
 const pollHz=clamp(input.pollHz,1,8000),fps=clamp(input.fps,1,1000),displayHz=clamp(input.displayHz,1,1000),queueFrames=clamp(input.queueFrames,0,10),fixedMs=clamp(input.fixedMs,0,100),scanout=clamp(input.scanout,0,1),pollMs=1000/pollHz,frameMs=1000/fps,displayMs=1000/displayHz,samples=[];
 for(let a=0;a<100;a++)for(let b=0;b<100;b++){const pollWait=(a+.5)/100*pollMs,frameWait=(b+.5)/100*frameMs,ready=pollWait+frameWait+fixedMs+queueFrames*frameMs,displayWait=(displayMs-(ready%displayMs))%displayMs;samples.push(ready+displayWait+scanout*displayMs)}
 samples.sort((a,b)=>a-b);const median=percentile(samples,.5),p95=percentile(samples,.95),min=samples[0],max=samples.at(-1),budget=input.budgetMs?clamp(input.budgetMs,1,1000):1000/6;
 const parts=[{name:'入力ポーリング待ち（平均）',ms:pollMs/2},{name:'ゲームフレーム待ち（平均）',ms:frameMs/2},{name:'固定処理',ms:fixedMs},{name:'レンダーキュー',ms:queueFrames*frameMs},{name:'表示待ち・走査（概算）',ms:Math.max(0,median-(pollMs/2+frameMs/2+fixedMs+queueFrames*frameMs))}];
 const actions=[];if(queueFrames>=2)actions.push(`レンダーキューを ${queueFrames} → 1 frame にできるか確認`);if(pollHz<fps)actions.push(`入力ポーリング ${pollHz}Hz はゲーム ${fps}fps より低い。入力更新タイミングを確認`);if(fps<displayHz*.75)actions.push(`ゲーム ${fps}fps が表示 ${displayHz}Hz を十分に使えていない`);if(fixedMs>frameMs*.5)actions.push(`固定処理 ${fixedMs.toFixed(1)}ms が1フレームの半分を超える`);if(!actions.length)actions.push('設定上の大きな単独ボトルネックはない。実機の入力・Present時刻で検証');
 return{inputs:{pollHz,fps,displayHz,queueFrames,fixedMs,scanout,budgetMs:budget},min,median,p95,max,overBudget:p95>budget,parts,actions,sampleCount:samples.length};
}
function compare(base,target){const a=simulate(base),b=simulate(target);return{base:a,target:b,medianSaved:a.median-b.median,p95Saved:a.p95-b.p95}}
function report(r){return `# Input Lag Ledger\n\n- 中央値: ${r.median.toFixed(1)} ms\n- P95: ${r.p95.toFixed(1)} ms\n- 範囲: ${r.min.toFixed(1)}–${r.max.toFixed(1)} ms\n- 予算: ${r.inputs.budgetMs.toFixed(1)} ms (${r.overBudget?'P95超過':'P95以内'})\n\n## 内訳（中央値への概算寄与）\n${r.parts.map(x=>`- ${x.name}: ${x.ms.toFixed(1)} ms`).join('\n')}\n\n## 次の確認\n${r.actions.map(x=>`- ${x}`).join('\n')}\n`}
root.InputLagLedger={simulate,compare,report,percentile};})(typeof window!=='undefined'?window:globalThis);
