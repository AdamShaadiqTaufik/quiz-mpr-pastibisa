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
  bookmarks: new Set(),
  notes: {},
  currentIdx: 0,
  startTime: 0,
  elapsed: 0,
  timerInterval: null,
  remainingSec: 0,
  totalSec: 0,
  finished: false,
  firebaseReady: false,
  db: null,
  allHistory: [],
  isFlashcardMode: false,
  flashRevealed: new Set()
};

// ============================================
// SETTINGS (persisted via localStorage)
// ============================================
const SETTINGS_KEY = 'qk_settings_v1';
const DEFAULT_SETTINGS = {
  theme: 'light',
  fontSize: 'normal',
  soundEnabled: true,
  autoAdvance: false
};
let settings = { ...DEFAULT_SETTINGS };

function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) settings = { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (e) {}
  applySettings();
}
function saveSettings() {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (e) {}
}
function applySettings() {
  document.documentElement.setAttribute('data-theme', settings.theme);
  document.documentElement.setAttribute('data-font-size', settings.fontSize);
}

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
  // Cleanup when leaving quiz view
  if (name !== 'quiz') {
    document.body.classList.remove('flashcard-mode');
    if (window.speechSynthesis && window.speechSynthesis.speaking) window.speechSynthesis.cancel();
  }
  // Stop quote rotation when leaving home
  if (name !== 'home') {
    stopQuoteRotation();
  }
  // Refresh home widgets when returning home
  if (name === 'home') {
    updateMateriProgress();
    updateDailyStreak();
    renderQuoteBanner();
    renderDailyChallengeCard();
    setTimeout(checkResumeDraft, 100);
  }
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
  state.isFlashcardMode = false;
  document.body.classList.remove('flashcard-mode');
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
  state.bookmarks = new Set();
  state.currentIdx = 0;
  state.startTime = Date.now();
  state.elapsed = 0;
  state.finished = false;

  // Flashcard mode
  if (state.config.mode === 'flashcard') {
    state.isFlashcardMode = true;
    state.flashRevealed = new Set();
    document.body.classList.add('flashcard-mode');
    state.config.timer = 0;
  } else {
    state.isFlashcardMode = false;
    document.body.classList.remove('flashcard-mode');
  }

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
  $('topbar-tag').textContent = META[state.currentQuiz].title + (state.isFlashcardMode ? ' · Flashcard' : '');

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
  let warned5 = false, warned1 = false;
  // If we start with little time, set flags to avoid spurious warns
  if (state.remainingSec <= 300) warned5 = true;
  if (state.remainingSec <= 60) warned1 = true;

  state.timerInterval = setInterval(() => {
    state.remainingSec--;
    state.elapsed = state.totalSec - state.remainingSec;
    updateTimerUI();
    // Time warnings (only fired once each)
    if (!warned5 && state.remainingSec === 300) {
      warned5 = true;
      showToast('⏰ Waktu tersisa 5 menit', 'warn');
    }
    if (!warned1 && state.remainingSec === 60) {
      warned1 = true;
      showToast('🚨 Waktu tersisa 1 menit!', 'warn');
    }
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
  clearDraft();
  $('modal-timeup').classList.add('active');
}

// ============================================
// RENDER QUESTION
// ============================================
function renderQuestion() {
  // Stop ongoing speech when changing questions
  if (window.speechSynthesis && window.speechSynthesis.speaking) window.speechSynthesis.cancel();

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

  // ===== FLASHCARD MODE =====
  if (state.isFlashcardMode) {
    renderFlashcard(q, idx);
    $('prev-q').disabled = idx === 0;
    $('next-q').disabled = idx === total - 1;
    const bmBtn0 = $('bookmark-btn');
    if (bmBtn0) bmBtn0.classList.toggle('bookmarked', state.bookmarks.has(idx));
    $('submit-btn').style.display = (idx === total - 1) ? 'block' : 'none';
    $('submit-btn').textContent = 'Selesai Belajar 🎴';
    const speakBtn0 = $('speak-btn');
    if (speakBtn0) speakBtn0.classList.remove('speaking');
    updateNavGrid();
    return;
  }

  // Answers (Wayground-style cards)
  const ansContainer = $('answers');
  ansContainer.innerHTML = '';
  ansContainer.classList.remove('flashcard-active');
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
    renderNoteArea(q);
  } else {
    expBox.classList.remove('visible');
  }

  // Read-aloud button reset
  const speakBtn = $('speak-btn');
  if (speakBtn) speakBtn.classList.remove('speaking');

  // Hint 50:50 button visibility (only in latihan, not yet answered)
  const hintBtn = $('hint-btn');
  if (hintBtn) {
    const showHint = state.config.mode === 'latihan' && state.answers[idx] === null;
    hintBtn.style.display = showHint ? '' : 'none';
  }

  // Nav buttons
  $('prev-q').disabled = idx === 0;
  $('next-q').disabled = idx === total - 1;

  // Bookmark state
  const bmBtn = $('bookmark-btn');
  if (bmBtn) {
    if (state.bookmarks.has(idx)) bmBtn.classList.add('bookmarked');
    else bmBtn.classList.remove('bookmarked');
  }

  // Submit button (only show on last question if at least one answer exists)
  const isLast = idx === total - 1;
  $('submit-btn').style.display = isLast ? 'block' : 'none';
  $('submit-btn').innerHTML = 'Selesai &amp; Lihat Hasil <svg width="18" height="14" viewBox="0 0 18 14" fill="none"><path d="M1 7L6.5 12.5L17 1.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  updateNavGrid();
}

// Notes area (latihan mode, appended to explanation)
function renderNoteArea(q) {
  const expBox = $('explanation');
  let noteArea = document.getElementById('note-area');
  if (!noteArea) {
    noteArea = document.createElement('div');
    noteArea.id = 'note-area';
    noteArea.className = 'note-area';
    expBox.appendChild(noteArea);
  }
  const qHash = questionHash(q);
  const existing = getNote(qHash);
  noteArea.innerHTML = `<div class="note-label">📝 Catatan pribadi <span>(tersimpan otomatis)</span></div><textarea class="note-input" id="note-input" placeholder="Tulis catatan untuk soal ini... misal: 'ingat — 18 Agustus = PPKI!'">${existing}</textarea>`;
  const ta = noteArea.querySelector('#note-input');
  ta.addEventListener('input', () => saveNote(qHash, ta.value));
}

function selectAnswer(i) {
  const idx = state.currentIdx;
  // If already answered in latihan mode, can't change
  if (state.config.mode === 'latihan' && state.answers[idx] !== null) return;

  state.answers[idx] = i;
  renderQuestion();
  saveDraft();

  const q = state.questions[idx];
  const isCorrect = i === q.correct;

  // Streak detection + sound in latihan mode
  if (state.config.mode === 'latihan') {
    playSound(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) {
      let streak = 0;
      for (let j = idx; j >= 0; j--) {
        const ans = state.answers[j];
        if (ans !== null && ans === state.questions[j].correct) streak++;
        else break;
      }
      if (streak === 3) showToast('🔥 3 benar berturut-turut! Hebat!', 'success');
      else if (streak === 5) showToast('⚡ 5 berturut-turut! Kerennn!', 'success');
      else if (streak === 10) showToast('🏆 10 berturut-turut! Tak terbendung!', 'success');
      else if (streak > 0 && streak % 15 === 0) showToast(`💎 ${streak} berturut-turut! Legenda!`, 'success');
    }
  }

  // Auto-advance in ujian mode if enabled
  if (state.config.mode === 'ujian' && settings.autoAdvance && idx < state.questions.length - 1) {
    setTimeout(() => { state.currentIdx = idx + 1; renderQuestion(); }, 400);
  }
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
    d.classList.remove('current', 'answered', 'bookmarked');
    if (state.answers[i] !== null) d.classList.add('answered');
    if (i === state.currentIdx) d.classList.add('current');
    if (state.bookmarks.has(i)) d.classList.add('bookmarked');
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
    if (state.isFlashcardMode) {
      state.finished = true;
      showToast('Sesi flashcard selesai! 🎴', 'success');
      showView('home');
    } else {
      showResult();
    }
  });

  // Bookmark button
  const bmBtn = $('bookmark-btn');
  if (bmBtn) {
    bmBtn.addEventListener('click', toggleBookmark);
  }

  // Read-aloud button
  const speakBtn = $('speak-btn');
  if (speakBtn) {
    speakBtn.addEventListener('click', () => {
      const q = state.questions[state.currentIdx];
      if (!q) return;
      const wasSpeaking = window.speechSynthesis && window.speechSynthesis.speaking;
      let text = q.question + '. ';
      const letters = ['A', 'B', 'C', 'D'];
      if (!state.isFlashcardMode) q.options.forEach((opt, i) => { text += `${letters[i]}. ${opt}. `; });
      speakQuestion(text);
      speakBtn.classList.toggle('speaking', !wasSpeaking);
    });
  }

  // Hint 50:50 button
  const hintBtn = $('hint-btn');
  if (hintBtn) {
    hintBtn.addEventListener('click', useHint5050);
  }

  // Keyboard hint button
  const kbdHint = $('kbd-hint');
  if (kbdHint) {
    kbdHint.addEventListener('click', toggleShortcutHelp);
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Always handle Escape (close modals)
    if (e.key === 'Escape') {
      const modal = document.getElementById('shortcut-modal');
      if (modal) { modal.remove(); return; }
      const sp = document.getElementById('settings-panel'); if (sp) { sp.remove(); return; }
      const ap = document.getElementById('ach-panel'); if (ap) { ap.remove(); return; }
    }
    if (!$('view-quiz').classList.contains('active')) return;
    // Skip if typing in input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    // Flashcard mode: Space/Enter to flip
    if (state.isFlashcardMode && (e.key === ' ' || e.key === 'Enter')) {
      e.preventDefault();
      toggleFlashReveal(state.currentIdx);
      return;
    }

    if (e.key === 'ArrowLeft' && state.currentIdx > 0) {
      state.currentIdx--;
      renderQuestion();
    } else if (e.key === 'ArrowRight' && state.currentIdx < state.questions.length - 1) {
      state.currentIdx++;
      renderQuestion();
    } else if (['1','2','3','4'].includes(e.key) && !state.isFlashcardMode) {
      const i = parseInt(e.key) - 1;
      if (state.questions[state.currentIdx].options[i]) selectAnswer(i);
    } else if (e.key === 'b' || e.key === 'B') {
      toggleBookmark();
    } else if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
      e.preventDefault();
      toggleShortcutHelp();
    }
  });
}

