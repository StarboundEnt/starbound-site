const inboxSignals={
  access:{title:'Free and confidential support questions are rising before urgent and after-hours questions.',short:'Free and confidential mental-health support',summary:'Cost, privacy and service access appear repeatedly across the related health-question groups.',delta:24,status:'Ready to explore',checks:5,cohort:'Youth 16-24 · North River',question:'Why are more young people seeking free and confidential support before urgent help?',finding:'Urgent-support searches are now 16% above baseline.',interpretation:'Two independent health-support signal groups are moving in sequence. This is worth investigating; it does not show that the same people made both searches or that one caused the other.',primary:'Free + confidential support',secondary:'Urgent + after-hours support'},
  sleep:{title:'Sleep difficulty conversations are increasing among young people.',short:'Sleep difficulty conversations',summary:'Questions about persistent sleep disruption increasingly mention study strain and anxiety.',delta:18,status:'Ready to explore',checks:5,cohort:'Youth 16-19 · All areas',question:'Where could earlier sleep and anxiety support become visible?',finding:'Sleep-related questions remain elevated across seven weeks.',interpretation:'The pattern is persistent and corroborated, but it does not establish a diagnosis or a single underlying cause.',primary:'Sleep difficulty',secondary:'Anxiety + study strain'},
  study:{title:'Work and study strain are increasingly appearing together.',short:'Work and study strain',summary:'Time pressure, casual work and assessment stress are co-occurring more often.',delta:15,status:'Keep watching',checks:4,cohort:'Youth 16-24 · Central Plains',question:'Are service hours aligned with young people balancing work and study?',finding:'The pattern is broadening but has not passed every check.',interpretation:'Several related themes are moving together; equity review is still in progress.',primary:'Work strain',secondary:'Study pressure'},
  eating:{title:'Eating-concern questions are rising among teen cohorts.',short:'Eating concerns among teens',summary:'Body-image, appetite and food-related distress themes are increasing together.',delta:12,status:'Keep watching',checks:4,cohort:'Youth 12-19 · All areas',question:'Where can safe, age-appropriate early support be made clearer?',finding:'A persistent movement is visible in two age cohorts.',interpretation:'The signal requires further corroboration before it is ready for planning use.',primary:'Eating concerns',secondary:'Body-image distress'},
  loneliness:{title:'Loneliness and isolation mentions are broadening geographically.',short:'Loneliness and isolation',summary:'Questions about connection and belonging now appear across more service areas.',delta:11,status:'Keep watching',checks:4,cohort:'Youth 16-24 · South Coast',question:'Which cohorts have the fewest visible routes into connection and support?',finding:'Geographic coverage is widening slowly.',interpretation:'The movement is persistent, but the strength differs considerably between areas.',primary:'Loneliness',secondary:'Connection support'},
  travel:{title:'Travel barriers are shaping requests for closer-to-home care.',short:'Travel barriers',summary:'Remote, nearby and public-transport-accessible options are requested more often.',delta:9,status:'Keep watching',checks:4,cohort:'Youth 16-24 · South Coast',question:'Where could a lower-travel pathway be offered at first contact?',finding:'Travel friction is appearing earlier in care-navigation questions.',interpretation:'The signal is useful for investigation but does not show that travel caused a missed service.',primary:'Travel friction',secondary:'Closer care'},
  selfharm:{title:'Self-harm information searches are elevated and require careful review.',short:'Self-harm information searches',summary:'The signal has passed privacy and persistence checks and is restricted to aggregate review.',delta:14,status:'Ready to explore',checks:5,cohort:'Youth 16-24 · All areas',question:'Are safe urgent-support pathways visible at the moment they are needed?',finding:'Information and urgent-support themes are both elevated.',interpretation:'This aggregate movement cannot identify a person, diagnosis or individual level of risk.',primary:'Information seeking',secondary:'Urgent support'},
  bereavement:{title:'Bereavement support needs show a small persistent movement.',short:'Bereavement support needs',summary:'Grief, loss and support themes remain slightly above their expected range.',delta:6,status:'Keep watching',checks:3,cohort:'Youth 12-24 · All areas',question:'Is age-appropriate grief support visible across the catchment?',finding:'The movement is persistent but remains modest.',interpretation:'More time and corroboration are needed before this becomes a planning signal.',primary:'Grief questions',secondary:'Support seeking'}
};
let selectedInboxSignal='access';
const workspaceButtons=[...document.querySelectorAll('[data-workspace-view]')];
const workspacePanels=[...document.querySelectorAll('[data-workspace-panel]')];
function showWorkspace(view){
  workspaceButtons.forEach(button=>{const active=button.dataset.workspaceView===view;button.classList.toggle('active',active);button.setAttribute('aria-selected',String(active))});
  workspacePanels.forEach(panel=>{const active=panel.dataset.workspacePanel===view;panel.classList.toggle('active',active);panel.hidden=!active});
}
function renderInboxSignal(key){
  selectedInboxSignal=key;const signal=inboxSignals[key];
  document.querySelectorAll('[data-inbox-signal]').forEach(button=>button.classList.toggle('active',button.dataset.inboxSignal===key));
  document.querySelector('#inboxStatus').textContent=`${signal.status} · illustrative`;
  document.querySelector('#inboxDelta').textContent=`+${signal.delta}%`;
  document.querySelector('#inboxTitle').textContent=signal.title;
  document.querySelector('#inboxSummary').textContent=signal.summary;
  document.querySelector('#inboxCohort').textContent=signal.cohort;
  document.querySelector('#inboxPrimaryLegend').textContent=signal.primary;
  document.querySelector('#inboxSecondaryLegend').textContent=signal.secondary;
  document.querySelector('#inboxChecks').textContent=`${signal.checks} / 5 checks passed`;
  document.querySelector('#inboxQuestion').textContent=signal.question;
}
function applyInboxSignalToCanvas(){
  const signal=inboxSignals[selectedInboxSignal];
  document.querySelector('#canvasSignalName').textContent=signal.short;
  document.querySelector('#canvasHeroTitle').textContent=signal.title;
  document.querySelector('#canvasHeroSummary').textContent=`${signal.summary} Up ${signal.delta}% across the eight-week illustrative window.`;
  document.querySelector('#canvasChartLabel').textContent=`${signal.short} · eight-week trend`;
  document.querySelector('#canvasPrimaryLegend').textContent=signal.primary;
  document.querySelector('#canvasSecondaryLegend').textContent=signal.secondary;
  document.querySelector('#canvasStatus').textContent=signal.status;
  document.querySelector('#canvasDelta').textContent=`+${signal.delta}%`;
  document.querySelector('#canvasDelta').dataset.count=signal.delta;
  document.querySelector('#canvasFinding').textContent=signal.finding;
  document.querySelector('#canvasInterpretation').textContent=signal.interpretation;
  document.querySelector('#canvasChecksPassed').textContent=`${signal.checks} of 5 checks passed`;
  const cohortParts=signal.cohort.split(' · ');
  document.querySelector('#fieldNoteDelta').textContent=`+${signal.delta}%`;
  document.querySelector('#fieldNoteCohort').textContent=cohortParts[0];
  document.querySelector('#fieldNoteScope').textContent=cohortParts[1]||'All areas';
  document.querySelector('#fieldNoteStatus').textContent=signal.status;
  if(typeof regionData!=='undefined')Object.values(regionData).forEach(profile=>profile.title=signal.short);
  const equityButton=document.querySelector('[data-check="equity"]');
  equityButton.querySelector('i').textContent=signal.checks===5?'✓':'…';
  equityButton.classList.toggle('pending',signal.checks<5);
  showPopulationPanel('signals');showWorkspace('canvas');
}
workspaceButtons.forEach(button=>button.addEventListener('click',()=>button.dataset.workspaceView==='canvas'?applyInboxSignalToCanvas():showWorkspace('inbox')));
document.querySelectorAll('[data-inbox-signal]').forEach(button=>button.addEventListener('click',()=>renderInboxSignal(button.dataset.inboxSignal)));
document.querySelector('#openInvestigation').addEventListener('click',applyInboxSignalToCanvas);
document.querySelector('#backToInbox').addEventListener('click',()=>showWorkspace('inbox'));

