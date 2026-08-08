(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.DrawCallWeaver=api})(typeof self!=='undefined'?self:this,function(){
  const clean=value=>String(value??'').trim();
  const yes=value=>/^(1|true|yes|y|on|static|有効|はい)$/i.test(clean(value));
  function parseRows(text){
    const lines=clean(text).split(/\r?\n/).map(clean).filter(Boolean);
    if(!lines.length)throw new Error('描画対象を1行以上入力してね');
    return lines.map((line,index)=>{
      const cells=line.split(',').map(clean);
      if(cells.length!==7)throw new Error(`${index+1}行目: 名前,個数,Material,Mesh,Lightmap,Static,Instancing の7列が必要`);
      const [name,countRaw,material,mesh,lightmap,staticRaw,instancingRaw]=cells;
      const count=Number(countRaw);
      if(!name||!material||!mesh)throw new Error(`${index+1}行目: 名前・Material・Meshは必須`);
      if(!Number.isInteger(count)||count<1||count>100000)throw new Error(`${index+1}行目: 個数は1〜100000の整数にしてね`);
      return{name,count,material,mesh,lightmap:lightmap||'none',isStatic:yes(staticRaw),instancing:yes(instancingRaw)};
    });
  }
  function groupBy(items,keyFn){const map=new Map();items.forEach(item=>{const key=keyFn(item);if(!map.has(key))map.set(key,[]);map.get(key).push(item)});return map}
  function analyze(rows){
    if(!Array.isArray(rows)||!rows.length)throw new Error('描画対象がないよ');
    const baseline=rows.reduce((sum,row)=>sum+row.count,0),groups=[],handled=new Set();
    const staticRows=rows.filter(row=>row.isStatic);
    groupBy(staticRows,row=>`${row.material}\u0000${row.lightmap}`).forEach((members,key)=>{
      const instances=members.reduce((sum,row)=>sum+row.count,0),[material,lightmap]=key.split('\u0000');
      groups.push({mode:'Static batch',key:`${material} / LM:${lightmap}`,calls:1,instances,names:members.map(row=>row.name),note:'同じMaterialとLightmapのStatic対象を1グループとして概算'});
      members.forEach(row=>handled.add(row));
    });
    const dynamicRows=rows.filter(row=>!handled.has(row));
    groupBy(dynamicRows.filter(row=>row.instancing),row=>`${row.material}\u0000${row.mesh}`).forEach((members,key)=>{
      const instances=members.reduce((sum,row)=>sum+row.count,0),[material,mesh]=key.split('\u0000');
      if(instances<2)return;
      groups.push({mode:'GPU instancing',key:`${material} / ${mesh}`,calls:1,instances,names:members.map(row=>row.name),note:'同じMaterial・MeshかつInstancing有効を1グループとして概算'});
      members.forEach(row=>handled.add(row));
    });
    dynamicRows.filter(row=>!handled.has(row)).forEach(row=>groups.push({mode:'Individual',key:`${row.material} / ${row.mesh}`,calls:row.count,instances:row.count,names:[row.name],note:row.instancing?'同条件が1個だけ':'StaticでもInstancingでもない'}));
    groups.sort((a,b)=>a.mode.localeCompare(b.mode)||b.instances-a.instances);
    const estimated=groups.reduce((sum,group)=>sum+group.calls,0),saved=baseline-estimated,reduction=baseline?saved/baseline:0;
    const opportunities=[];
    groupBy(rows.filter(row=>!row.isStatic&&!row.instancing),row=>`${row.material}\u0000${row.mesh}`).forEach((members,key)=>{const instances=members.reduce((sum,row)=>sum+row.count,0);if(instances>1){const [material,mesh]=key.split('\u0000');opportunities.push({type:'instancing',label:`${material} / ${mesh}`,instances,potentialSaved:instances-1})}});
    const materialCounts=[...groupBy(rows,row=>row.material).entries()].map(([material,members])=>({material,instances:members.reduce((sum,row)=>sum+row.count,0),meshes:new Set(members.map(row=>row.mesh)).size})).sort((a,b)=>b.instances-a.instances);
    return{rows,baseline,estimated,saved,reduction,groups,opportunities:opportunities.sort((a,b)=>b.potentialSaved-a.potentialSaved),materialCounts,level:estimated>1000?'high':estimated>200?'medium':'low'};
  }
  function exportData(result){return{generated_at:new Date().toISOString(),model:'pre-profile draw-call grouping estimate',assumptions:['One baseline draw call per renderer instance','Static rows sharing Material and Lightmap are counted as one call','Dynamic instanced rows sharing Material and Mesh are counted as one call','Skinned meshes, shadows, passes, SRP Batcher state, MPB differences and platform limits are not modeled'],summary:{renderer_instances:result.baseline,estimated_draw_calls:result.estimated,estimated_saved:result.saved,reduction_percent:+(result.reduction*100).toFixed(1)},groups:result.groups,opportunities:result.opportunities,checklist:['Confirm Frame Debugger and profiler counts on target hardware','Check shadow, depth and additional passes separately','Verify static batching memory cost','Verify per-instance property compatibility before enabling instancing']}}
  return{parseRows,analyze,exportData};
});
