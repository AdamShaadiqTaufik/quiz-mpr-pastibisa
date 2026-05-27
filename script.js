/* ============================================
   QUIZ KONSTITUSI — Main Script
   ============================================ */

// ============================================
// CONFIGURATION
// ============================================
const META = {
  pancasila: { title: "Pancasila", num: "01", icon: "⬢", accent: "#C76D45" },
  uud:       { title: "UUD 1945", num: "02", icon: "❋", accent: "#5F8AAA" },
  nkri:      { title: "NKRI", num: "03", icon: "◈", accent: "#6E9C6E" },
  bhinneka:  { title: "Bhinneka Tunggal Ika", num: "04", icon: "✦", accent: "#BF9343" },
  mix:       { title: "Tantangan Akbar", num: "★", icon: "⚡", accent: "#9B6BC4" }
};

// Participant colors palette
const AVATAR_COLORS = [
  '#C76D45', '#5F8AAA', '#6E9C6E', '#BF9343', '#9B6BC4',
  '#C9554F', '#C49050', '#5C9B5B', '#7B6BB8', '#A8745A'
];

// Daftar peserta lomba (urut alfabetis)
const PARTICIPANTS = [
  { id: 'mahdiah',  name: 'A. Mahdiah S Fakhirah Asriadi' },
  { id: 'adam',     name: 'Adam Shaadiq Taufik' },
  { id: 'aiman',    name: 'Aiman Daffano Baihaque' },
  { id: 'alisya',   name: 'Alisya Nur Alifah Haryanto' },
  { id: 'amirah',   name: 'Amirah Zakiyyah Ramadhani' },
  { id: 'christian',name: 'Christian Javiery Chandranegara' },
  { id: 'kanaya',   name: 'Kanaya Tabita' },
  { id: 'aqil',     name: 'Muhammad Aqil R.' },
  { id: 'azizah',   name: 'Nur Azizah Rizky Budiarti' },
  { id: 'surya',    name: 'Sang Gede Surya Dharma' }
].map((p, i) => ({
  ...p,
  initials: getInitials(p.name),
  color: AVATAR_COLORS[i % AVATAR_COLORS.length]
}));

