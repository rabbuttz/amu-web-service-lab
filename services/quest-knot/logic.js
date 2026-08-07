(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.QuestKnot=api})(this,function(){
  function parse(text=''){
    const nodes=[],seen=new Set(),errors=[];
    String(text).split(/\r?\n/).forEach((raw,index)=>{
      const line=raw.trim();if(!line||line.startsWith('#'))return;
      const parts=line.split(':');const id=(parts.shift()||'').trim();
      if(!/^[\w-]+$/.test(id)){errors.push(`${index+1}行目: IDは英数字・_・-だけ使える`);return}
      if(seen.has(id)){errors.push(`${index+1}行目: ${id} が重複している`);return}
      seen.add(id);const deps=parts.join(':').split(',').map(x=>x.trim()).filter(Boolean);
      nodes.push({id,deps:[...new Set(deps)]});
    });
    return{nodes,errors};
  }
  function findCycles(nodes){
    const map=new Map(nodes.map(n=>[n.id,n])),state=new Map(),stack=[],cycles=[];
    function visit(id){state.set(id,1);stack.push(id);for(const dep of map.get(id).deps){if(!map.has(dep))continue;if(!state.has(dep))visit(dep);else if(state.get(dep)===1){const start=stack.indexOf(dep),cycle=[...stack.slice(start),dep].join(' → ');if(!cycles.includes(cycle))cycles.push(cycle)}}stack.pop();state.set(id,2)}
    nodes.forEach(n=>{if(!state.has(n.id))visit(n.id)});return cycles;
  }
  function analyze(text=''){
    const parsed=parse(text),nodes=parsed.nodes,map=new Map(nodes.map(n=>[n.id,n]));
    const missing=[];nodes.forEach(n=>n.deps.forEach(dep=>{if(!map.has(dep))missing.push({node:n.id,dependency:dep})}));
    const cycles=findCycles(nodes),cycleIds=new Set(cycles.flatMap(c=>c.split(' → ')));
    const memo=new Map();
    function depth(id,path=new Set()){
      if(memo.has(id))return memo.get(id);if(path.has(id)||cycleIds.has(id))return null;
      const n=map.get(id);if(!n)return null;if(!n.deps.length){memo.set(id,0);return 0}
      const next=new Set(path).add(id),values=n.deps.map(dep=>depth(dep,next));if(values.some(v=>v===null)){memo.set(id,null);return null}
      const result=Math.max(...values)+1;memo.set(id,result);return result;
    }
    const layout=nodes.map(n=>({...n,depth:depth(n.id)}));
    const available=layout.filter(n=>n.depth===0).map(n=>n.id),blocked=layout.filter(n=>n.depth===null).map(n=>n.id);
    const maxDepth=Math.max(0,...layout.map(n=>n.depth??0)),critical=layout.filter(n=>n.depth===maxDepth).map(n=>n.id);
    const edges=nodes.reduce((sum,n)=>sum+n.deps.length,0),status=parsed.errors.length||missing.length||cycles.length?'issues':'ready';
    return{...parsed,missing,cycles,layout,available,blocked,maxDepth,critical,edges,status};
  }
  function exportData(text=''){const a=analyze(text);return{status:a.status,summary:{quests:a.nodes.length,dependencies:a.edges,stages:a.maxDepth+1},issues:{syntax:a.errors,missing:a.missing,cycles:a.cycles},availableAtStart:a.available,blocked:a.blocked,criticalEnd:a.critical,quests:a.layout}}
  const exportText=text=>JSON.stringify(exportData(text),null,2);
  return{parse,findCycles,analyze,exportData,exportText};
});
