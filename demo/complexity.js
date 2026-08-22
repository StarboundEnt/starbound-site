const determinants = [
  {id:'cost',label:'Cost pressure',weight:2,reason:'cost pressure'},
  {id:'care',label:'Caring responsibilities',weight:2,reason:'caring load'},
  {id:'access',label:'Hard to access care',weight:2,reason:'care access'},
  {id:'housing',label:'Unstable housing',weight:3,reason:'housing stability'},
  {id:'transport',label:'Limited transport',weight:1,reason:'transport limits'},
  {id:'support',label:'Limited social support',weight:2,reason:'limited support'},
  {id:'work',label:'Unpredictable work hours',weight:2,reason:'unpredictable hours'},
  {id:'digital',label:'Limited data or internet',weight:1,reason:'digital access'}
];
const behaviours = [
  {id:'sleep',label:'Sleep is disrupted',weight:2,reason:'disrupted sleep'},
  {id:'meals',label:'Often missing meals',weight:2,reason:'missed meals'},
  {id:'energy',label:'Energy feels low',weight:2,reason:'low energy'},
  {id:'movement',label:'Movement feels difficult',weight:1,reason:'movement barriers'},
  {id:'meds',label:'Medication is hard to manage',weight:2,reason:'medication load'},
  {id:'stress',label:'Stress feels constant',weight:2,reason:'constant stress'}
];
const profiles = [
  {key:'stable',max:2,name:'Stable',focus:'Room to build',description:'There is enough bandwidth for planning, experimentation and longer-term goals.'},
  {key:'friction',max:6,name:'Managing with friction',focus:'Keep it flexible',description:'A few pressures are competing for attention. Small, adaptable steps are more likely to fit.'},
  {key:'trying',max:11,name:'Tired but trying',focus:'Reduce the load',description:'Effort is present, but the surrounding conditions make consistency genuinely difficult.'},
  {key:'overloaded',max:17,name:'Overloaded',focus:'Protect the basics',description:'Several pressures are converging. Support should remove work rather than add another task.'},
  {key:'survival',max:99,name:'Survival mode',focus:'Immediate support',description:'Bandwidth is extremely limited. Immediate needs, safety and practical support come first.'}
];
const questions = {
  energy:{tab:'How can I get more energy?',title:'Build more energy through the day',generic:'A consistent routine can support steadier energy.',steps:['Aim for 7–9 hours of sleep at regular times.','Eat balanced meals and drink water throughout the day.','Add 30 minutes of moderate movement most days.']},
  sleep:{tab:'How can I sleep better?',title:'Create a routine that signals rest',generic:'Good sleep habits can make it easier to wind down.',steps:['Keep the same sleep and wake time each day.','Avoid screens and caffeine close to bedtime.','Make your room dark, quiet and comfortable.']},
  food:{tab:'How can I eat healthier?',title:'Make balanced food the easy option',generic:'Planning ahead can make nutritious choices more consistent.',steps:['Plan balanced meals for the coming week.','Prepare healthy snacks and ingredients in advance.','Include vegetables, protein and whole grains.']},
  stress:{tab:'How can I manage stress?',title:'Create space for recovery',generic:'Regular stress-management practices can support wellbeing.',steps:['Practise ten minutes of mindfulness each day.','Make time for regular exercise and restorative sleep.','Write down priorities and break large tasks into steps.']},
  movement:{tab:'How can I move more safely?',title:'Find a sustainable way to move',generic:'Regular movement can support physical and mental wellbeing.',steps:['Choose an activity that feels manageable and enjoyable.','Start gradually and increase time or intensity over time.','Seek professional advice if symptoms make movement difficult.']},
  medication:{tab:'How can I manage my medication?',title:'Make medication easier to manage',generic:'A consistent medication routine can reduce missed doses.',steps:['Follow the directions on the label or from your clinician.','Use a reminder or organiser if appropriate.','Ask a pharmacist about side effects, timing or interactions.']},
  care:{tab:'How can I find the right care?',title:'Find the most suitable support',generic:'The right service depends on the concern and how urgent it is.',steps:['Write down the main concern and how long it has been happening.','Start with an appropriate health professional or service.','Seek urgent help if symptoms are severe or rapidly worsening.']},
  general:{title:'Turn the question into a practical next step',generic:'Start by clarifying the goal, then choose a manageable action.',steps:['Identify the most important part of the question.','Choose one realistic action to try first.','Use qualified support when the issue needs individual assessment.']}
};