function getInitials(name) {
  // "A. Mahdiah S Fakhirah Asriadi" → "AM"
  // "Adam Shaadiq Taufik" → "AT"
  // "Muhammad Aqil R." → "MA"
  const clean = name.replace(/[.,]/g, '').trim();
  const parts = clean.split(/\s+/).filter(p => p.length > 0);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const HISTORY_KEY = 'quizKonstitusi.history.v2'; // keyed by participant
const ACTIVE_USER_KEY = 'quizKonstitusi.activeUser.v1';
const MAX_HISTORY = 200;

const COUNT_OPTIONS = {
  pancasila: [10, 25, 50],
  uud: [10, 25, 50],
  nkri: [10, 25, 50],
  bhinneka: [10, 25, 50],
  mix: [25, 50, 100, 150, 200]
};

// ============================================
// STATE
// ============================================
const state = {
  activeUser: null,
  currentQuiz: null,
  config: { count: 50, timer: 60, mode: 'ujian', difficulty: 'medium' },
  questions: [],
  answers: [],
  currentIdx: 0,
  startTime: 0,
  elapsed: 0,
  timerInterval: null,
  remainingSec: 0,
  totalSec: 0,
  finished: false,
  firebaseReady: false,
  db: null
};

// ============================================
// UTILITY
// ============================================
const $ = (id) => document.getElementById(id);
const $$ = (sel) => document.querySelectorAll(sel);

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// ============================================
// VIEW NAVIGATION
// ============================================
function showView(name) {
  $$('.view').forEach(v => v.classList.remove('active'));
  $(`view-${name}`).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// HOME — Quiz Card Click
// ============================================
function bindHomeCards() {
  $$('.quiz-card').forEach(card => {
    card.addEventListener('click', () => {
      const quiz = card.dataset.quiz;
      openSetup(quiz);
    });
  });
}

// ============================================
// SETUP
// ============================================
function openSetup(quizKey) {
  state.currentQuiz = quizKey;
  const meta = META[quizKey];

  $('setup-icon').textContent = meta.icon;
  $('setup-icon').style.color = meta.accent;
  $('setup-title').textContent = meta.title;

  // Render count options
  const counts = COUNT_OPTIONS[quizKey];
  const countContainer = $('opt-count');
  countContainer.innerHTML = '';
  counts.forEach((c, i) => {
    const btn = document.createElement('button');
    btn.className = 'pill';
    btn.dataset.count = c;
    btn.textContent = `${c} Soal`;
    // default: middle option for mix, last (50) for others
    const isDefault = (quizKey === 'mix' ? i === 1 : i === counts.length - 1);
    if (isDefault) {
      btn.classList.add('active');
      state.config.count = c;
    }
    btn.addEventListener('click', () => {
      countContainer.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      state.config.count = c;
    });
    countContainer.appendChild(btn);
  });

  // Reset timer, mode, difficulty to default
  state.config.timer = 60;
  state.config.mode = 'ujian';
  state.config.difficulty = 'medium';
  $$('#opt-timer .pill').forEach(p => {
    p.classList.toggle('active', p.dataset.timer === '60');
  });
  $$('#opt-mode .pill').forEach(p => {
    p.classList.toggle('active', p.dataset.mode === 'ujian');
  });
  $$('#opt-difficulty .pill').forEach(p => {
    p.classList.toggle('active', p.dataset.difficulty === 'medium');
  });

  showView('setup');
}

// Timer & Mode pill listeners
function bindSetupOptions() {
  $$('#opt-timer .pill').forEach(p => {
    p.addEventListener('click', () => {
      $$('#opt-timer .pill').forEach(x => x.classList.remove('active'));
      p.classList.add('active');
      state.config.timer = parseInt(p.dataset.timer);
    });
  });

  $$('#opt-mode .pill').forEach(p => {
    p.addEventListener('click', () => {
      $$('#opt-mode .pill').forEach(x => x.classList.remove('active'));
      p.classList.add('active');
      state.config.mode = p.dataset.mode;
    });
  });

  $$('#opt-difficulty .pill').forEach(p => {
    p.addEventListener('click', () => {
      $$('#opt-difficulty .pill').forEach(x => x.classList.remove('active'));
      p.classList.add('active');
      state.config.difficulty = p.dataset.difficulty;
    });
  });

  $('start-btn').addEventListener('click', startQuiz);
}

// ============================================
// QUIZ START
// ============================================
function startQuiz() {
  const quizKey = state.currentQuiz;
  let pool = [];

  if (quizKey === 'mix') {
    pool = [
      ...QUESTIONS.pancasila.map(q => ({ ...q, tag: 'Pancasila' })),
      ...QUESTIONS.uud.map(q => ({ ...q, tag: 'UUD 1945' })),
      ...QUESTIONS.nkri.map(q => ({ ...q, tag: 'NKRI' })),
      ...QUESTIONS.bhinneka.map(q => ({ ...q, tag: 'Bhinneka' }))
    ];
  } else {
    pool = QUESTIONS[quizKey].map(q => ({ ...q, tag: META[quizKey].title }));
  }

  // Filter by difficulty
  const targetDiff = state.config.difficulty;
  if (targetDiff && targetDiff !== 'all') {
    const filteredPool = pool.filter(q => q.difficulty === targetDiff);
    // If filtered pool is too small, fall back gracefully
    if (filteredPool.length >= state.config.count) {
      pool = filteredPool;
    } else if (filteredPool.length > 0) {
      // Mix in neighbors to reach target count
      const neighbors = pool.filter(q => q.difficulty !== targetDiff);
      pool = [...filteredPool, ...shuffle(neighbors).slice(0, state.config.count - filteredPool.length)];
      console.log(`Note: Only ${filteredPool.length} ${targetDiff} questions, filled with others.`);
    }
  }

  // Shuffle and slice
  const shuffled = shuffle(pool).slice(0, state.config.count);

  // For each question, also shuffle options (keeping track of correct index)
  state.questions = shuffled.map(q => {
    const indexed = q.options.map((opt, i) => ({ text: opt, isCorrect: i === q.correct }));
    const shuffledOpts = shuffle(indexed);
    return {
      question: q.question,
      options: shuffledOpts.map(o => o.text),
      correct: shuffledOpts.findIndex(o => o.isCorrect),
      explanation: q.explanation,
      tag: q.tag,
      difficulty: q.difficulty || 'medium'
    };
  });

  state.answers = new Array(state.questions.length).fill(null);
  state.currentIdx = 0;
  state.startTime = Date.now();
  state.elapsed = 0;
  state.finished = false;

  // Setup timer
  if (state.config.timer > 0) {
    state.totalSec = state.config.timer * 60;
    state.remainingSec = state.totalSec;
    $('timer-wrap').style.display = '';
    startTimer();
  } else {
    state.totalSec = 0;
    $('timer-wrap').style.display = 'none';
  }

  // Set topbar tag
  $('topbar-tag').textContent = META[state.currentQuiz].title;

  renderQuestion();
  buildNavGrid();
  showView('quiz');
}

// ============================================
// TIMER
// ============================================
function startTimer() {
  if (state.timerInterval) clearInterval(state.timerInterval);
  updateTimerUI();
  state.timerInterval = setInterval(() => {
    state.remainingSec--;
    state.elapsed = state.totalSec - state.remainingSec;
    updateTimerUI();
    if (state.remainingSec <= 0) {
      clearInterval(state.timerInterval);
      timeUp();
    }
  }, 1000);
}

function updateTimerUI() {
  $('timer-text').textContent = formatTime(state.remainingSec);
  const wrap = $('timer-wrap');
  const circumference = 97.4;
  const percent = state.remainingSec / state.totalSec;
  $('timer-fg').setAttribute('stroke-dasharray', `${(circumference * percent).toFixed(2)}, ${circumference}`);

  wrap.classList.remove('warning', 'danger');
  if (state.remainingSec <= 60) wrap.classList.add('danger');
  else if (state.remainingSec <= 300) wrap.classList.add('warning');
}

function timeUp() {
  state.finished = true;
  $('modal-timeup').classList.add('active');
}

// ============================================
// RENDER QUESTION
// ============================================
function renderQuestion() {
  const q = state.questions[state.currentIdx];
  const total = state.questions.length;
  const idx = state.currentIdx;

  // Topbar
  $('prog-current').textContent = idx + 1;
  $('prog-total').textContent = total;
  $('bar-fill').style.width = `${((idx + 1) / total) * 100}%`;

  // Question
  $('q-tag').textContent = q.tag;
  $('q-num').textContent = idx + 1;
  $('q-text').textContent = q.question;

  // Answers (Wayground-style cards)
  const ansContainer = $('answers');
  ansContainer.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.innerHTML = `
      <span class="answer-check">✓</span>
      <span class="answer-num">${i + 1}</span>
      <span class="answer-text">${opt}</span>
    `;

    const userAnswer = state.answers[idx];

    if (userAnswer !== null) {
      if (state.config.mode === 'latihan') {
        btn.disabled = true;
        if (i === q.correct) btn.classList.add('correct');
        else if (i === userAnswer) btn.classList.add('wrong');
      } else {
        if (i === userAnswer) btn.classList.add('selected');
      }
    }

    btn.addEventListener('click', () => selectAnswer(i));
    ansContainer.appendChild(btn);
  });

  // Explanation
  const expBox = $('explanation');
  if (state.config.mode === 'latihan' && state.answers[idx] !== null) {
    $('exp-text').textContent = q.explanation;
    expBox.classList.add('visible');
  } else {
    expBox.classList.remove('visible');
  }

  // Nav buttons
  $('prev-q').disabled = idx === 0;
  $('next-q').disabled = idx === total - 1;

  // Submit button (only show on last question if at least one answer exists)
  const isLast = idx === total - 1;
  $('submit-btn').style.display = isLast ? 'block' : 'none';

  updateNavGrid();
}

