(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.InputWindowLab=api})(this,function(){
  const EDGE=1100,LAND=1800,CYCLE=3000;
  function clamp(value,min,max){const n=Number(value);return Math.min(max,Math.max(min,Number.isFinite(n)?n:min))}
  function normalize(input={}){return{coyoteMs:Math.round(clamp(input.coyoteMs,0,250)/10)*10,bufferMs:Math.round(clamp(input.bufferMs,0,250)/10)*10}}
  function classifyPress(phase,input={}){const p=((Number(phase)%CYCLE)+CYCLE)%CYCLE,c=normalize(input);if(p<=EDGE||p>=LAND)return'normal';if(p-EDGE<=c.coyoteMs)return'coyote';if(LAND-p<=c.bufferMs)return'buffer';return'miss'}
  function makePreset(input){const c=normalize(input);return{coyoteTimeMs:c.coyoteMs,jumpBufferMs:c.bufferMs,consumeOnJump:true,resetCoyoteOnWallContact:false}}
  function presetText(input){return JSON.stringify(makePreset(input),null,2)}
  return{EDGE,LAND,CYCLE,clamp,normalize,classifyPress,makePreset,presetText};
});