// ============================================
// BOOKMARK FEATURE
// ============================================
function toggleBookmark() {
  const idx = state.currentIdx;
  if (state.bookmarks.has(idx)) {
    state.bookmarks.delete(idx);
    showToast('Tanda dilepas', 'info');
  } else {
    state.bookmarks.add(idx);
    showToast('Soal ditandai untuk dipelajari ulang', 'success');
  }
  renderQuestion();
  saveDraft();
}

// ============================================
// SHORTCUT HELP MODAL
// ============================================
function toggleShortcutHelp() {
  let modal = document.getElementById('shortcut-modal');
  if (modal) {
    modal.remove();
    return;
  }
  modal = document.createElement('div');
  modal.id = 'shortcut-modal';
  modal.className = 'shortcut-modal';
  modal.innerHTML = `
    <div class="sm-card">
      <div class="sm-head">
        <h3>Pintasan <em>Keyboard</em></h3>
        <button class="sm-close" aria-label="Tutup">✕</button>
      </div>
      <div class="sm-body">
        <div class="sm-row"><div class="sm-keys"><kbd>1</kbd><kbd>2</kbd><kbd>3</kbd><kbd>4</kbd></div><span>Pilih jawaban A / B / C / D</span></div>
        <div class="sm-row"><div class="sm-keys"><kbd>←</kbd><kbd>→</kbd></div><span>Pindah soal sebelumnya / berikutnya</span></div>
        <div class="sm-row"><div class="sm-keys"><kbd>B</kbd></div><span>Tandai soal untuk dipelajari ulang</span></div>
        <div class="sm-row"><div class="sm-keys"><kbd>?</kbd></div><span>Tampilkan / sembunyikan pintasan ini</span></div>
        <div class="sm-row"><div class="sm-keys"><kbd>Esc</kbd></div><span>Tutup popup ini</span></div>
      </div>
      <div class="sm-foot">Tip: hover kartu jawaban untuk efek wiggle khas cartoon! 🎉</div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('sm-close')) {
      modal.remove();
    }
  });
}

// ============================================
// TOAST NOTIFICATION
// ============================================
function showToast(message, type = 'info') {
  // Remove existing toast
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  // Animate in
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, 2400);
}

// ============================================
// COUNT-UP ANIMATION
// ============================================
function animateCountUp(el, from, to, duration, suffix = '') {
  if (!el) return;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    // easeOutCubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const val = Math.round(from + (to - from) * eased);
    el.textContent = val + suffix;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = to + suffix;
  }
  requestAnimationFrame(tick);
}

// ============================================
// MOTIVATIONAL QUOTES (home banner)
// ============================================
// ============================================
// QUOTES — Politisi & tokoh Indonesia (banyak BJ Habibie)
// Acak setiap 1 menit dengan animasi fade
// ============================================
const QUOTES = [
  // === BJ Habibie (banyak sesuai permintaan) ===
  { text: 'Tanpa ilmu pengetahuan, tidak ada masa depan.', author: 'BJ Habibie' },
  { text: 'Cinta tanpa iman, akan rapuh. Iman tanpa cinta, akan kerdil.', author: 'BJ Habibie' },
  { text: 'Karakter sebuah bangsa ditentukan oleh cara mereka memperlakukan ilmu.', author: 'BJ Habibie' },
  { text: 'Indonesia tidak bisa maju tanpa anak mudanya yang cinta tanah air.', author: 'BJ Habibie' },
  { text: 'Bagi saya, kerja keras adalah ibadah. Mencintai ilmu adalah jihad.', author: 'BJ Habibie' },
  { text: 'Sumber daya manusia adalah investasi terbaik bagi negara.', author: 'BJ Habibie' },
  { text: 'Saya hanya bisa membalas budi negara ini dengan ilmu yang saya miliki.', author: 'BJ Habibie' },
  { text: 'Tidak ada yang lebih indah daripada cinta yang terjaga oleh nilai-nilai ketuhanan.', author: 'BJ Habibie' },
  { text: 'Hidup harus produktif, bermanfaat, dan berbagi.', author: 'BJ Habibie' },
  { text: 'Demokrasi tanpa pendidikan adalah bencana, pendidikan tanpa demokrasi adalah tirani.', author: 'BJ Habibie' },
  { text: 'Saya berpikir, saya berkarya, saya berdoa, saya berjuang.', author: 'BJ Habibie' },
  { text: 'Mengapa kita harus takut akan masa depan, jika kita memiliki ilmu pengetahuan?', author: 'BJ Habibie' },
  { text: 'Ainun adalah segalanya bagi saya. Cinta sejati melampaui ruang dan waktu.', author: 'BJ Habibie' },
  { text: 'Pekerjaan saya adalah memikirkan masa depan Indonesia.', author: 'BJ Habibie' },
  { text: 'Saya rela melepas jabatan, asal Indonesia tetap utuh dan berdaulat.', author: 'BJ Habibie' },

  // === Ir. Soekarno ===
  { text: 'Bangsa yang besar adalah bangsa yang menghormati jasa pahlawannya.', author: 'Ir. Soekarno' },
  { text: 'Gantungkan cita-citamu setinggi langit. Bermimpilah setinggi langit. Jika engkau jatuh, engkau akan jatuh di antara bintang-bintang.', author: 'Ir. Soekarno' },
  { text: 'Berikan aku 1.000 orang tua, niscaya akan kucabut Semeru. Berikan aku 10 pemuda, niscaya akan kuguncangkan dunia.', author: 'Ir. Soekarno' },
  { text: 'Perjuanganku lebih mudah karena melawan penjajah. Perjuangan kalian akan lebih sulit karena melawan bangsa sendiri.', author: 'Ir. Soekarno' },
  { text: 'Jangan sekali-kali meninggalkan sejarah. Jasmerah.', author: 'Ir. Soekarno' },
  { text: 'Banyak hal yang bisa menjatuhkanmu. Tapi satu-satunya hal yang benar-benar dapat menjatuhkanmu adalah sikapmu sendiri.', author: 'Ir. Soekarno' },
  { text: 'Aku lebih suka lukisan ombak yang menerjang batu karang, daripada lukisan seribu putri menari.', author: 'Ir. Soekarno' },
  { text: 'Pemuda yang baik adalah pemuda yang berani membela kebenaran.', author: 'Ir. Soekarno' },

  // === Mohammad Hatta ===
  { text: 'Indonesia merdeka bukanlah tujuan akhir, melainkan jembatan emas menuju cita-cita yang lebih besar.', author: 'Mohammad Hatta' },
  { text: 'Hanya ada satu negara yang pantas menjadi negaraku. Ia tumbuh dengan perbuatan, dan perbuatan itu adalah perbuatanku.', author: 'Mohammad Hatta' },
  { text: 'Aku rela dipenjara, asalkan bersama buku. Karena dengan buku, aku bebas.', author: 'Mohammad Hatta' },
  { text: 'Kemerdekaan hanyalah jembatan emas. Di seberang jembatan itu, jalan masih panjang.', author: 'Mohammad Hatta' },
  { text: 'Ekonomi rakyat harus berasaskan kekeluargaan, bukan persaingan.', author: 'Mohammad Hatta' },

  // === Mohammad Yamin ===
  { text: 'Kami putera dan puteri Indonesia, mengaku bertumpah darah yang satu, tanah air Indonesia.', author: 'Mohammad Yamin' },
  { text: 'Persatuan bukan sekadar slogan, tapi keniscayaan dalam keberagaman.', author: 'Mohammad Yamin' },
  { text: 'Bhinneka Tunggal Ika adalah jiwa bangsa yang tidak bisa dipisahkan.', author: 'Mohammad Yamin' },

  // === Ki Hajar Dewantara ===
  { text: 'Ing Ngarsa Sung Tuladha, Ing Madya Mangun Karsa, Tut Wuri Handayani.', author: 'Ki Hajar Dewantara' },
  { text: 'Pendidikan adalah daya upaya untuk memajukan budi pekerti, pikiran, dan jasmani anak.', author: 'Ki Hajar Dewantara' },
  { text: 'Setiap orang menjadi guru, setiap rumah menjadi sekolah.', author: 'Ki Hajar Dewantara' },
  { text: 'Anak-anak hidup dan tumbuh menurut kodratnya, kita pendidik hanya menuntun.', author: 'Ki Hajar Dewantara' },

  // === Abdurrahman Wahid (Gus Dur) ===
  { text: 'Tidak penting apa pun agama atau sukumu. Kalau kamu bisa melakukan sesuatu yang baik untuk semua orang, orang tidak akan pernah tanya apa agamamu.', author: 'Gus Dur' },
  { text: 'Kebenaran tidak tergantung pada banyaknya pengikut.', author: 'Gus Dur' },
  { text: 'Lebih baik kehilangan jabatan daripada kehilangan harga diri.', author: 'Gus Dur' },
  { text: 'Yang lebih penting dari politik adalah kemanusiaan.', author: 'Gus Dur' },
  { text: 'Kalau memang tidak ada yang bisa diperbaiki, ya sudahlah... Gitu aja kok repot.', author: 'Gus Dur' },

  // === Megawati Soekarnoputri ===
  { text: 'Saya tidak mau mewariskan masalah kepada generasi penerus.', author: 'Megawati Soekarnoputri' },
  { text: 'Pancasila bukan hanya teks, tapi laku kehidupan sehari-hari.', author: 'Megawati Soekarnoputri' },

  // === SBY ===
  { text: 'Pemimpin yang baik adalah yang bisa mendengarkan suara rakyatnya.', author: 'Susilo Bambang Yudhoyono' },
  { text: 'Demokrasi itu tidak sempurna, tapi paling adil dari semua sistem.', author: 'Susilo Bambang Yudhoyono' },
  { text: 'Kebijakan publik harus berlandaskan pada kepentingan rakyat banyak.', author: 'Susilo Bambang Yudhoyono' },

  // === Joko Widodo ===
  { text: 'Kerja, kerja, kerja.', author: 'Joko Widodo' },
  { text: 'Pemimpin yang baik adalah yang turun ke lapangan, bukan hanya di belakang meja.', author: 'Joko Widodo' },
  { text: 'Kita harus optimis, Indonesia bisa jadi negara maju.', author: 'Joko Widodo' },
  { text: 'Indonesia harus jadi pusat ekonomi digital Asia Tenggara.', author: 'Joko Widodo' },

  // === Tokoh lain ===
  { text: 'Tidak peduli berapa banyak luka, semangat juang tidak akan pernah padam selama Indonesia masih ada.', author: 'Jenderal Sudirman' },
  { text: 'Memimpin adalah menderita. Pemimpin yang baik adalah yang pertama maju dalam kesulitan.', author: 'H. Agus Salim' },
  { text: 'Habis gelap terbitlah terang.', author: 'R.A. Kartini' },
  { text: 'Pemuda hari ini adalah pemimpin masa depan.', author: 'Bung Tomo' },
  { text: 'Sekali merdeka, tetap merdeka.', author: 'Bung Tomo' },
  { text: 'Rawe-rawe rantas, malang-malang putung.', author: 'Pepatah Jawa' },
  { text: 'Pendidikan adalah senjata paling ampuh untuk mengubah dunia.', author: 'Nelson Mandela' },
  { text: 'Pancasila bukan sekadar hafalan, tapi cara kita hidup bersama.', author: 'Renungan PPKn' },
  { text: 'Bangsa yang kuat adalah bangsa yang menjaga persatuan dalam keberagaman.', author: 'Renungan Bhinneka' },
  { text: 'Belajarlah seakan-akan kamu akan hidup selamanya, hiduplah seakan-akan kamu akan mati esok.', author: 'Mahatma Gandhi' }
];

let quoteRotateInterval = null;
let currentQuoteIdx = -1;

function pickRandomQuoteIdx() {
  let idx;
  do {
    idx = Math.floor(Math.random() * QUOTES.length);
  } while (idx === currentQuoteIdx && QUOTES.length > 1);
  currentQuoteIdx = idx;
  return idx;
}

function renderQuoteBanner(forceUpdate) {
  const home = $('view-home');
  if (!home || !home.classList.contains('active')) return;
  let banner = document.getElementById('quote-banner');
  const idx = pickRandomQuoteIdx();
  const q = QUOTES[idx];
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'quote-banner';
    banner.className = 'quote-banner';
    const hero = home.querySelector('.hero');
    if (hero) hero.insertAdjacentElement('afterend', banner);
    else home.insertBefore(banner, home.firstChild);
    banner.innerHTML = `<span class="qb-mark">"</span><span class="qb-content"><span class="qb-text">${q.text}</span><span class="qb-author">— ${q.author}</span></span>`;
  } else if (forceUpdate) {
    // Fade out, change, fade in
    const content = banner.querySelector('.qb-content');
    if (content) {
      content.classList.add('fading');
      setTimeout(() => {
        content.innerHTML = `<span class="qb-text">${q.text}</span><span class="qb-author">— ${q.author}</span>`;
        content.classList.remove('fading');
      }, 400);
    }
  }
  // Start rotation interval (1 minute)
  if (!quoteRotateInterval) {
    quoteRotateInterval = setInterval(() => {
      if ($('view-home') && $('view-home').classList.contains('active')) {
        renderQuoteBanner(true);
      }
    }, 60000); // 60 seconds
  }
}