const populationTabs=[...document.querySelectorAll('[data-pop-tab]')];
const populationPanels=[...document.querySelectorAll('[data-pop-panel]')];

function showPopulationPanel(name){
  populationTabs.forEach(tab=>{const active=tab.dataset.popTab===name;tab.setAttribute('aria-selected',String(active))});
  populationPanels.forEach(panel=>{const active=panel.dataset.popPanel===name;panel.classList.toggle('active',active);panel.hidden=!active});
  const routeIndex={signals:0,drivers:1,map:2,action:3}[name];
  document.querySelectorAll('.canvas-route li').forEach((item,index)=>item.classList.toggle('active',index===routeIndex));
}
populationTabs.forEach(tab=>tab.addEventListener('click',()=>showPopulationPanel(tab.dataset.popTab)));
document.querySelectorAll('[data-open-panel]').forEach(button=>button.addEventListener('click',()=>showPopulationPanel(button.dataset.openPanel)));

const driverDetails={
  cost:{title:'Cost pressure',type:'Chance',evidence:'Requests for free, bulk-billed or no-cost support appear across three sufficiently large health-question groups.',question:'Could clearer no-cost pathways reduce friction at first contact?',implication:'A support pathway cannot help if it feels unaffordable, visible or out of reach.'},
  access:{title:'Service access',type:'Chance',evidence:'Questions increasingly ask for nearby, available and after-hours services before describing a clinical preference.',question:'Where are service availability gaps shaping the first route into support?',implication:'Availability is part of the intervention when the right service cannot be reached.'},
  privacy:{title:'Confidentiality concerns',type:'Chance',evidence:'Privacy, parental visibility and confidential-care questions persist across three age and service-area cohorts.',question:'Can confidentiality be explained earlier and more clearly?',implication:'A pathway that does not feel private may not feel available.'},
  housing:{title:'Housing instability',type:'Chance',evidence:'Housing stress and temporary-accommodation themes are appearing alongside requests for flexible support.',question:'Which pathways remain usable when a young person’s address or living situation changes?',implication:'Continuity becomes harder when the conditions around care are unstable.'},
  timing:{title:'Help-seeking timing',type:'Choice',evidence:'More questions arrive outside standard service hours and after several lower-intensity information searches.',question:'Could support be made visible earlier in the help-seeking sequence?',implication:'The moment a person asks for help shapes which pathways can still work.'},
  selfmanagement:{title:'Self-management attempts',type:'Choice',evidence:'Questions about managing symptoms alone appear before requests for formal support across two sufficiently large cohorts.',question:'Could low-friction professional support become visible alongside self-management information?',implication:'Self-management can be useful, but it should not become the only visible route.'},
  peer:{title:'Peer-led navigation',type:'Choice',evidence:'Young people increasingly ask friends, forums and peer networks where to find appropriate support.',question:'Could trusted peer channels carry clearer, validated service pathways?',implication:'People often begin navigating care through someone they already trust.'}
};
let selectedDriverCategory='chance';
function selectDriver(key){
  const detail=driverDetails[key];
  document.querySelectorAll('[data-driver]').forEach(button=>button.classList.toggle('active',button.dataset.driver===key));
  document.querySelector('#selectedDriverType').textContent=detail.type;
  document.querySelector('#selectedDriverTitle').textContent=detail.title;
  document.querySelector('#selectedDriverEvidence').textContent=detail.evidence;
  document.querySelector('#selectedDriverQuestion').textContent=detail.question;
  document.querySelector('#driverImplication').textContent=`“${detail.implication}”`;
  document.querySelector('.driver-evidence').classList.toggle('choice',detail.type==='Choice');
}
function selectDriverCategory(category){
  selectedDriverCategory=category;const chance=category==='chance';
  document.querySelectorAll('[data-driver-category]').forEach(button=>{const active=button.dataset.driverCategory===category;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active))});
  document.querySelectorAll('[data-driver]').forEach(button=>button.classList.toggle('muted',button.dataset.category!==category));
  document.querySelector('#driverShare').textContent=chance?'61%':'39%';
  document.querySelector('#driverCategoryLabel').textContent=chance?'Chances':'Choices';
  document.querySelector('#driverCategoryEyebrow').textContent=chance?'Conditions around access':'Day-to-day behaviour';
  document.querySelector('#driverCategoryTitle').textContent=chance?'Most signal growth tracks to chances.':'A smaller share of signal growth tracks to choices.';
  document.querySelector('#driverCategoryCopy').textContent=chance?'Cost, confidentiality and service availability are moving faster than individual behaviour patterns in this cohort.':'Help-seeking timing is the strongest behavioural contributor visible in this illustrative cohort.';
  const first=document.querySelector(`[data-driver][data-category="${category}"]`);if(first)selectDriver(first.dataset.driver);
}
document.querySelectorAll('[data-driver-category]').forEach(button=>button.addEventListener('click',()=>selectDriverCategory(button.dataset.driverCategory)));
document.querySelectorAll('[data-driver]').forEach(button=>button.addEventListener('click',()=>{selectDriverCategory(button.dataset.category);selectDriver(button.dataset.driver)}));
document.querySelectorAll('[data-response-step]').forEach(button=>button.addEventListener('click',()=>{
  const step=button.closest('.response-step');const detail=step.querySelector('.response-step-detail');const open=!step.classList.contains('open');
  step.classList.toggle('open',open);button.setAttribute('aria-expanded',String(open));detail.hidden=!open;
}));

