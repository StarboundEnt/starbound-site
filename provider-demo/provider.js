const signals=[
  {id:'cost',icon:'$',title:'Cost pressure is reshaping care choices',short:'Requests for free, existing or lower-friction options are rising.',rate:'34%',delta:'+11 pts',status:'Ready to explore',score:86,code:'SB-047',summary:'People are more often asking for options that avoid a new appointment, paid product or extra trip.',checks:[['Privacy','842 people','pass'],['Persistence','9 of 12 weeks','pass'],['Corroboration','3 signal types','pass'],['Equity','4 areas checked','pass']],can:'Cost is repeatedly appearing alongside delayed or lower-friction care preferences in this cohort.',cannot:'That cost caused a particular health outcome, or that every person in this community has the same barrier.',question:'“Where could we remove a cost, travel or appointment step from the first contact?”',nodes:['Transport','Care access','Missed meals','Shift work'],options:['Offer a no-cost pathway at first contact','Publish total expected costs before referral','Test pharmacy or telehealth routes']},
  {id:'care',icon:'24h',title:'Caring load is compressing available time',short:'Support is more often requested around irregular windows.',rate:'27%',delta:'+7 pts',status:'Ready to explore',score:81,code:'SB-052',summary:'Caring responsibilities are repeatedly paired with requests for flexible, short or asynchronous support.',checks:[['Privacy','613 people','pass'],['Persistence','8 of 12 weeks','pass'],['Corroboration','2 signal types','pass'],['Equity','3 areas checked','pass']],can:'Time flexibility appears to matter more in contributions that also mention caring responsibilities.',cannot:'That caring responsibilities explain a condition, or that a single service format will suit all carers.',question:'“Which part of this pathway assumes people control their own time?”',nodes:['Sleep','Appointments','Low energy','Support'],options:['Add after-hours contact options','Let people pause and resume intake','Ask about timing before booking']},
  {id:'access',icon:'↗',title:'Travel is narrowing service reach',short:'Distance and transport appear in more abandoned next steps.',rate:'19%',delta:'+5 pts',status:'Keep watching',score:68,code:'SB-061',summary:'Travel barriers are increasing, but the pattern is not yet consistent across every service area.',checks:[['Privacy','304 people','pass'],['Persistence','6 of 12 weeks','warn'],['Corroboration','2 signal types','pass'],['Equity','2 areas checked','warn']],can:'Travel is a recurring barrier in two areas and merits local follow-up.',cannot:'That the pattern applies partnership-wide, or that transport alone explains service drop-off.',question:'“What can be completed without requiring another trip?”',nodes:['Digital access','Cost','Mobility','Appointments'],options:['Map phone-accessible alternatives','Combine suitable appointments','Validate the pattern with local partners']},
  {id:'energy',icon:'LOW',title:'Low capacity is compounding simple tasks',short:'More people need steps with less setup and fewer decisions.',rate:'31%',delta:'+4 pts',status:'Keep watching',score:73,code:'SB-058',summary:'Low energy, disrupted sleep and constant stress are clustering around requests for simpler next steps.',checks:[['Privacy','577 people','pass'],['Persistence','7 of 12 weeks','pass'],['Corroboration','3 signal types','pass'],['Equity','Review needed','warn']],can:'Multiple capacity signals are clustering, especially where tasks require preparation or follow-through.',cannot:'That the cluster is a diagnosis, severity score or prediction of an individual outcome.',question:'“Which first step could still work on someone’s hardest day?”',nodes:['Sleep','Stress','Meals','Medication load'],options:['Reduce first-step decisions','Offer one action before a full plan','Check instructions for cognitive load']}
];
let selected=signals[0];
const $=selector=>document.querySelector(selector);
function renderList(){
  $('#signalList').innerHTML=signals.map((s,i)=>`<button class="signal-card" data-id="${s.id}" aria-pressed="${s.id===selected.id}"><span class="signal-icon">${s.icon}</span><span><h3>${s.title}</h3><p>${s.short}</p></span><span class="signal-meta"><strong>${s.rate}</strong><span>${s.delta} over baseline</span></span></button>`).join('');
  document.querySelectorAll('.signal-card').forEach(card=>card.addEventListener('click',()=>{selected=signals.find(s=>s.id===card.dataset.id);renderList();renderValidation()}));
}
function renderValidation(){
  $('#validationCode').textContent=selected.code;$('#validationStatus').textContent=selected.status;$('#validationScore').textContent=`${selected.score}%`;$('#validationTitle').textContent=selected.title;$('#validationSummary').textContent=selected.summary;$('#canSay').textContent=selected.can;$('#cannotSay').textContent=selected.cannot;
  $('#statusOrb').style.background=selected.score<75?'#d5a32d':'#18a897';
  $('#validationBeam').innerHTML=selected.checks.map(c=>`<div class="beam-check ${c[2]==='warn'?'warn':''}"><strong>${c[0]}</strong><span>${c[1]}</span></div>`).join('');
}
function renderAction(){
  $('#planningQuestion').textContent=selected.question;$('#responseOptions').innerHTML=selected.options.map(x=>`<span>${x}</span>`).join('');
  const positions=[[18,18],[72,17],[16,70],[74,72]];
  $('#orbitMap').innerHTML='<span class="orbit-node">'+selected.title.split(' ').slice(0,3).join(' ')+'</span>'+selected.nodes.map((n,i)=>`<span class="orbit-node context" style="left:${positions[i][0]}%;top:${positions[i][1]}%">${n}</span>`).join('');
  $('#actionView').classList.add('open');$('#actionView').scrollIntoView({behavior:'smooth'});
}
$('#exploreButton').addEventListener('click',renderAction);
$('#closeAction').addEventListener('click',()=>$('#actionView').classList.remove('open'));
$('#noteButton').addEventListener('click',()=>{$('#noteStatus').textContent='Added to this demo planning session.';setTimeout(()=>$('#noteStatus').textContent='',2800)});
const privacyTrigger=$('#privacyButton')||$('#ctaPrivacy');
privacyTrigger?.addEventListener('click',()=>$('#privacyDialog')?.showModal());
$('#privacyClose')?.addEventListener('click',()=>$('#privacyDialog')?.close());
$('#privacyDialog')?.addEventListener('click',event=>{if(event.target===$('#privacyDialog'))$('#privacyDialog').close()});
$('#walkthroughRequest')?.addEventListener('click',()=>$('#walkthroughDialog').showModal());
$('#walkthroughClose')?.addEventListener('click',()=>$('#walkthroughDialog').close());
$('#walkthroughDialog')?.addEventListener('click',event=>{if(event.target===$('#walkthroughDialog'))$('#walkthroughDialog').close()});
$('#walkthroughForm')?.addEventListener('submit',()=>{
  const status=$('#walkthroughStatus');
  status.textContent='Sending message...';
  setTimeout(()=>{status.textContent='Message submitted. I will follow up by email.'},900);
});
function showDemoToast(message){
  const toast=$('#demoToast');
  if(!toast)return;
  toast.textContent=message;
  toast.classList.add('show');
  clearTimeout(showDemoToast.timer);
  showDemoToast.timer=setTimeout(()=>toast.classList.remove('show'),2600);
}
document.querySelectorAll('.snapshot-question button,.response-step-detail button,.service-test button,#monitorExplore').forEach(button=>{
  button.addEventListener('click',()=>{
    const label=button.textContent.trim();
    showDemoToast(`${label} saved in this prototype session.`);
  });
});
document.querySelectorAll('.response-step select').forEach(select=>{
  select.addEventListener('change',()=>{
    if(select.selectedIndex>0)showDemoToast(`Owner set to ${select.value} for this prototype step.`);
  });
});
const analyticsTabs=[...document.querySelectorAll('[data-analytics-tab]')];
const analyticsViews=[...document.querySelectorAll('[data-analytics-view]')];
analyticsTabs.forEach(tab=>tab.addEventListener('click',()=>{
  const view=tab.dataset.analyticsTab;
  analyticsTabs.forEach(item=>{const active=item===tab;item.classList.toggle('active',active);item.setAttribute('aria-selected',String(active))});
  analyticsViews.forEach(panel=>{const active=panel.dataset.analyticsView===view;panel.classList.toggle('active',active);panel.hidden=!active});
}));
renderList();renderValidation();
