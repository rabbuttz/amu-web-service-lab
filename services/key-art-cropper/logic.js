(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.KeyArtCropper=api})(this,function(){
  function clamp(n,min,max){return Math.min(max,Math.max(min,Number(n)||0))}
  function coverCrop(sourceWidth,sourceHeight,targetWidth,targetHeight,focusX=.5,focusY=.5){
    const sw=Math.max(1,Number(sourceWidth)||1),sh=Math.max(1,Number(sourceHeight)||1),tw=Math.max(1,Number(targetWidth)||1),th=Math.max(1,Number(targetHeight)||1);
    const targetRatio=tw/th,sourceRatio=sw/sh;let width,height;
    if(sourceRatio>targetRatio){height=sh;width=height*targetRatio}else{width=sw;height=width/targetRatio}
    const x=clamp(sw*clamp(focusX,0,1)-width/2,0,sw-width),y=clamp(sh*clamp(focusY,0,1)-height/2,0,sh-height);
    return{x,y,width,height,targetWidth:tw,targetHeight:th}
  }
  function safeRect(width,height,margin=.12){const m=clamp(margin,0,.45);return{x:width*m,y:height*m,width:width*(1-m*2),height:height*(1-m*2)}}
  function parseRatio(value){const parts=String(value).split(':').map(Number);if(parts.length!==2||!parts[0]||!parts[1])return null;return{width:parts[0],height:parts[1]}}
  return{clamp,coverCrop,safeRect,parseRatio};
});
