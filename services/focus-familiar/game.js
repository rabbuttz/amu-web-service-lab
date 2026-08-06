(function(root,factory){const api=factory();if(typeof module==='object')module.exports=api;else root.FocusGame=api})(this,function(){
const ITEMS={
 archive:[['📜','星屑の索引','丁寧な文字が光る'],['🔖','眠らない栞','ページの間で温かい'],['🪶','書架梟の羽','音を吸い込む'],['🗝️','余白の鍵','まだ見ぬ章を開く']],
 garden:[['🌱','雲豆の芽','衣装色を映した新芽'],['🫐','夜更けの実','集中の甘い記憶'],['🌼','時計花','休憩の時だけ開く'],['🐚','窓辺の貝','遠い雨音を残す']],
 attic:[['⚙️','月時計の歯車','希少な銀色の欠片'],['🔔','無音の鈴','振ると光だけが鳴る'],['💎','凝固した朝','屋根裏の珍品'],['🧭','逆さの方位磁針','帰り道だけを指す']]
};
const ROUTES={archive:'古い書架',garden:'窓辺の庭',attic:'時計塔の屋根裏'};
function fresh(now=Date.now()){return{version:1,phase:'setup',startedAt:null,duration:20,route:'archive',mood:'curious',color:'violet',tail:true,shelf:[],journal:[],pending:null,lastSeen:now,totalSeconds:0,expeditions:0}}
function hash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function rewards(state,seed){const pool=ITEMS[state.route],start=hash(String(seed)+state.route+state.mood+state.color)%pool.length;return[0,1].map((_,i)=>{const raw=pool[(start+i)%pool.length];return{id:state.route+'-'+((start+i)%pool.length),icon:raw[0],name:raw[1],desc:raw[2],rare:state.route==='attic'&&i===0}})}
function begin(state,now=Date.now(),duration=20){return{...state,phase:'exploring',startedAt:now,duration,pending:null,lastSeen:now}}
function complete(state,now=Date.now()){const elapsed=state.startedAt?Math.max(1,Math.round((now-state.startedAt)/1000)):state.duration;return{...state,phase:'reward',pending:rewards(state,state.startedAt||now),totalSeconds:state.totalSeconds+elapsed,lastSeen:now}}
function tick(state,now=Date.now()){if(state.phase==='exploring'&&now-state.startedAt>=state.duration*1000)return complete(state,now);return{...state,lastSeen:now}}
function offline(state,now=Date.now()){const away=Math.max(0,now-state.lastSeen);if(state.phase==='exploring'&&away>=state.duration*1000)return complete(state,now);return state}
function choose(state,id,now=Date.now()){if(state.phase!=='reward')throw Error('reward phase required');const picked=state.pending.find(x=>x.id===id);if(!picked)throw Error('unknown reward');const missed=state.pending.find(x=>x.id!==id);const trail=state.tail?'風紋の足跡':'静かな足跡';const tone={curious:'目を輝かせて',calm:'慎重に',bold:'誇らしげに'}[state.mood];const entry={at:now,text:`${ROUTES[state.route]}から${tone}帰還。${picked.name}を採用、${missed.name}を記録。${trail}。`};const shelf=state.shelf.some(x=>x.id===picked.id)?state.shelf:[...state.shelf,picked];return{...state,phase:'setup',startedAt:null,pending:null,shelf,journal:[entry,...state.journal].slice(0,20),expeditions:state.expeditions+1,lastSeen:now}}
return{ITEMS,ROUTES,fresh,begin,tick,complete,offline,choose,rewards};
});