function selectAnswer(i) {
  const idx = state.currentIdx;
  // If already answered in latihan mode, can't change
  if (state.config.mode === 'latihan' && state.answers[idx] !== null) return;

  state.answers[idx] = i;
  renderQuestion();

  // Auto-advance in ujian mode after small delay? Keep manual for full control.
}

// ============================================
// NAV GRID (1, 2, 3, ...)
// ============================================
function buildNavGrid() {
  const grid = $('nav-grid');
  grid.innerHTML = '';
  state.questions.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'nav-dot';
    dot.textContent = i + 1;
    dot.addEventListener('click', () => {
      state.currentIdx = i;
      renderQuestion();
    });
    grid.appendChild(dot);
  });
  updateNavGrid();
}

function updateNavGrid() {
  const dots = $$('#nav-grid .nav-dot');
  dots.forEach((d, i) => {
    d.classList.remove('current', 'answered');
    if (state.answers[i] !== null) d.classList.add('answered');
    if (i === state.currentIdx) d.classList.add('current');
  });
}

// ============================================
// NAVIGATION
// ============================================
function bindQuizNav() {
  $('prev-q').addEventListener('click', () => {
    if (state.currentIdx > 0) {
      state.currentIdx--;
      renderQuestion();
    }
  });
  $('next-q').addEventListener('click', () => {
    if (state.currentIdx < state.questions.length - 1) {
      state.currentIdx++;
      renderQuestion();
    }
  });
  $('submit-btn').addEventListener('click', () => {
    showResult();
  });

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (!$('view-quiz').classList.contains('active')) return;
    if (e.key === 'ArrowLeft' && state.currentIdx > 0) {
      state.currentIdx--;
      renderQuestion();
    } else if (e.key === 'ArrowRight' && state.currentIdx < state.questions.length - 1) {
      state.currentIdx++;
      renderQuestion();
    } else if (['1','2','3','4'].includes(e.key)) {
      const i = parseInt(e.key) - 1;
      if (state.questions[state.currentIdx].options[i]) selectAnswer(i);
    }
  });
}

