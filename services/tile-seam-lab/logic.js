(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.TileSeamLab=api})(typeof self!=='undefined'?self:this,function(){
  const MAX=Math.sqrt(3*255*255);
  function colorDistance(data,a,b){const dr=data[a]-data[b],dg=data[a+1]-data[b+1],db=data[a+2]-data[b+2];return Math.sqrt(dr*dr+dg*dg+db*db)/MAX*100}
  function analyze(data,width,height,band=1){if(!data||data.length!==width*height*4)throw new Error('画像データの寸法が一致しない');if(width<2||height<2)throw new Error('2 × 2 px以上の画像が必要');band=Math.max(1,Math.min(Math.floor(band),Math.floor(Math.min(width,height)/2)));let lr=0,tb=0,lrCount=0,tbCount=0,worstRow={index:0,value:-1},worstColumn={index:0,value:-1};
    for(let y=0;y<height;y++){let row=0;for(let k=0;k<band;k++){const a=(y*width+k)*4,b=(y*width+(width-band+k))*4;row+=colorDistance(data,a,b)}row/=band;lr+=row;lrCount++;if(row>worstRow.value)worstRow={index:y,value:row}}
    for(let x=0;x<width;x++){let col=0;for(let k=0;k<band;k++){const a=(k*width+x)*4,b=((height-band+k)*width+x)*4;col+=colorDistance(data,a,b)}col/=band;tb+=col;tbCount++;if(col>worstColumn.value)worstColumn={index:x,value:col}}
    const leftRight=lr/lrCount,topBottom=tb/tbCount,mean=(leftRight+topBottom)/2,continuity=Math.max(0,100-mean);const grade=continuity>=98?'良好':continuity>=94?'要確認':'継ぎ目が目立つ可能性';return{width,height,band,left_right_difference:+leftRight.toFixed(2),top_bottom_difference:+topBottom.toFixed(2),continuity:+continuity.toFixed(1),grade,worst_row:{index:worstRow.index,difference:+worstRow.value.toFixed(2)},worst_column:{index:worstColumn.index,difference:+worstColumn.value.toFixed(2)}}
  }
  function offsetPlan(width,height){const x=Math.floor(width/2),y=Math.floor(height/2);return[{sx:x,sy:y,sw:width-x,sh:height-y,dx:0,dy:0},{sx:0,sy:y,sw:x,sh:height-y,dx:width-x,dy:0},{sx:x,sy:0,sw:width-x,sh:y,dx:0,dy:height-y},{sx:0,sy:0,sw:x,sh:y,dx:width-x,dy:height-y}]}
  return{analyze,offsetPlan,colorDistance};
});
