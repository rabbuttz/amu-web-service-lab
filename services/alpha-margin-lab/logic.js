(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.AlphaMarginLab=api})(typeof self!=='undefined'?self:this,function(){
  function analyze(alpha,width,height,columns,rows,threshold=1){
    width=Number(width);height=Number(height);columns=Number(columns);rows=Number(rows);threshold=Number(threshold);
    if(!Number.isInteger(width)||!Number.isInteger(height)||width<1||height<1||!Number.isInteger(columns)||!Number.isInteger(rows)||columns<1||rows<1)throw new Error('画像と分割数が不正');
    if(width%columns||height%rows)throw new Error('画像サイズを列数・行数で割り切れない');
    if(!alpha||alpha.length!==width*height)throw new Error('アルファ配列の長さが不正');
    const cellWidth=width/columns,cellHeight=height/rows,cells=[];
    for(let row=0;row<rows;row++)for(let column=0;column<columns;column++){
      let minX=cellWidth,minY=cellHeight,maxX=-1,maxY=-1,pixels=0;
      for(let y=0;y<cellHeight;y++)for(let x=0;x<cellWidth;x++)if(alpha[(row*cellHeight+y)*width+column*cellWidth+x]>=threshold){minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);pixels++}
      const empty=maxX<0,padding=empty?null:{left:minX,top:minY,right:cellWidth-1-maxX,bottom:cellHeight-1-maxY};
      const touchesEdge=!empty&&Object.values(padding).some(v=>v===0);
      cells.push({index:cells.length,column,row,empty,pixels,bounds:empty?null:{x:minX,y:minY,width:maxX-minX+1,height:maxY-minY+1},padding,touchesEdge});
    }
    const filled=cells.filter(c=>!c.empty),sides=['left','top','right','bottom'],ranges={};
    for(const side of sides){const vals=filled.map(c=>c.padding[side]);ranges[side]=vals.length?Math.max(...vals)-Math.min(...vals):0}
    const medians={};for(const side of sides){const vals=filled.map(v=>v.padding[side]).sort((a,b)=>a-b);medians[side]=vals.length?vals[Math.floor(vals.length/2)]:0}
    cells.forEach(c=>c.inconsistent=!c.empty&&sides.some(side=>Math.abs(c.padding[side]-medians[side])>1));
    const inconsistent=cells.filter(c=>c.inconsistent).length;
    return{width,height,columns,rows,cellWidth,cellHeight,threshold,total:cells.length,empty:cells.length-filled.length,edgeRisk:cells.filter(c=>c.touchesEdge).length,inconsistent,ranges,cells};
  }
  function alphaFromRgba(data){if(!data||data.length%4)throw new Error('RGBA配列が不正');const a=new Uint8Array(data.length/4);for(let i=0;i<a.length;i++)a[i]=data[i*4+3];return a}
  return{analyze,alphaFromRgba};
});
