(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.HitFeelLab=api})(this,function(){
  const limits={stop:[0,120],shake:[0,20],flash:[0,180],scale:[0,30]};
  function clamp(value,min,max){const n=Number(value);return Math.min(max,Math.max(min,Number.isFinite(n)?n:min))}
  function normalize(input={}){const out={};Object.keys(limits).forEach(key=>out[key]=Math.round(clamp(input[key],...limits[key])));return out}
  function impact(input){const c=normalize(input);return Math.round(Math.min(100,c.stop/120*30+c.shake/20*30+c.flash/180*15+c.scale/30*25))}
  function label(score){return score<25?'軽い':score<55?'標準':score<80?'強い':'極端'}
  function makePreset(input){const c=normalize(input);return{hitStopMs:c.stop,cameraShakePx:c.shake,flashMs:c.flash,punchScale:1+c.scale/100}}
  function presetText(input){return JSON.stringify(makePreset(input),null,2)}
  return{clamp,normalize,impact,label,makePreset,presetText};
});
