const assert=require('assert'),L=require('./logic.js');let n=0;function test(name,fn){fn();n++;console.log('✓ '+name)}
const px=(r,g,b,a=255)=>({data:Uint8ClampedArray.from([r,g,b,a]),width:1,height:1});
const base={r:{enabled:true,mode:'red',invert:false,fallback:0},g:{enabled:true,mode:'green',invert:false,fallback:0},b:{enabled:true,mode:'blue',invert:false,fallback:0},a:{enabled:true,mode:'alpha',invert:false,fallback:0}};
test('4画像をRGBAに格納',()=>{const d=L.pack({r:px(10,0,0),g:px(0,20,0),b:px(0,0,30),a:px(0,0,0,40)},1,1,base);assert.deepEqual([...d],[10,20,30,40])});
test('無効チャンネルは定数を使う',()=>{const s=JSON.parse(JSON.stringify(base));s.g.enabled=false;s.g.fallback=77;assert.equal(L.pack({r:px(1,2,3),b:px(1,2,3),a:px(1,2,3)},1,1,s)[1],77)});
test('反転は255との差',()=>{const s=JSON.parse(JSON.stringify(base));s.r.invert=true;assert.equal(L.pack({r:px(10,0,0),g:px(0,0,0),b:px(0,0,0),a:px(0,0,0)},1,1,s)[0],245)});
test('輝度読取は緑を強く評価',()=>assert(L.read(px(0,100,0),.5,.5,'luma')>L.read(px(100,0,0),.5,.5,'luma')));
test('異なる入力寸法を出力へリサンプル',()=>{const src={data:Uint8ClampedArray.from([0,0,0,255,200,0,0,255]),width:2,height:1},s=JSON.parse(JSON.stringify(base));s.g.enabled=s.b.enabled=s.a.enabled=false;const d=L.pack({r:src},4,1,s);assert.deepEqual([d[0],d[4],d[8],d[12]],[0,0,200,200])});
test('統計は各チャンネルを分離',()=>{const s=L.stats(Uint8ClampedArray.from([0,10,20,30,100,110,120,130]));assert.deepEqual(s.r,{min:0,max:100,mean:50});assert.equal(s.a.mean,80)});
test('過大な出力を拒否',()=>assert.throws(()=>L.pack({},5000,5000,base)));
console.log(`${n} tests passed`);
