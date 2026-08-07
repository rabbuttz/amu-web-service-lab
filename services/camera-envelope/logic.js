(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.CameraEnvelope=api})(typeof self!=='undefined'?self:this,function(){
  const DEVICES=[
    {id:'phone-tall',name:'縦長スマホ',width:1080,height:2400},
    {id:'phone',name:'スマホ 16:9',width:1080,height:1920},
    {id:'desktop',name:'PC 16:9',width:1920,height:1080},
    {id:'wide',name:'ウルトラワイド',width:3440,height:1440},
    {id:'tablet',name:'タブレット 4:3',width:2048,height:1536}
  ];
  const round=(n,d=2)=>Number(n.toFixed(d));
  function analyze(input){
    const worldWidth=Number(input.worldWidth),worldHeight=Number(input.worldHeight),orthoSize=Number(input.orthoSize);
    if(![worldWidth,worldHeight,orthoSize].every(n=>Number.isFinite(n)&&n>0))throw new Error('寸法とOrthographic Sizeは0より大きい数にしてね');
    const devices=(input.devices&&input.devices.length?input.devices:DEVICES).map(d=>({...d}));
    const results=devices.map(d=>{
      const aspect=d.width/d.height,visibleHeight=orthoSize*2,visibleWidth=visibleHeight*aspect;
      const fitSize=Math.max(worldHeight/2,worldWidth/(2*aspect));
      const horizontalCrop=Math.max(0,worldWidth-visibleWidth),verticalCrop=Math.max(0,worldHeight-visibleHeight);
      return{id:d.id,name:d.name,width:d.width,height:d.height,aspect:round(aspect,3),visibleWidth:round(visibleWidth),visibleHeight:round(visibleHeight),fitSize:round(fitSize,3),pixelsPerUnit:round(d.height/visibleHeight,1),fits:horizontalCrop<1e-9&&verticalCrop<1e-9,horizontalCrop:round(horizontalCrop),verticalCrop:round(verticalCrop)};
    });
    return{input:{worldWidth,worldHeight,orthoSize},results,summary:{devices:results.length,passing:results.filter(x=>x.fits).length,worstFitSize:Math.max(...results.map(x=>x.fitSize)),minPixelsPerUnit:Math.min(...results.map(x=>x.pixelsPerUnit))}};
  }
  function unitySnippet(report){const w=report.input.worldWidth,h=report.input.worldHeight;return`// Required world bounds: ${w} x ${h}\nstatic float FitOrthographicSize(float aspect)\n{\n    const float requiredWidth = ${w}f;\n    const float requiredHeight = ${h}f;\n    return Mathf.Max(requiredHeight * 0.5f, requiredWidth / (2f * aspect));\n}\n\n// Apply after resolution/orientation changes:\nCamera.main.orthographicSize = FitOrthographicSize(Camera.main.aspect);`;}
  function exportReport(report){return{generated_at:new Date().toISOString(),...report};}
  return{DEVICES,analyze,unitySnippet,exportReport};
});
