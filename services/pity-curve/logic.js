(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.PityCurve=api})(this,function(){
  function clamp(value,min,max){return Math.min(max,Math.max(min,Number(value)||0))}
  function probabilityAt(attempt,baseRate,softStart,increase,hardPity){
    if(hardPity>0&&attempt>=hardPity)return 1;
    const bonus=softStart>0&&attempt>=softStart?(attempt-softStart+1)*increase:0;
    return clamp(baseRate+bonus,0,1)
  }
  function analyze(options){
    const baseRate=clamp(options.baseRate,0.000001,1),softStart=Math.max(0,Math.floor(Number(options.softStart)||0)),increase=clamp(options.increase,0,1),hardPity=Math.max(0,Math.floor(Number(options.hardPity)||0)),checkpoint=Math.max(1,Math.floor(Number(options.checkpoint)||1));
    const limit=hardPity||Math.min(100000,Math.max(checkpoint,Math.ceil(14/baseRate)));
    let survival=1,expected=0,median=null,p90=null,p99=null;const curve=[];
    for(let attempt=1;attempt<=limit;attempt++){
      expected+=survival;
      survival*=1-probabilityAt(attempt,baseRate,softStart,increase,hardPity);
      const cumulative=1-survival;
      if(median===null&&cumulative>=.5)median=attempt;
      if(p90===null&&cumulative>=.9)p90=attempt;
      if(p99===null&&cumulative>=.99)p99=attempt;
      if(attempt<=2000)curve.push({attempt,cumulative,rate:probabilityAt(attempt,baseRate,softStart,increase,hardPity)});
      if(!hardPity&&survival<1e-12&&attempt>=checkpoint)break;
    }
    const point=curve[Math.min(checkpoint,curve.length)-1]||curve[curve.length-1];
    return{baseRate,softStart,increase,hardPity,checkpoint,chanceAtCheckpoint:point?point.cumulative:1,expected,median:median||limit,p90:p90||limit,p99:p99||limit,curve};
  }
  function percent(value,digits=1){return`${(value*100).toFixed(digits)}%`}
  function chartPoints(curve,width,height,maxAttempt){
    const cap=Math.max(1,Math.min(maxAttempt||curve.length,curve.length));
    const points=[];
    for(let i=0;i<cap;i++){const p=curve[i];points.push(`${(p.attempt/cap*width).toFixed(1)},${(height-p.cumulative*height).toFixed(1)}`)}
    return points.join(' ')
  }
  return{clamp,probabilityAt,analyze,percent,chartPoints};
});
