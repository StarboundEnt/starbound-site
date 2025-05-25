// complexity.js
document.addEventListener('DOMContentLoaded', () => {
  console.log('⚙️  complexity.js loaded');

  // 1️⃣ Grab your elements
  const introScreen       = document.getElementById('introScreen');
  const questionContainer = document.getElementById('questionContainer');
  const questionContent   = document.getElementById('questionContent');
  const resultContainer   = document.getElementById('resultContainer');
  const startBtn          = document.getElementById('startBtn');
  const backBtn           = document.getElementById('backBtn');
  const restartBtn = document.getElementById('restartBtn');

  console.log({ introScreen, questionContainer, resultContainer, startBtn, backBtn });

  // 2️⃣ Questions data
 // --- Behavioural (“Choices”) questions (7 total) ---
const choicesQuestions = [
  {
    question: "How has your sleep been lately?",
    description: "💤 Good sleep makes a big difference to energy and focus.",
    options: [
      { text: "Great — I wake up rested most days", score: 0 },
      { text: "Meh — it’s been hit and miss", score: 1 },
      { text: "Pretty bad — I’m not sleeping well", score: 2 }
    ]
  },
  {
    question: "How much water do you usually drink?",
    description: "💧 Hydration affects energy, skin, focus (everything, really).",
    options: [
      { text: "6+ glasses a day", score: 0 },
      { text: "Around 3–5 glasses", score: 1 },
      { text: "Less than 3 glasses", score: 2 }
    ]
  },
  {
    question: "How’s your energy been recently?",
    description: "🔋 Think mental, physical, emotional energy.",
    options: [
      { text: "High — I feel sharp and active", score: 0 },
      { text: "Mixed — up and down", score: 1 },
      { text: "Low — tired, foggy, or flat", score: 2 }
    ]
  },
  {
    question: "What’s your screen time like (excluding work/study)?",
    description: "🖥️ Screens are part of life.",
    options: [
      { text: "Less than 4 hours/day", score: 0 },
      { text: "Around 4–6 hours", score: 1 },
      { text: "More than 6 hours", score: 2 }
    ]
  },
  {
    question: "How often are you eating meals or snacks?",
    description: "🥣 No judgement — just checking if your body’s getting fuel.",
    options: [
      { text: "Regularly — 3+ meals/snacks a day", score: 0 },
      { text: "Sometimes I forget or delay meals", score: 1 },
      { text: "I often skip meals or eat very little", score: 2 }
    ]
  },
  {
    question: "How much are you moving most days?",
    description: "🧘 Walking, stretching, dancing — anything counts.",
    options: [
      { text: "I move a lot every day", score: 0 },
      { text: "A bit — when I remember", score: 1 },
      { text: "Barely at all", score: 2 }
    ]
  },
  {
    question: "How often do you check in with your body or mood?",
    description: "🚶‍♀️ This could be noticing your breathing, stress, or feelings.",
    options: [
      { text: "Often — I try to stay aware", score: 0 },
      { text: "Sometimes — if something feels off", score: 1 },
      { text: "Rarely or never", score: 2 }
    ]
  }
];

// --- Contextual (“Chances”) questions (6 total) ---
const chancesQuestions = [
  {
    question: "Do you feel safe and settled where you live?",
    description: "🏠 Whether it’s your room, your house, or wherever you sleep — does it feel okay?",
    options: [
      { text: "Yes, I feel safe and stable", score: 0 },
      { text: "Sometimes — it depends", score: 1 },
      { text: "No — it feels unsafe or unstable", score: 2 }
    ]
  },
  {
    question: "How often do you have to skip essentials (like food, meds or bills) because of money?",
    description: "🛒 This is about financial pressure, not budgeting skills.",
    options: [
      { text: "Rarely or never", score: 0 },
      { text: "Sometimes", score: 1 },
      { text: "Often", score: 2 }
    ]
  },
  {
    question: "Are you currently caring for anyone or carrying a big load for someone else?",
    description: "🧠 This could be emotional support, caregiving, or just being the go-to person.",
    options: [
      { text: "Not really", score: 0 },
      { text: "Sometimes", score: 1 },
      { text: "Yes, regularly", score: 2 }
    ]
  },
  {
    question: "If you needed help with your health, how easy would it be to get support?",
    description: "🩺 Could be a GP, a psychologist, or even reliable advice online.",
    options: [
      { text: "Easy — I know where I’d go", score: 0 },
      { text: "Possible, but not simple", score: 1 },
      { text: "Difficult or I wouldn’t know how", score: 2 }
    ]
  },
  {
    question: "Do you ever avoid health services because they don’t feel safe or welcoming for people like you?",
    description: "🌏 This might be about culture, identity, mental health, gender, language, or past experiences.",
    options: [
      { text: "Never", score: 0 },
      { text: "Sometimes", score: 1 },
      { text: "Yes, often", score: 2 }
    ]
  },
  {
    question: "How’s your access to the internet or mobile data?",
    description: "🌐 Just checking if digital support is even possible for you right now.",
    options: [
      { text: "Reliable Wi-Fi or unlimited data", score: 0 },
      { text: "I manage, but have limits", score: 1 },
      { text: "It’s hard to stay connected", score: 2 }
    ]
  }
];


  // 3️⃣ State
  let currentSection = 'intro';
  let qIndex         = 0;
  let choicesScore   = 0;
  let chancesScore   = 0;
  let history        = [];

  // 4️⃣ Wire up buttons
  startBtn.addEventListener('click', startQuiz);
  backBtn .addEventListener('click', goBack);
  restartBtn.addEventListener('click', () => {
    // Show the intro screen again:
    introScreen.classList.remove('hidden');
    // Hide the question and result containers:
    questionContainer.classList.add('hidden');
    resultContainer.classList.add('hidden');
    // Reset your scores and history (so if they click Start again, it's fresh):
    history = [];
    choicesScore = 0;
    chancesScore = 0;
  });


  // 5️⃣ Functions
  function startQuiz() {
    console.log('▶️ startQuiz');
    introScreen.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    currentSection = 'choices';
    qIndex = 0;
    choicesScore = chancesScore = 0;
    history = [];
    backBtn.classList.add('hidden');
    showQuestion();
  }


function setQuestionMode(section) {
  document.body.classList.remove('choices-mode', 'chances-mode');

  if (section === 'choices') {
    document.body.classList.add('choices-mode');
  } else if (section === 'chances') {
    document.body.classList.add('chances-mode');
  }
}

  function showQuestion() {
    console.log('🔍 showQuestion', currentSection, qIndex);

  setQuestionMode(currentSection);

  const data = (currentSection === 'choices')
    ? choicesQuestions[qIndex]
    : chancesQuestions[qIndex];

    // hide back on very first question
if (history.length > 0) {
  backBtn.classList.remove('hidden');
} else {
  backBtn.classList.add('hidden');
}

    let html = `
      <div class="question">
        <h3>${data.question}</h3>
        <p>${data.description}</p>
        <div class="options">
          ${data.options.map(o =>
            `<button class="option-btn" data-score="${o.score}">${o.text}</button>`
          ).join('')}
        </div>
      </div>
    `;
questionContent.innerHTML = html;

    document.querySelectorAll('.option-btn').forEach(btn =>
      btn.addEventListener('click', selectOption)
    );
  }

  function selectOption(e) {
    const score = parseInt(e.currentTarget.dataset.score, 10);
    console.log('✅ Selected score', score);
    history.push({ section: currentSection, index: qIndex, score });

    if (currentSection === 'choices') choicesScore += score;
    else                              chancesScore += score;

    qIndex++;
    if (currentSection === 'choices' && qIndex < choicesQuestions.length) {
      showQuestion();
    } else if (currentSection === 'choices') {
      currentSection = 'chances';
      qIndex = 0;
      showQuestion();
    } else if (currentSection === 'chances' && qIndex < chancesQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }

  function goBack() {
    const last = history.pop();
    console.log('↩️ goBack to', last);
    if (!last) return;

    if (last.section === 'choices') choicesScore -= last.score;
    else                             chancesScore -= last.score;

    currentSection = last.section;
    qIndex         = last.index;
    showQuestion();
  }

function showResults() {
  console.log('🏁 showResults');

  // 1. Hide everything but the results
  introScreen.classList.add('hidden');
  questionContainer.classList.add('hidden');
  backBtn.classList.add('hidden');
  resultContainer.classList.remove('hidden');

  // 2. Compute profile & balance
  const total   = choicesScore + chancesScore;
  const profile = getProfile(total);
  const balance = getBalance(choicesScore, chancesScore);

  // 3. Full text mappings
  const suggestText = {
    "Low Complexity":    "You’ve created a strong foundation, both in your habits and environment. That reflects intentionality, self-knowledge, and alignment.",
    "Dual Pressure":     "You’re carrying a lot — internally and externally. It’s not a lack of effort, it’s a lack of support.",
    "Internal Friction": "Your environment seems steady — but your body or brain might be asking for rest, rhythm, or reconnection.",
    "External Barrier":  "You’re maintaining what you can in a challenging environment — and that’s impressive. Your resilience and resourcefulness show."
  };

  const supportText = {
    "Low Complexity": `
      🔔 Encouraging micro-challenges and smart habit upgrades — always within your chosen pace.<br>
      📈 Offering insight into long-term gains, not just short-term fixes.<br>
      🔍 Supporting your curiosity with deeper, higher-agency tools and advanced insights.
    `,
    "Dual Pressure": `
      🔔 Giving you full permission to rest — nudges only if you want them, and only if they feel safe.<br>
      📈 Showing gentle, possible futures — when you’re ready, not before.<br>
      🔍 Filtering every suggestion through a lens of compassion and energy protection.
    `,
    "Internal Friction": `
      🔔 Nudging gently, with habits that help you reset your rhythm without forcing progress.<br>
      📈 Forecasting realistic gains from low-pressure steps (like hydration, rest, or small movement).<br>
      🔍 Giving direct, distraction-free answers that help you act on your awareness without overwhelm.
    `,
    "External Barrier": `
      🔍 Prioritising low-barrier, culturally safe, and trauma-aware information.<br>
      📈 Focusing on stability and reducing harm — not perfection.<br
      🔔 Offering nudges only when helpful — never when they add more pressure.
    `
  };

  // 4. Render the full results HTML
  resultContainer.innerHTML = `
    <div class="results-box">
      <h2>${profile.emoji} ${profile.label}</h2>
      <p>${profile.summary}</p>

      <h3>What your answers suggest</h3>
      <p>${suggestText[balance]}</p>

      <h3>How Starbound will support you</h3>
      <p>${supportText[balance]}</p>

      <div class="controls" style="margin-top:30px;">
        <button id="restartResultBtn" class="restart-btn">Start Over</button>
        <button id="homeBtn" class="home-btn">Go to Starbound</button>
      </div>
    </div>
  `;

  // wire up those buttons:
  document
    .getElementById('restartResultBtn')
    .addEventListener('click', () => {
      // show intro, hide quiz+results, reset state
      introScreen.classList.remove('hidden');
      questionContainer.classList.add('hidden');
      resultContainer.classList.add('hidden');
      history = [];
      choicesScore = 0;
      chancesScore = 0;
    });

  document
    .getElementById('homeBtn')
    .addEventListener('click', () => {
      window.location.href = 'https://iamstarbound.com';
    });
}


  function getProfile(total) {
    if (total <= 5)  return { label: "Stable & Supported",   emoji: "🌞", summary: "You’ve got solid routines, and your environment seems to be working with you. Not against you. That doesn’t mean life’s perfect, but your foundation is strong. If you’re exploring ways to grow or fine-tune your health, you’ve got the capacity and rhythm to try something new." };
    if (total <= 10) return { label: "Managing with Friction", emoji: "🌤️", summary: "You’re doing okay, but something’s a bit off. A few routines might be slipping, or your environment is throwing small curveballs. Either way, you’re not alone. You’ve got room to improve things with a bit of support, structure, or self-kindness." };
    if (total <= 15) return { label: "Tired but Trying",      emoji: "🌧️", summary: "You care about your health — but your energy, habits, or environment are making things harder than they need to be. It might feel like you’re stuck in a loop. You’re trying under pressure, and that matters."};
    if (total <= 20) return { label: "Overloaded",            emoji: "🌪️", summary: "Right now, life’s a lot. Maybe it’s everything at once: stress, burnout, limited time, hard decisions, or systems that don’t support you. Even small habits might feel heavy. Just being here is a big step." };
                      return { label: "Survival Mode",          emoji: "🆘", summary: "When life is in survival mode, health often drops to the bottom of the list — and that’s not your fault. Whether it’s housing, money, stress, or safety, you’re carrying a lot. You deserve support that respects what you’re up against, not advice that assumes everything’s fine." };
  }

  function getBalance(c, h) {
    if (c <= 5 && h <= 5) return "Low Complexity";
    if (c >= 6 && h >= 6) return "Dual Pressure";
    if (c > h)            return "Internal Friction";
                         return "External Barrier";
  }
});

