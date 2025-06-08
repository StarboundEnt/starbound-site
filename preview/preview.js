const choices = [
  { id: 'sleep_good', label: 'I’ve been sleeping well', score: 0 },
  { id: 'eat_regular', label: 'I eat regularly', score: 0 },
  { id: 'active', label: 'I move my body most days', score: 0 },
  { id: 'screen_breaks', label: 'I take breaks from screens', score: 0 },
  { id: 'no_smoke', label: 'I’ve cut back on smoking or vaping', score: 0 },
  { id: 'sleep_poor', label: 'I’m not sleeping much', score: 4 },
  { id: 'skip_meals', label: 'I skip meals a lot', score: 3 },
  { id: 'no_movement', label: 'I barely move during the day', score: 2 },
  { id: 'high_screen', label: 'I’m on screens all the time', score: 2 },
  { id: 'smoking', label: 'I’ve been smoking or vaping more', score: 4 },
];

const chances = [
  { id: 'stable_home', label: 'I have a stable place to live', score: 0 },
  { id: 'enough_income', label: 'My income meets my basic needs', score: 0 },
  { id: 'mentally_well', label: 'I feel mentally well lately', score: 0 },
  { id: 'no_care', label: 'I’m not caring for anyone right now', score: 0 },
  { id: 'supportive_network', label: 'I have good support from friends/family', score: 0 },
  { id: 'mental_health', label: 'I’ve been struggling with my mental health', score: 5 },
  { id: 'low_income', label: 'Money is really tight right now', score: 4 },
  { id: 'unstable_housing', label: 'I don’t have stable housing', score: 5 },
  { id: 'carer', label: 'I have care responsibilities', score: 4 },
  { id: 'migrant_barrier', label: 'I face extra barriers due to my background', score: 3 },
];

const habitForecasts = {
  skipMeals: {
    stable: [
      "You may feel hungrier or tired, but your body is resilient.",
      "Some dips in energy may show up, but you're likely to self-correct.",
      "If unchecked, it could lead to fatigue or reduced focus.",
      "🍽️ Try setting one non-negotiable meal a day — even a smoothie counts."
    ],
    friction: [
      "You might notice irregular energy and mood swings.",
      "Stress and blood sugar changes may start affecting your daily routine.",
      "Could increase risk of chronic fatigue or anxiety.",
      "⏰ Anchor meals to daily habits (e.g. after coffee or before emails)."
    ],
    trying: [
      "You might already feel the effects — low energy or cravings.",
      "Mood and brain fog may become more regular.",
      "Long-term, this could weaken your resilience and immunity.",
      "🥣 Keep an easy, go-to option ready — something no-cook or grab-and-go."
    ],
    overloaded: [
      "You may feel too rushed to notice, but burnout may build quietly.",
      "Low energy might mix with irritability and disrupted sleep.",
      "May spiral into emotional exhaustion or digestive issues.",
      "📦 Batch snacks/meals once a week to reduce decision-making stress."
    ],
    survival: [
      "Skipping meals may be one of many trade-offs you're making.",
      "Fatigue may compound with other stressors.",
      "Without support, it may contribute to burnout or malnutrition.",
      "🧃 Pack a shelf-stable item (like a bar or UHT smoothie) in your bag."
    ]
  },

  drinkWater: {
    stable: [
      "You’ll likely notice better energy and digestion.",
      "Improved focus, clearer skin, and reduced fatigue may emerge.",
      "Could help support long-term metabolic and mental health.",
      "🫗 Use a marked water bottle or refill after every toilet break."
    ],
    friction: [
      "A few changes may show up — like clearer thinking or fewer headaches.",
      "May gradually improve sleep and mood stability.",
      "Hydration may become a keystone habit for other positive health shifts.",
      "💦 Link water with regular actions — drink while waiting for the kettle."
    ],
    trying: [
      "You might feel a bit more alert and refreshed day to day.",
      "Sustained hydration could reduce mental fog and irritability.",
      "May help rebuild capacity to manage stress and routines.",
      "🚰 Start small — 1 glass before breakfast is a win."
    ],
    overloaded: [
      "Could feel like ‘just another task’, but small wins matter.",
      "Might prevent some physical burnout symptoms from escalating.",
      "Hydration could quietly support stability across body and mind.",
      "📲 Set 2 reminder alarms a day. That’s it."
    ],
    survival: [
      "You may not notice changes right away, but your body will.",
      "Fewer headaches or crashes may quietly emerge.",
      "Even this small step can build toward restoring balance.",
      "🧊 Keep a bottle where you rest — visible, reachable, refillable."
    ]
  },

  noOutsideTime: {
    stable: [
      "Mood may dip slightly, especially in the afternoons.",
      "You might feel a bit more restless or low-energy.",
      "Could lead to minor seasonal affective patterns or lower activity levels.",
      "🌞 Take calls or stretch near a window. Nature helps even from indoors."
    ],
    friction: [
      "Sleep and mood could take a subtle hit.",
      "Motivation and mental clarity may be harder to maintain.",
      "Could deepen cycles of low movement and emotional slumps.",
      "🚶🏽‍♂️ Step outside for just 5 minutes — even pacing counts."
    ],
    trying: [
      "You may feel more isolated or stuck in your head.",
      "Mental health impacts like anxiety or apathy may increase.",
      "May reduce your motivation to re-engage with healthy routines.",
      "🌥️ Add a walk to an existing errand (e.g. bin night, corner shop)."
    ],
    overloaded: [
      "The break from natural light might go unnoticed at first.",
      "Irritability or fatigue might build without you realising.",
      "Could contribute to chronic stress or disengagement.",
      "🪟 Try doing one small task outside — folding laundry or journaling."
    ],
    survival: [
      "Getting outside might already be hard — this could make things heavier.",
      "The lack of movement and light may amplify existing struggles.",
      "Risk of worsening mental health or physical symptoms increases over time.",
      "📬 Open the door. Breathe. One breath outdoors is still progress."
    ]
  }
};

