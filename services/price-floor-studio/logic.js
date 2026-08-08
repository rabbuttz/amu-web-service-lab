(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.PriceFloorStudio=api})(typeof self!=='undefined'?self:this,function(){
  const num=(v,min=0,max=Infinity)=>Math.max(min,Math.min(max,Number(v)||0));
  function calculate(raw){
    const input={takeHome:num(raw.takeHome),fixedCosts:num(raw.fixedCosts),workHours:num(raw.workHours),billableRate:num(raw.billableRate,0,100),feeRate:num(raw.feeRate,0,99),reserveRate:num(raw.reserveRate,0,99),revisionRate:num(raw.revisionRate,0,300),jobHours:num(raw.jobHours),currentPrice:num(raw.currentPrice)};
    const keepRate=(1-input.feeRate/100)*(1-input.reserveRate/100);
    const monthlyGross=(input.takeHome+input.fixedCosts)/Math.max(.001,keepRate);
    const billableHours=input.workHours*input.billableRate/100;
    const hourlyFloor=monthlyGross/Math.max(.001,billableHours);
    const quotedHours=input.jobHours*(1+input.revisionRate/100);
    const quoteFloor=hourlyFloor*quotedHours;
    const jobsNeeded=quoteFloor>0?Math.ceil(monthlyGross/quoteFloor):0;
    const currentJobs=input.currentPrice>0?Math.ceil(monthlyGross/input.currentPrice):0;
    const currentMonthlyNet=input.currentPrice*jobsNeeded*keepRate-input.fixedCosts;
    const gap=input.currentPrice-quoteFloor;
    const waterfall={gross:monthlyGross,fee:monthlyGross*input.feeRate/100,reserve:monthlyGross*(1-input.feeRate/100)*input.reserveRate/100,fixed:input.fixedCosts,takeHome:input.takeHome};
    return{input,keepRate,monthlyGross,billableHours,hourlyFloor,quotedHours,quoteFloor,jobsNeeded,currentJobs,currentMonthlyNet,gap,waterfall};
  }
  function exportData(r){return{tool:'Price Floor Studio',assumptions:r.input,results:{revenue_keep_rate:r.keepRate,monthly_sales_target:r.monthlyGross,billable_hours:r.billableHours,hourly_floor:r.hourlyFloor,quote_hours_with_revision:r.quotedHours,quote_floor:r.quoteFloor,jobs_per_month_at_floor:r.jobsNeeded,current_price_gap:r.gap},note:'税務・会計上の助言ではありません。税等積立率は利用者が置く概算です。'}}
  return{calculate,exportData};
});
