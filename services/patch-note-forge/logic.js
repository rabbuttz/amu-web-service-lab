(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.PatchNoteForge=api})(this,function(){
  const LABELS={added:'追加',fixed:'修正',changed:'変更',internal:'内部更新'};
  function clean(line){return String(line||'').replace(/^[-*•]\s*/,'').replace(/^[a-f0-9]{7,40}\s+/i,'').replace(/\s*\(#?\d+\)\s*$/,'').replace(/\s+#\d+\s*$/,'').trim()}
  function classify(raw){
    let text=clean(raw),type='',match=text.match(/^([a-z]+)(?:\([^)]*\))?!?:\s*(.+)$/i);
    if(match){type=match[1].toLowerCase();text=match[2].trim()}
    else if(/^(add|new|implement|追加|新規)/i.test(text))type='feat';
    else if(/^(fix|resolve|修正|直)/i.test(text))type='fix';
    const category=type==='feat'?'added':type==='fix'?'fixed':['perf','refactor','style','docs'].includes(type)?'changed':['chore','build','ci','test'].includes(type)?'internal':'changed';
    text=text.replace(/^(add(?:ed)?|new|implement(?:ed)?|fix(?:ed)?|resolve(?:d)?|update(?:d)?|change(?:d)?|追加|新規|修正|変更)[:：]?\s*/i,'').trim();
    if(text)text=text.charAt(0).toUpperCase()+text.slice(1);
    return{text,category,source:raw};
  }
  function parse(input,includeInternal=false){
    const seen=new Set(),groups={added:[],fixed:[],changed:[],internal:[]};let ignored=0,duplicates=0;
    String(input||'').split(/\r?\n/).forEach(raw=>{
      if(!clean(raw))return;const item=classify(raw);if(!item.text){ignored++;return}
      if(item.category==='internal'&&!includeInternal){ignored++;return}
      const key=item.text.toLocaleLowerCase().replace(/[\s._-]+/g,'');if(seen.has(key)){duplicates++;return}seen.add(key);groups[item.category].push(item.text)
    });
    return{groups,total:Object.values(groups).reduce((n,a)=>n+a.length,0),ignored,duplicates};
  }
  function render(input,options={}){
    const title=(options.title||'アップデート').trim(),version=(options.version||'').trim(),date=(options.date||'').trim();
    const data=parse(input,!!options.includeInternal),heading=`# ${title}${version?' '+version:''}${date?' — '+date:''}`;
    const sections=Object.entries(data.groups).filter(([,items])=>items.length).map(([key,items])=>`## ${LABELS[key]}\n${items.map(x=>`- ${x}`).join('\n')}`);
    return{...data,markdown:[heading,...sections].join('\n\n')};
  }
  return{clean,classify,parse,render};
});