const askStarboundData = {
  breakfast: {
    stable: {
      answer: "Try overnight oats or a smoothie you can prep the night before. You’ve likely got the routine to make this work with minimal effort.",
      nudge: "🥣 Prep overnight oats or a smoothie while making dinner. Two tasks, one flow."
    },
    friction: {
      answer: "Look for things that match your current flow, like a yoghurt pouch, fruit, or a slice of toast you can eat in transit.",
      nudge: "🍌 Keep a few shelf-stable options in your bag or car, like nut bars or fruit."
    },
    trying: {
      answer: "If mornings are a struggle, try a grab-and-go snack the night before. Even a banana and nut butter is a solid start.",
      nudge: "⏰ Set a reminder to pack a snack the night before. Let routine do the work."
    },
    overloaded: {
      answer: "Focus on one easy option you don’t need to think about, like a protein bar by the door or something you can grab without prep.",
      nudge: "🚪Put a food item by the door so you can grab it without using energy."
    },
    survival: {
      answer: "Skip the perfection. Even a few crackers or a flavoured milk can help start your day with more strength than nothing.",
      nudge: "🧃Next time you're near a servo, grab a flavoured milk or muesli bar. It counts."
    }
  },

  sleep: {
    stable: {
      answer: "Try a regular wind-down cue like dimming lights, no screens 30 minutes before bed, or a nightly cup of tea. Consistency helps.",
      nudge: "🌙 Try turning off overhead lights after 9pm. Let your body follow the signal."
    },
    friction: {
      answer: "Start with just one calming action, like a warm shower or switching to low lights. Repeat it nightly to signal rest.",
      nudge: "💡 Use a lamp or candle to wind down. Low light tells your brain it’s time to pause."
    },
    trying: {
      answer: "It might feel hard to commit. Start small. Even brushing your teeth and lying down with your phone off for 10 minutes helps.",
      nudge: "⏰ Set a 10pm 'pause' alarm. You don’t have to sleep, just slow down."
    },
    overloaded: {
      answer: "Sleep may feel far away. Focus on stopping one thing first, like staying in bed instead of scrolling. That’s progress.",
      nudge: "📴 Plug your phone in away from the bed. Lying down without distractions still counts."
    },
    survival: {
      answer: "Rest may feel impossible. Even closing your eyes and taking deep breaths for 2 minutes helps.",
      nudge: "😴 Try a short breathing video in bed. No pressure to finish it, just press play."
    }
  },

  anxiety: {
    stable: {
      answer: "Try a 5-minute grounding exercise. Step outside, name five things you see, and slow your breathing. You’re building resilience as you go.",
      nudge: "🌿 Try the 5-4-3-2-1 method. Name five things you see, four you hear, and so on."
    },
    friction: {
      answer: "Use what already works for you. A walk, music, or messaging a friend. Small familiar comforts can ease the edge.",
      nudge: "🎧 Make a short playlist that calms you down. Play it while walking or lying down."
    },
    trying: {
      answer: "Anxiety can feel heavy. Start by naming it. Say 'I’m feeling anxious, and that’s okay.' Then do one kind thing for yourself.",
      nudge: "🤲 Rub your hands together for 10 seconds, then press them to your chest. Feel your own support."
    },
    overloaded: {
      answer: "Focus on what’s manageable. Try breathing slowly for one song, or hold a warm mug in both hands to anchor yourself.",
      nudge: "🧘 Try box breathing. In for four, hold for four, out for four, hold for four. Just once is enough."
    },
    survival: {
      answer: "It’s okay if everything feels too much. Even splashing water on your face or sitting outside for a minute is a strong move.",
      nudge: "📦 Pick one small task. Fold a shirt, sip water, hold a warm drink. Do it kindly."
    }
  },

  dizziness: {
    stable: {
      answer: "It could be something simple like dehydration, but persistent dizziness can be a sign of something more. If it continues, speak to a GP.",
      nudge: "📞 Book in with your regular doctor or use a telehealth service. You can also call Health Direct on 1800 022 222 for advice."
    },
    friction: {
      answer: "It could be stress, low blood sugar, or something else. Track how often it happens and see a GP if it continues.",
      nudge: "📝 Write down when it happens and what you’ve eaten or slept like. Then look for a bulk-billed GP nearby."
    },
    trying: {
      answer: "Dizziness can feel scary, especially when you’re already low on energy. A check-up can give peace of mind.",
      nudge: "🏥 If you're not sure where to go, Google 'bulk-billed GP near me' or ask a local pharmacy for help."
    },
    overloaded: {
      answer: "It might feel easier to ignore, but dizziness is a sign your body needs support. You don’t have to figure it out alone.",
      nudge: "📲 Try a telehealth app if leaving the house feels like too much. A quick chat can help."
    },
    survival: {
      answer: "If you’ve been skipping meals or dealing with a lot, dizziness makes sense. But your body still deserves support.",
      nudge: "🚶🏾‍♂️ Look up free clinics, youth health centres, or places like Headspace if Medicare is a barrier."
    }
  }
};


