(function(root){
'use strict';
const round=(n,d=4)=>Number(n.toFixed(d));
function parseRows(text){
 const lines=String(text||'').split(/\r?\n/).map(x=>x.trim()).filter(Boolean),rows=[];
 lines.forEach((line,i)=>{const c=line.split(/[\t,]/).map(x=>x.trim());if(i===0&&/name|名前/i.test(c.join(' ')))return;if(c.length<13)throw new Error(`${i+1}行目は名前と中心・サイズ12値が必要`);const n=c.slice(1,13).map(Number);if(n.some(x=>!Number.isFinite(x)))throw new Error(`${i+1}行目に数値以外がある`);if([...n.slice(3,6),...n.slice(9,12)].some(x=>x<=0))throw new Error(`${i+1}行目のサイズは0より大きくしてね`);rows.push({name:c[0]||`Object ${i+1}`,render:{center:n.slice(0,3),size:n.slice(3,6)},collider:{center:n.slice(6,9),size:n.slice(9,12)}})});if(!rows.length)throw new Error('1件以上入力してね');return rows;
}
function bounds(box){return {min:box.center.map((v,i)=>v-box.size[i]/2),max:box.center.map((v,i)=>v+box.size[i]/2)}}
function analyzeOne(row,tolerance=.02){
 const rb=bounds(row.render),cb=bounds(row.collider),axes=['X','Y','Z'];let overlap=1,rv=1,cv=1;row.render.size.forEach(v=>rv*=v);row.collider.size.forEach(v=>cv*=v);
 const checks=axes.map((axis,i)=>{const missingLow=Math.max(0,cb.min[i]-rb.min[i]),missingHigh=Math.max(0,rb.max[i]-cb.max[i]),excessLow=Math.max(0,rb.min[i]-cb.min[i]),excessHigh=Math.max(0,cb.max[i]-rb.max[i]),inter=Math.max(0,Math.min(rb.max[i],cb.max[i])-Math.max(rb.min[i],cb.min[i]));overlap*=inter;return {axis,missingLow:round(missingLow),missingHigh:round(missingHigh),excessLow:round(excessLow),excessHigh:round(excessHigh),ok:missingLow<=tolerance&&missingHigh<=tolerance}});
 const coverage=rv?overlap/rv:0,extra=cv?Math.max(0,cv-overlap)/cv:0,warnings=[];checks.forEach(c=>{if(!c.ok)warnings.push(`${c.axis}軸でRendererがCollider外へ出ている`)});if(extra>.35)warnings.push('Collider体積の35%以上がRenderer外');return {...row,checks,coverage:round(coverage),extraRatio:round(extra),score:Math.max(0,Math.round(100-(1-coverage)*70-extra*30)),warnings,recommendation:{center:[...row.render.center],size:row.render.size.map(v=>round(v+tolerance*2))}};
}
function analyze(rows,settings={}){const tolerance=Math.max(0,Number(settings.tolerance)||0),items=rows.map(r=>analyzeOne(r,tolerance)),issueCount=items.filter(x=>x.warnings.length).length;return {settings:{tolerance},summary:{objects:items.length,issues:issueCount,averageScore:Math.round(items.reduce((s,x)=>s+x.score,0)/items.length)},items}}
function exportData(result){return {tool:'Collider Fit Lab',version:1,createdAt:new Date().toISOString(),note:'軸平行BoxColliderとRenderer boundsの静的比較。回転、動作中の変形、接触感は実機確認が必要。',...result}}
root.ColliderFitLab={parseRows,analyze,analyzeOne,exportData};
})(typeof window!=='undefined'?window:globalThis);