// ============================================
// RESULT
// ============================================
function showResult() {
  if (state.timerInterval) clearInterval(state.timerInterval);
  state.finished = true;

  const total = state.questions.length;
  let correct = 0, wrong = 0, skipped = 0;

  state.questions.forEach((q, i) => {
    const a = state.answers[i];
    if (a === null) skipped++;
    else if (a === q.correct) correct++;
    else wrong++;
  });

  const percent = Math.round((correct / total) * 100);
  const elapsedTotal = state.config.timer > 0 ? state.elapsed : Math.floor((Date.now() - state.startTime) / 1000);

  // Set numbers
  $('ring-num').textContent = correct;
  $('ring-total').textContent = total;
  $('stat-correct').textContent = correct;
  $('stat-wrong').textContent = wrong;
  $('stat-skip').textContent = skipped;
  $('stat-time').textContent = formatTime(elapsedTotal);
  $('result-percent').textContent = `${percent}%`;

  // Animate ring
  const circumference = 534;
  const offset = circumference - (correct / total) * circumference;
  setTimeout(() => {
    $('ring-fg').style.strokeDashoffset = offset;
  }, 100);

  // Message based on percent
  let emoji, title, msg;
  if (percent >= 90) {
    emoji = '🏆'; title = 'Luar Biasa!';
    msg = 'Penguasaanmu sangat baik. Kamu siap menghadapi lomba apa pun!';
  } else if (percent >= 75) {
    emoji = '🎉'; title = 'Hebat!';
    msg = 'Hasil yang sangat baik. Sedikit lagi penyempurnaan dan kamu akan jadi juara!';
  } else if (percent >= 60) {
    emoji = '👏'; title = 'Bagus!';
    msg = 'Hasil yang baik. Pelajari pembahasan untuk meningkatkan pemahamanmu.';
  } else if (percent >= 40) {
    emoji = '💪'; title = 'Tetap Semangat!';
    msg = 'Masih ada ruang untuk berkembang. Yuk pelajari pembahasan dan coba lagi!';
  } else {
    emoji = '📚'; title = 'Belajar Lagi Yuk!';
    msg = 'Jangan menyerah! Pelajari materi dan pembahasan, lalu coba lagi.';
  }

  $('result-emoji').textContent = emoji;
  $('result-title').textContent = title;
  $('result-msg').textContent = msg;

  // Save to history
  saveToHistory({
    quiz: state.currentQuiz,
    quizName: META[state.currentQuiz].title,
    icon: META[state.currentQuiz].icon,
    total: total,
    correct: correct,
    wrong: wrong,
    skipped: skipped,
    percent: percent,
    elapsed: elapsedTotal,
    timerMode: state.config.timer,
    mode: state.config.mode,
    timestamp: Date.now()
  });

  showView('result');
}

// ============================================
// REVIEW
// ============================================
let currentFilter = 'all';

function showReview() {
  currentFilter = 'all';
  $$('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === 'all');
  });
  renderReview();
  showView('review');
}

function renderReview() {
  const list = $('review-list');
  list.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];

  state.questions.forEach((q, i) => {
    const a = state.answers[i];
    let status;
    if (a === null) status = 'skipped';
    else if (a === q.correct) status = 'correct';
    else status = 'wrong';

    if (currentFilter !== 'all' && currentFilter !== status) return;

    const item = document.createElement('div');
    item.className = `review-item ${status}`;

    let answerHtml = '';
    if (a !== null) {
      const userClass = a === q.correct ? 'user-correct' : 'user-wrong';
      answerHtml += `<div class="review-ans ${userClass}"><span class="review-ans-lbl">Jawabanmu</span> ${letters[a]}. ${q.options[a]}</div>`;
    } else {
      answerHtml += `<div class="review-ans user-wrong"><span class="review-ans-lbl">Jawabanmu</span> (Tidak dijawab)</div>`;
    }

    if (a !== q.correct) {
      answerHtml += `<div class="review-ans correct-answer"><span class="review-ans-lbl">Jawaban Benar</span> ${letters[q.correct]}. ${q.options[q.correct]}</div>`;
    }

    item.innerHTML = `
      <div class="review-num">Soal ${i + 1} · ${q.tag}</div>
      <div class="review-q">${q.question}</div>
      ${answerHtml}
      <div class="review-exp"><strong>↳ Pembahasan:</strong> ${q.explanation}</div>
    `;
    list.appendChild(item);
  });

  if (list.children.length === 0) {
    list.innerHTML = `<div style="text-align:center; padding:40px; color:var(--ink-3);">Tidak ada soal dalam kategori ini.</div>`;
  }
}

