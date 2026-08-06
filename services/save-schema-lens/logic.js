(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.SaveSchemaLens=api})(this,function(){
  function typeOf(value){if(value===null)return'null';if(Array.isArray(value))return'array';return typeof value}
  function join(path,key){return path?`${path}.${key}`:key}
  function arrayShape(arr){if(!arr.length)return'empty';return [...new Set(arr.map(typeOf))].sort().join('|')}
  function compare(oldValue,newValue,path='$',changes=[]){
    const oldType=typeOf(oldValue),newType=typeOf(newValue);
    if(oldType!==newType){changes.push({kind:'type',severity:'high',path,from:oldType,to:newType});return changes}
    if(oldType==='object'){
      const oldKeys=Object.keys(oldValue),newKeys=Object.keys(newValue);
      oldKeys.filter(k=>!Object.prototype.hasOwnProperty.call(newValue,k)).forEach(k=>changes.push({kind:'removed',severity:'high',path:join(path,k),from:typeOf(oldValue[k]),to:'—'}));
      newKeys.filter(k=>!Object.prototype.hasOwnProperty.call(oldValue,k)).forEach(k=>changes.push({kind:'added',severity:'low',path:join(path,k),from:'—',to:typeOf(newValue[k])}));
      oldKeys.filter(k=>Object.prototype.hasOwnProperty.call(newValue,k)).forEach(k=>compare(oldValue[k],newValue[k],join(path,k),changes));
    }else if(oldType==='array'){
      const a=arrayShape(oldValue),b=arrayShape(newValue);
      if(a!==b&&a!=='empty'&&b!=='empty')changes.push({kind:'array',severity:'high',path:`${path}[]`,from:a,to:b});
      if(oldValue.length&&newValue.length&&typeOf(oldValue[0])==='object'&&typeOf(newValue[0])==='object')compare(oldValue[0],newValue[0],`${path}[]`,changes);
    }
    return changes
  }
  function analyze(oldText,newText){
    let oldData,newData;try{oldData=JSON.parse(oldText)}catch(e){return{error:'旧バージョンのJSONを解析できないよ'}}try{newData=JSON.parse(newText)}catch(e){return{error:'新バージョンのJSONを解析できないよ'}}
    const changes=compare(oldData,newData),high=changes.filter(x=>x.severity==='high').length,low=changes.length-high;
    return{changes,high,low,verdict:high?'移行処理が必要':'破壊的変更は未検出'}
  }
  function markdown(result){
    const lines=['# セーブデータ移行チェック',`判定: ${result.verdict}`,''];
    if(!result.changes.length)lines.push('- スキーマ差分なし');
    else result.changes.forEach(c=>lines.push(`- [ ] ${c.severity==='high'?'要対応':'確認'}: \`${c.path}\` ${label(c.kind)}（${c.from} → ${c.to}）`));
    if(result.high)lines.push('','## 実装前の確認','- [ ] 旧データを複製して移行テストを行う','- [ ] 欠損値と型変換のフォールバックを用意する','- [ ] 移行後データを再読込して検証する');
    return lines.join('\n')
  }
  function label(kind){return{type:'型変更',removed:'削除',added:'追加',array:'配列要素型変更'}[kind]||kind}
  return{typeOf,arrayShape,compare,analyze,markdown,label};
});
