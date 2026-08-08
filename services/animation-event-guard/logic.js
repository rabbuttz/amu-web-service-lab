(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.AnimationEventGuard=api})(typeof self!=='undefined'?self:this,function(){
  const clean=value=>String(value??'').trim();
  function parseRows(text){
    const lines=clean(text).split(/\r?\n/).map(clean).filter(Boolean);
    if(!lines.length)throw new Error('イベントを1行以上入力してね');
    return lines.map((line,index)=>{
      const cells=line.split(',').map(clean);
      if(cells.length!==4)throw new Error(`${index+1}行目: Clip,長さ秒,Event,時刻秒 の4列が必要`);
      const [clip,lengthRaw,event,timeRaw]=cells,length=Number(lengthRaw),time=Number(timeRaw);
      if(!clip||!event)throw new Error(`${index+1}行目: ClipとEventは必須`);
      if(!Number.isFinite(length)||length<=0||length>3600)throw new Error(`${index+1}行目: 長さは0より大きい秒数にしてね`);
      if(!Number.isFinite(time)||time<0||time>length)throw new Error(`${index+1}行目: 時刻は0〜${length}秒の範囲にしてね`);
      return{clip,length,event,time,normalized:time/length,line:index+1};
    });
  }
  function parseRequired(text){return[...new Set(clean(text).split(',').map(clean).filter(Boolean))]}
  function groupBy(items,keyFn){const map=new Map();items.forEach(item=>{const key=keyFn(item);if(!map.has(key))map.set(key,[]);map.get(key).push(item)});return map}
  function analyze(rows,required=[],tolerancePercent=8){
    if(!Array.isArray(rows)||!rows.length)throw new Error('イベントがないよ');
    const tolerance=Number(tolerancePercent)/100;
    if(!Number.isFinite(tolerance)||tolerance<0||tolerance>1)throw new Error('許容差は0〜100%にしてね');
    const clipMap=groupBy(rows,row=>row.clip),clips=[],issues=[];
    clipMap.forEach((events,name)=>{
      const lengths=[...new Set(events.map(e=>e.length))];
      if(lengths.length>1)issues.push({level:'error',type:'length-conflict',clip:name,label:`${name}: クリップ長が行によって不一致`});
      required.forEach(event=>{if(!events.some(row=>row.event===event))issues.push({level:'error',type:'missing',clip:name,event,label:`${name}: ${event} が不足`})});
      groupBy(events,row=>row.event).forEach((same,event)=>{
        const sorted=[...same].sort((a,b)=>a.time-b.time);
        for(let i=1;i<sorted.length;i++)if(Math.abs(sorted[i].time-sorted[i-1].time)<=.01)issues.push({level:'error',type:'duplicate',clip:name,event,label:`${name}: ${event} が ${sorted[i].time.toFixed(3)}秒付近で重複`});
      });
      clips.push({name,length:lengths[0],events:[...events].sort((a,b)=>a.time-b.time)});
    });
    const eventStats=[];
    groupBy(rows,row=>row.event).forEach((events,event)=>{
      const byClip=groupBy(events,row=>row.clip),points=[...byClip.values()].map(items=>items[0].normalized),min=Math.min(...points),max=Math.max(...points),spread=max-min;
      eventStats.push({event,clipCount:byClip.size,min,max,spread,flagged:byClip.size>1&&spread>tolerance});
      if(byClip.size>1&&spread>tolerance)issues.push({level:'warn',type:'timing-spread',event,label:`${event}: 正規化時刻の差が ${(spread*100).toFixed(1)}pt`});
    });
    clips.sort((a,b)=>a.name.localeCompare(b.name));eventStats.sort((a,b)=>b.spread-a.spread||a.event.localeCompare(b.event));
    const errors=issues.filter(x=>x.level==='error').length,warnings=issues.length-errors;
    return{clips,eventStats,issues,required,tolerancePercent:Number(tolerancePercent),summary:{clipCount:clips.length,eventCount:rows.length,errors,warnings},status:errors?'fix':warnings?'review':'ok'};
  }
  function exportData(result){return{generated_at:new Date().toISOString(),model:'animation event consistency audit',assumptions:['Times are compared after normalization by clip length','The first occurrence per event and clip is used for cross-clip spread','Events within 0.01 seconds with the same name are treated as duplicates'],summary:result.summary,required_events:result.required,tolerance_percent:result.tolerancePercent,issues:result.issues,event_stats:result.eventStats,clips:result.clips.map(c=>({name:c.name,length_seconds:c.length,events:c.events.map(e=>({event:e.event,time_seconds:e.time,normalized:+e.normalized.toFixed(5)}))}))}}
  return{parseRows,parseRequired,analyze,exportData};
});
