(function(root){
'use strict';
const round=(n,d=4)=>Number(n.toFixed(d));
function angleDelta(a,b){return ((b-a+540)%360)-180}
function parseRows(text){
  const lines=String(text||'').split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
  const rows=[];
  lines.forEach((line,i)=>{
    const cells=line.split(/[\t,]/).map(x=>x.trim());
    if(i===0&&/frame|time/i.test(cells.join(' ')))return;
    if(cells.length<5)throw new Error(`${i+1}行目は Frame, Time, X, Z, Yaw の5列が必要`);
    const values=cells.slice(0,5).map(Number);
    if(values.some(x=>!Number.isFinite(x)))throw new Error(`${i+1}行目に数値以外がある`);
    rows.push({frame:values[0],time:values[1],x:values[2],z:values[3],yaw:values[4]});
  });
  if(rows.length<3)throw new Error('3フレーム以上を入力してね');
  for(let i=1;i<rows.length;i++)if(rows[i].time<=rows[i-1].time)throw new Error('Timeは昇順で重複なく入力してね');
  return rows;
}
function analyze(rows,settings={}){
  if(!Array.isArray(rows)||rows.length<3)throw new Error('3フレーム以上が必要');
  const mode=settings.mode==='root'?'root':'inplace';
  const positionLimit=Math.max(0,Number(settings.positionLimit)||0.03);
  const velocityLimit=Math.max(0,Number(settings.velocityLimit)||0.15);
  const yawLimit=Math.max(0,Number(settings.yawLimit)||5);
  const first=rows[0],last=rows[rows.length-1],duration=last.time-first.time;
  const displacement={x:last.x-first.x,z:last.z-first.z};
  displacement.distance=Math.hypot(displacement.x,displacement.z);
  const segment=(a,b)=>{const dt=b.time-a.time;return {vx:(b.x-a.x)/dt,vz:(b.z-a.z)/dt,yawSpeed:angleDelta(a.yaw,b.yaw)/dt,speed:Math.hypot(b.x-a.x,b.z-a.z)/dt}};
  const entry=segment(rows[0],rows[1]),exit=segment(rows.at(-2),rows.at(-1));
  const velocityJump=Math.hypot(entry.vx-exit.vx,entry.vz-exit.vz);
  const yawClosure=Math.abs(angleDelta(first.yaw,last.yaw));
  const yawSpeedJump=Math.abs(entry.yawSpeed-exit.yawSpeed);
  const corrected=rows.map(r=>{const p=(r.time-first.time)/duration;return {frame:r.frame,time:r.time,x:round(r.x-displacement.x*p),z:round(r.z-displacement.z*p),yaw:round(r.yaw-angleDelta(first.yaw,last.yaw)*p)}});
  const checks=[
    {key:'velocity',label:'境界速度差',value:velocityJump,unit:'m/s',limit:velocityLimit,ok:velocityJump<=velocityLimit},
    {key:'yaw',label:'境界Yaw差',value:yawClosure,unit:'°',limit:yawLimit,ok:yawClosure<=yawLimit}
  ];
  if(mode==='inplace')checks.unshift({key:'position',label:'終端位置差',value:displacement.distance,unit:'m',limit:positionLimit,ok:displacement.distance<=positionLimit});
  const score=Math.max(0,Math.round(100-checks.reduce((sum,c)=>sum+(c.ok?0:Math.min(45,20*(c.value/Math.max(c.limit,0.0001)-1)+15)),0)));
  const warnings=[];
  checks.filter(c=>!c.ok).forEach(c=>warnings.push(`${c.label}が基準超過`));
  if(yawSpeedJump>Math.max(30,yawLimit/duration*4))warnings.push('境界の回転速度差が大きい');
  return {mode,settings:{positionLimit,velocityLimit,yawLimit},summary:{samples:rows.length,duration:round(duration),score,displacement:round(displacement.distance),velocityJump:round(velocityJump),yawClosure:round(yawClosure),yawSpeedJump:round(yawSpeedJump)},vectors:{displacement:{x:round(displacement.x),z:round(displacement.z)},entry:Object.fromEntries(Object.entries(entry).map(([k,v])=>[k,round(v)])),exit:Object.fromEntries(Object.entries(exit).map(([k,v])=>[k,round(v)]))},checks,warnings,source:rows,corrected};
}
function exportData(result){return {tool:'Loop Root Guard',version:1,createdAt:new Date().toISOString(),note:'座標境界の静的監査。見た目、足滑り、Animator遷移は実機確認が必要。',...result}}
root.LoopRootGuard={parseRows,analyze,exportData,angleDelta};
})(typeof window!=='undefined'?window:globalThis);