const selected = new Set();
let currentQuestion = 'energy';
let customQuestionActive = false;
const alienVisitors=['teal','lavender','orange','coral','lime','blue'];
const visitAlien = Math.floor(Math.random()*alienVisitors.length);
const aiEndpoint=window.STARBOUND_AI_ENDPOINT;
const allSignals = [...determinants,...behaviours];
const determinantOptions = document.querySelector('#determinantOptions');
const behaviourOptions = document.querySelector('#behaviourOptions');
const questionTabs = document.querySelector('#questionTabs');

const iconPaths = {
  cost:'<circle cx="12" cy="12" r="7"/><path d="M14.8 8.5c-.8-.7-1.8-1-2.8-1-1.7 0-3 .9-3 2.2 0 3.3 6 1.2 6 4.4 0 1.4-1.3 2.4-3.2 2.4-1.2 0-2.4-.4-3.2-1.2M12 5.5v13"/>',
  care:'<circle cx="8" cy="8" r="2.5"/><circle cx="16" cy="8" r="2.5"/><path d="M4.5 18c.5-3.3 1.8-5 3.5-5s3 1.7 3.5 5M12.5 18c.5-3.3 1.8-5 3.5-5s3 1.7 3.5 5M12 12.5l1.5-1.4c1.8-1.6 4.1 1 2.4 2.6L12 17.2l-3.9-3.5c-1.7-1.6.6-4.2 2.4-2.6z"/>',
  access:'<path d="M9 4h6v5h5v6h-5v5H9v-5H4V9h5z"/>',
  housing:'<path d="M3.5 11.5 12 4l8.5 7.5M5.5 10v10h13V10M10 20v-6h4v6"/>',
  transport:'<rect x="4" y="5" width="16" height="12" rx="2"/><path d="M7 17v2M17 17v2M4 12h16M7 8h3M14 8h3"/><circle cx="8" cy="15" r="1"/><circle cx="16" cy="15" r="1"/>',
  support:'<circle cx="8" cy="8" r="2.5"/><circle cx="16" cy="9" r="2.5"/><path d="M3.5 19c.4-4 2-6 4.5-6s4.1 2 4.5 6M12 18c.6-2.8 1.9-4.3 4-4.3 2.4 0 3.8 1.8 4.2 5.3"/>',
  work:'<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3.5 2M7 3.5 5 5M17 3.5 19 5"/>',
  digital:'<path d="M4 9.5a12 12 0 0 1 16 0M7 13a7.5 7.5 0 0 1 10 0M10 16.5a3 3 0 0 1 4 0"/><circle cx="12" cy="19" r="1"/>',
  sleep:'<path d="M17.5 16.5A7.5 7.5 0 0 1 9 5a7.5 7.5 0 1 0 8.5 11.5Z"/>',
  meals:'<path d="M4 13h16c-.5 4.2-3.2 6.5-8 6.5S4.5 17.2 4 13ZM7 13c.2-3 1.8-5 5-5s4.8 2 5 5M8 5.5c1-1.1 2.2-1.6 3.5-1.5"/>',
  energy:'<path d="m13.5 3-7 11h5l-1 7 7-11h-5z"/>',
  movement:'<path d="M7 17c3-1.5 5-4 6-7l2 2 3-1M14 6.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM5 20c4 .7 8 .5 12-.7"/>',
  meds:'<path d="M7 17 17 7a3.5 3.5 0 0 0-5-5L2 12a3.5 3.5 0 0 0 5 5ZM7 7l10 10"/>',
  stress:'<path d="M3 8c2.2-2.2 4.4-2.2 6.6 0s4.4 2.2 6.6 0 3.7-2.2 4.8-1.1M3 13c2.2-2.2 4.4-2.2 6.6 0s4.4 2.2 6.6 0 3.7-2.2 4.8-1.1M3 18c2.2-2.2 4.4-2.2 6.6 0s4.4 2.2 6.6 0 3.7-2.2 4.8-1.1"/>'
};

