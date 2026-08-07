(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.SpawnFairness=api})(typeof self!=='undefined'?self:this,function(){
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
  function nearest(point,points){return points.length?Math.min(...points.map(p=>distance(point,p))):0}
  function analyze(spawns,objectives,width=100,height=60){
    const clean=spawns.map((p,i)=>({id:p.id||`S${i+1}`,x:clamp(Number(p.x)||0,0,width),y:clamp(Number(p.y)||0,0,height)}));
    const goals=objectives.map((p,i)=>({id:p.id||`O${i+1}`,x:clamp(Number(p.x)||0,0,width),y:clamp(Number(p.y)||0,0,height)}));
    const rows=clean.map(s=>{const opponents=clean.filter(x=>x!==s);return{id:s.id,objective:nearest(s,goals),nearestSpawn:nearest(s,opponents),edge:Math.min(s.x,width-s.x,s.y,height-s.y)}});
    const vals=rows.map(r=>r.objective),min=vals.length?Math.min(...vals):0,max=vals.length?Math.max(...vals):0,avg=vals.length?vals.reduce((a,b)=>a+b,0)/vals.length:0;
    const spread=max-min,objectiveScore=goals.length&&avg?Math.max(0,100-spread/avg*100):0;
    const safety=rows.map(r=>r.nearestSpawn),sAvg=safety.length?safety.reduce((a,b)=>a+b,0)/safety.length:0,sSpread=safety.length?Math.max(...safety)-Math.min(...safety):0;
    const safetyScore=clean.length>1&&sAvg?Math.max(0,100-sSpread/sAvg*100):0;
    const edgeRisks=rows.filter(r=>r.edge<Math.min(width,height)*.08).length;
    const overall=Math.round(objectiveScore*.65+safetyScore*.35);
    const issues=[];
    if(clean.length<2)issues.push('スポーンを2点以上置いてね。');
    if(!goals.length)issues.push('目的地を1点以上置いてね。');
    if(goals.length&&spread>avg*.25)issues.push(`目的地までの差が大きい（最大差 ${spread.toFixed(1)}m）。`);
    if(clean.length>1&&sSpread>sAvg*.3)issues.push('最寄りスポーン間隔に偏りがある。');
    if(edgeRisks)issues.push(`外周に近いスポーンが ${edgeRisks} 点ある。`);
    if(!issues.length)issues.push('大きな距離偏差は見つからなかった。遮蔽物と高低差は実機で確認してね。');
    return{spawns:clean,objectives:goals,rows,summary:{overall,objectiveScore:Math.round(objectiveScore),safetyScore:Math.round(safetyScore),objectiveSpread:spread,edgeRisks},issues};
  }
  function report(spawns,objectives,width,height){const r=analyze(spawns,objectives,width,height);return ['# Spawn Fairness report','',`Arena: ${width}m × ${height}m`,`Spawns: ${r.spawns.length} / Objectives: ${r.objectives.length}`,`Fairness score: ${r.summary.overall}/100`,`Objective distance fairness: ${r.summary.objectiveScore}/100`,`Spawn spacing fairness: ${r.summary.safetyScore}/100`,'','## Spawn measurements','',...r.rows.map(x=>`- ${x.id}: objective ${x.objective.toFixed(1)}m / nearest spawn ${x.nearestSpawn.toFixed(1)}m / edge ${x.edge.toFixed(1)}m`),'','## Checks','',...r.issues.map(x=>`- ${x}`),'','※ 距離のみの初期監査。遮蔽物、高低差、移動能力、復帰無敵はゲーム内で別途検証してください。'].join('\n')}
  return{clamp,distance,nearest,analyze,report};
});