function stopQuoteRotation() {
  if (quoteRotateInterval) {
    clearInterval(quoteRotateInterval);
    quoteRotateInterval = null;
  }
}

// ============================================
// LEADERBOARD (across participants, from cloud)
// ============================================
async function showLeaderboard() {
  let panel = document.getElementById('lb-panel');
  if (panel) { panel.remove(); return; }
  panel = document.createElement('div');
  panel.id = 'lb-panel';
  panel.className = 'lb-panel';
  panel.innerHTML = `<div class="lb-card"><div class="lb-head"><div><h3>Papan Peringkat</h3><div class="lb-sub">Memuat data...</div></div><button class="lb-close" aria-label="Tutup">✕</button></div><div class="lb-body" id="lb-body"><div class="lb-loading">⏳ Memuat data peserta...</div></div></div>`;
  document.body.appendChild(panel);
  panel.addEventListener('click', (e) => { if (e.target === panel || e.target.classList.contains('lb-close')) panel.remove(); });

  // Aggregate per participant
  const results = [];
  for (const p of PARTICIPANTS) {
    if (p.id === 'guest') continue;
    let records = [];
    if (state.firebaseReady) {
      try { records = await loadHistoryFromCloud(p.id) || []; } catch (e) { records = []; }
    }
    // Fallback to local
    if (!records.length) {
      const all = loadAllHistoryLocal();
      records = all[p.id] || [];
    }
    if (records.length === 0) continue;
    const totalQ = records.reduce((s, r) => s + r.total, 0);
    const totalC = records.reduce((s, r) => s + r.correct, 0);
    const avgPercent = Math.round(records.reduce((s, r) => s + r.percent, 0) / records.length);
    const bestPercent = Math.max(...records.map(r => r.percent));
    results.push({ name: p.name, initials: p.initials, color: p.color, sessions: records.length, avgPercent, bestPercent, totalQ });
  }
  // Sort by avg percent desc, then sessions
  results.sort((a, b) => b.avgPercent - a.avgPercent || b.sessions - a.sessions);

  const body = document.getElementById('lb-body');
  if (!body) return;
  if (results.length === 0) {
    body.innerHTML = `<div class="lb-empty">Belum ada data. Ayo jadi yang pertama menyelesaikan quiz! 🚀</div>`;
    panel.querySelector('.lb-sub').textContent = 'Belum ada peserta';
    return;
  }
  panel.querySelector('.lb-sub').textContent = `${results.length} peserta aktif`;
  const medals = ['🥇', '🥈', '🥉'];
  body.innerHTML = results.map((r, i) => `
    <div class="lb-row ${i < 3 ? 'top' : ''}">
      <div class="lb-rank">${medals[i] || (i + 1)}</div>
      <div class="lb-avatar" style="background:${r.color}">${r.initials}</div>
      <div class="lb-info">
        <div class="lb-name">${r.name}</div>
        <div class="lb-meta">${r.sessions} sesi · ${r.totalQ} soal · terbaik ${r.bestPercent}%</div>
      </div>
      <div class="lb-score">${r.avgPercent}%</div>
    </div>
  `).join('');
}

// ============================================
// MATERI RINGKASAN PANEL
// ============================================
function showMateriPanel(initialKey = null) {
  let panel = document.getElementById('materi-panel');
  if (panel) { panel.remove(); return; }
  if (typeof MATERI === 'undefined') { showToast('Materi belum termuat', 'warn'); return; }

  panel = document.createElement('div');
  panel.id = 'materi-panel';
  panel.className = 'materi-panel';
  const keys = Object.keys(MATERI);
  const activeKey = initialKey && MATERI[initialKey] ? initialKey : keys[0];

  const tabsHtml = keys.map(k => {
    const m = MATERI[k];
    return `<button class="mp-tab ${k === activeKey ? 'active' : ''}" data-mat="${k}" style="--ca:${m.accent}"><span class="mp-tab-ic">${m.icon}</span><span class="mp-tab-name">${m.title}</span></button>`;
  }).join('');

  panel.innerHTML = `
    <div class="mp-card">
      <div class="mp-head">
        <div>
          <h3>Ringkasan Materi</h3>
          <div class="mp-sub">Bacaan singkat sebelum quiz · 4 pilar kebangsaan</div>
        </div>
        <button class="mp-close" aria-label="Tutup">✕</button>
      </div>
      <div class="mp-tabs">${tabsHtml}</div>
      <div class="mp-body" id="mp-body"></div>
    </div>`;
  document.body.appendChild(panel);

  function renderMateri(key) {
    const m = MATERI[key];
    const body = panel.querySelector('#mp-body');
    body.style.setProperty('--ca', m.accent);
    body.innerHTML = `
      <div class="mp-hero">
        <div class="mp-hero-icon" style="color:${m.accent}">${m.icon}</div>
        <div class="mp-hero-title">${m.title}</div>
        <div class="mp-hero-sub">${m.subtitle}</div>
      </div>
      ${m.sections.map((s, i) => `
        <div class="mp-section">
          <div class="mp-section-num">${String(i + 1).padStart(2, '0')}</div>
          <h4 class="mp-section-h">${s.heading}</h4>
          <p class="mp-section-body">${s.body}</p>
        </div>
      `).join('')}
      <div class="mp-foot">
        <button class="mp-start-btn" data-quiz="${key}">Mulai Quiz ${m.title} →</button>
      </div>`;
    body.scrollTop = 0;
    const startBtn = body.querySelector('.mp-start-btn');
    if (startBtn) startBtn.addEventListener('click', () => {
      panel.remove();
      openSetup(key);
    });
  }
  renderMateri(activeKey);

  panel.querySelectorAll('.mp-tab').forEach(t => {
    t.addEventListener('click', () => {
      panel.querySelectorAll('.mp-tab').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      renderMateri(t.dataset.mat);
      playSound('tick');
    });
  });
  panel.addEventListener('click', (e) => {
    if (e.target === panel || e.target.classList.contains('mp-close')) panel.remove();
  });
}

// ============================================
// DAILY CHALLENGE — 10 soal harian, sama untuk semua
// ============================================
function getDailyChallengeKey() {
  const today = new Date().toISOString().slice(0, 10);
  return `qk_daily_${state.activeUser || 'anon'}_${today}`;
}
function hasCompletedDailyChallenge() {
  try { return !!localStorage.getItem(getDailyChallengeKey()); } catch (e) { return false; }
}
function startDailyChallenge() {
  if (hasCompletedDailyChallenge()) {
    showToast('Kamu sudah selesai tantangan harian. Coba lagi besok!', 'info');
    return;
  }
  // Seeded random based on date so all users get same 10 questions today
  const today = new Date().toISOString().slice(0, 10);
  const seed = today.split('-').reduce((s, n) => s + parseInt(n), 0);
  const allQs = [];
  Object.entries(QUESTIONS).forEach(([key, arr]) => {
    arr.forEach((q, i) => allQs.push({ ...q, _src: key, _idx: i }));
  });
  // Seeded shuffle
  let rng = seed;
  function rand() { rng = (rng * 9301 + 49297) % 233280; return rng / 233280; }
  const shuffled = [...allQs];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const selected = shuffled.slice(0, 10);

  // Set up state
  state.currentQuiz = 'daily';
  state.questions = selected;
  state.answers = new Array(10).fill(null);
  state.bookmarks = new Set();
  state.currentIdx = 0;
  state.startTime = Date.now();
  state.elapsed = 0;
  state.finished = false;
  state.isFlashcardMode = false;
  state.isDailyChallenge = true;
  document.body.classList.remove('flashcard-mode');
  state.config = { mode: 'ujian', timer: 10, count: 10, difficulty: 'mixed' };
  state.totalSec = 10 * 60;
  state.remainingSec = state.totalSec;
  $('timer-wrap').style.display = '';
  if (state.timerInterval) clearInterval(state.timerInterval);
  startTimer();
  $('topbar-tag').textContent = '🎯 Tantangan Harian';
  buildNavGrid();
  renderQuestion();
  showView('quiz');
  showToast('Tantangan Harian: 10 soal acak dalam 10 menit!', 'success');
}
function markDailyChallengeComplete(percent) {
  try { localStorage.setItem(getDailyChallengeKey(), JSON.stringify({ percent, ts: Date.now() })); } catch (e) {}
}
function renderDailyChallengeCard() {
  const home = $('view-home');
  if (!home || !home.classList.contains('active')) return;
  let card = document.getElementById('daily-card');
  const completed = hasCompletedDailyChallenge();
  if (!card) {
    card = document.createElement('div');
    card.id = 'daily-card';
    card.className = 'daily-card';
    const quoteBan = document.getElementById('quote-banner');
    if (quoteBan && quoteBan.parentNode) quoteBan.parentNode.insertBefore(card, quoteBan.nextSibling);
    else {
      const hero = home.querySelector('.hero');
      if (hero) hero.insertAdjacentElement('afterend', card);
    }
  }
  card.innerHTML = completed ? `
    <div class="dc-icon">✓</div>
    <div class="dc-text"><div class="dc-title">Tantangan Hari Ini · Selesai!</div><div class="dc-meta">Datang lagi besok untuk tantangan baru</div></div>
  ` : `
    <div class="dc-icon">🎯</div>
    <div class="dc-text"><div class="dc-title">Tantangan Hari Ini</div><div class="dc-meta">10 soal acak · 10 menit · sama untuk semua peserta hari ini</div></div>
    <button class="dc-btn" id="dc-start">Mulai →</button>
  `;
  card.classList.toggle('done', completed);
  const btn = card.querySelector('#dc-start');
  if (btn) btn.addEventListener('click', startDailyChallenge);
}