function sketchIcon(id){
  return `<svg class="sketch-icon" viewBox="0 0 24 24" focusable="false" aria-hidden="true"><g>${iconPaths[id]}</g></svg>`;
}

function optionButton(item,type){
  return `<button class="context-option" data-id="${item.id}" data-type="${type}" aria-pressed="false"><span class="option-icon">${sketchIcon(item.id)}</span><span>${item.label}</span><span class="option-check" aria-hidden="true">✓</span></button>`;
}
determinantOptions.innerHTML=determinants.map(x=>optionButton(x,'determinant')).join('');
behaviourOptions.innerHTML=behaviours.map(x=>optionButton(x,'behaviour')).join('');
questionTabs.innerHTML=Object.entries(questions).filter(([,q])=>q.tab).map(([id,q],i)=>`<button class="question-tab" role="tab" data-question="${id}" aria-selected="${i===0}">${q.tab}</button>`).join('');

document.querySelectorAll('.context-option').forEach(button=>button.addEventListener('click',()=>{
  const id=button.dataset.id; selected.has(id)?selected.delete(id):selected.add(id);
  button.setAttribute('aria-pressed',selected.has(id)); updateProfile(); updateAnswers();
}));
document.querySelectorAll('.question-tab').forEach(button=>button.addEventListener('click',()=>{
  currentQuestion=button.dataset.question; customQuestionActive=false; document.querySelector('#customQuestion').value='';
  document.querySelectorAll('.question-tab').forEach(x=>x.setAttribute('aria-selected',x===button)); updateAnswers();
}));
document.querySelector('#resetButton').addEventListener('click',()=>{
  selected.clear(); document.querySelectorAll('.context-option').forEach(x=>x.setAttribute('aria-pressed','false')); updateProfile(); updateAnswers();
});
document.querySelector('[data-scroll-to]')?.addEventListener('click',()=>document.querySelector('#builder').scrollIntoView({behavior:'smooth'}));
document.querySelector('#askButton').addEventListener('click',requestAIAnswer);
document.querySelector('#customQuestion').addEventListener('keydown',e=>{if(e.key==='Enter')document.querySelector('#askButton').click();});