let selectedChoices = [];
let selectedChances = [];
let currentProfile = '';

function goToStep(stepNumber) {
  const allSteps = document.querySelectorAll('[id^="step"]');
  allSteps.forEach(step => step.classList.add('hidden'));

  const target = document.getElementById(`step${stepNumber}`);
  if (target) target.classList.remove('hidden');
}


function renderOptions() {
  const choicesDiv = document.getElementById('choicesOptions');
  const chancesDiv = document.getElementById('chancesOptions');

  choices.forEach(option => {
    const btn = createOptionBtn(option, 'choice');
    choicesDiv.appendChild(btn);
  });

  chances.forEach(option => {
    const btn = createOptionBtn(option, 'chance');
    chancesDiv.appendChild(btn);
  });
}

function createOptionBtn(option, type) {
  const btn = document.createElement('div');
  btn.classList.add('option-btn');
  btn.textContent = option.label;

btn.addEventListener('click', () => {
  let arr = type === 'choice' ? selectedChoices : selectedChances;

  if (arr.includes(option.id)) {
    arr = arr.filter(id => id !== option.id);
    btn.classList.remove('selected');
  } else if (arr.length < 2) {
    arr.push(option.id);
    btn.classList.add('selected');
  }

  if (type === 'choice') selectedChoices = arr;
  else selectedChances = arr;

  document.getElementById('generateBtn').disabled = !(selectedChoices.length === 2 && selectedChances.length === 2);

  checkContradictions(type);  // 🔄 pass the context!
});



  return btn;
}