function animateSignalCount(){
  const output=document.querySelector('.count-up');
  if(!output||output.dataset.played)return;
  output.dataset.played='true';
  const target=Number(output.dataset.count);let value=0;
  const timer=setInterval(()=>{value=Math.min(target,value+2);output.textContent=`+${value}%`;if(value===target)clearInterval(timer)},45);
}
requestAnimationFrame(animateSignalCount);

const weekStories=[
  ['Week 1 · Baseline','Affordable and confidential support questions remain within the expected range.'],
  ['Week 2 · Early movement','Cost and confidentiality themes begin appearing more often.'],
  ['Week 3 · Pattern forming','Access questions rise across two sufficiently large cohorts.'],
  ['Week 4 · Persistent','The access signal has now remained elevated for three consecutive weeks.'],
  ['Week 5 · Second signal appears','Urgent and after-hours support questions begin moving above baseline.'],
  ['Week 6 · Corroborated','Related question groups move in the same direction across three service areas.'],
  ['Week 7 · Equity reviewed','Small groups remain suppressed; four publishable areas pass review.'],
  ['Week 8 · Ready to explore','Access questions are 24% above baseline; urgent-support questions are 16% above baseline.']
];
const signalWeek=document.querySelector('#signalWeek');
function renderSignalWeek(){
  if(!signalWeek)return;
  const week=Number(signalWeek.value);const story=weekStories[week-1];
  document.querySelector('#weekLabel').textContent=`Week ${week}`;
  document.querySelector('#weekDetail').innerHTML=`<strong>${story[0]}</strong><span>${story[1]}</span>`;
  document.querySelector('#signalReveal').style.clipPath=`inset(0 ${((8-week)/8)*100}% 0 0)`;
  document.querySelector('.emerging-chart').classList.add('timeline-active');
  document.querySelector('.emerging-chart').classList.toggle('timeline-before-lag',week<5);
}
signalWeek?.addEventListener('input',renderSignalWeek);

