(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ScopeShiftNote=api})(typeof self!=='undefined'?self:this,function(){
  const n=(value,min=0,max=Infinity)=>Math.max(min,Math.min(max,Number(value)||0));
  function calculate(raw){
    const input={originalQuote:n(raw.originalQuote),hourlyRate:n(raw.hourlyRate),includedHours:n(raw.includedHours),usedHours:n(raw.usedHours),dailyHours:n(raw.dailyHours,.25,24),urgencyPercent:n(raw.urgencyPercent,0,300),items:(raw.items||[]).map((item,index)=>({name:String(item.name||`変更${index+1}`).trim()||`変更${index+1}`,hours:n(item.hours),scope:item.scope==='included'?'included':'outside'})).filter(item=>item.hours>0)};
    const remainingIncluded=Math.max(0,input.includedHours-input.usedHours);
    const requestedIncluded=input.items.filter(x=>x.scope==='included').reduce((s,x)=>s+x.hours,0);
    const outsideHours=input.items.filter(x=>x.scope==='outside').reduce((s,x)=>s+x.hours,0);
    const coveredHours=Math.min(remainingIncluded,requestedIncluded);
    const overflowHours=Math.max(0,requestedIncluded-coveredHours);
    const billableHours=outsideHours+overflowHours;
    const baseAdditional=billableHours*input.hourlyRate;
    const urgencyFee=baseAdditional*input.urgencyPercent/100;
    const additionalFee=baseAdditional+urgencyFee;
    const revisedQuote=input.originalQuote+additionalFee;
    const scheduleDays=Math.ceil(billableHours/input.dailyHours);
    return{input,remainingIncluded,requestedIncluded,outsideHours,coveredHours,overflowHours,billableHours,baseAdditional,urgencyFee,additionalFee,revisedQuote,scheduleDays};
  }
  function markdown(result){const r=result,i=r.input,money=x=>Math.round(x).toLocaleString('ja-JP');const rows=i.items.map(x=>`| ${x.name.replace(/\|/g,'／')} | ${x.hours.toFixed(1)}h | ${x.scope==='included'?'契約内候補':'追加範囲'} |`).join('\n')||'| 変更項目なし | 0h | — |';return `# 仕様変更確認メモ\n\n## 変更内容\n\n| 項目 | 見積時間 | 区分 |\n|---|---:|---|\n${rows}\n\n## 再見積\n\n- 契約内の残り修正枠: ${r.remainingIncluded.toFixed(1)}h\n- 今回充当する修正枠: ${r.coveredHours.toFixed(1)}h\n- 追加請求時間: ${r.billableHours.toFixed(1)}h\n- 追加料金: ¥${money(r.additionalFee)}（急ぎ対応 ${i.urgencyPercent}% を含む）\n- 変更後の総額: ¥${money(r.revisedQuote)}\n- 追加作業日数の目安: ${r.scheduleDays}日\n\n## 合意欄\n\n上記の変更範囲・追加料金・納期影響を確認後、着手します。\n`}
  return{calculate,markdown};
});
