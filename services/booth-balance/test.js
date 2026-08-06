const assert=require('node:assert/strict');const {calculate,yen}=require('./logic.js');
const r=calculate({booth:5000,travel:3000,other:0,price:1500,unitCost:400,stock:20,visitors:100,conversion:12});
assert.equal(r.fixed,8000);assert.equal(r.margin,1100);assert.equal(r.breakEven,8);assert.equal(r.upfront,16000);assert.deepEqual(r.base,{units:12,revenue:18000,profit:5200});assert.equal(r.low.units,7);assert.equal(r.high.units,17);assert.equal(r.feasible,true);
const bad=calculate({booth:1000,price:500,unitCost:500,stock:10,visitors:50,conversion:20});assert.equal(bad.breakEven,null);assert.equal(bad.feasible,false);
const capped=calculate({price:2000,unitCost:0,stock:3,visitors:1000,conversion:100});assert.equal(capped.high.units,3);assert.match(yen(5200),/5,200/);
console.log('PASS: break-even, scenarios, stock cap, non-positive margin, currency formatting');
