(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.SpriteTempo=api})(this,function(){
  const clamp=(n,min,max)=>Math.min(max,Math.max(min,Number(n)||min));
  function config(input){
    const columns=Math.floor(clamp(input.columns,1,32));
    const rows=Math.floor(clamp(input.rows,1,32));
    const total=columns*rows;
    const from=Math.floor(clamp(input.from,1,total));
    const to=Math.floor(clamp(input.to,from,total));
    const fpsA=clamp(input.fpsA,1,60),fpsB=clamp(input.fpsB,1,60);
    return{columns,rows,total,from,to,fpsA,fpsB,frames:to-from+1};
  }
  function frameAt(elapsed,fps,from,frames){return from-1+(Math.floor(elapsed/(1000/fps))%frames)}
  function rect(index,columns,rows,width,height){const w=width/columns,h=height/rows;return{x:(index%columns)*w,y:Math.floor(index/columns)*h,w,h}}
  function manifest(input,chosen){const c=config(input),fps=chosen==='B'?c.fpsB:c.fpsA;return{format:'sprite-tempo/v1',grid:{columns:c.columns,rows:c.rows},range:{from:c.from,to:c.to},timing:{fps,frameDurationMs:Number((1000/fps).toFixed(2)),loop:true}}}
  return{config,frameAt,rect,manifest};
});
