const journeyStage=document.querySelector('#journeyStage');
const journeyNarration=document.querySelector('#journeyNarration');
const journeyToggle=document.querySelector('#journeyToggle');
const journeyButtons=[...document.querySelectorAll('[data-journey-step]')];
const journeyCopy=[
  'People reach Starbound through different devices and access conditions. Only broad, consented context can move toward the shared signal space.',
  'The privacy boundary separates the story from the pattern. Shared map signals appear only after de-identification and safe group thresholds.'
];
let journeyStep=0;
let journeyTimer;
let journeyPlaying=false;
const reducedJourneyMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const parallaxSections=[...document.querySelectorAll('.data-journey,.signal-room')];
let parallaxFrame;
function updateJourneyParallax(){
  parallaxFrame=undefined;
  if(!parallaxSections.length||reducedJourneyMotion)return;
  const offset=Math.round(window.scrollY*-0.08);
  parallaxSections.forEach(section=>{
    section.style.setProperty('--journey-parallax',`${offset}px`);
  });
}
window.addEventListener('scroll',()=>{
  if(parallaxFrame||reducedJourneyMotion)return;
  parallaxFrame=requestAnimationFrame(updateJourneyParallax);
},{passive:true});
updateJourneyParallax();
function setJourneyStep(step){
  journeyStep=step;
  journeyStage.dataset.step=String(step);
  journeyNarration.textContent=journeyCopy[step];
  journeyButtons.forEach((button,index)=>{
    button.parentElement.classList.toggle('active',index===step);
    if(index===step)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');
  });
}
function stopJourney(){
  clearInterval(journeyTimer);
  journeyPlaying=false;
  journeyToggle.setAttribute('aria-pressed','false');
  journeyToggle.innerHTML='<span class="replay-icon" aria-hidden="true">↻</span> Replay the journey';
}
function playJourney(){
  stopJourney();
  journeyPlaying=true;
  journeyToggle.setAttribute('aria-pressed','true');
  journeyToggle.innerHTML='<span class="replay-icon" aria-hidden="true">Ⅱ</span> Pause animation';
  setJourneyStep(0);
  journeyTimer=setInterval(()=>{
    if(journeyStep===journeyButtons.length-1){stopJourney();return;}
    setJourneyStep(journeyStep+1);
  },2100);
}
journeyToggle.addEventListener('click',()=>journeyPlaying?stopJourney():playJourney());
journeyButtons.forEach(button=>button.addEventListener('click',()=>{stopJourney();setJourneyStep(Number(button.dataset.journeyStep))}));

const journeyObserver=new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting&&!journeyPlaying&&!reducedJourneyMotion){playJourney();journeyObserver.disconnect();}
},{threshold:.35});
journeyObserver.observe(journeyStage);
setJourneyStep(0);