document.getElementById('generateBtn').addEventListener('click', () => {
  const allSelected = [...selectedChoices, ...selectedChances];
  const contradiction = findContradiction(allSelected);

  if (contradiction) {
    alert(`Oops! You've selected contradictory options: "${contradiction[0]}" and "${contradiction[1]}". Please update your selection.`);
    return;
  }

showResult();
goToStep(2);  // 🔄 move to result summary step


  // If no contradiction, proceed
  document.getElementById('choicesSection').classList.add('hidden');
  document.getElementById('chancesSection').classList.add('hidden');
  document.getElementById('generateBtn').classList.add('hidden');
  document.getElementById('resultSection').classList.remove('hidden');
  document.getElementById('habitForecast').innerHTML = '';
  document.getElementById('habitForecast').classList.add('hidden');

  showResult();
});

function showResult() {
  const selectedIds = [...selectedChoices, ...selectedChances];
  const allOptions = [...choices, ...chances];

  let totalScore = 0;
  selectedIds.forEach(id => {
    const match = allOptions.find(opt => opt.id === id);
    if (match) totalScore += match.score;
  });

  let profileTitle = '';
  let profileSummary = '';

  if (totalScore <= 5) {
    profileTitle = 'Stable and supported';
    profileSummary = "You're in a good place — solid habits and a supportive environment give you a strong foundation to build on.";
    currentProfile = 'stable';
  } else if (totalScore <= 10) {
    profileTitle = 'Managing with friction';
    profileSummary = "You’re managing — but there’s some resistance. A little structure or support could help you feel more in flow.";
    currentProfile = 'friction';
  } else if (totalScore <= 15) {
    profileTitle = 'Tired but trying';
    profileSummary = "You're putting in effort, but it’s hard. You’re not failing — you’re navigating challenges, and still showing up.";
    currentProfile = 'trying';
  } else if (totalScore <= 20) {
    profileTitle = 'Overloaded';
    profileSummary = "You’re under pressure from a lot of directions. Even small actions might feel big — and that’s okay.";
    currentProfile = 'overloaded';
  } else {
    profileTitle = 'Survival mode';
    profileSummary = "You’re doing your best in really hard conditions. Your environment asks a lot — and you deserve support that matches that.";
    currentProfile = 'survival';
  }

  const summary = document.getElementById('profileSummary');
  summary.innerHTML = `
    <h3 class="profile-name">${profileTitle}</h3>
    <p class="profile-summary"><em>${profileSummary}</em></p>
  `;

  const featureCards = document.getElementById('featureCards');
featureCards.innerHTML = `
  <div class="card"><strong>Ask Starbound:</strong> A personalised search engine that answers health questions based on your unique habits and circumstances.</div>
  <div class="card"><strong>Health Forecast:</strong> A visual breakdown of what your health might look like over time.</div>
`;

const nextBtn = document.createElement('button');
nextBtn.id = 'goToStep3Btn';
nextBtn.className = 'primary-btn';
nextBtn.textContent = '➡️ Try the Features';
nextBtn.addEventListener('click', () => goToStep(3));

featureCards.appendChild(nextBtn);


}

document.getElementById('habitForecastWrapper').classList.remove('hidden');