// ============================================
// BANK CATATAN — semua catatan dalam satu panel
// ============================================
function showNotesBank() {
  let panel = document.getElementById('notes-panel');
  if (panel) { panel.remove(); return; }
  const allNotes = loadAllNotes();
  const entries = Object.entries(allNotes);

  panel = document.createElement('div');
  panel.id = 'notes-panel';
  panel.className = 'notes-panel';
  panel.innerHTML = `
    <div class="np-card">
      <div class="np-head">
        <div>
          <h3>Bank Catatan</h3>
          <div class="np-sub">${entries.length === 0 ? 'Belum ada catatan' : `${entries.length} catatan tersimpan`}</div>
        </div>
        <button class="np-close" aria-label="Tutup">✕</button>
      </div>
      <div class="np-body">
        ${entries.length === 0
          ? `<div class="np-empty">Tulis catatan saat mengerjakan mode <strong>Latihan</strong> — catatannya akan otomatis muncul di sini.</div>`
          : entries.map(([hash, note]) => `
            <div class="np-item">
              <div class="np-q">"${hash.length >= 100 ? hash + '...' : hash}"</div>
              <div class="np-note">${note}</div>
              <button class="np-del" data-hash="${encodeURIComponent(hash)}" aria-label="Hapus catatan">✕</button>
            </div>
          `).join('')
        }
      </div>
    </div>`;
  document.body.appendChild(panel);
  panel.addEventListener('click', (e) => {
    if (e.target === panel || e.target.classList.contains('np-close')) panel.remove();
    const del = e.target.closest('.np-del');
    if (del) {
      const hash = decodeURIComponent(del.dataset.hash);
      if (confirm('Hapus catatan ini?')) {
        saveNote(hash, '');
        del.closest('.np-item').remove();
        showToast('Catatan dihapus', 'info');
      }
    }
  });
}

// ============================================
// STATISTIK DETAIL — grafik perkembangan
// ============================================
function showStatsPanel() {
  let panel = document.getElementById('stats-panel');
  if (panel) { panel.remove(); return; }
  const history = (state.allHistory || []).slice().sort((a, b) => a.timestamp - b.timestamp);
  panel = document.createElement('div');
  panel.id = 'stats-panel';
  panel.className = 'stats-panel';

  // Compute stats
  const totalSessions = history.length;
  const totalQ = history.reduce((s, h) => s + (h.total || 0), 0);
  const totalC = history.reduce((s, h) => s + (h.correct || 0), 0);
  const avgPercent = totalQ ? Math.round((totalC / totalQ) * 100) : 0;
  const bestPercent = history.length ? Math.max(...history.map(h => h.percent)) : 0;
  // Recent trend (last 10 vs previous 10)
  const last10 = history.slice(-10);
  const prev10 = history.slice(-20, -10);
  const last10Avg = last10.length ? Math.round(last10.reduce((s, h) => s + h.percent, 0) / last10.length) : 0;
  const prev10Avg = prev10.length ? Math.round(prev10.reduce((s, h) => s + h.percent, 0) / prev10.length) : 0;
  const trend = last10Avg - prev10Avg;
  // By materi
  const byMateri = { pancasila: [], uud: [], nkri: [], bhinneka: [] };
  history.forEach(h => { if (byMateri[h.quiz]) byMateri[h.quiz].push(h.percent); });
  // Chart data: last 15 sessions
  const chartData = history.slice(-15);

  // Build SVG line chart
  const W = 460, H = 160, P = 24;
  let chartSvg = '';
  if (chartData.length >= 2) {
    const xs = chartData.map((_, i) => P + (i / (chartData.length - 1)) * (W - P * 2));
    const ys = chartData.map(h => H - P - (h.percent / 100) * (H - P * 2));
    const path = xs.map((x, i) => (i === 0 ? `M${x.toFixed(1)},${ys[i].toFixed(1)}` : `L${x.toFixed(1)},${ys[i].toFixed(1)}`)).join(' ');
    const area = path + ` L${xs[xs.length - 1].toFixed(1)},${H - P} L${xs[0].toFixed(1)},${H - P} Z`;
    const dots = xs.map((x, i) => `<circle cx="${x.toFixed(1)}" cy="${ys[i].toFixed(1)}" r="3.5" fill="var(--accent)"/>`).join('');
    chartSvg = `
      <svg viewBox="0 0 ${W} ${H}" class="stats-chart">
        <line x1="${P}" y1="${H - P}" x2="${W - P}" y2="${H - P}" stroke="var(--line)" stroke-width="1"/>
        <line x1="${P}" y1="${P}" x2="${P}" y2="${H - P}" stroke="var(--line)" stroke-width="1"/>
        <text x="6" y="${P + 4}" font-size="10" fill="var(--ink-3)">100%</text>
        <text x="6" y="${H - P + 4}" font-size="10" fill="var(--ink-3)">0%</text>
        <path d="${area}" fill="var(--accent)" opacity="0.12"/>
        <path d="${path}" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
        ${dots}
      </svg>`;
  } else {
    chartSvg = `<div class="stats-chart-empty">Kerjakan minimal 2 sesi untuk melihat grafik</div>`;
  }

  // Materi bars
  const materiBars = ['pancasila', 'uud', 'nkri', 'bhinneka'].map(k => {
    const arr = byMateri[k];
    const avg = arr.length ? Math.round(arr.reduce((s, p) => s + p, 0) / arr.length) : 0;
    const name = { pancasila: 'Pancasila', uud: 'UUD 1945', nkri: 'NKRI', bhinneka: 'Bhinneka' }[k];
    return `<div class="stats-mat-row">
      <div class="stats-mat-name">${name}</div>
      <div class="stats-mat-bar"><div class="stats-mat-fill" style="width:${avg}%"></div></div>
      <div class="stats-mat-num">${arr.length === 0 ? '—' : avg + '%'}</div>
    </div>`;
  }).join('');

  panel.innerHTML = `
    <div class="stats-card">
      <div class="stats-head">
        <div>
          <h3>Statistik Detail</h3>
          <div class="stats-sub">${totalSessions} sesi · ${totalQ} soal · rata-rata ${avgPercent}%</div>
        </div>
        <button class="stats-close" aria-label="Tutup">✕</button>
      </div>
      <div class="stats-body">
        <div class="stats-grid">
          <div class="stats-box"><div class="stats-box-num">${totalSessions}</div><div class="stats-box-lbl">Sesi</div></div>
          <div class="stats-box"><div class="stats-box-num">${totalQ}</div><div class="stats-box-lbl">Soal</div></div>
          <div class="stats-box"><div class="stats-box-num">${avgPercent}%</div><div class="stats-box-lbl">Rata-rata</div></div>
          <div class="stats-box"><div class="stats-box-num">${bestPercent}%</div><div class="stats-box-lbl">Terbaik</div></div>
        </div>
        <div class="stats-section-title">Tren ${chartData.length} sesi terakhir</div>
        ${chartSvg}
        ${prev10.length > 0 ? `<div class="stats-trend">
          Rata-rata 10 sesi terakhir: <strong>${last10Avg}%</strong>
          <span class="stats-trend-tag ${trend >= 0 ? 'up' : 'down'}">${trend >= 0 ? '↑' : '↓'} ${Math.abs(trend)}%</span>
          vs 10 sebelumnya (${prev10Avg}%)
        </div>` : ''}
        <div class="stats-section-title">Per Materi</div>
        <div class="stats-mat-list">${materiBars}</div>
      </div>
    </div>`;
  document.body.appendChild(panel);
  panel.addEventListener('click', (e) => { if (e.target === panel || e.target.classList.contains('stats-close')) panel.remove(); });
}

// ============================================
// HINT 50:50 — hilangkan 2 jawaban salah (latihan)
// ============================================
function useHint5050() {
  if (state.config.mode !== 'latihan') {
    showToast('Hint hanya tersedia di mode Latihan', 'info');
    return;
  }
  const idx = state.currentIdx;
  if (state.answers[idx] !== null) {
    showToast('Soal sudah dijawab', 'info');
    return;
  }
  const usedKey = `qk_hint_used_${state.activeUser || 'anon'}`;
  let used;
  try { used = JSON.parse(localStorage.getItem(usedKey) || '{}'); } catch (e) { used = {}; }
  const today = new Date().toISOString().slice(0, 10);
  const todayCount = used[today] || 0;
  if (todayCount >= 3) {
    showToast('Hint habis untuk hari ini (maks 3/hari). Coba lagi besok!', 'warn');
    return;
  }
  // Find 2 wrong options to hide
  const q = state.questions[idx];
  const wrongIdxs = q.options.map((_, i) => i).filter(i => i !== q.correct);
  // Shuffle and pick 2
  const shuffled = wrongIdxs.sort(() => Math.random() - 0.5).slice(0, 2);
  document.querySelectorAll('.answer-btn').forEach((btn, i) => {
    if (shuffled.includes(i)) {
      btn.style.opacity = '0.25';
      btn.style.pointerEvents = 'none';
      btn.style.textDecoration = 'line-through';
    }
  });
  used[today] = todayCount + 1;
  try { localStorage.setItem(usedKey, JSON.stringify(used)); } catch (e) {}
  playSound('tick');
  showToast(`💡 Hint dipakai (${todayCount + 1}/3 hari ini)`, 'success');
}

