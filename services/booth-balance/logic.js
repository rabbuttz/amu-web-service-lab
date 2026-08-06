(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.BoothBalance=api})(this,function(){
  const num=(value,min=0)=>Math.max(min,Number(value)||0);
  function calculate(input){
    const fixed=num(input.booth)+num(input.travel)+num(input.other);
    const price=num(input.price);const unitCost=num(input.unitCost);const stock=Math.floor(num(input.stock));
    const visitors=Math.floor(num(input.visitors));const conversion=num(input.conversion)/100;
    const margin=price-unitCost;const upfront=fixed+unitCost*stock;
    const breakEven=margin>0?Math.ceil(fixed/margin):null;
    const scenario=(factor)=>{const units=Math.min(stock,Math.round(visitors*conversion*factor));return{units,revenue:units*price,profit:units*margin-fixed}};
    return{fixed,price,unitCost,stock,visitors,conversion,margin,upfront,breakEven,low:scenario(.6),base:scenario(1),high:scenario(1.4),feasible:breakEven!==null&&breakEven<=stock};
  }
  function yen(n){return new Intl.NumberFormat('ja-JP',{style:'currency',currency:'JPY',maximumFractionDigits:0}).format(n)}
  return{calculate,yen};
});
