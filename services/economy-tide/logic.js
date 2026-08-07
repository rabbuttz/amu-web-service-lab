(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.EconomyTide=api})(this,function(){
  const finite=(value,fallback=0)=>Number.isFinite(Number(value))?Number(value):fallback;
  function normalize(input={}){
    const sessions=Math.max(1,Math.min(365,Math.round(finite(input.sessions,30))));
    const initialBalance=Math.max(0,finite(input.initialBalance,0));
    const events=(input.events||[]).map((event,index)=>({
      id:String(event.id||`event-${index+1}`),label:String(event.label||`項目 ${index+1}`).trim()||`項目 ${index+1}`,
      type:event.type==='sink'?'sink':'source',amount:Math.max(0,finite(event.amount,0)),
      from:Math.max(1,Math.min(sessions,Math.round(finite(event.from,1)))),
      to:Math.max(1,Math.min(sessions,Math.round(finite(event.to,sessions)))),
      every:Math.max(1,Math.round(finite(event.every,1)))
    })).map(event=>event.from<=event.to?event:{...event,from:event.to,to:event.from});
    return{sessions,initialBalance,events};
  }
  function isActive(event,session){return session>=event.from&&session<=event.to&&(session-event.from)%event.every===0}
  function simulate(input={}){
    const config=normalize(input),timeline=[];let balance=config.initialBalance,totalSource=0,totalSink=0,minBalance=balance,firstNegative=null;
    for(let session=1;session<=config.sessions;session++){
      let source=0,sink=0;const applied=[];
      config.events.forEach(event=>{if(!isActive(event,session))return;applied.push(event.id);if(event.type==='source')source+=event.amount;else sink+=event.amount});
      balance+=source-sink;totalSource+=source;totalSink+=sink;minBalance=Math.min(minBalance,balance);if(balance<0&&firstNegative===null)firstNegative=session;
      timeline.push({session,source,sink,net:source-sink,balance,applied});
    }
    const net=totalSource-totalSink,coverage=totalSource?totalSink/totalSource:(totalSink?Infinity:1),changeRate=config.initialBalance?net/config.initialBalance:null;
    let status='balanced',message='流入と流出は試算期間内で近い水準。';
    if(firstNegative!==null){status='shortage';message=`セッション${firstNegative}で残高がマイナスになる。`;}
    else if(coverage<0.75&&net>0){status='inflation';message='流出が流入の75%未満で、通貨が蓄積しやすい。';}
    else if(coverage>1.05&&net<0){status='drain';message='流出が流入を上回り、初期残高を消費している。';}
    return{config,timeline,summary:{initialBalance:config.initialBalance,finalBalance:balance,minBalance,totalSource,totalSink,net,coverage,changeRate,firstNegative,status,message}};
  }
  function exportData(input={}){const result=simulate(input);return{generatedBy:'Economy Tide',assumptions:result.config,summary:result.summary,timeline:result.timeline}}
  const exportText=input=>JSON.stringify(exportData(input),null,2);
  return{normalize,isActive,simulate,exportData,exportText};
});