// ============================================
// GLOSSARIUM — daftar istilah PPKn
// ============================================
function showGlossarium() {
  let panel = document.getElementById('gloss-panel');
  if (panel) { panel.remove(); return; }
  if (typeof GLOSSARIUM === 'undefined') { showToast('Glossarium belum termuat', 'warn'); return; }

  panel = document.createElement('div');
  panel.id = 'gloss-panel';
  panel.className = 'gloss-panel';
  panel.innerHTML = `
    <div class="gp-card">
      <div class="gp-head">
        <div>
          <h3>Glossarium PPKn</h3>
          <div class="gp-sub">${GLOSSARIUM.length} istilah penting · ketik untuk mencari</div>
        </div>
        <button class="gp-close" aria-label="Tutup">✕</button>
      </div>
      <div class="gp-search-wrap">
        <input type="text" class="gp-search" id="gp-search" placeholder="🔍 Cari istilah (cth: piagam, MPR, sila)...">
      </div>
      <div class="gp-filters">
        <button class="gp-fil active" data-tag="all">Semua</button>
        <button class="gp-fil" data-tag="pancasila">Pancasila</button>
        <button class="gp-fil" data-tag="uud">UUD</button>
        <button class="gp-fil" data-tag="nkri">NKRI</button>
        <button class="gp-fil" data-tag="bhinneka">Bhinneka</button>
      </div>
      <div class="gp-body" id="gp-body"></div>
    </div>`;
  document.body.appendChild(panel);

  let activeTag = 'all';
  let searchQ = '';
  function renderList() {
    const body = panel.querySelector('#gp-body');
    const list = GLOSSARIUM.filter(g => {
      if (activeTag !== 'all' && g.tag !== activeTag) return false;
      if (searchQ && !(g.term.toLowerCase().includes(searchQ) || g.def.toLowerCase().includes(searchQ))) return false;
      return true;
    });
    if (list.length === 0) {
      body.innerHTML = `<div class="gp-empty">Tidak ada istilah cocok dengan pencarian.</div>`;
      return;
    }
    body.innerHTML = list.map(g => `
      <div class="gp-item" data-tag="${g.tag}">
        <div class="gp-term">${g.term}</div>
        <div class="gp-def">${g.def}</div>
      </div>
    `).join('');
  }
  renderList();

  panel.querySelector('#gp-search').addEventListener('input', (e) => {
    searchQ = e.target.value.toLowerCase().trim();
    renderList();
  });
  panel.querySelectorAll('.gp-fil').forEach(b => {
    b.addEventListener('click', () => {
      panel.querySelectorAll('.gp-fil').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      activeTag = b.dataset.tag;
      renderList();
      playSound('tick');
    });
  });
  panel.addEventListener('click', (e) => {
    if (e.target === panel || e.target.classList.contains('gp-close')) panel.remove();
  });
  setTimeout(() => panel.querySelector('#gp-search').focus(), 100);
}

// ============================================
// BANK SOAL — searchable preview of all questions
// ============================================
function showQuestionBank() {
  let panel = document.getElementById('qb-panel');
  if (panel) { panel.remove(); return; }

  const allQs = [];
  Object.entries(QUESTIONS).forEach(([key, arr]) => {
    arr.forEach((q, i) => allQs.push({ ...q, _src: key, _idx: i }));
  });
  const matNames = { pancasila: 'Pancasila', uud: 'UUD 1945', nkri: 'NKRI', bhinneka: 'Bhinneka' };
  const diffNames = { easy: 'Mudah', medium: 'Sedang', hard: 'Sulit' };

  panel = document.createElement('div');
  panel.id = 'qb-panel';
  panel.className = 'qb-panel';
  panel.innerHTML = `
    <div class="qb-card">
      <div class="qb-head">
        <div>
          <h3>Bank Soal</h3>
          <div class="qb-sub">${allQs.length} soal · jelajahi dan pelajari semua soal di sini</div>
        </div>
        <button class="qb-close" aria-label="Tutup">✕</button>
      </div>
      <div class="qb-controls">
        <input type="text" class="qb-search" id="qb-search" placeholder="🔍 Cari kata kunci di soal...">
        <div class="qb-filters">
          <select class="qb-sel" id="qb-mat">
            <option value="all">Semua materi</option>
            <option value="pancasila">Pancasila</option>
            <option value="uud">UUD 1945</option>
            <option value="nkri">NKRI</option>
            <option value="bhinneka">Bhinneka</option>
          </select>
          <select class="qb-sel" id="qb-diff">
            <option value="all">Semua tingkat</option>
            <option value="easy">Mudah</option>
            <option value="medium">Sedang</option>
            <option value="hard">Sulit</option>
          </select>
        </div>
      </div>
      <div class="qb-body" id="qb-body"></div>
    </div>`;
  document.body.appendChild(panel);

  let filterMat = 'all', filterDiff = 'all', searchQ = '';

  function renderList() {
    const body = panel.querySelector('#qb-body');
    const list = allQs.filter(q => {
      if (filterMat !== 'all' && q._src !== filterMat) return false;
      if (filterDiff !== 'all' && q.difficulty !== filterDiff) return false;
      if (searchQ && !q.question.toLowerCase().includes(searchQ)) return false;
      return true;
    });
    if (list.length === 0) {
      body.innerHTML = `<div class="qb-empty">Tidak ada soal cocok dengan filter.</div>`;
      return;
    }
    body.innerHTML = `<div class="qb-count">${list.length} soal ditemukan</div>` + list.slice(0, 80).map(q => {
      const letters = ['A', 'B', 'C', 'D'];
      const optsHtml = q.options.map((o, i) => `
        <div class="qb-opt ${i === q.correct ? 'correct' : ''}">
          <span class="qb-opt-let">${letters[i]}</span>
          <span class="qb-opt-text">${o}</span>
          ${i === q.correct ? '<span class="qb-opt-mark">✓</span>' : ''}
        </div>
      `).join('');
      return `
        <details class="qb-item">
          <summary class="qb-sum">
            <span class="qb-tags">
              <span class="qb-tag mat-${q._src}">${matNames[q._src]}</span>
              <span class="qb-tag diff-${q.difficulty}">${diffNames[q.difficulty]}</span>
            </span>
            <span class="qb-q">${q.question}</span>
            <span class="qb-chev">▾</span>
          </summary>
          <div class="qb-detail">
            <div class="qb-opts">${optsHtml}</div>
            <div class="qb-exp"><strong>Pembahasan:</strong> ${q.explanation}</div>
          </div>
        </details>`;
    }).join('') + (list.length > 80 ? `<div class="qb-more">Menampilkan 80 dari ${list.length} hasil. Persempit pencarian untuk lihat lebih spesifik.</div>` : '');
  }
  renderList();

  panel.querySelector('#qb-search').addEventListener('input', (e) => {
    searchQ = e.target.value.toLowerCase().trim();
    renderList();
  });
  panel.querySelector('#qb-mat').addEventListener('change', (e) => { filterMat = e.target.value; renderList(); });
  panel.querySelector('#qb-diff').addEventListener('change', (e) => { filterDiff = e.target.value; renderList(); });
  panel.addEventListener('click', (e) => {
    if (e.target === panel || e.target.classList.contains('qb-close')) panel.remove();
  });
}

// ============================================
// SOUND EFFECTS (Web Audio API — no files)
// ============================================
let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
    catch (e) { return null; }
  }
  return audioCtx;
}
function playSound(type) {
  if (!settings.soundEnabled) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});

  if (type === 'win') {
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
      g.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.12);
      g.gain.exponentialRampToValueAtTime(0.16, ctx.currentTime + i * 0.12 + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.12 + 0.35);
      o.start(ctx.currentTime + i * 0.12);
      o.stop(ctx.currentTime + i * 0.12 + 0.35);
    });
    return;
  }

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  if (type === 'correct') {
    osc.frequency.setValueAtTime(523.25, ctx.currentTime);
    osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.16, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.25);
  } else if (type === 'wrong') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(120, ctx.currentTime + 0.18);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.1, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.2);
  } else if (type === 'tick') {
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.06);
  }
}

// ============================================
// AUTO-SAVE QUIZ DRAFT
// ============================================
function getDraftKey() { return `qk_draft_${state.activeUser || 'anon'}`; }
function saveDraft() {
  if (!state.questions.length || state.finished || state.isFlashcardMode) return;
  try {
    const draft = {
      currentQuiz: state.currentQuiz, config: state.config,
      questionIds: state.questions,
      answers: state.answers, bookmarks: Array.from(state.bookmarks),
      currentIdx: state.currentIdx, remainingSec: state.remainingSec,
      totalSec: state.totalSec, elapsed: state.elapsed,
      startTime: state.startTime, savedAt: Date.now()
    };
    localStorage.setItem(getDraftKey(), JSON.stringify(draft));
  } catch (e) {}
}
function loadDraft() {
  try {
    const raw = localStorage.getItem(getDraftKey());
    if (!raw) return null;
    const draft = JSON.parse(raw);
    if (Date.now() - draft.savedAt > 24 * 60 * 60 * 1000) { clearDraft(); return null; }
    return draft;
  } catch (e) { return null; }
}
function clearDraft() { try { localStorage.removeItem(getDraftKey()); } catch (e) {} }
function resumeDraft(draft) {
  state.currentQuiz = draft.currentQuiz;
  state.config = draft.config;
  state.questions = draft.questionIds;
  state.answers = draft.answers;
  state.bookmarks = new Set(draft.bookmarks || []);
  state.currentIdx = draft.currentIdx;
  state.startTime = draft.startTime;
  state.elapsed = draft.elapsed;
  state.finished = false;
  state.isFlashcardMode = false;
  if (state.config.timer > 0) {
    state.totalSec = draft.totalSec;
    state.remainingSec = draft.remainingSec;
    $('timer-wrap').style.display = '';
    startTimer();
  } else {
    state.totalSec = 0; state.remainingSec = 0;
    $('timer-wrap').style.display = 'none';
  }
  $('topbar-tag').textContent = (META[state.currentQuiz] || META.mix).title;
  buildNavGrid();
  renderQuestion();
  showView('quiz');
  showToast('Quiz dilanjutkan dari soal ' + (state.currentIdx + 1), 'info');
}
function checkResumeDraft() {
  const draft = loadDraft();
  if (!draft) return;
  if (!$('view-home').classList.contains('active')) return;
  const minutesAgo = Math.floor((Date.now() - draft.savedAt) / 60000);
  const timeText = minutesAgo < 1 ? 'baru saja' : minutesAgo < 60 ? `${minutesAgo} menit lalu` : `${Math.floor(minutesAgo / 60)} jam lalu`;
  const quizName = (META[draft.currentQuiz] || META.mix).title;
  const progress = draft.answers.filter(a => a !== null).length;
  const total = draft.questionIds.length;
  showResumePrompt(quizName, progress, total, timeText, draft);
}
function showResumePrompt(quizName, progress, total, timeText, draft) {
  const existing = document.getElementById('resume-banner');
  if (existing) existing.remove();
  const banner = document.createElement('div');
  banner.id = 'resume-banner';
  banner.className = 'resume-banner';
  banner.innerHTML = `
    <div class="rb-icon">⏸</div>
    <div class="rb-text">
      <div class="rb-title">Lanjutkan quiz <em>${quizName}</em>?</div>
      <div class="rb-meta">Tersimpan ${timeText} · soal ${progress}/${total} sudah dijawab</div>
    </div>
    <div class="rb-actions">
      <button class="rb-btn rb-skip">Hapus</button>
      <button class="rb-btn rb-resume">Lanjutkan</button>
    </div>`;
  const main = document.querySelector('main');
  if (main && main.firstChild) main.insertBefore(banner, main.firstChild);
  banner.querySelector('.rb-resume').addEventListener('click', () => { banner.remove(); resumeDraft(draft); });
  banner.querySelector('.rb-skip').addEventListener('click', () => {
    if (confirm('Hapus draft quiz yang belum selesai?')) { clearDraft(); banner.remove(); showToast('Draft dihapus', 'info'); }
  });
}

