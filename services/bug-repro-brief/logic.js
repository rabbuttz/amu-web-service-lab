(function(root){'use strict';
const clean=v=>String(v||'').trim();
const lines=v=>clean(v).split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
const escapeMd=s=>String(s).replace(/\|/g,'\\|');
function analyze(input){
  const data={title:clean(input.title),environment:clean(input.environment),frequency:clean(input.frequency),steps:lines(input.steps),expected:clean(input.expected),actual:clean(input.actual),firstBad:clean(input.firstBad),workaround:clean(input.workaround),notes:clean(input.notes)};
  if(!data.title&&!data.actual)throw new Error('症状かタイトルを入力してね');
  if(data.steps.length>30)throw new Error('再現手順は30行までだよ');
  const checks=[
    {key:'title',label:'症状を一文で特定',weight:12,ok:data.title.length>=8},
    {key:'environment',label:'環境・端末・バージョンを記録',weight:15,ok:data.environment.length>=8},
    {key:'frequency',label:'再現頻度と試行回数を記録',weight:12,ok:/\d/.test(data.frequency)},
    {key:'steps',label:'3段階以上の再現手順',weight:20,ok:data.steps.length>=3},
    {key:'expected',label:'期待結果を記録',weight:12,ok:data.expected.length>=5},
    {key:'actual',label:'実際の結果を記録',weight:15,ok:data.actual.length>=5},
    {key:'firstBad',label:'正常版・初回発生版を特定',weight:8,ok:data.firstBad.length>=3},
    {key:'workaround',label:'回避策の有無を記録',weight:6,ok:data.workaround.length>=2}
  ];
  const score=checks.reduce((s,x)=>s+(x.ok?x.weight:0),0),gaps=checks.filter(x=>!x.ok).map(x=>x.label);
  const experiments=[];
  if(!/\d/.test(data.frequency))experiments.push('同じ手順を5回行い、成功回数 / 試行回数を記録する');
  if(!data.firstBad)experiments.push('直近の正常版と不具合版で同じ手順を1回ずつ比較する');
  if(!/(端末|OS|Windows|macOS|Android|iOS|ブラウザ|Unity|version|ver|版)/i.test(data.environment))experiments.push('別端末または別ブラウザで再現し、環境依存かを分ける');
  if(!/(network|online|offline|回線|通信|Wi-?Fi)/i.test(data.environment+data.notes))experiments.push('通信を使う機能ならオンライン / オフラインで結果を比較する');
  if(!data.workaround)experiments.push('再起動・新規データ・設定初期化を個別に試し、状態依存を分ける');
  experiments.push('不要な操作を1つずつ外し、再現する最短手順を確定する');
  const confidence=score>=85?'引き継ぎ可能':score>=60?'追加確認が必要':'情報不足';
  return{data,score,confidence,gaps,experiments:[...new Set(experiments)].slice(0,5),checks};
}
function toMarkdown(r){const d=r.data,stepText=d.steps.length?d.steps.map((x,i)=>`${i+1}. ${x}`).join('\n'):'- 未記入';return `# ${d.title||'不具合報告'}\n\n## 判定\n- 再現情報スコア: ${r.score}/100（${r.confidence}）\n- 未確認: ${r.gaps.length?r.gaps.join(' / '):'なし'}\n\n## 環境\n${d.environment||'未記入'}\n\n## 再現頻度\n${d.frequency||'未記入'}\n\n## 再現手順\n${stepText}\n\n## 期待結果\n${d.expected||'未記入'}\n\n## 実際の結果\n${d.actual||'未記入'}\n\n## バージョン境界\n${d.firstBad||'未確認'}\n\n## 回避策\n${d.workaround||'未確認'}\n\n## 次の切り分け\n${r.experiments.map(x=>`- [ ] ${x}`).join('\n')}\n\n## 補足\n${d.notes||'なし'}\n`}
function exportData(r){return{tool:'Bug Repro Brief',version:1,createdAt:new Date().toISOString(),score:r.score,confidence:r.confidence,gaps:r.gaps,experiments:r.experiments,report:r.data}}
root.BugReproBrief={analyze,toMarkdown,exportData,escapeMd};})(typeof window!=='undefined'?window:globalThis);
