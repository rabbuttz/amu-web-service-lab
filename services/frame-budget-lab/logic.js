(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.FrameBudgetLab=api})(this,function(){
  const CPU_KEYS=['gameplay','physics','animation','renderCpu','otherCpu'];
  function clamp(value,min,max){const n=Number(value);return Math.min(max,Math.max(min,Number.isFinite(n)?n:min))}
  function round(value,digits=2){const p=10**digits;return Math.round((Number(value)+Number.EPSILON)*p)/p}
  function normalize(input={}){const fps=[30,60,90,120].includes(Number(input.fps))?Number(input.fps):60,out={fps};for(const key of CPU_KEYS)out[key]=round(clamp(input[key],0,40),1);out.gpu=round(clamp(input.gpu,0,40),1);return out}
  function analyze(input={}){const n=normalize(input),budget=round(1000/n.fps),cpu=round(CPU_KEYS.reduce((sum,key)=>sum+n[key],0),1),gpu=n.gpu,frame=round(Math.max(cpu,gpu),1),headroom=round(budget-frame,2),load=round(frame/budget*100,1),bottleneck=Math.abs(cpu-gpu)<.05?'balanced':cpu>gpu?'cpu':'gpu';return{...n,budget,cpu,gpu,frame,headroom,load,bottleneck,status:headroom>=budget*.15?'safe':headroom>=0?'tight':'over'}}
  function exportData(input={}){const a=analyze(input);return{targetFps:a.fps,frameBudgetMs:a.budget,cpu:{gameplayMs:a.gameplay,physicsMs:a.physics,animationMs:a.animation,renderSubmitMs:a.renderCpu,otherMs:a.otherCpu,totalMs:a.cpu},gpuMs:a.gpu,estimatedFrameMs:a.frame,headroomMs:a.headroom,bottleneck:a.bottleneck,status:a.status,note:'CPU and GPU are treated as parallel tracks; estimated frame time is the slower track.'}}
  function exportText(input){return JSON.stringify(exportData(input),null,2)}
  return{CPU_KEYS,clamp,round,normalize,analyze,exportData,exportText};
});
