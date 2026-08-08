(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.SafeZoneDeck=api})(typeof self!=='undefined'?self:this,function(){
  const PRESETS={
    iphone15p:{label:'iPhone 15 Pro・縦',width:393,height:852,insets:{top:59,right:0,bottom:34,left:0}},
    iphoneSE:{label:'iPhone SE・縦',width:375,height:667,insets:{top:20,right:0,bottom:0,left:0}},
    pixel8:{label:'Pixel 8・縦',width:412,height:915,insets:{top:24,right:0,bottom:24,left:0}},
    iphone15land:{label:'iPhone 15 Pro・横',width:852,height:393,insets:{top:0,right:59,bottom:21,left:59}},
    androidland:{label:'Android・横',width:915,height:412,insets:{top:0,right:24,bottom:24,left:24}}
  };
  function clamp(n,a,b){return Math.min(b,Math.max(a,n))}
  function parseElements(text){const rows=[];String(text||'').split(/\r?\n/).forEach((line,i)=>{const t=line.trim();if(!t||t.startsWith('#'))return;const p=t.split(',').map(x=>x.trim());if(i===0&&/^(name|要素)$/i.test(p[0]))return;if(p.length<5)throw new Error(`${i+1}行目: name,x,y,width,height の5列が必要`);const nums=p.slice(1,5).map(Number);if(nums.some(n=>!Number.isFinite(n)))throw new Error(`${i+1}行目: 座標と寸法は数値で入力してね`);if(nums[2]<=0||nums[3]<=0)throw new Error(`${i+1}行目: 幅と高さは0より大きくしてね`);rows.push({name:p[0]||`Element ${rows.length+1}`,x:nums[0],y:nums[1],width:nums[2],height:nums[3]})});if(!rows.length)throw new Error('UI要素を1件以上入力してね');return rows}
  function safePercent(p){return{left:p.insets.left/p.width*100,top:p.insets.top/p.height*100,right:100-p.insets.right/p.width*100,bottom:100-p.insets.bottom/p.height*100}}
  function inspectElement(el,presetKey){const p=PRESETS[presetKey];if(!p)throw new Error(`不明な端末: ${presetKey}`);const safe=safePercent(p),r={left:el.x,top:el.y,right:el.x+el.width,bottom:el.y+el.height};const dx=r.left<safe.left?safe.left-r.left:r.right>safe.right?safe.right-r.right:0;const dy=r.top<safe.top?safe.top-r.top:r.bottom>safe.bottom?safe.bottom-r.bottom:0;const overlapW=Math.max(0,Math.min(r.right,safe.right)-Math.max(r.left,safe.left)),overlapH=Math.max(0,Math.min(r.bottom,safe.bottom)-Math.max(r.top,safe.top));const visible=clamp((overlapW*overlapH)/(el.width*el.height),0,1);return{preset:presetKey,label:p.label,safe,element:r,ok:dx===0&&dy===0,visible_ratio:visible,move:{x:+dx.toFixed(2),y:+dy.toFixed(2)}}}
  function analyze(elements,presetKeys){const checks=[];elements.forEach(el=>presetKeys.forEach(k=>checks.push({name:el.name,...inspectElement(el,k)})));const unsafe=checks.filter(x=>!x.ok);return{elements,presets:presetKeys,checks,summary:{elements:elements.length,devices:presetKeys.length,checks:checks.length,unsafe:unsafe.length,safe:checks.length-unsafe.length,coverage:checks.length?(checks.length-unsafe.length)/checks.length:0}}}
  function report(result){return{generated_at:new Date().toISOString(),coordinate_system:'top-left origin; percentages of full screen',summary:result.summary,presets:result.presets.map(k=>({id:k,...PRESETS[k]})),elements:result.elements,checks:result.checks}}
  return{PRESETS,parseElements,safePercent,inspectElement,analyze,report};
});