function getProfile(){
  const score=allSignals.filter(x=>selected.has(x.id)).reduce((sum,x)=>sum+x.weight,0);
  const profile=profiles.find(x=>score<=x.max); return {...profile,score};
}
function selectedSignals(){return allSignals.filter(x=>selected.has(x.id));}
function updateProfile(){
  const profile=getProfile(), signals=selectedSignals(), percent=Math.min(94,5+(profile.score/22)*89);
  document.querySelector('#profileName').textContent=profile.name;
  document.querySelector('#profileDescription').textContent=profile.description;
  document.querySelector('#profileFocus').textContent=profile.focus;
  document.querySelector('#signalCount').textContent=`${signals.length} signal${signals.length===1?'':'s'} selected`;
  document.querySelector('#scaleMarker').style.left=`${percent}%`;
  document.querySelector('#scaleFill').style.transform=`scaleX(${1-percent/100})`;
  document.querySelector('#activeSignals').innerHTML=signals.length?signals.map(x=>`<span class="signal-chip">${x.label}</span>`).join(''):'<span class="empty-signal">Select context to see the profile respond</span>';
  updatePetMessage(signals);
}
function updatePetMessage(signals){
  const message=document.querySelector('#petMessageText');
  if(!message)return;
  if(!signals.length){
    message.textContent='Pick a few things this person is navigating. I’ll keep watch as their profile changes.';
  }else if(signals.length===1){
    message.textContent=`I’ve added ${signals[0].label.toLowerCase()} to the picture. Try another signal to reveal how pressures connect.`;
  }else if(signals.length<4){
    message.textContent=`${signals.length} signals are connected now. The answer will adapt to what is practical—not judge the person.`;
  }else{
    message.textContent=`This is a busy picture: ${signals.length} connected signals. Support should reduce the load, not add another task.`;
  }
}
function initialiseSitePet(){
  const pet=document.querySelector('#sitePet');
  const toggle=document.querySelector('#petToggle');
  const close=document.querySelector('#petMessageClose');
  const image=document.querySelector('#petImage');
  if(!pet||!toggle||!close||!image)return;
  image.src=`aliens/helmet-peeker-${alienVisitors[visitAlien]}.png`;
  const setOpen=open=>{
    pet.classList.toggle('message-closed',!open);
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'Close alien companion message':'Open alien companion message');
  };
  toggle.addEventListener('click',()=>setOpen(toggle.getAttribute('aria-expanded')!=='true'));
  close.addEventListener('click',()=>{setOpen(false);toggle.focus();});
}
function inferQuestion(text){
  const value=text.toLowerCase();
  if(/sleep|insomnia|tired at night|wake up/.test(value))return 'sleep';
  if(/eat|food|meal|nutrition|diet|hungry/.test(value))return 'food';
  if(/stress|anxi|overwhelm|panic|calm|mood/.test(value))return 'stress';
  if(/energy|fatigue|exhaust|tired|focus/.test(value))return 'energy';
  if(/walk|movement|exercise|active|fitness|pain when moving/.test(value))return 'movement';
  if(/medication|medicine|tablet|dose|prescription|side effect/.test(value))return 'medication';
  if(/doctor|health service|appointment|gp|pharmacist|professional|care/.test(value))return 'care';
  return 'general';
}
function detectSafetyQuestion(text){
  const value=text.toLowerCase();
  if(/\b(bat|flying fox)\b/.test(value)&&/bit|bite|bitten|scratch|saliva|lick/.test(value))return 'bat_exposure';
  if(/can't breathe|cannot breathe|trouble breathing|severe chest pain|unconscious|not breathing/.test(value))return 'emergency';
  if(/suicid|kill myself|self[- ]?harm|end my life/.test(value))return 'crisis';
  if(/bleeding (won't|will not|doesn't|does not) stop|severe bleeding|overdose|took too many/.test(value))return 'emergency';
  return null;
}
const safetyAnswers={
  bat_exposure:{
    title:'A bat bite or scratch needs urgent medical attention',
    intro:'This overrides the selected lifestyle context because treatment is time-sensitive, even if the mark looks small or you were previously vaccinated.',
    steps:['Wash the area thoroughly with soap and running water for at least 15 minutes.','Apply an antiviral antiseptic such as povidone-iodine or alcohol if available.','Go to a hospital or seek urgent medical attention now for assessment and preventive treatment against Australian bat lyssavirus.'],
    genericTitle:'Act now after a bat bite or scratch',
    genericIntro:'Australian bats can carry Australian bat lyssavirus. Prompt wound care and medical assessment can prevent infection.',
    contextNote:'Bat bites and scratches can transmit Australian bat lyssavirus, so urgent wound care and medical assessment matter regardless of broader circumstances.'
  },
  emergency:{
    title:'Get emergency help now',
    intro:'The words in this question may describe a medical emergency. Personalisation should not delay urgent care.',
    steps:['Call Triple Zero (000) for an ambulance now.','Follow the call-taker’s instructions and do not drive yourself if you are seriously unwell.','If someone is with you, ask them to stay with you until help arrives.'],
    genericTitle:'This may be a medical emergency',
    genericIntro:'Call Triple Zero (000) now for urgent help.',
    contextNote:'Severe or rapidly worsening symptoms can require immediate assessment, so immediate safety takes priority over personalisation.'
  },
  crisis:{
    title:'Connect with immediate support now',
    intro:'Your immediate safety matters more than the selected context or profile.',
    steps:['If you may act now or are in immediate danger, call Triple Zero (000).','Move away from anything you could use to hurt yourself and stay with another person if possible.','Contact Lifeline on 13 11 14 for immediate crisis support.'],
    genericTitle:'Get immediate crisis support',
    genericIntro:'You do not need to manage this alone. Immediate support is available.',
    contextNote:'Language suggesting an immediate risk of self-harm calls for direct human support; broader circumstances can be addressed once the person is safe.'
  }
};
const defaultAdapted = {
  energy:['Pair water or a simple snack with something that already happens.','Try a short walk, stretch or rest break when energy usually dips.','Notice which option helps before adding another change.'],
  sleep:['Choose one repeatable wind-down cue.','Reduce light or stimulation for the last part of the day.','Notice what makes rest easier before changing more.'],
  food:['Add one easy source of protein or produce to food you already eat.','Prepare one useful component rather than a whole week of meals.','Keep an easy backup for busy days.'],
  stress:['Try a two-minute reset at the most pressured point of the day.','Name the next controllable task and let the rest wait.','Notice which demands could be changed, shared or delayed.']
  ,movement:['Choose movement that feels possible in the space and time available.','Start with a brief, comfortable amount rather than a fixed target.','Stop and seek individual advice if movement causes concerning symptoms.']
  ,medication:['Keep the medication instructions and current medicines together.','Use one simple cue or organiser if it is appropriate for that medication.','Ask a pharmacist about timing, side effects or interactions rather than changing it alone.']
  ,care:['Write down the main concern, how long it has been happening and what has changed.','Choose the lowest-friction suitable service available.','Use urgent services when symptoms are severe, rapidly worsening or feel unsafe.']
  ,general:['Choose the smallest useful next step that fits the person’s circumstances.','Remove one practical barrier before adding a new habit.','Use qualified support if the question needs individual medical assessment.']
};
const signalAdvice = {
  cost:{energy:'Use a reliable, low-cost source of fuel such as toast, oats, beans or yoghurt.',sleep:'Avoid spending on sleep products; start with free changes such as light, noise and timing.',food:'Build around one filling low-cost staple, then add what is affordable.',stress:'Separate the next essential expense from decisions that can safely wait.'},
  care:{energy:'Put a drink or snack where you usually provide care, so supporting yourself does not require a separate routine.',sleep:'Use a short wind-down cue after caring tasks, even if the clock time changes.',food:'Keep a no-prep option near the place where caring responsibilities usually happen.',stress:'Choose one caring task that could be shortened, shared or left for another day.'},
  access:{energy:'If fatigue is persistent or worsening, start with the easiest available health route, such as a pharmacist or telehealth.',sleep:'If sleep problems persist, use the lowest-friction care option available rather than waiting for an ideal appointment.',food:'Use local low-barrier options such as a community pantry, pharmacist or telehealth dietetic service if available.',stress:'Save the contact details for the easiest support route, so finding help is not another task during a difficult moment.'},
  housing:{energy:'Focus on portable supports—water, shelf-stable food and brief rest—rather than a fixed home routine.',sleep:'Focus on the safest available resting place and portable tools such as headphones, an eye mask or layered clothing.',food:'Choose portable or shelf-stable foods that do not depend on a full kitchen.',stress:'Prioritise immediate safety and housing support over adding a wellbeing routine.'},
  transport:{energy:'Choose something possible where you already are; do not make energy support depend on travel.',sleep:'Use support that can be accessed from where you are, rather than adding travel to the plan.',food:'Keep food options within the routes and places you already visit.',stress:'Use phone or online support when travel would add more pressure.'},
  support:{energy:'Use a plan you can do alone today, without relying on someone else being available.',sleep:'Choose a self-contained wind-down cue that does not depend on a quiet household or another person.',food:'Keep one self-contained food option available for times when no one can help.',stress:'Use a self-contained grounding step, and keep a crisis or support-line number available if things feel unsafe.'},
  work:{energy:'Use food, water or a brief pause as an anchor after any shift instead of relying on a fixed time.',sleep:'Use the same wind-down cue after any shift; a fixed bedtime may not fit unpredictable hours.',food:'Keep a portable no-prep option for shifts that move or run late.',stress:'Choose a reset linked to the end of a shift rather than a fixed daily time.'},
  digital:{energy:'Keep the plan offline: use a paper note or physical cue instead of an app.',sleep:'Use an offline cue such as dimming a lamp or changing clothes rather than a phone reminder.',food:'Write a short reusable shopping list that does not require internet access.',stress:'Keep important support numbers written down so help does not depend on data access.'},
  sleep:{energy:'Treat rest as the first energy intervention; adding more activity may deepen the fatigue.',sleep:'Do not chase a perfect night—protect one repeatable rest cue and allow quiet rest to count.',food:'Use low-preparation food while sleep is poor; tiredness makes planning and cooking harder.',stress:'Lower expectations after a disrupted night and postpone non-essential decisions where possible.'},
  meals:{energy:'Start with one accessible bite or drink; low fuel may be contributing to the energy dip.',sleep:'Have a simple snack available if hunger is interrupting sleep.',food:'Make eating something regularly the first goal; balance can come later.',stress:'Keep an easy food option close—stress is harder to regulate when meals are being missed.'},
  energy:{energy:'Choose only one action—food, water or rest—and repeat the easiest one.',sleep:'Make the wind-down step very small so it still fits when energy is low.',food:'Choose food requiring little preparation, washing up or decision-making.',stress:'Use a coping step that can be done sitting or lying down.'},
  movement:{energy:'Use seated movement, stretching or rest; do not make the plan depend on a workout.',sleep:'Try gentle movement only if it feels comfortable; pain or limited mobility should not be pushed through.',food:'Place useful foods within easy reach to reduce the physical work of eating.',stress:'Choose breathing, music or another strategy that does not depend on movement.'},
  meds:{energy:'Check whether fatigue could relate to medication timing or side effects with a pharmacist; do not change doses on your own.',sleep:'Ask a pharmacist whether medication timing or side effects may be affecting sleep; do not change doses on your own.',food:'Pair medication and food only as directed, and use a simple visible cue to reduce the management load.',stress:'Use one medication cue or organiser rather than relying on memory during stressful periods.'},
  stress:{energy:'Account for constant stress as real energy use; reduce one demand before adding an energy habit.',sleep:'Use a brief downshift—slower breathing, lower light or familiar audio—rather than trying to force sleep.',food:'Choose familiar, low-decision food while stress is high.',stress:'Focus on lowering the next ten minutes of pressure, not solving every source of stress today.'}
};
const generalSignalAdvice = {
  cost:'Start with an option that is free or already available; cost should not be treated as a motivation problem.',
  care:'Fit the next step into existing caring responsibilities, or identify one task that could be shared.',
  access:'Choose the lowest-friction suitable route, such as a pharmacist, phone service or telehealth where appropriate.',
  housing:'Prioritise immediate safety and options that remain practical without a stable home setup.',
  transport:'Use an option available where the person already is, or one accessible by phone or online.',
  support:'Make the first step self-contained and keep a clear route to professional or crisis support if needed.',
  work:'Attach the action to the start or end of a shift rather than a fixed clock time.',
  digital:'Keep the plan usable offline and write down any important information or contact numbers.',
  sleep:'Reduce the effort required and account for disrupted sleep before adding another demand.',
  meals:'Address the missed meal with the easiest accessible food or drink before expecting more planning.',
  energy:'Choose an action that can be done with very low energy and little preparation.',
  movement:'Avoid making the plan depend on standing, walking or strenuous exercise.',
  meds:'Check medication-specific questions with a pharmacist and do not change a dose without qualified advice.',
  stress:'Reduce the immediate pressure and focus on one controllable part of the question.'
};
function adaptedContent(kind,signals,question=''){
  if(!signals.length)return {title:'Start with a plan that fits real life',intro:'Select some context above to make this answer specific to the person.',steps:defaultAdapted[kind],contextNote:''};
  const chosen=signals.map(signal=>({signal,advice:signalAdvice[signal.id]?.[kind]||generalSignalAdvice[signal.id]})).filter(x=>x.advice);
  const priority=[...chosen].sort((a,b)=>b.signal.weight-a.signal.weight).slice(0,3);
  const names=priority.map(x=>x.signal.reason);
  const contextPhrase=names.length===1?names[0]:`${names.slice(0,-1).join(', ')} and ${names.at(-1)}`;
  return {
    title:`A plan shaped around ${priority[0].signal.label.toLowerCase()}`,
    intro:`This answer accounts directly for ${contextPhrase}.`,
    steps:priority.map(x=>x.advice),
    contextNote:buildContextNote(kind,priority.map(x=>x.signal),question)
  };
}
function buildContextNote(kind,signals,question){
  const isInjury=/scratch|cut|wound|graze|burn|bite|fell|fall|stairs|accident|injur|hit my|bump|sprain/i.test(question);
  const isFall=/fell|fall|stairs|accident|hit my|bump|sprain/i.test(question);
  const focus=isInjury?(isFall?'responding safely after this fall or injury':'caring for this skin injury'):({energy:'improving energy',sleep:'improving sleep',food:'eating well',stress:'managing stress',movement:'moving safely',medication:'managing medication',care:'getting suitable care'}[kind]||'dealing with this concern');
  const effects={
    cost:isInjury?'may make supplies, transport or an assessment harder to afford':`may limit which ways of ${focus} are affordable`,
    care:isInjury?'may make it harder to rest, monitor symptoms or leave to get assessed':`may leave less uninterrupted time and attention for ${focus}`,
    access:`may make professional advice or follow-up for ${focus} harder to arrange`,
    housing:isInjury?(isFall?'can make finding a safe place to rest and recover more difficult':'can make keeping the area clean and covered more difficult'):`can make the space, storage or routine needed for ${focus} less reliable`,
    transport:`may narrow which in-person options for ${focus} are reachable`,
    support:`may mean a plan for ${focus} needs to work without help from another person`,
    work:isInjury?'may make taking time to rest or seek assessment more difficult':`may make fixed times and consistent routines for ${focus} unrealistic`,
    digital:isInjury?'may limit online advice, so phone or in-person routes may be more practical':`may rule out app-based or online options for ${focus}`,
    sleep:`may reduce the attention and capacity available for ${focus}`,
    meals:`may make concentration and planning for ${focus} harder`,
    energy:isInjury?'may make repeated cleaning and monitoring harder to manage':`may make multi-step or high-effort approaches to ${focus} difficult`,
    movement:`may make options for ${focus} that involve standing, walking or travel less practical`,
    meds:`may add timing, side-effect or interaction questions when considering ${focus}`,
    stress:`may reduce the mental space available to plan and follow through with ${focus}`
  };
  const clauses=signals.map(signal=>`${signal.reason.charAt(0).toUpperCase()+signal.reason.slice(1)} ${effects[signal.id]}.`);
  const explanation=`${clauses[0]} ${clauses.slice(1).join(' ')}`.trim();
  return isInjury
    ? `The selected circumstances do not explain why the injury happened. ${explanation} They may change what help is practical now, not the cause of the injury.`
    : `For ${focus}, ${explanation.charAt(0).toLowerCase()+explanation.slice(1)} These factors may shape what is practical right now; they do not prove what caused the concern.`;
}
function setContextExplanation(text){
  const wrap=document.querySelector('#contextExplanationWrap');
  document.querySelector('#contextExplanation').textContent=text||'';
  wrap.hidden=!text;
}
function updateAnswers(useCustom=customQuestionActive){
  const custom=document.querySelector('#customQuestion').value.trim();
  const safetyKey=custom&&useCustom?detectSafetyQuestion(custom):null;
  if(safetyKey){
    const safety=safetyAnswers[safetyKey];
    document.querySelector('#genericTitle').textContent=safety.genericTitle;
    document.querySelector('#genericIntro').textContent=safety.genericIntro;
    document.querySelector('#genericSteps').innerHTML=safety.steps.map(x=>`<li>${x}</li>`).join('');
    document.querySelector('#adaptedProfileLabel').textContent='Urgent safety guidance';
    document.querySelector('#adaptedTitle').textContent=safety.title;
    document.querySelector('#adaptedIntro').textContent=safety.intro;
    document.querySelector('#adaptedSteps').innerHTML=safety.steps.map(x=>`<li>${x}</li>`).join('');
    setContextExplanation(safety.contextNote);
    document.querySelector('#whyChips').innerHTML='<span class="why-chip">safety overrides personalisation</span><span class="why-chip">time-sensitive</span>';
    return true;
  }
  const kind=(useCustom&&custom)?inferQuestion(custom):currentQuestion;
  const base=questions[kind], profile=getProfile(), signals=selectedSignals(), adapted=adaptedContent(kind,signals,custom&&useCustom?custom:base.tab||base.title);
  document.querySelector('#genericTitle').textContent=custom&&useCustom?`A general response to “${custom}”`:base.title;
  document.querySelector('#genericIntro').textContent=base.generic;
  document.querySelector('#genericSteps').innerHTML=base.steps.map(x=>`<li>${x}</li>`).join('');
  document.querySelector('#adaptedProfileLabel').textContent=profile.name;
  document.querySelector('#adaptedTitle').textContent=custom&&useCustom?`For “${custom}”`:adapted.title;
  document.querySelector('#adaptedIntro').textContent=adapted.intro;
  document.querySelector('#adaptedSteps').innerHTML=adapted.steps.map(x=>`<li>${x}</li>`).join('');
  setContextExplanation(adapted.contextNote);
  const reasons=signals.length?signals.slice().sort((a,b)=>b.weight-a.weight).slice(0,3).map(x=>x.reason):['no context selected yet'];
  document.querySelector('#whyChips').innerHTML=reasons.map(x=>`<span class="why-chip">${x}</span>`).join('');
  return false;
}
function renderAIAnswer(answer){
  document.querySelector('#genericTitle').textContent=answer.generic.title;
  document.querySelector('#genericIntro').textContent=answer.generic.intro;
  document.querySelector('#genericSteps').innerHTML=answer.generic.steps.map(x=>`<li>${x}</li>`).join('');
  document.querySelector('#adaptedProfileLabel').textContent=answer.safety_override?'Urgent safety guidance':'AI · selected context';
  document.querySelector('#adaptedTitle').textContent=answer.contextual.title;
  document.querySelector('#adaptedIntro').textContent=answer.contextual.intro;
  document.querySelector('#adaptedSteps').innerHTML=answer.contextual.steps.map(x=>`<li>${x}</li>`).join('');
  setContextExplanation(answer.context_note);
  const reasons=answer.safety_override?['safety overrides personalisation','time-sensitive']:(answer.why.length?answer.why:['selected context']);
  document.querySelector('#whyChips').innerHTML=reasons.map(x=>`<span class="why-chip">${x}</span>`).join('');
}
async function requestAIAnswer(){
  const input=document.querySelector('#customQuestion');
  const question=input.value.trim()||questions[currentQuestion].tab;
  customQuestionActive=Boolean(input.value.trim());
  const safetyHandled=updateAnswers(customQuestionActive);
  document.querySelector('#answerComparison').scrollIntoView({behavior:'smooth',block:'center'});
  if(safetyHandled){
    const status=document.querySelector('#aiStatus');
    status.className='ai-status'; status.textContent='Local safety guidance shown immediately; AI was not called.';
    return;
  }

  const button=document.querySelector('#askButton'),status=document.querySelector('#aiStatus');
  button.disabled=true; button.textContent='Thinking…'; status.className='ai-status'; status.textContent='Creating two answers from the same question…';
  const signals=selectedSignals();
  try{
    const response=await fetch(aiEndpoint,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        question,
        determinants:signals.filter(x=>determinants.includes(x)).map(x=>x.label),
        behaviours:signals.filter(x=>behaviours.includes(x)).map(x=>x.label)
      })
    });
    if(!response.ok)throw new Error(`AI endpoint returned ${response.status}`);
    const answer=await response.json(); renderAIAnswer(answer);
    status.className='ai-status success'; status.textContent='AI answer generated using the selected context.';
  }catch(error){
    status.className='ai-status error'; status.textContent='AI is unavailable, so the local context-aware fallback is shown.';
    console.warn('Starbound AI fallback:',error.message);
  }finally{
    button.disabled=false; button.textContent='Show the difference';
  }
}
function initialiseBlueprintParallax(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  let framePending=false;
  const draw=()=>{
    const scroll=window.scrollY;
    document.documentElement.style.setProperty('--parallax-slow',`${scroll*.055}px`);
    document.documentElement.style.setProperty('--parallax-fast',`${scroll*-.028}px`);
    framePending=false;
  };
  window.addEventListener('scroll',()=>{
    if(framePending)return;
    framePending=true;
    window.requestAnimationFrame(draw);
  },{passive:true});
  draw();
}
initialiseBlueprintParallax(); initialiseSitePet(); updateProfile(); updateAnswers();