function bindReviewFilters() {
  $$('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderReview();
    });
  });
}

// ============================================
// QUIT / MODAL
// ============================================
function bindModals() {
  // Quit button
  $$('[data-action="quit"]').forEach(b => {
    b.addEventListener('click', () => {
      $('modal-quit').classList.add('active');
    });
  });

  $$('[data-action="cancel-quit"]').forEach(b => {
    b.addEventListener('click', () => {
      $('modal-quit').classList.remove('active');
    });
  });

  $$('[data-action="confirm-quit"]').forEach(b => {
    b.addEventListener('click', () => {
      if (state.timerInterval) clearInterval(state.timerInterval);
      $('modal-quit').classList.remove('active');
      showView('home');
    });
  });

  $$('[data-action="show-result"]').forEach(b => {
    b.addEventListener('click', () => {
      $('modal-timeup').classList.remove('active');
      showResult();
    });
  });
}

// ============================================
// ACTIONS
// ============================================
function bindActions() {
  document.body.addEventListener('click', (e) => {
    const target = e.target.closest('[data-action]');
    if (!target) return;
    const action = target.dataset.action;
    switch (action) {
      case 'home':
      case 'back-home':
        if (state.timerInterval) clearInterval(state.timerInterval);
        showView('home');
        break;
      case 'back-result':
        showView('result');
        break;
      case 'review':
        showReview();
        break;
      case 'history':
        showHistory();
        break;
      case 'clear-history':
        if (confirm('Yakin ingin menghapus semua riwayat? Tindakan ini tidak dapat dibatalkan.')) {
          clearHistory().then(() => renderHistory());
        }
        break;
      case 'retry':
        // Restart same quiz with same config
        if (state.currentQuiz) {
          openSetup(state.currentQuiz);
        } else {
          showView('home');
        }
        break;
    }
  });
}

// ============================================
// FIREBASE INITIALIZATION
// ============================================
function initFirebase() {
  if (typeof FIREBASE_ENABLED === 'undefined' || !FIREBASE_ENABLED) {
    console.log('ℹ️ Firebase belum dikonfigurasi. Gunakan localStorage offline.');
    return;
  }
  if (!window.firebaseModules) {
    console.warn('⚠️ Firebase modules belum siap, akan retry...');
    return;
  }
  try {
    const { initializeApp, getDatabase } = window.firebaseModules;
    const app = initializeApp(FIREBASE_CONFIG);
    state.db = getDatabase(app);
    state.firebaseReady = true;
    console.log('✓ Firebase Realtime Database ready! Cloud sync aktif.');
    updateSyncIndicator();
    if ($('view-history').classList.contains('active')) renderHistory();
  } catch (e) {
    console.error('✗ Firebase init error:', e);
  }
}

function updateSyncIndicator() {
  const indicator = $('sync-indicator');
  if (!indicator) return;
  if (state.firebaseReady) {
    indicator.innerHTML = '<span class="sync-dot online"></span> <span>Cloud Aktif</span>';
    indicator.className = 'sync-indicator online';
  } else {
    indicator.innerHTML = '<span class="sync-dot offline"></span> <span>Lokal</span>';
    indicator.className = 'sync-indicator offline';
  }
}

// ============================================
// HISTORY MANAGEMENT (Cloud + Local)
// ============================================
function loadAllHistoryLocal() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error('Load history error:', e);
    return {};
  }
}

function loadHistoryLocal() {
  const all = loadAllHistoryLocal();
  const userId = state.activeUser || 'guest';
  return all[userId] || [];
}

// Cache cloud results to avoid hammering Firestore
const cloudCache = { data: {}, fetched: {} };

async function loadHistoryFromCloud(userId) {
  if (!state.firebaseReady) return null;
  if (cloudCache.fetched[userId] && (Date.now() - cloudCache.fetched[userId] < 30000)) {
    return cloudCache.data[userId] || [];
  }
  try {
    const { ref, get } = window.firebaseModules;
    // Structure: /history/{userId}/{timestamp} = record
    const userRef = ref(state.db, `history/${userId}`);
    const snap = await get(userRef);
    const records = [];
    if (snap.exists()) {
      snap.forEach(child => {
        records.push(child.val());
      });
    }
    // Sort by timestamp desc
    records.sort((a, b) => b.timestamp - a.timestamp);
    cloudCache.data[userId] = records;
    cloudCache.fetched[userId] = Date.now();
    return records;
  } catch (e) {
    console.error('Cloud load error:', e);
    return null;
  }
}

