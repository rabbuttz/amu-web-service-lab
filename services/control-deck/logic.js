(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ControlDeck=api})(this,function(){
  const devices=['keyboard','gamepad','touch'];
  const labels={keyboard:'キーボード',gamepad:'ゲームパッド',touch:'タッチ'};
  function normalize(input={}){
    const requiredDevices=devices.filter(d=>(input.requiredDevices||devices).includes(d));
    const actions=(input.actions||[]).map((row,index)=>({
      id:String(row.id||`action-${index+1}`),
      name:String(row.name||`アクション ${index+1}`).trim()||`アクション ${index+1}`,
      required:row.required!==false&&row.required!=='false',
      bindings:Object.fromEntries(devices.map(d=>[d,String(row.bindings?.[d]??row[d]??'').trim()]))
    }));
    return{requiredDevices,actions};
  }
  const key=s=>s.toLocaleLowerCase('ja-JP').replace(/\s+/g,' ');
  function audit(input={}){
    const config=normalize(input),conflicts=[],missing=[];
    devices.forEach(device=>{
      const used=new Map();
      config.actions.forEach(action=>{const binding=action.bindings[device];if(!binding)return;const k=key(binding);if(!used.has(k))used.set(k,[]);used.get(k).push(action)});
      used.forEach((actions,binding)=>{if(actions.length>1)conflicts.push({device,binding,actions:actions.map(a=>a.name)})});
    });
    config.actions.forEach(action=>{if(!action.required)return;config.requiredDevices.forEach(device=>{if(!action.bindings[device])missing.push({action:action.name,device})})});
    const requiredSlots=config.actions.filter(a=>a.required).length*config.requiredDevices.length;
    const filledSlots=config.actions.filter(a=>a.required).reduce((sum,a)=>sum+config.requiredDevices.filter(d=>a.bindings[d]).length,0);
    const coverage=requiredSlots?filledSlots/requiredSlots:1;
    const status=conflicts.length?'conflict':missing.length?'missing':'ready';
    const message=status==='conflict'?`${conflicts.length}件の入力競合がある。`:status==='missing'?`${missing.length}枠の必須入力が未設定。`:'必須入力は競合なく揃っている。';
    return{config,summary:{actionCount:config.actions.length,requiredSlots,filledSlots,coverage,conflictCount:conflicts.length,missingCount:missing.length,status,message},conflicts,missing};
  }
  function exportData(input={}){const result=audit(input);return{generatedBy:'Control Deck',requiredDevices:result.config.requiredDevices,actions:result.config.actions,diagnosis:{...result.summary,conflicts:result.conflicts,missing:result.missing}}}
  const exportText=input=>JSON.stringify(exportData(input),null,2);
  return{devices,labels,normalize,audit,exportData,exportText};
});
