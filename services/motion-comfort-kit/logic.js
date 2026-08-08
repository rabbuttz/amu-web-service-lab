(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.MotionComfortKit=api})(typeof self!=='undefined'?self:this,function(){
  const clamp=(v,min,max)=>Math.max(min,Math.min(max,Number(v)||0));
  function normalize(input={}){return{distance:clamp(input.distance,0,2000),viewport:clamp(input.viewport||390,240,4000),duration:clamp(input.duration||300,50,20000),scale:clamp(input.scale,0,300),rotation:clamp(input.rotation,0,3600),loops:Math.max(1,Math.round(clamp(input.loops||1,1,999))),essential:Boolean(input.essential)}}
  function audit(input){const v=normalize(input),travel=v.distance/v.viewport,velocity=v.distance/(v.duration/1000),repeating=v.loops>3;let score=0,reasons=[];
    if(travel>.35){score+=3;reasons.push('画面幅35%を超える移動')}else if(travel>.15){score+=1;reasons.push('画面幅15%を超える移動')}
    if(velocity>1200){score+=3;reasons.push('移動速度が1200px/s超')}else if(velocity>600){score+=1;reasons.push('移動速度が600px/s超')}
    if(v.scale>30){score+=3;reasons.push('30%を超える拡縮')}else if(v.scale>10){score+=1;reasons.push('10%を超える拡縮')}
    if(v.rotation>180){score+=3;reasons.push('180°を超える回転')}else if(v.rotation>45){score+=1;reasons.push('45°を超える回転')}
    if(repeating){score+=2;reasons.push('3回を超えて反復')}
    const level=score>=6?'high':score>=3?'medium':'low';
    const reduced={distance:Math.min(v.distance,8),duration:Math.max(120,Math.min(v.duration,200)),scale:Math.min(v.scale,2),rotation:Math.min(v.rotation,3),loops:1};
    const action=v.essential?'意味を保つフェードへ置換':'移動・拡縮・回転を停止し、即時状態変更へ置換';
    return{input:v,travel:Number(travel.toFixed(3)),velocity:Math.round(velocity),score,level,reasons:reasons.length?reasons:['大きな移動・拡縮・回転は検出されなかった'],reduced,action};
  }
  function css(input,name='comfort-motion'){const a=audit(input),v=a.input,r=a.reduced;return`.${name} {\n  --move: ${v.distance}px;\n  --scale: ${1+v.scale/100};\n  --rotate: ${v.rotation}deg;\n  animation: ${name} ${v.duration}ms ease-out ${v.loops};\n}\n@keyframes ${name} {\n  from { transform: translateX(0) scale(1) rotate(0); }\n  to { transform: translateX(var(--move)) scale(var(--scale)) rotate(var(--rotate)); }\n}\n@media (prefers-reduced-motion: reduce) {\n  .${name} {\n    --move: ${r.distance}px;\n    --scale: ${1+r.scale/100};\n    --rotate: ${r.rotation}deg;\n    animation-duration: ${r.duration}ms;\n    animation-iteration-count: 1;\n    ${a.input.essential?'opacity: 1;':'animation: none;'}\n  }\n}`}
  function report(input){const result=audit(input);return{tool:'Motion Comfort Kit',generated_at:new Date().toISOString(),...result,css:css(input),note:'数値による事前監査であり、実機でのアクセシビリティ確認を置き換えるものではありません。'}}
  return{normalize,audit,css,report};
});
