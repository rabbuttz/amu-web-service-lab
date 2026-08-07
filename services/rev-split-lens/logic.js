(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.RevSplitLens=api})(typeof self!=='undefined'?self:this,function(){
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  const number=(value,min=0)=>Math.max(min,Number(value)||0);
  const percent=value=>clamp(number(value),0,100);
  function normalizeParticipant(person,index){return{name:String(person.name||`参加者 ${index+1}`).trim()||`参加者 ${index+1}`,share:percent(person.share)}}
  function scenario(units,input,participants){
    const price=number(input.price),refundRate=percent(input.refund)/100,platformRate=percent(input.platform)/100,otherRate=percent(input.otherFee)/100,cost=number(input.recoupCost);
    units=Math.max(0,Math.floor(Number(units)||0));
    const gross=units*price,refunds=gross*refundRate,afterRefund=gross-refunds,platformFee=afterRefund*platformRate,afterPlatform=afterRefund-platformFee,otherFee=afterPlatform*otherRate,receipts=afterPlatform-otherFee,recouped=Math.min(cost,receipts),unrecouped=Math.max(0,cost-receipts),distributable=Math.max(0,receipts-cost);
    const payouts=participants.map(person=>({...person,amount:distributable*person.share/100}));
    const allocated=payouts.reduce((sum,p)=>sum+p.amount,0);
    return{units,gross,refunds,platformFee,otherFee,receipts,recouped,unrecouped,distributable,payouts,allocated,unallocated:distributable-allocated};
  }
  function calculate(input,people){
    const participants=(people||[]).map(normalizeParticipant),shareTotal=participants.reduce((sum,p)=>sum+p.share,0),price=number(input.price),netRate=(1-percent(input.refund)/100)*(1-percent(input.platform)/100)*(1-percent(input.otherFee)/100),unitReceipts=price*netRate,cost=number(input.recoupCost),breakEvenUnits=unitReceipts>0?Math.ceil(cost/unitReceipts):null;
    const units={low:input.lowUnits,base:input.baseUnits,high:input.highUnits};
    return{participants,shareTotal,netRate,unitReceipts,cost,breakEvenUnits,low:scenario(units.low,input,participants),base:scenario(units.base,input,participants),high:scenario(units.high,input,participants)};
  }
  function exportData(result,input){return{generated_at:new Date().toISOString(),assumptions:{currency:'JPY',price:number(input.price),refund_percent:percent(input.refund),platform_fee_percent:percent(input.platform),other_variable_fee_percent:percent(input.otherFee),recoupable_cost:number(input.recoupCost)},share_total_percent:result.shareTotal,break_even_units:result.breakEvenUnits,scenarios:['low','base','high'].map(key=>{const s=result[key];return{name:key,units:s.units,gross:s.gross,net_receipts:s.receipts,recouped:s.recouped,unrecouped:s.unrecouped,distributable:s.distributable,payouts:s.payouts.reduce((o,p)=>(o[p.name]=p.amount,o),{}),unallocated:s.unallocated}})}}
  return{clamp,number,percent,normalizeParticipant,scenario,calculate,exportData};
});