// Sync-friendly version: returns local immediately, refreshes from cloud in background
function loadHistory(callback) {
  const userId = state.activeUser || 'guest';
  const local = loadHistoryLocal();

  if (typeof callback === 'function') {
    callback(local); // immediate
    if (state.firebaseReady) {
      loadHistoryFromCloud(userId).then(cloud => {
        if (cloud) {
          // Merge: cloud is source of truth, but keep local entries not in cloud
          const cloudTs = new Set(cloud.map(r => r.timestamp));
          const merged = [...cloud, ...local.filter(r => !cloudTs.has(r.timestamp))];
          merged.sort((a, b) => b.timestamp - a.timestamp);
          // Update local cache
          const all = loadAllHistoryLocal();
          all[userId] = merged;
          try { localStorage.setItem(HISTORY_KEY, JSON.stringify(all)); } catch (e) {}
          callback(merged);
        }
      });
    }
    return;
  }
  return local;
}

async function saveToHistory(record) {
  const userId = state.activeUser || 'guest';
  record.participantId = userId;
  record.participantName = getParticipantName(userId);

  // Save locally first
  try {
    const all = loadAllHistoryLocal();
    if (!all[userId]) all[userId] = [];
    all[userId].unshift(record);
    if (all[userId].length > MAX_HISTORY) all[userId].length = MAX_HISTORY;
    localStorage.setItem(HISTORY_KEY, JSON.stringify(all));
  } catch (e) { console.error('Local save error:', e); }

  // Then sync to cloud
  if (state.firebaseReady) {
    try {
      const { ref, set } = window.firebaseModules;
      await set(ref(state.db, `history/${userId}/${record.timestamp}`), record);
      delete cloudCache.fetched[userId];
      console.log('✓ Synced to cloud');
    } catch (e) {
      console.error('Cloud save error:', e);
    }
  }
}

async function clearHistory() {
  const userId = state.activeUser || 'guest';

  // Clear local
  try {
    const all = loadAllHistoryLocal();
    delete all[userId];
    localStorage.setItem(HISTORY_KEY, JSON.stringify(all));
  } catch (e) {}

  // Clear cloud
  if (state.firebaseReady) {
    try {
      const { ref, remove } = window.firebaseModules;
      await remove(ref(state.db, `history/${userId}`));
      delete cloudCache.fetched[userId];
      console.log('✓ Cleared from cloud');
    } catch (e) { console.error('Cloud clear error:', e); }
  }
}

async function deleteHistoryEntry(timestamp) {
  const userId = state.activeUser || 'guest';

  // Delete from local
  try {
    const all = loadAllHistoryLocal();
    if (all[userId]) {
      all[userId] = all[userId].filter(h => h.timestamp !== timestamp);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(all));
    }
  } catch (e) {}

  // Delete from cloud
  if (state.firebaseReady) {
    try {
      const { ref, remove } = window.firebaseModules;
      await remove(ref(state.db, `history/${userId}/${timestamp}`));
      delete cloudCache.fetched[userId];
    } catch (e) { console.error('Cloud delete error:', e); }
  }
}

function getParticipantName(id) {
  if (id === 'guest') return 'Tamu';
  const p = PARTICIPANTS.find(p => p.id === id);
  return p ? p.name : 'Tamu';
}

function getParticipant(id) {
  if (!id || id === 'guest') return { id: 'guest', name: 'Tamu', initials: '?', color: '#7A766B' };
  return PARTICIPANTS.find(p => p.id === id) || { id: 'guest', name: 'Tamu', initials: '?', color: '#7A766B' };
}

let currentHistoryFilter = 'all';

function showHistory() {
  currentHistoryFilter = 'all';
  $$('.history-filters .filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.hfilter === 'all');
  });
  renderHistory();
  showView('history');
}

function renderHistory() {
  // Render twice: first with local (fast), then with cloud (synced)
  loadHistory((history) => renderHistoryUI(history));
}