const validationEvidence={
  privacy:['Privacy threshold','842 consented contributions are included. The minimum publishable cohort is 20; no individual record is available.'],
  persistence:['Persistence','The access signal is above its expected range in 7 of 8 weeks, rather than appearing as a one-week spike.'],
  corroboration:['Corroboration','Cost, confidentiality and service-access question groups all move in the same direction across three publishable cohorts.'],
  sequence:['Sequence check','Urgent and after-hours questions begin moving in week 5, three weeks after the access signal first rises. Timing is visible; causation is not claimed.'],
  equity:['Equity review','Four areas meet the publication and representation checks. Groups below 20 remain suppressed and do not appear in comparisons.']
};
const evidencePanel=document.querySelector('#validationEvidence');
document.querySelectorAll('[data-check]').forEach((button,index)=>{
  if(index===0)button.classList.add('active');
  button.addEventListener('click',()=>{
    document.querySelectorAll('[data-check]').forEach(item=>item.classList.toggle('active',item===button));
    const evidence=validationEvidence[button.dataset.check];
    evidencePanel.innerHTML=`<span>Selected evidence · ${evidence[0]}</span><p>${evidence[1]}</p>`;
  });
});

const regionData={
  north:{title:'Free and confidential support questions',name:'North River · illustrative',complexity:24,change:'↑ 8 points vs previous eight weeks',values:[20,17,24,39],privacy:'842 contributions · minimum cohort passed.'},
  central:{title:'Free and confidential support questions',name:'Central Plains · illustrative',complexity:12,change:'↑ 3 points vs previous eight weeks',values:[16,19,25,40],privacy:'516 contributions · minimum cohort passed.'},
  coast:{title:'Free and confidential support questions',name:'South Coast · illustrative',complexity:19,change:'↑ 6 points vs previous eight weeks',values:[24,15,27,34],privacy:'327 contributions · equity review passed.'}
};
const cohortData={
  all:{title:'All mental-health support questions',name:'All service areas · illustrative',complexity:18,change:'↑ 5 points vs previous eight weeks',values:[20,17,24,39],privacy:'842 contributions · minimum cohort passed.'},
  confidential:{title:'Confidentiality-related questions',name:'All service areas · illustrative',complexity:21,change:'↑ 5 points vs previous eight weeks',values:[14,18,31,37],privacy:'286 contributions · minimum cohort passed.'},
  cost:{title:'Cost-related questions',name:'All service areas · illustrative',complexity:26,change:'↑ 7 points vs previous eight weeks',values:[32,14,23,31],privacy:'244 contributions · minimum cohort passed.'},
  urgent:{title:'Urgent and after-hours questions',name:'All service areas · illustrative',complexity:16,change:'↑ 4 points vs previous eight weeks',values:[17,20,22,41],privacy:'147 contributions · equity review passed.'}
};
const ageData={
  young:{title:'Young people aged 12-15',name:'All service areas · illustrative',complexity:14,change:'↑ 2 points vs previous eight weeks',values:[16,18,22,44],privacy:'214 contributions · minimum cohort passed.'},
  core:{title:'Young people aged 16-19',name:'All service areas · illustrative',complexity:22,change:'↑ 5 points vs previous eight weeks',values:[22,17,25,36],privacy:'371 contributions · minimum cohort passed.'},
  older:{title:'Young people aged 20-24',name:'All service areas · illustrative',complexity:17,change:'↑ 3 points vs previous eight weeks',values:[21,16,26,37],privacy:'257 contributions · minimum cohort passed.'}
};
const regionBars=['Stable','Managing','Stretched','Survival'];
const populationDriverLabels=['Cost pressure','Service access','Other chances','Choices'];
document.querySelector('.complexity-summary .summary-label').textContent='Selected signal and area';
document.querySelector('.headline-stat span').textContent='increase in the selected signal over eight weeks';
document.querySelectorAll('.state-bars>div>span').forEach((item,index)=>item.textContent=populationDriverLabels[index]);
document.querySelectorAll('.state-bars i').forEach((item,index)=>item.style.setProperty('--tone',['#2eb4a3','#58a8c8','#7658c8','#f08a4b'][index]));
const intensityLabels=['0-9% change','10-14% change','15-19% change','20%+ change'];
document.querySelectorAll('.complexity-legend span').forEach((item,index)=>{const marker=item.querySelector('i');item.textContent=intensityLabels[index];item.prepend(marker)});
document.querySelector('.administrative-map img').alt='Illustrative administrative map showing the eight-week change in the selected community signal across fictional health-service planning areas';
function updateMapSummary(profile){
  document.querySelector('#cohortTitle').textContent=profile.title;
  document.querySelector('#regionName').textContent=profile.name;
  document.querySelector('#regionComplexity').textContent=`${profile.complexity}%`;
  document.querySelector('#regionChange').textContent=profile.change;
  document.querySelector('#regionPrivacy').textContent=profile.privacy;
  regionBars.forEach((label,index)=>{
    document.querySelector(`#bar${label}`).style.setProperty('--bar',`${profile.values[index]}%`);
    document.querySelector(`#value${label}`).textContent=`${profile.values[index]}%`;
  });
}
updateMapSummary(regionData.north);
document.querySelector('.driver-table').setAttribute('aria-label','Drivers associated with the selected signal change');
document.querySelectorAll('[data-region]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-region]').forEach(item=>item.classList.toggle('active',item===button));
  updateMapSummary(regionData[button.dataset.region]);
  document.querySelectorAll('[data-profile]').forEach(item=>item.classList.toggle('active',item.dataset.profile===button.dataset.region));
}));