const habitQuestions = {
  skipMeals: "What happens if I stop eating regular meals?",
  drinkWater: "What happens if I start drinking 2L of water every day?",
  noOutsideTime: "What happens if I stop going outside every day?"
};

function showHabitForecast(habitId) {
  const messages = habitForecasts[habitId][currentProfile];
  const forecastDiv = document.getElementById('habitForecast');
  forecastDiv.classList.remove('hidden');
  console.log("Clicked:", habitId, currentProfile);


  forecastDiv.innerHTML = `
    <h4 style="text-align:center;">${habitQuestions[habitId]}</h4>
    <div class="forecast-card"><h4>1 Month</h4><p>${messages[0]}</p></div>
    <div class="forecast-card"><h4>6 Months</h4><p>${messages[1]}</p></div>
    <div class="forecast-card"><h4>1 Year</h4><p>${messages[2]}</p></div>
    <div class="forecast-card nudge"><h4>✨ Starbound Nudge</h4><p>${messages[3]}</p></div>
  `;
}

function formatHabitName(id) {
  return id
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
}

function showAskResponse(questionId) {
  if (!currentProfile) {
    console.warn("No profile generated yet.");
    return;
  }

  const answerSet = askStarboundData[questionId][currentProfile];
  const responseDiv = document.getElementById('askStarboundAnswer'); // ✅ correct ID

  responseDiv.classList.remove('hidden');
  responseDiv.innerHTML = `
    <h4 style="text-align:center;">💬 Answer:</h4>
    <div class="forecast-card"><p>${answerSet.answer}</p></div>
    <div class="forecast-card nudge"><h4>✨ Starbound Nudge</h4><p>${answerSet.nudge}</p></div>
  `;
}



const habitPicker = document.getElementById('habitPicker');
const habitIds = ['skipMeals', 'drinkWater', 'noOutsideTime'];

habitIds.forEach(habitId => {
  const btn = document.createElement('div');
  btn.classList.add('option-btn');
  btn.textContent = formatHabitName(habitId);
  btn.addEventListener('click', () => showHabitForecast(habitId));
  habitPicker.appendChild(btn);
});

const contradictions = [
  ['sleep_good', 'sleep_poor'],
  ['eat_regular', 'skip_meals'],
  ['active', 'no_movement'],
  ['screen_breaks', 'high_screen'],
  ['no_smoke', 'smoking'],
  ['stable_home', 'unstable_housing'],
  ['enough_income', 'low_income'],
  ['mentally_well', 'mental_health'],
  ['no_care', 'carer']
];

function findContradiction(selectedIds) {
  for (const pair of contradictions) {
    if (selectedIds.includes(pair[0]) && selectedIds.includes(pair[1])) {
      return pair;
    }
  }
  return null;
}

function checkContradictions(type) {
  const selected = type === 'choice' ? selectedChoices : selectedChances;
  const hasContradiction = !!findContradiction(selected);

  // Show/hide correct warning
  document.getElementById('warningChoices').classList.toggle('hidden', !(type === 'choice' && hasContradiction));
  document.getElementById('warningChances').classList.toggle('hidden', !(type === 'chance' && hasContradiction));
}









document.addEventListener("DOMContentLoaded", () => {
  renderOptions();
});



const askStarboundQuestions = {
  breakfast: "What’s a healthy breakfast if I don’t have time in the mornings?",
  sleep: "How do I build a sleep routine that actually works?",
  anxiety: "I’ve been feeling really anxious. What’s one thing I can do today that might help?",
  dizziness: "I’ve been feeling dizzy a lot lately. Should I be worried?"
};


const askGrid = document.getElementById('askStarboundPicker');

Object.entries(askStarboundQuestions).forEach(([id, text]) => {
  const btn = document.createElement('div');
  btn.classList.add('option-btn');
  btn.textContent = text;
  btn.addEventListener('click', () => showAskResponse(id));
  askGrid.appendChild(btn);
});


const askStarboundPicker = document.getElementById('askStarboundPicker');


document.getElementById('askStarboundWrapper').classList.remove('hidden');