function renderHistoryUI(history) {
  const empty = $('history-empty');
  const list = $('history-list');
  const summary = $('history-summary');
  const progress = $('materi-progress');
  const filters = document.querySelector('.history-filters');
  const clearBtn = $('clear-btn');
  const ap = $('active-participant');

  // Update active participant indicator
  const participant = getParticipant(state.activeUser);
  if (participant.id !== 'guest') {
    ap.style.display = 'inline-flex';
    $('ap-avatar').textContent = participant.initials;
    $('ap-avatar').style.background = participant.color;
    $('ap-name').textContent = participant.name;
  } else {
    ap.style.display = 'none';
  }

  if (history.length === 0) {
    empty.classList.add('visible');
    summary.style.display = 'none';
    progress.classList.remove('visible');
    filters.style.display = 'none';
    list.style.display = 'none';
    clearBtn.style.display = 'none';
    return;
  }

  empty.classList.remove('visible');
  summary.style.display = '';
  filters.style.display = '';
  list.style.display = '';
  clearBtn.style.display = '';

  // Summary stats
  const totalQuiz = history.length;
  const bestPercent = Math.max(...history.map(h => h.percent));
  const avgPercent = Math.round(history.reduce((s, h) => s + h.percent, 0) / totalQuiz);
  const totalQuestions = history.reduce((s, h) => s + h.total, 0);

  $('hs-total').textContent = totalQuiz;
  $('hs-best').textContent = `${bestPercent}%`;
  $('hs-avg').textContent = `${avgPercent}%`;
  $('hs-questions').textContent = totalQuestions;

  // Per-materi progress
  renderMateriProgress(history);

  // History list (filtered)
  let filtered = history;
  if (currentHistoryFilter !== 'all') {
    filtered = history.filter(h => h.quiz === currentHistoryFilter);
  }

  list.innerHTML = '';
  if (filtered.length === 0) {
    list.innerHTML = `<div style="text-align:center; padding:40px; color:var(--ink-3); background: var(--glass); backdrop-filter: blur(20px); border-radius:14px; border:1px solid var(--glass-border);">Belum ada riwayat untuk kategori ini.</div>`;
    return;
  }

  filtered.forEach((h, idx) => {
    const meta = META[h.quiz] || META.mix;
    const item = document.createElement('div');
    item.className = 'history-item';
    item.style.borderLeftColor = meta.accent;

    let grade, gradeClass;
    if (h.percent >= 85) { grade = 'EXCELLENT'; gradeClass = 'excellent'; }
    else if (h.percent >= 70) { grade = 'BAIK'; gradeClass = 'good'; }
    else if (h.percent >= 50) { grade = 'CUKUP'; gradeClass = 'ok'; }
    else { grade = 'PERLU LATIHAN'; gradeClass = 'low'; }

    const date = new Date(h.timestamp);
    const dateStr = formatDate(date);

    item.innerHTML = `
      <div class="hi-glyph" style="color: ${meta.accent};">${h.icon || meta.icon}</div>
      <div class="hi-info">
        <div class="hi-name">${h.quizName}</div>
        <div class="hi-meta">
          <span>${dateStr}</span>
          <span>${h.total} soal</span>
          <span>${formatTime(h.elapsed)}</span>
          <span>${h.mode === 'latihan' ? 'Latihan' : 'Ujian'}</span>
        </div>
      </div>
      <div class="hi-score">
        <div class="hi-score-num" style="color: ${meta.accent};">${h.percent}%</div>
        <div class="hi-score-detail">${h.correct}/${h.total} benar</div>
        <span class="hi-grade ${gradeClass}">${grade}</span>
      </div>
      <button class="hi-delete" data-delete-ts="${h.timestamp}" title="Hapus entri ini">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1L9 9M1 9L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>
    `;
    list.appendChild(item);
  });
}

function renderMateriProgress(history) {
  const progress = $('materi-progress');
  const materiKeys = ['pancasila', 'uud', 'nkri', 'bhinneka', 'mix'];

  // Calculate best score per materi
  const stats = {};
  materiKeys.forEach(key => {
    const records = history.filter(h => h.quiz === key);
    if (records.length > 0) {
      stats[key] = {
        best: Math.max(...records.map(r => r.percent)),
        count: records.length,
        avg: Math.round(records.reduce((s, r) => s + r.percent, 0) / records.length)
      };
    }
  });

  if (Object.keys(stats).length === 0) {
    progress.classList.remove('visible');
    return;
  }

  progress.classList.add('visible');
  let html = `<div class="mp-title">Progress per Materi — Skor Terbaik</div><div class="mp-list">`;

  materiKeys.forEach(key => {
    const meta = META[key];
    const stat = stats[key];
    if (!stat) {
      html += `
        <div class="mp-item">
          <div class="mp-name" style="color: var(--ink-3);">${meta.title}</div>
          <div class="mp-bar"><div class="mp-bar-fill" style="width: 0%; background: var(--ink-4);"></div></div>
          <div class="mp-percent" style="color: var(--ink-3);">—</div>
        </div>
      `;
    } else {
      html += `
        <div class="mp-item">
          <div class="mp-name">${meta.title}</div>
          <div class="mp-bar"><div class="mp-bar-fill" style="width: ${stat.best}%; background: ${meta.accent}; box-shadow: 0 0 8px ${meta.accent}66;"></div></div>
          <div class="mp-percent" style="color: ${meta.accent};">${stat.best}%</div>
        </div>
      `;
    }
  });

  html += `</div>`;
  progress.innerHTML = html;
}

