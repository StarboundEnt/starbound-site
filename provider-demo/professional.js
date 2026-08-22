const proTabs=[...document.querySelectorAll('[data-pro-tab]')];
const proViews=[...document.querySelectorAll('[data-pro-view]')];

function showProfessionalView(name){
  proTabs.forEach(tab=>{const active=tab.dataset.proTab===name;tab.classList.toggle('active',active);tab.setAttribute('aria-selected',String(active))});
  proViews.forEach(view=>{const active=view.dataset.proView===name;view.classList.toggle('active',active);view.hidden=!active});
}
proTabs.forEach(tab=>tab.addEventListener('click',()=>showProfessionalView(tab.dataset.proTab)));

const monitorMeta={
  cost:{label:'Cost pressure',coverage:'4 areas',spark:'#258f84',path:'M2 24 17 18 31 20 45 14 59 16 73 8 88 11 102 3'},
  care:{label:'Caring load',coverage:'3 areas',spark:'#8660ac',path:'M2 21 17 19 31 13 45 17 59 11 73 14 88 8 102 10'},
  access:{label:'Travel barriers',coverage:'2 areas',spark:'#4c83b5',path:'M2 24 17 21 31 23 45 17 59 18 73 11 88 14 102 8'},
  energy:{label:'Low capacity',coverage:'4 areas',spark:'#c35689',path:'M2 20 17 22 31 16 45 18 59 13 73 15 88 11 102 12'}
};
const monitorRows=document.querySelector('#monitorRows');
let monitorSelected=signals[0];

function renderMonitorRows(order=signals){
  monitorRows.innerHTML=order.map(signal=>{const meta=monitorMeta[signal.id];return `<tr data-signal="${signal.id}" class="${signal.id===monitorSelected.id?'active':''}"><td><strong>${meta.label}</strong><span>${signal.short}</span></td><td><svg class="spark" viewBox="0 0 104 30" aria-hidden="true" style="--spark:${meta.spark}"><path d="${meta.path}"/></svg></td><td><strong>${signal.delta}</strong></td><td><span class="confidence-pill">${signal.score}%</span></td><td>${meta.coverage}</td><td><span class="status-pill ${signal.score<75?'watch':''}">${signal.status}</span></td></tr>`}).join('');
  monitorRows.querySelectorAll('tr[data-signal]').forEach(row=>row.addEventListener('click',()=>selectMonitorSignal(row.dataset.signal)));
}
function selectMonitorSignal(id){
  monitorSelected=signals.find(signal=>signal.id===id);
  const meta=monitorMeta[id];
  document.querySelector('#monitorCode').textContent=monitorSelected.code;
  document.querySelector('#monitorTitle').textContent=meta.label;
  document.querySelector('#monitorSummary').textContent=monitorSelected.short;
  document.querySelector('#monitorDelta').textContent=monitorSelected.delta;
  document.querySelector('#monitorScore').textContent=`${monitorSelected.score}%`;
  document.querySelector('#monitorBoundary').textContent=monitorSelected.cannot;
  monitorRows.querySelectorAll('tr').forEach(row=>row.classList.toggle('active',row.dataset.signal===id));
}
document.querySelector('#monitorSort').addEventListener('change',event=>{
  const ordered=[...signals].sort(event.target.value==='confidence'?(a,b)=>b.score-a.score:(a,b)=>parseInt(b.delta)-parseInt(a.delta));
  renderMonitorRows(ordered);
});
document.querySelector('#monitorExplore').addEventListener('click',()=>showProfessionalView('brief'));

const boardCopy={
  cost:{code:'Selected pattern · SB–047',title:'Cost pressure',summary:'Stronger in four overlapping service areas, with travel appearing alongside it.',coverage:'842 contributions',persistence:'9 of 12 weeks',community:'Review scheduled',question:'Where could a no-cost route be made visible at first contact?'},
  access:{code:'Selected pattern · SB–061',title:'Travel barriers',summary:'Distance and transport are appearing around more abandoned next steps in two areas.',coverage:'304 contributions',persistence:'6 of 12 weeks',community:'Local review needed',question:'Which suitable steps could be completed without another trip?'},
  care:{code:'Selected pattern · SB–052',title:'Caring load',summary:'Requests for flexible and asynchronous support are stronger around irregular caring windows.',coverage:'613 contributions',persistence:'8 of 12 weeks',community:'Review scheduled',question:'Which part of this pathway assumes people control their own time?'},
  energy:{code:'Selected pattern · SB–058',title:'Low capacity',summary:'Requests for fewer decisions and less setup are clustering across four service areas.',coverage:'577 contributions',persistence:'7 of 12 weeks',community:'Equity review needed',question:'Which first step could still work on someone’s hardest day?'}
};
document.querySelectorAll('[data-board-signal]').forEach(node=>node.addEventListener('click',()=>{
  const copy=boardCopy[node.dataset.boardSignal];
  document.querySelectorAll('[data-board-signal]').forEach(item=>item.classList.toggle('active',item===node));
  document.querySelector('#boardCode').textContent=copy.code;document.querySelector('#boardTitle').textContent=copy.title;document.querySelector('#boardSummary').textContent=copy.summary;document.querySelector('#boardCoverage').textContent=copy.coverage;document.querySelector('#boardPersistence').textContent=copy.persistence;document.querySelector('#boardCommunity').textContent=copy.community;document.querySelector('#boardQuestion').textContent=copy.question;
}));

renderMonitorRows();
