(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.OverdrawBudgetMap=api})(typeof self!=='undefined'?self:this,function(){
  const clean=v=>String(v??'').trim();
  function parseRows(text){
    const lines=clean(text).split(/\r?\n/).map(clean).filter(Boolean);
    if(!lines.length)throw new Error('透明描画を1行以上入力してね');
    return lines.map((line,index)=>{
      const cells=line.split(',').map(clean);
      if(cells.length!==4)throw new Error(`${index+1}行目: 名前,画面占有率%,重なり数,破棄率% の4列が必要`);
      const [name,coverageRaw,layersRaw,discardRaw]=cells,coverage=Number(coverageRaw),layers=Number(layersRaw),discard=Number(discardRaw);
      if(!name)throw new Error(`${index+1}行目: 名前は必須`);
      if(!Number.isFinite(coverage)||coverage<0||coverage>100)throw new Error(`${index+1}行目: 占有率は0〜100%にしてね`);
      if(!Number.isInteger(layers)||layers<1||layers>1000)throw new Error(`${index+1}行目: 重なり数は1〜1000の整数にしてね`);
      if(!Number.isFinite(discard)||discard<0||discard>100)throw new Error(`${index+1}行目: 破棄率は0〜100%にしてね`);
      return{name,coverage,layers,discard,line:index+1};
    });
  }
  function analyze(rows,width=1920,height=1080,fps=60){
    width=Number(width);height=Number(height);fps=Number(fps);
    if(!Number.isInteger(width)||width<64||width>16384||!Number.isInteger(height)||height<64||height>16384)throw new Error('解像度は64〜16384の整数にしてね');
    if(!Number.isFinite(fps)||fps<1||fps>1000)throw new Error('FPSは1〜1000にしてね');
    const pixels=width*height;
    const items=rows.map(row=>{const rawPixels=pixels*row.coverage/100*row.layers,livePixels=rawPixels*(1-row.discard/100),mp=livePixels/1e6,equivalentLayers=livePixels/pixels;return{...row,rawPixels,livePixels,mp,equivalentLayers,risk:equivalentLayers>=3?'high':equivalentLayers>=1?'medium':'low'}}).sort((a,b)=>b.livePixels-a.livePixels);
    const transparentPixels=items.reduce((sum,x)=>sum+x.livePixels,0),equivalentLayers=transparentPixels/pixels,mpPerFrame=transparentPixels/1e6,gpPerSecond=transparentPixels*fps/1e9;
    const status=equivalentLayers>=6?'critical':equivalentLayers>=3?'review':'ok';
    return{settings:{width,height,fps,pixels},items,summary:{transparentPixels,equivalentLayers,mpPerFrame,gpPerSecond,hotspots:items.filter(x=>x.risk==='high').length},status};
  }
  function exportData(result){return{generated_at:new Date().toISOString(),model:'transparent fragment workload estimate',assumptions:['Coverage regions are summed; spatial overlap is not reconstructed','Discarded fragments are excluded as a directional estimate, although real GPU cost depends on shader and early tests','This is not a measured GPU profiler result'],settings:result.settings,summary:result.summary,items:result.items.map(x=>({name:x.name,coverage_percent:x.coverage,layers:x.layers,discard_percent:x.discard,estimated_megapixels_per_frame:+x.mp.toFixed(3),fullscreen_layer_equivalent:+x.equivalentLayers.toFixed(3),risk:x.risk}))}}
  return{parseRows,analyze,exportData};
});
