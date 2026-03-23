
<script>
let ctx;

function getCtx() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return ctx;
}

// 🐹 HIT（核心爽感）
function playHit() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  playKick(ctx, now, 120);
  playTone(ctx, 800, now, 0.1);
  playTone(ctx, 1200, now + 0.05, 0.15);
}

// ❌ MISS（輕微失誤）
function playMiss() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  playTone(ctx, 300, now, 0.1, "sine", 0.05);
  playTone(ctx, 200, now + 0.1, 0.1, "sine", 0.05);
}

// 🔥 COMBO（連擊升高）
let comboLevel = 0;
function playCombo() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  comboLevel++;
  const base = 700 + comboLevel * 80;

  playTone(ctx, base, now, 0.12);
  playTone(ctx, base + 200, now + 0.05, 0.15);
}

// 💥 CRIT（爆擊）
function playCrit() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  playKick(ctx, now, 150);

  [800, 1200, 1600].forEach((f, i) => {
    playTone(ctx, f, now + i * 0.05, 0.2, "triangle", 0.15);
  });
}

// 🎉 CLEAR（過關）
function playClear() {
  const ctx = getCtx();
  const now = ctx.currentTime;

  const notes = [523, 659, 784, 1046];

  notes.forEach((f, i) => {
    playTone(ctx, f, now + i * 0.15, 0.3, "triangle", 0.12);
  });
}

// 🔧 基礎音
function playTone(ctx, freq, time, dur, type = "triangle", vol = 0.1) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = type;
  osc.frequency.value = freq;

  filter.type = "lowpass";
  filter.frequency.value = 2000;

  gain.gain.setValueAtTime(vol, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(time);
  osc.stop(time + dur);
}

// 🥊 打擊
function playKick(ctx, time, baseFreq) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(baseFreq, time);
  osc.frequency.exponentialRampToValueAtTime(60, time + 0.1);

  gain.gain.setValueAtTime(0.3, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(time);
  osc.stop(time + 0.15);
}
</script>