function formatDate(date) {
  const now = new Date();
  const diff = (now - date) / 1000; // seconds

  if (diff < 60) return 'Baru saja';
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  if (diff < 172800) return 'Kemarin';
  if (diff < 604800) return `${Math.floor(diff / 86400)} hari lalu`;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function bindHistoryFilters() {
  $$('.history-filters .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.history-filters .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentHistoryFilter = btn.dataset.hfilter;
      renderHistory();
    });
  });
}

// ============================================
// PROFILE / PARTICIPANT SELECTOR
// ============================================
function loadActiveUser() {
  try {
    return localStorage.getItem(ACTIVE_USER_KEY);
  } catch (e) { return null; }
}

function saveActiveUser(id) {
  try {
    if (id) localStorage.setItem(ACTIVE_USER_KEY, id);
    else localStorage.removeItem(ACTIVE_USER_KEY);
  } catch (e) {}
}

function setActiveUser(id) {
  state.activeUser = id;
  saveActiveUser(id);
  renderProfileButton();
  // If we are on history view, re-render
  if ($('view-history').classList.contains('active')) renderHistory();
}

function renderProfileButton() {
  const p = getParticipant(state.activeUser);
  const avatar = $('profile-avatar');
  const name = $('profile-name');
  avatar.textContent = p.initials;
  avatar.style.background = p.color;
  name.textContent = p.id === 'guest' ? 'Pilih Peserta' : p.name.split(' ')[0];

  // Update active in dropdown
  $$('.pd-item').forEach(it => {
    it.classList.toggle('active', it.dataset.pid === p.id);
  });
}

function renderParticipantList() {
  const list = $('pd-list');
  list.innerHTML = '';

  // Guest option
  const guest = document.createElement('button');
  guest.className = 'pd-item';
  guest.dataset.pid = 'guest';
  guest.innerHTML = `
    <span class="profile-avatar" style="background: #7A766B;">?</span>
    <span class="pd-item-name">Tamu <em style="font-family: 'Fraunces', serif; color: var(--ink-3); font-size: 12px;">(tanpa nama)</em></span>
    <span class="pd-item-check">✓</span>
  `;
  guest.addEventListener('click', () => {
    setActiveUser('guest');
    closeProfileDropdown();
  });
  list.appendChild(guest);

  // Separator
  const sep = document.createElement('div');
  sep.style.cssText = 'height:1px;background:var(--line);margin:6px 0;';
  list.appendChild(sep);

  // Participants
  PARTICIPANTS.forEach(p => {
    const btn = document.createElement('button');
    btn.className = 'pd-item';
    btn.dataset.pid = p.id;
    btn.innerHTML = `
      <span class="profile-avatar" style="background: ${p.color};">${p.initials}</span>
      <span class="pd-item-name">${p.name}</span>
      <span class="pd-item-check">✓</span>
    `;
    btn.addEventListener('click', () => {
      setActiveUser(p.id);
      closeProfileDropdown();
    });
    list.appendChild(btn);
  });
}

function openProfileDropdown() {
  $('profile-btn').classList.add('open');
  $('profile-dropdown').classList.add('open');
}

function closeProfileDropdown() {
  $('profile-btn').classList.remove('open');
  $('profile-dropdown').classList.remove('open');
}

function bindProfileSelector() {
  $('profile-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = $('profile-dropdown').classList.contains('open');
    if (isOpen) closeProfileDropdown();
    else openProfileDropdown();
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.profile-wrap')) closeProfileDropdown();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProfileDropdown();
  });
}

// ============================================
// INIT
// ============================================
function init() {
  // Load active user from localStorage
  state.activeUser = loadActiveUser() || 'guest';

  renderParticipantList();
  renderProfileButton();
  bindProfileSelector();

  bindHomeCards();
  bindSetupOptions();
  bindQuizNav();
  bindReviewFilters();
  bindHistoryFilters();
  bindModals();
  bindActions();

  // Delete individual history entry
  document.body.addEventListener('click', (e) => {
    const delBtn = e.target.closest('[data-delete-ts]');
    if (delBtn) {
      e.stopPropagation();
      const ts = parseInt(delBtn.dataset.deleteTs);
      if (confirm('Hapus entri ini dari riwayat?')) {
        deleteHistoryEntry(ts).then(() => renderHistory());
      }
    }
  });

  // Initialize Firebase (waits for SDK to be ready)
  if (window.firebaseModules) {
    initFirebase();
  } else {
    window.addEventListener('firebaseReady', initFirebase);
  }
}

init();