const viewOptions={
  area:{instruction:'Select a service area',items:[['north','North River'],['central','Central Plains'],['coast','South Coast']]},
  cohort:{instruction:'Compare question cohorts',items:[['all','All questions'],['confidential','Confidentiality'],['cost','Cost'],['urgent','Urgent support']]},
  age:{instruction:'Compare age bands',items:[['young','12-15'],['core','16-19'],['older','20-24']]}
};
function renderMapView(view){
  const tray=document.querySelector('#mapFilterTray');const config=viewOptions[view];
  tray.innerHTML=`<span>${config.instruction}</span>${config.items.map((item,index)=>`<button type="button" data-profile="${item[0]}" class="${index===0?'active':''}">${item[1]}</button>`).join('')}`;
  const areaView=view==='area';
  document.querySelectorAll('[data-region]').forEach(item=>item.classList.toggle('is-hidden',!areaView));
  document.querySelector('.administrative-map').classList.toggle('aggregate-view',!areaView);
  document.querySelector('#mapInstruction').textContent=areaView?'Select a region on the map or use the controls above.':'The map remains geographic context while the selected aggregate cohort updates.';
  const source=view==='area'?regionData:view==='cohort'?cohortData:ageData;
  updateMapSummary(source[config.items[0][0]]);
  tray.querySelectorAll('[data-profile]').forEach(button=>button.addEventListener('click',()=>{
    tray.querySelectorAll('[data-profile]').forEach(item=>item.classList.toggle('active',item===button));
    updateMapSummary(source[button.dataset.profile]);
    if(areaView)document.querySelectorAll('[data-region]').forEach(item=>item.classList.toggle('active',item.dataset.region===button.dataset.profile));
  }));
}

document.querySelectorAll('[data-map-view]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.map-controls button').forEach(item=>item.classList.toggle('active',item===button));
  renderMapView(button.dataset.mapView);
}));
renderMapView('area');

document.querySelector('#ctaPrivacy').addEventListener('click',()=>document.querySelector('#privacyDialog').showModal());