// ============================================
// PER-QUESTION NOTES
// ============================================
function getNotesKey() { return `qk_notes_${state.activeUser || 'anon'}`; }
function loadAllNotes() { try { return JSON.parse(localStorage.getItem(getNotesKey()) || '{}'); } catch (e) { return {}; } }
function saveNote(qHash, note) {
  const all = loadAllNotes();
  if (note && note.trim()) all[qHash] = note.trim(); else delete all[qHash];
  try { localStorage.setItem(getNotesKey(), JSON.stringify(all)); } catch (e) {}
}
function getNote(qHash) { return loadAllNotes()[qHash] || ''; }
function questionHash(q) { return (q.question || '').slice(0, 100); }

// ============================================
// DAILY STREAK
// ============================================
function getStreakKey() { return `qk_streak_${state.activeUser || 'anon'}`; }
function updateDailyStreak() {
  let data;
  try { data = JSON.parse(localStorage.getItem(getStreakKey())) || {}; } catch (e) { data = {}; }
  data.totalDays = data.totalDays || 0; data.streak = data.streak || 0;
  renderStreakBadge(data);
}
function recordStudyDay() {
  let data;
  try { data = JSON.parse(localStorage.getItem(getStreakKey())) || { streak: 0, totalDays: 0 }; }
  catch (e) { data = { streak: 0, totalDays: 0 }; }
  const today = new Date().toISOString().slice(0, 10);
  if (data.lastDay === today) return data;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (data.lastDay === yesterday) data.streak += 1; else data.streak = 1;
  data.lastDay = today; data.totalDays += 1;
  try { localStorage.setItem(getStreakKey(), JSON.stringify(data)); } catch (e) {}
  if (data.streak === 3) showToast('🔥 3 hari berturut-turut belajar!', 'success');
  else if (data.streak === 7) showToast('🌟 1 minggu konsisten! Hebat!', 'success');
  else if (data.streak === 14) showToast('💪 2 minggu! Pantang menyerah!', 'success');
  else if (data.streak === 30) showToast('🏆 1 bulan! Kamu legenda!', 'success');
  else if (data.streak > 0 && data.streak % 10 === 0) showToast(`🚀 ${data.streak} hari berturut-turut!`, 'success');
  renderStreakBadge(data);
  return data;
}
function renderStreakBadge(data) {
  let badge = document.getElementById('streak-badge');
  if (!badge) {
    badge = document.createElement('div');
    badge.id = 'streak-badge';
    badge.className = 'streak-badge';
    badge.title = 'Hari berturut-turut belajar';
    const headerNav = document.querySelector('.header-nav');
    if (headerNav) headerNav.insertBefore(badge, headerNav.firstChild);
  }
  if (!data || data.streak < 1) badge.style.display = 'none';
  else { badge.style.display = ''; badge.innerHTML = `<span class="sb-icon">🔥</span><span class="sb-num">${data.streak}</span>`; }
}

// ============================================
// ACHIEVEMENTS
// ============================================
const ACHIEVEMENTS = [
  { id: 'first_quiz', icon: '🎯', name: 'Awal yang Baik', desc: 'Selesaikan quiz pertama' },
  { id: 'sniper', icon: '💯', name: 'Sniper', desc: 'Dapatkan 100% di satu sesi' },
  { id: 'pancasila_master', icon: '⭐', name: 'Pancasila Master', desc: '90%+ di 5 sesi Pancasila' },
  { id: 'uud_master', icon: '⚖️', name: 'UUD Master', desc: '90%+ di 5 sesi UUD 1945' },
  { id: 'nkri_master', icon: '🇮🇩', name: 'NKRI Master', desc: '90%+ di 5 sesi NKRI' },
  { id: 'bhinneka_master', icon: '🌈', name: 'Bhinneka Master', desc: '90%+ di 5 sesi Bhinneka' },
  { id: 'streak_3', icon: '🔥', name: 'Mulai Konsisten', desc: '3 hari berturut-turut' },
  { id: 'streak_7', icon: '🌟', name: 'Si Rajin', desc: '7 hari berturut-turut' },
  { id: 'streak_30', icon: '🏆', name: 'Legenda Belajar', desc: '30 hari berturut-turut' },
  { id: 'bookworm', icon: '📚', name: 'Kutu Buku', desc: '500+ soal dikerjakan' },
  { id: 'marathon', icon: '🏃', name: 'Marathon', desc: 'Selesaikan 1 Tantangan Akbar' },
  { id: 'speedrun', icon: '⚡', name: 'Speedrun', desc: '90%+ dalam waktu < 50% timer' }
];
function getAchKey() { return `qk_ach_${state.activeUser || 'anon'}`; }
function getAchievements() { try { return new Set(JSON.parse(localStorage.getItem(getAchKey()) || '[]')); } catch (e) { return new Set(); } }
function saveAchievements(set) { try { localStorage.setItem(getAchKey(), JSON.stringify(Array.from(set))); } catch (e) {} }
function unlockAchievement(id) {
  const unlocked = getAchievements();
  if (unlocked.has(id)) return;
  const ach = ACHIEVEMENTS.find(a => a.id === id);
  if (!ach) return;
  unlocked.add(id); saveAchievements(unlocked);
  setTimeout(() => showAchievementToast(ach), 1200);
}
function showAchievementToast(ach) {
  const t = document.createElement('div');
  t.className = 'ach-toast';
  t.innerHTML = `<div class="at-icon">${ach.icon}</div><div class="at-body"><div class="at-lbl">Achievement!</div><div class="at-name">${ach.name}</div><div class="at-desc">${ach.desc}</div></div>`;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 4500);
  playSound('win');
}
function showAchievementsPanel() {
  let panel = document.getElementById('ach-panel');
  if (panel) { panel.remove(); return; }
  const unlocked = getAchievements();
  panel = document.createElement('div');
  panel.id = 'ach-panel';
  panel.className = 'ach-panel';
  const cards = ACHIEVEMENTS.map(a => {
    const u = unlocked.has(a.id);
    return `<div class="ach-card ${u ? 'unlocked' : 'locked'}"><div class="ach-card-icon">${u ? a.icon : '🔒'}</div><div class="ach-card-body"><div class="ach-card-name">${a.name}</div><div class="ach-card-desc">${a.desc}</div></div>${u ? '<div class="ach-card-check">✓</div>' : ''}</div>`;
  }).join('');
  const count = unlocked.size, totalAch = ACHIEVEMENTS.length;
  panel.innerHTML = `<div class="ap-card"><div class="ap-head"><div><h3>Pencapaian</h3><div class="ap-progress">${count} dari ${totalAch} terbuka</div></div><button class="ap-close" aria-label="Tutup">✕</button></div><div class="ap-bar"><div class="ap-bar-fill" style="width:${(count/totalAch)*100}%"></div></div><div class="ap-grid">${cards}</div></div>`;
  document.body.appendChild(panel);
  panel.addEventListener('click', (e) => { if (e.target === panel || e.target.classList.contains('ap-close')) panel.remove(); });
}
function checkAchievements() {
  const history = state.allHistory || [];
  if (history.length >= 1) unlockAchievement('first_quiz');
  if (history.some(h => h.percent === 100)) unlockAchievement('sniper');
  const mc = { pancasila: 0, uud: 0, nkri: 0, bhinneka: 0 };
  history.forEach(h => { if (h.percent >= 90 && mc[h.quiz] !== undefined) mc[h.quiz]++; });
  if (mc.pancasila >= 5) unlockAchievement('pancasila_master');
  if (mc.uud >= 5) unlockAchievement('uud_master');
  if (mc.nkri >= 5) unlockAchievement('nkri_master');
  if (mc.bhinneka >= 5) unlockAchievement('bhinneka_master');
  if (history.reduce((s, h) => s + (h.total || 0), 0) >= 500) unlockAchievement('bookworm');
  if (history.some(h => h.quiz === 'mix')) unlockAchievement('marathon');
  history.forEach(h => { if (h.timerMode > 0 && h.percent >= 90 && h.elapsed < h.timerMode * 60 * 0.5) unlockAchievement('speedrun'); });
  try {
    const sd = JSON.parse(localStorage.getItem(getStreakKey()) || '{}');
    if (sd.streak >= 3) unlockAchievement('streak_3');
    if (sd.streak >= 7) unlockAchievement('streak_7');
    if (sd.streak >= 30) unlockAchievement('streak_30');
  } catch (e) {}
}

