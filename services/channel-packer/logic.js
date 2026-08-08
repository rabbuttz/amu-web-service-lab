(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ChannelPacker=api})(typeof self!=='undefined'?self:this,function(){
  const clamp=v=>Math.max(0,Math.min(255,Math.round(v)));
  function read(source,x,y,mode='luma'){
    if(!source||!source.data||!source.width||!source.height)return 255;
    const sx=Math.min(source.width-1,Math.max(0,Math.floor(x*source.width))),sy=Math.min(source.height-1,Math.max(0,Math.floor(y*source.height))),o=(sy*source.width+sx)*4,d=source.data;
    if(mode==='red')return d[o];if(mode==='green')return d[o+1];if(mode==='blue')return d[o+2];if(mode==='alpha')return d[o+3];
    return clamp(d[o]*.2126+d[o+1]*.7152+d[o+2]*.0722);
  }
  function pack(sources,width,height,settings){
    if(!Number.isInteger(width)||!Number.isInteger(height)||width<1||height<1||width*height>16777216)throw new Error('出力サイズが不正');
    const names=['r','g','b','a'],out=new Uint8ClampedArray(width*height*4);
    for(let y=0;y<height;y++)for(let x=0;x<width;x++){const o=(y*width+x)*4;names.forEach((name,i)=>{const s=settings[name],raw=s.enabled?read(sources[name],(x+.5)/width,(y+.5)/height,s.mode):s.fallback;out[o+i]=s.invert?255-raw:raw})}
    return out;
  }
  function stats(data){if(!data||data.length%4)throw new Error('RGBAデータが不正');const names=['r','g','b','a'],result={};names.forEach((name,c)=>{let min=255,max=0,sum=0;for(let i=c;i<data.length;i+=4){min=Math.min(min,data[i]);max=Math.max(max,data[i]);sum+=data[i]}result[name]={min,max,mean:Number((sum/(data.length/4)).toFixed(2))}});return result}
  function sample(size=256){const out={};['r','g','b','a'].forEach((name,c)=>{const data=new Uint8ClampedArray(size*size*4);for(let y=0;y<size;y++)for(let x=0;x<size;x++){const nx=x/(size-1),ny=y/(size-1),d=Math.hypot(nx-.5,ny-.5),v=c===0?nx*255:c===1?(1-Math.min(1,d*2))*255:c===2?((Math.floor(x/24)+Math.floor(y/24))%2)*255:ny*255,o=(y*size+x)*4;data[o]=data[o+1]=data[o+2]=clamp(v);data[o+3]=255}out[name]={data,width:size,height:size,label:['Metallic','Occlusion','Detail mask','Smoothness'][c]}});return out}
  function report(data,width,height,settings){return{tool:'Channel Packer',width,height,channels:Object.fromEntries(Object.entries(settings).map(([k,v])=>[k,{source:v.enabled?v.label:'constant',read:v.mode,inverted:v.invert,fallback:v.fallback}])),output_stats:stats(data),note:'各入力は端末内で出力サイズに最近傍リサンプルされました。'}}
  return{read,pack,stats,sample,report};
});
