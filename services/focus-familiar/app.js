const G=window.FocusGame,KEY='focus-familiar-v1';let state;
try{state={...G.fresh(),...JSON.parse(localStorage.getItem(KEY)||'null')};state=G.offline(state)}catch(e){state=G.fresh()}
// Screenshot/review helper: deterministic post-expedition state; never persisted unless interacted with.
if((new URLSearchParams(location.search).get('demo')||'').startsWith('after')){
  let d={...G.fresh(1000),route:'attic',mood:'bold',color:'sunset',tail:true};
  d=G.complete(G.begin(d,2000,20),22000);d=G.choose(d,d.pending[0].id,23000);
  d=G.complete(G.begin(d,30000,20),50000);state=d;
}
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
function metric(name,props={}){try{window.va&&window.va('event',{name,...props})}catch(e){}}
function save(){state.lastSeen=Date.now();localStorage.setItem(KEY,JSON.stringify(state))}
function select(group,value,key){state[key]=value;save();render()}
$('#moodBtns').onclick=e=>e.target.dataset.value&&select('#moodBtns',e.target.dataset.value,'mood');
$('#colorBtns').onclick=e=>e.target.dataset.value&&select('#colorBtns',e.target.dataset.value,'color');
$('#routeBtns').onclick=e=>{const b=e.target.closest('button');if(b)select('#routeBtns',b.dataset.value,'route')};
$('#tailToggle').onchange=e=>{state.tail=e.target.checked;save();render()};
$('#startBtn').onclick=()=>{state=G.begin(state,Date.now(),20);metric('focus_start',{route:state.route});save();render()};
$('#offlineBtn').onclick=()=>{state=G.begin(state,Date.now()-7200*1000,20);state=G.tick(state,Date.now());save();render()};
$('#resetBtn').onclick=()=>{if(confirm('標本棚と日誌をリセットしますか？')){state=G.fresh();save();render()}};
function setActive(id,val){$$(`${id} button`).forEach(b=>b.classList.toggle('active',b.dataset.value===val))}
function palette(){return{violet:['#8d7dff','#4ad5c1'],mint:['#4ad5c1','#3f78c5'],sunset:['#ff8e72','#ffc968']}[state.color]}
function render(){
 setActive('#moodBtns',state.mood);setActive('#colorBtns',state.color);setActive('#routeBtns',state.route);$('#tailToggle').checked=state.tail;
 const wrap=$('#avatarWrap');wrap.className=`avatar-wrap mood-${state.mood} ${state.tail?'':'no-tail'} ${state.phase==='exploring'?'exploring':''}`;const p=palette();$('#coatA').setAttribute('stop-color',p[0]);$('#coatB').setAttribute('stop-color',p[1]);
 $('#setupPanel').hidden=state.phase==='reward';$('#rewardPanel').hidden=state.phase!=='reward';
 const labels={setup:'準備中',exploring:'探索中',reward:'帰還！'};$('#phaseBadge').textContent=labels[state.phase];
 if(state.phase==='reward'){$('#rewardChoices').innerHTML=state.pending.map(x=>`<button class="reward" data-id="${x.id}"><span class="icon">${x.icon}</span><span><b>${x.name}${x.rare?' ✦':''}</b><small>${x.desc}</small></span></button>`).join('');$$('.reward').forEach(b=>b.onclick=()=>{state=G.choose(state,b.dataset.id);metric('expedition_complete',{route:state.route});save();render()})}
 const remain=state.phase==='exploring'?Math.max(0,state.duration-Math.floor((Date.now()-state.startedAt)/1000)):state.phase==='reward'?0:20;$('#timer').textContent=`00:${String(remain).padStart(2,'0')}`;$('#progressBar').style.width=state.phase==='exploring'?`${100*(1-remain/state.duration)}%`:state.phase==='reward'?'100%':'0%';
 $('#statusText').textContent=state.phase==='exploring'?`${G.ROUTES[state.route]}を探索中。画面を閉じても進みます`:state.phase==='reward'?'発見物をひとつ選んでください':'探索方針を決めてください';$('#floatNote').textContent=state.phase==='exploring'?'邪魔せず、旅を続けています':state.phase==='reward'?'「おかえり」を待っています':'あなたの作業を見守っています';
 $('#shelf').innerHTML=state.shelf.length?state.shelf.map(x=>`<div class="specimen" title="${x.name}">${x.icon}<small>${x.name.slice(0,4)}</small></div>`).join(''):'<p class="empty">最初の標本を待っています。</p>';$('#shelfCount').textContent=`${state.shelf.length} / 12`;
 $('#journal').innerHTML=state.journal.length?state.journal.map((x,i)=>`<div class="entry"><b>旅 ${state.expeditions-i}</b> — ${x.text}</div>`).join(''):'<p class="empty">まだ旅の記録はありません。</p>';
}
setInterval(()=>{if(state.phase==='exploring'){state=G.tick(state);save();render()}},250);render();