// ============================================
// MATERI PROGRESS (home cards)
// ============================================
function updateMateriProgress() {
  const history = state.allHistory || [];
  const stats = { pancasila: { q: 0, c: 0 }, uud: { q: 0, c: 0 }, nkri: { q: 0, c: 0 }, bhinneka: { q: 0, c: 0 } };
  history.forEach(h => {
    if (h.quiz === 'mix' || !stats[h.quiz]) return;
    stats[h.quiz].q += h.total; stats[h.quiz].c += h.correct;
  });
  ['pancasila', 'uud', 'nkri', 'bhinneka'].forEach(key => {
    const card = document.querySelector(`.quiz-card[data-quiz="${key}"]`);
    if (!card) return;
    const s = stats[key];
    const accuracy = s.q > 0 ? Math.round((s.c / s.q) * 100) : 0;
    const sessions = history.filter(h => h.quiz === key).length;
    let progEl = card.querySelector('.qc-progress');
    if (!progEl) {
      progEl = document.createElement('div');
      progEl.className = 'qc-progress';
      const meta = card.querySelector('.qc-meta');
      if (meta) card.insertBefore(progEl, meta); else card.appendChild(progEl);
    }
    if (sessions === 0) progEl.innerHTML = `<span class="qc-prog-empty">Belum dikerjakan</span>`;
    else {
      const accClass = accuracy >= 80 ? 'good' : accuracy >= 60 ? 'med' : 'low';
      progEl.innerHTML = `<div class="qc-prog-bar"><div class="qc-prog-fill ${accClass}" style="width:${accuracy}%"></div></div><div class="qc-prog-info"><span>${sessions} sesi · ${s.q} soal</span><span class="qc-prog-acc">${accuracy}%</span></div>`;
    }
  });
}

// ============================================
// SETTINGS PANEL
// ============================================
function openSettingsPanel() {
  let panel = document.getElementById('settings-panel');
  if (panel) { panel.remove(); return; }
  panel = document.createElement('div');
  panel.id = 'settings-panel';
  panel.className = 'settings-panel';
  panel.innerHTML = `<div class="sp-card"><div class="sp-head"><h3>Pengaturan</h3><button class="sp-close" aria-label="Tutup">✕</button></div><div class="sp-body">
    <div class="sp-row"><div class="sp-label"><strong>Tema</strong><span>Pilihan tampilan</span></div><div class="sp-toggle-group" data-setting="theme"><button class="sp-tog ${settings.theme==='light'?'active':''}" data-val="light">☀ Terang</button><button class="sp-tog ${settings.theme==='dark'?'active':''}" data-val="dark">🌙 Gelap</button></div></div>
    <div class="sp-row"><div class="sp-label"><strong>Ukuran Teks</strong><span>Sesuaikan kenyamanan</span></div><div class="sp-toggle-group" data-setting="fontSize"><button class="sp-tog ${settings.fontSize==='small'?'active':''}" data-val="small">A−</button><button class="sp-tog ${settings.fontSize==='normal'?'active':''}" data-val="normal">A</button><button class="sp-tog ${settings.fontSize==='large'?'active':''}" data-val="large">A+</button></div></div>
    <div class="sp-row"><div class="sp-label"><strong>Efek Suara</strong><span>Ding saat jawab (mode latihan)</span></div><div class="sp-toggle-group" data-setting="soundEnabled"><button class="sp-tog ${settings.soundEnabled?'active':''}" data-val="true">🔊 Hidup</button><button class="sp-tog ${!settings.soundEnabled?'active':''}" data-val="false">🔇 Mati</button></div></div>
    <div class="sp-row"><div class="sp-label"><strong>Auto Lanjut</strong><span>Lompat ke soal berikutnya (mode ujian)</span></div><div class="sp-toggle-group" data-setting="autoAdvance"><button class="sp-tog ${settings.autoAdvance?'active':''}" data-val="true">Hidup</button><button class="sp-tog ${!settings.autoAdvance?'active':''}" data-val="false">Mati</button></div></div>
    <div class="sp-row sp-row-action"><button class="sp-action" id="sp-clear-data">🗑 Hapus semua data lokal</button></div>
  </div></div>`;
  document.body.appendChild(panel);
  panel.addEventListener('click', (e) => { if (e.target === panel || e.target.classList.contains('sp-close')) panel.remove(); });
  panel.querySelectorAll('.sp-toggle-group').forEach(group => {
    group.addEventListener('click', (e) => {
      const tog = e.target.closest('.sp-tog'); if (!tog) return;
      const setting = group.dataset.setting;
      let val = tog.dataset.val;
      if (val === 'true') val = true; else if (val === 'false') val = false;
      settings[setting] = val; saveSettings(); applySettings();
      group.querySelectorAll('.sp-tog').forEach(t => t.classList.remove('active'));
      tog.classList.add('active'); playSound('tick');
    });
  });
  panel.querySelector('#sp-clear-data').addEventListener('click', () => {
    if (confirm('Hapus semua data lokal (riwayat offline, draft, bookmark, achievement, streak, catatan)?\n\nData di cloud Firebase tidak terhapus.')) {
      try { Object.keys(localStorage).forEach(k => { if (k.startsWith('qk_')) localStorage.removeItem(k); });
        showToast('Semua data lokal terhapus', 'info'); panel.remove(); setTimeout(() => location.reload(), 800);
      } catch (e) { showToast('Gagal menghapus data', 'warn'); }
    }
  });
}

// ============================================
// READ-ALOUD (Text-to-Speech)
// ============================================
function speakQuestion(text) {
  if (!('speechSynthesis' in window)) { showToast('Browser tidak mendukung pembacaan suara', 'warn'); return; }
  if (window.speechSynthesis.speaking) { window.speechSynthesis.cancel(); return; }
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'id-ID'; utter.rate = 0.95; utter.pitch = 1.0;
  window.speechSynthesis.speak(utter);
}

// ============================================
// FLASHCARD MODE
// ============================================
function toggleFlashReveal(idx) {
  if (state.flashRevealed.has(idx)) state.flashRevealed.delete(idx);
  else state.flashRevealed.add(idx);
  // Toggle class on existing card so the 3D flip animation actually plays
  const card = document.querySelector('.flashcard');
  if (card) {
    card.classList.toggle('revealed', state.flashRevealed.has(idx));
    if (state.flashRevealed.has(idx)) playSound('tick');
  } else {
    renderQuestion();
  }
}
function renderFlashcard(q, idx) {
  const ansContainer = $('answers');
  ansContainer.innerHTML = '';
  ansContainer.classList.add('flashcard-active');
  const revealed = state.flashRevealed.has(idx);
  const correctLetter = ['A', 'B', 'C', 'D'][q.correct];
  const card = document.createElement('div');
  card.className = 'flashcard' + (revealed ? ' revealed' : '');
  card.innerHTML = `<div class="flashcard-inner"><div class="flashcard-front"><div class="fc-badge">${q.tag}</div><div class="fc-hint">Tap untuk lihat jawaban</div><div class="fc-question">${q.question}</div><div class="fc-tap-icon">👆</div></div><div class="flashcard-back"><div class="fc-answer-label">Jawaban</div><div class="fc-answer">${correctLetter}. ${q.options[q.correct]}</div><div class="fc-explanation">${q.explanation}</div><div class="fc-flip-hint">↺ Tap untuk balik</div></div></div>`;
  card.addEventListener('click', () => toggleFlashReveal(idx));
  ansContainer.appendChild(card);
  $('explanation').classList.remove('visible');
}

// ============================================
// REPEAT WRONG / BOOKMARKED
// ============================================
function repeatOnly(filter) {
  let selected = [];
  if (filter === 'wrong') state.questions.forEach((q, i) => { if (state.answers[i] !== q.correct) selected.push(q); });
  else if (filter === 'bookmarked') state.questions.forEach((q, i) => { if (state.bookmarks.has(i)) selected.push(q); });
  if (selected.length === 0) { showToast(filter === 'wrong' ? 'Tidak ada soal yang salah!' : 'Tidak ada soal yang ditandai', 'info'); return; }
  state.questions = selected;
  state.answers = new Array(selected.length).fill(null);
  state.bookmarks = new Set();
  state.currentIdx = 0; state.startTime = Date.now(); state.elapsed = 0; state.finished = false;
  state.isFlashcardMode = false;
  document.body.classList.remove('flashcard-mode');
  state.config = { ...state.config, mode: 'latihan', timer: 0, count: selected.length };
  if (state.timerInterval) clearInterval(state.timerInterval);
  $('timer-wrap').style.display = 'none';
  const meta = META[state.currentQuiz] || META.mix;
  $('topbar-tag').textContent = (filter === 'wrong' ? 'Soal Salah · ' : 'Ditandai · ') + meta.title;
  buildNavGrid(); renderQuestion(); showView('quiz');
  showToast(`Ulang ${selected.length} soal ${filter === 'wrong' ? 'yang salah' : 'yang ditandai'}`, 'success');
}

// ============================================
// PEER COMPARISON
// ============================================
function renderPeerComparison() {
  const peerContainer = $('peer-stats');
  if (!peerContainer) return;
  const sameType = (state.allHistory || []).filter(h => h.quiz === state.currentQuiz);
  if (sameType.length < 2) { peerContainer.style.display = 'none'; return; }
  peerContainer.style.display = '';
  const avgPercent = Math.round(sameType.reduce((s, h) => s + h.percent, 0) / sameType.length);
  const userPercent = Math.round((state.answers.filter((a, i) => a === state.questions[i].correct).length / state.questions.length) * 100);
  const ranking = sameType.filter(h => h.percent < userPercent).length;
  const percentile = Math.round((ranking / sameType.length) * 100);
  peerContainer.innerHTML = `<div class="peer-head"><div class="peer-icon">👥</div><div class="peer-title">Dibanding sesi sebelumnya (${sameType.length} sesi)</div></div><div class="peer-stats-grid"><div class="peer-stat"><div class="ps-num">${userPercent}%</div><div class="ps-lbl">Kamu</div></div><div class="peer-stat"><div class="ps-num">${avgPercent}%</div><div class="ps-lbl">Rata-rata</div></div><div class="peer-stat"><div class="ps-num">${percentile}%</div><div class="ps-lbl">Persentil</div></div></div><div class="peer-msg">${percentile >= 80 ? '🌟 Di atas mayoritas sesimu!' : percentile >= 50 ? '👍 Di atas rata-rata.' : '💪 Semangat — masih bisa lebih tinggi!'}</div>`;
}

