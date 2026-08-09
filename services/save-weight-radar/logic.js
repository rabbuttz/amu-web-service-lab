(function(root){'use strict';
const bytes=value=>new TextEncoder().encode(JSON.stringify(value)).length;
const pathJoin=(base,key)=>base+(typeof key==='number'?`[${key}]`:`.${String(key).replace(/([.\\[\\]])/g,'\\$1')}`);
function inspect(value,path='$',depth=0,out=[]){
  const size=bytes(value);out.push({path,size,type:Array.isArray(value)?'array':value===null?'null':typeof value,count:Array.isArray(value)?value.length:value&&typeof value==='object'?Object.keys(value).length:null});
  if(value&&typeof value==='object'&&depth<8){const entries=Array.isArray(value)?value.map((v,i)=>[i,v]):Object.entries(value);entries.forEach(([k,v])=>inspect(v,pathJoin(path,k),depth+1,out))}return out;
}
function formatBytes(n){if(n<1024)return `${n} B`;if(n<1048576)return `${(n/1024).toFixed(n<10240?1:0)} KiB`;return `${(n/1048576).toFixed(2)} MiB`}
function analyze(input){let data;try{data=JSON.parse(String(input.json||''))}catch(e){throw new Error(`JSONを読み取れない: ${e.message}`)}
 const slots=Math.max(1,Math.min(100,Number(input.slots)||1)),history=Math.max(0,Math.min(100,Number(input.history)||0)),quotaKiB=Math.max(1,Number(input.quotaKiB)||1024),growthBytes=Math.max(0,Number(input.growthBytes)||0),total=bytes(data),stored=total*slots*(history+1),quota=Math.round(quotaKiB*1024),ratio=stored/quota;
 const nodes=inspect(data).filter(x=>x.path!=='$').sort((a,b)=>b.size-a.size),top=nodes.slice(0,8).map(x=>({...x,share:total?x.size/total:0}));
 const dailyStoredGrowth=growthBytes*slots*(history+1),remaining=Math.max(0,quota-stored),daysToQuota=dailyStoredGrowth>0?Math.floor(remaining/dailyStoredGrowth):null;
 const findings=[];if(ratio>1)findings.push('現在の設定だけで容量上限を超える');else if(ratio>=.8)findings.push('容量上限の80%以上を使う');else if(ratio>=.5)findings.push('容量上限の半分以上を使う');
 const arrays=nodes.filter(x=>x.type==='array'&&x.count>=100).slice(0,3);arrays.forEach(x=>findings.push(`${x.path} は ${x.count} 要素。上限・間引き・差分保存を確認`));
 const strings=nodes.filter(x=>x.type==='string'&&x.size>4096).slice(0,3);strings.forEach(x=>findings.push(`${x.path} に ${formatBytes(x.size)} の文字列。ログや埋め込みデータなら分離を検討`));
 if(daysToQuota!==null&&daysToQuota<30)findings.push(`入力した日次増加が続くと約${daysToQuota}日で上限に達する`);if(!findings.length)findings.push('直ちに警戒する容量条件は見つからなかった。実データの最大ケースでも再確認してね');
 return{total,stored,quota,ratio,slots,history,growthBytes,dailyStoredGrowth,remaining,daysToQuota,top,findings,nodeCount:nodes.length};
}
function report(r){return `# Save Weight Radar\n\n- 1セーブ: ${formatBytes(r.total)}\n- 保存枠・履歴込み: ${formatBytes(r.stored)} / ${formatBytes(r.quota)} (${(r.ratio*100).toFixed(1)}%)\n- 保存枠: ${r.slots}\n- 履歴世代: ${r.history}\n- 日次増加想定: ${formatBytes(r.growthBytes)} / セーブ${r.daysToQuota===null?'':`\n- 上限まで: 約${r.daysToQuota}日`}\n\n## 大きいパス\n${r.top.map(x=>`- ${x.path}: ${formatBytes(x.size)} (${(x.share*100).toFixed(1)}%)`).join('\n')}\n\n## 確認事項\n${r.findings.map(x=>`- ${x}`).join('\n')}\n`}
root.SaveWeightRadar={bytes,inspect,formatBytes,analyze,report};})(typeof window!=='undefined'?window:globalThis);
