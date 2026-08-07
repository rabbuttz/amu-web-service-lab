(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.DialogueTempo=api})(typeof self!=='undefined'?self:this,function(){
  const round=n=>Math.round(n*100)/100;
  function parseScript(text){return String(text||'').split(/\r?\n/).map((raw,index)=>({raw:raw.trim(),line:index+1})).filter(x=>x.raw&&!x.raw.startsWith('#')).map(item=>{
    const pause=item.raw.match(/^\[(?:pause|間)\s+([\d.]+)\]$/i);if(pause)return{type:'pause',seconds:Math.max(0,Number(pause[1])||0),line:item.line};
    const choice=item.raw.match(/^\?\s*(.+)$/);if(choice)return{type:'choice',text:choice[1].trim(),line:item.line};
    const speech=item.raw.match(/^([^:：]{1,24})[:：]\s*(.+)$/);if(speech)return{type:'speech',speaker:speech[1].trim(),text:speech[2].trim(),line:item.line};
    return{type:'note',text:item.raw,line:item.line};
  })}
  function analyze(text,options={}){const cps=Math.max(1,Number(options.cps)||8),gap=Math.max(0,Number(options.gap)||.35),choiceSeconds=Math.max(0,Number(options.choiceSeconds)||2.5),items=parseScript(text);let cursor=0,lastSpeaker=null;const speakers={},timeline=[],warnings=[];
    items.forEach(item=>{let duration=0;if(item.type==='speech'){if(lastSpeaker&&lastSpeaker!==item.speaker)cursor+=gap;duration=Math.max(.6,[...item.text.replace(/\s/g,'')].length/cps);speakers[item.speaker]=(speakers[item.speaker]||0)+duration;if(duration>6)warnings.push({type:'long',line:item.line,message:`${item.speaker}の台詞が${round(duration)}秒。分割候補`});lastSpeaker=item.speaker}else if(item.type==='pause'){duration=item.seconds}else if(item.type==='choice'){duration=choiceSeconds;lastSpeaker=null}else{duration=.4}
      timeline.push({...item,start:round(cursor),duration:round(duration),end:round(cursor+duration)});cursor+=duration});
    const speechTotal=Object.values(speakers).reduce((a,b)=>a+b,0),shares=Object.entries(speakers).map(([speaker,seconds])=>({speaker,seconds:round(seconds),share:speechTotal?round(seconds/speechTotal):0})).sort((a,b)=>b.seconds-a.seconds);if(shares[0]&&shares.length>1&&shares[0].share>.72)warnings.push({type:'balance',message:`${shares[0].speaker}が発話時間の${Math.round(shares[0].share*100)}%を占める`});
    const speechCount=items.filter(x=>x.type==='speech').length,choiceCount=items.filter(x=>x.type==='choice').length;return{summary:{totalSeconds:round(cursor),speechCount,choiceCount,speakerCount:shares.length,charactersPerSecond:cps},speakers:shares,timeline,warnings}
  }
  function exportText(text,options){return JSON.stringify({format:'dialogue-tempo/v1',source:text,analysis:analyze(text,options)},null,2)}
  return{parseScript,analyze,exportText};
});
