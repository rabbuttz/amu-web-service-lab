(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.EaseCurveLab=api})(this,function(){
  const PRESETS={ease:[.25,.1,.25,1],easeInOut:[.42,0,.58,1],snappy:[.2,.85,.25,1],overshoot:[.18,1.35,.32,1.1]};
  const clamp=(v,min,max)=>Math.min(max,Math.max(min,Number.isFinite(Number(v))?Number(v):min));
  const round=(v,d=3)=>{const p=10**d;return Math.round((Number(v)+Number.EPSILON)*p)/p};
  function normalize(curve){const a=Array.isArray(curve)?curve:PRESETS.ease;return[round(clamp(a[0],0,1)),round(clamp(a[1],-1,2)),round(clamp(a[2],0,1)),round(clamp(a[3],-1,2))]}
  function axis(t,p1,p2){const u=1-t;return 3*u*u*t*p1+3*u*t*t*p2+t*t*t}
  function derivative(t,p1,p2){const u=1-t;return 3*u*u*p1+6*u*t*(p2-p1)+3*t*t*(1-p2)}
  function solve(curve,time){const c=normalize(curve),x=clamp(time,0,1);let lo=0,hi=1,t=x;for(let i=0;i<24;i++){const value=axis(t,c[0],c[2]);if(Math.abs(value-x)<1e-7)break;if(value<x)lo=t;else hi=t;t=(lo+hi)/2}return round(axis(t,c[1],c[3]),5)}
  function samples(curve,count=9){const n=Math.max(2,Math.min(33,Math.round(count)));return Array.from({length:n},(_,i)=>{const time=round(i/(n-1),4);return{time,value:solve(curve,time)}})}
  function analyze(curve){const c=normalize(curve),rows=samples(c,101);let maxSpeed=0;for(let i=1;i<rows.length;i++)maxSpeed=Math.max(maxSpeed,Math.abs((rows[i].value-rows[i-1].value)/(rows[i].time-rows[i-1].time)));const mid=solve(c,.5),overshoots=rows.some(r=>r.value<0||r.value>1);let character=overshoots?'行き過ぎ':maxSpeed>2.2?'鋭い':Math.abs(mid-.5)<.07&&maxSpeed<1.5?'なめらか':'緩急あり';return{curve:c,mid:round(mid,3),maxSpeed:round(maxSpeed,2),character,overshoots}}
  function exportText(curve,duration=800){const c=normalize(curve),rows=samples(c,9),seconds=round(clamp(duration,100,10000)/1000,2);return`CSS\ntransition: transform ${seconds}s cubic-bezier(${c.join(', ')});\n\nUnity AnimationCurve samples (time, value)\n${rows.map(r=>`${r.time.toFixed(3)}, ${r.value.toFixed(3)}`).join('\n')}`}
  return{PRESETS,clamp,round,normalize,axis,derivative,solve,samples,analyze,exportText};
});