// ============================================
// PDF CERTIFICATE
// ============================================
function exportCertificate() {
  const meta = META[state.currentQuiz] || META.mix;
  const total = state.questions.length;
  let correct = 0;
  state.questions.forEach((q, i) => { if (state.answers[i] === q.correct) correct++; });
  const percent = Math.round((correct / total) * 100);
  const name = state.activeUser && state.activeUser !== 'guest' ? (PARTICIPANTS.find(p => p.id === state.activeUser)?.name || 'Peserta') : 'Peserta';
  const date = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  const elapsedT = state.config.timer > 0 ? state.elapsed : Math.floor((Date.now() - state.startTime) / 1000);

  // Remove existing certificate modal if any
  const existing = document.getElementById('cert-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'cert-modal';
  modal.className = 'cert-modal';
  modal.innerHTML = `
    <div class="cert-modal-toolbar">
      <button class="cert-tool-btn cert-print" id="cert-print-btn">🖨 Cetak / Simpan PDF</button>
      <button class="cert-tool-btn cert-close" id="cert-close-btn">✕ Tutup</button>
    </div>
    <div class="cert-scroll">
      <div class="cert-sheet" id="cert-sheet">
        <div class="cert-corner tl"></div><div class="cert-corner br"></div>
        <div class="cert-brand">Quiz Konstitusi PPKn</div>
        <div class="cert-title"><em>Sertifikat</em></div>
        <div class="cert-subtitle">Penghargaan atas pencapaian dalam pembelajaran</div>
        <div class="cert-label">Diberikan kepada</div>
        <div class="cert-name">${name}</div>
        <div class="cert-body">Telah menyelesaikan quiz <strong>${meta.title}</strong> dengan pencapaian yang membanggakan. Semangat dan dedikasi yang ditunjukkan patut diapresiasi.</div>
        <div class="cert-stats">
          <div class="cert-stat"><div class="cert-stat-num">${percent}%</div><div class="cert-stat-lbl">Skor Akhir</div></div>
          <div class="cert-stat"><div class="cert-stat-num">${correct}/${total}</div><div class="cert-stat-lbl">Jawaban Benar</div></div>
          <div class="cert-stat"><div class="cert-stat-num">${formatTime(elapsedT)}</div><div class="cert-stat-lbl">Waktu</div></div>
        </div>
        <div class="cert-foot">
          <div class="cert-signed"><div class="cert-signed-name">${date}</div><div class="cert-signed-role">Tanggal</div></div>
          <div class="cert-signed"><div class="cert-signed-name">Egit Wahyu Nugraha, S.Pd., Gr.</div><div class="cert-signed-role">Guru Pembimbing</div></div>
        </div>
      </div>
    </div>`;
  document.body.appendChild(modal);
  document.body.classList.add('cert-open');

  const close = () => {
    modal.remove();
    document.body.classList.remove('cert-open');
  };
  modal.querySelector('#cert-close-btn').addEventListener('click', close);
  modal.querySelector('#cert-print-btn').addEventListener('click', () => window.print());
  // Click outside the sheet closes
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  // Escape closes
  const escHandler = (e) => { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', escHandler); } };
  document.addEventListener('keydown', escHandler);

  showToast('Sertifikat siap! Klik Cetak untuk simpan PDF', 'success');
}

// ============================================
// RESULT
// ============================================
function showResult() {
  if (state.timerInterval) clearInterval(state.timerInterval);
  state.finished = true;
  clearDraft();

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

  // Count-up animation for percent
  animateCountUp($('result-percent'), 0, percent, 1100, '%');

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

  // Collect wrong question hashes for cross-session tracking
  const wrongQuestions = [];
  state.questions.forEach((q, i) => { if (state.answers[i] !== q.correct) wrongQuestions.push(questionHash(q)); });

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
    wrongQuestions: wrongQuestions,
    timestamp: Date.now()
  });

  // Record study day (streak)
  recordStudyDay();

  // Mark daily challenge complete
  if (state.isDailyChallenge) {
    markDailyChallengeComplete(percent);
    state.isDailyChallenge = false;
  }

  // Reload history then re-check achievements + progress
  setTimeout(() => {
    loadHistory((history) => {
      state.allHistory = history;
      checkAchievements();
      updateMateriProgress();
    });
  }, 300);

  // Peer comparison
  renderPeerComparison();

  // Show/hide repeat-wrong button
  const rwBtn = $('repeat-wrong-btn');
  if (rwBtn) rwBtn.style.display = wrong > 0 ? '' : 'none';

  showView('result');

  // 🎉 Confetti + win sound for high scores
  if (percent === 100) {
    setTimeout(() => launchConfetti(), 600);
    setTimeout(() => launchConfetti(), 1200);
    playSound('win');
  } else if (percent >= 90) {
    setTimeout(() => launchConfetti(), 600);
    playSound('win');
  }
}

// ============================================
// CONFETTI 🎉 — pure CSS/JS, no library
// ============================================
function launchConfetti() {
  const container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);

  const colors = ['#C76D45', '#5F8AAA', '#6E9C6E', '#BF9343', '#9B6BC4', '#E6C26A', '#D67B82'];
  const count = 90;

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = (Math.random() * 0.5) + 's';
    piece.style.animationDuration = (2.4 + Math.random() * 1.6) + 's';
    piece.style.width = (6 + Math.random() * 8) + 'px';
    piece.style.height = (8 + Math.random() * 6) + 'px';
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    if (Math.random() > 0.5) piece.style.borderRadius = '50%';
    container.appendChild(piece);
  }

  setTimeout(() => container.remove(), 5000);
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

    const isBookmarked = state.bookmarks.has(i);

    // Apply filter
    if (currentFilter === 'bookmarked') {
      if (!isBookmarked) return;
    } else if (currentFilter !== 'all' && currentFilter !== status) {
      return;
    }

    const item = document.createElement('div');
    item.className = `review-item ${status}${isBookmarked ? ' bookmarked' : ''}`;

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

    const bmBadge = isBookmarked ? '<span class="review-bm-badge" title="Soal ditandai">📌</span>' : '';

    item.innerHTML = `
      <div class="review-num">Soal ${i + 1} · ${q.tag} ${bmBadge}</div>
      <div class="review-q">${q.question}</div>
      ${answerHtml}
      <div class="review-exp"><strong>↳ Pembahasan:</strong> ${q.explanation}</div>
    `;
    list.appendChild(item);
  });

  if (list.children.length === 0) {
    const emptyMsg = currentFilter === 'bookmarked'
      ? 'Belum ada soal yang kamu tandai. Tekan tombol 📌 atau "B" saat mengerjakan untuk menandai soal yang ingin dipelajari ulang.'
      : 'Tidak ada soal dalam kategori ini.';
    list.innerHTML = `<div style="text-align:center; padding:50px 20px; color:var(--ink-3); font-size:13.5px; line-height:1.6;">${emptyMsg}</div>`;
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
      case 'repeat-wrong':
        repeatOnly('wrong');
        break;
      case 'certificate':
        exportCertificate();
        break;
      case 'achievements':
        showAchievementsPanel();
        break;
      case 'leaderboard':
        showLeaderboard();
        break;
      case 'materi':
        showMateriPanel();
        break;
      case 'notes':
        showNotesBank();
        break;
      case 'stats':
        showStatsPanel();
        break;
      case 'glossarium':
        showGlossarium();
        break;
      case 'bank':
        showQuestionBank();
        break;
      case 'settings':
        openSettingsPanel();
        break;
    }
  });
}

// ============================================
// CUSTOM TOOLTIPS (rendered at body, never clipped)
// ============================================
function bindTooltips() {
  let tipEl = document.getElementById('qk-tooltip');
  if (!tipEl) {
    tipEl = document.createElement('div');
    tipEl.id = 'qk-tooltip';
    document.body.appendChild(tipEl);
  }
  let showTimer = null;

  function positionTip(btn) {
    const rect = btn.getBoundingClientRect();
    const tipRect = tipEl.getBoundingClientRect();
    const margin = 10;
    const btnCenter = rect.left + rect.width / 2;
    // Desired left edge so the bubble is centered under the button
    let left = btnCenter - tipRect.width / 2;
    // Clamp so it never leaves the viewport
    if (left < margin) left = margin;
    else if (left + tipRect.width > window.innerWidth - margin) {
      left = window.innerWidth - margin - tipRect.width;
    }
    const top = rect.bottom + 12;
    tipEl.style.left = left + 'px';
    tipEl.style.top = top + 'px';
    // Arrow points at the button center, relative to the bubble's left edge
    const arrowX = btnCenter - left;
    tipEl.style.setProperty('--arrow-x', arrowX + 'px');
  }

  function show(btn) {
    const text = btn.getAttribute('data-tip');
    if (!text) return;
    tipEl.textContent = text;
    // Measure first (off-screen-ish), then position, then animate in
    tipEl.style.left = '-9999px';
    tipEl.classList.remove('show');
    requestAnimationFrame(() => {
      positionTip(btn);
      requestAnimationFrame(() => tipEl.classList.add('show'));
    });
  }
  function hide() {
    tipEl.classList.remove('show');
  }

  document.querySelectorAll('.nav-icon-btn[data-tip]').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      clearTimeout(showTimer);
      showTimer = setTimeout(() => show(btn), 300);
    });
    btn.addEventListener('mouseleave', () => {
      clearTimeout(showTimer);
      hide();
    });
    btn.addEventListener('focus', () => show(btn));
    btn.addEventListener('blur', hide);
    btn.addEventListener('click', hide);
  });
  // Hide on scroll/resize to avoid stale positioning
  window.addEventListener('scroll', hide, true);
  window.addEventListener('resize', hide);
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
    state.allHistory = local;
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
          state.allHistory = merged;
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

  // Refresh ALL per-user data when switching profiles
  updateDailyStreak();                    // streak badge (per-user)
  loadHistory((history) => {              // reload this user's history
    state.allHistory = history;
    updateMateriProgress();              // home card progress
    checkAchievements();                 // re-check achievements
    if ($('view-history').classList.contains('active')) renderHistoryUI(history);
  });

  showToast(`Halo, ${id === 'guest' ? 'Tamu' : (getParticipant(id).name.split(' ')[0])}! 👋`, 'info');
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
  // Load settings + apply theme/font
  loadSettings();

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
  bindTooltips();

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

  // Daily streak badge
  updateDailyStreak();
  renderQuoteBanner();
  renderDailyChallengeCard();

  // Load history → populate state.allHistory → update home widgets
  loadHistory((history) => {
    state.allHistory = history;
    updateMateriProgress();
    checkAchievements();
  });

  // Initialize Firebase (waits for SDK to be ready)
  if (window.firebaseModules) {
    initFirebase();
  } else {
    window.addEventListener('firebaseReady', initFirebase);
  }

  // Check for draft resume after a small delay (let UI render)
  setTimeout(checkResumeDraft, 600);
}

init();
