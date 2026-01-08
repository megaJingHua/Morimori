// 建立 AudioContext
let audioCtx: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
};

/**
 * 播放單個音符
 * @param ctx AudioContext
 * @param freq 頻率 (Hz)
 * @param startTime 開始時間
 * @param duration 持續時間
 * @param type 波形類型
 */
const playNote = (ctx: AudioContext, freq: number, startTime: number, duration: number, type: OscillatorType = 'triangle') => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.value = freq;

  // 音量包絡線 (ADSR)
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(0.2, startTime + 0.05); // Attack (失敗音效音量稍微小一點，比較不刺耳)
  gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration); // Decay

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration);
};

/**
 * 播放快樂的「成功」旋律 (Victory Jingle)
 * 旋律：C5 -> E5 -> G5 -> C6 (Do Mi So Do!)
 * 聽起來像：超級瑪利歐吃金幣 / 闖關成功的感覺
 */
export const playCorrectSound = () => {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const t = ctx.currentTime;
    
    // 快樂的大調琶音 - 音量稍微大一點
    const playLoudNote = (f: number, s: number, d: number, type: OscillatorType = 'triangle') => {
       const osc = ctx.createOscillator();
       const gain = ctx.createGain();
       osc.type = type;
       osc.frequency.value = f;
       gain.gain.setValueAtTime(0, s);
       gain.gain.linearRampToValueAtTime(0.3, s + 0.02);
       gain.gain.exponentialRampToValueAtTime(0.01, s + d);
       osc.connect(gain);
       gain.connect(ctx.destination);
       osc.start(s);
       osc.stop(s + d);
    };

    playLoudNote(523.25, t, 0.4);        // Do (C5)
    playLoudNote(659.25, t + 0.1, 0.4);  // Mi (E5)
    playLoudNote(783.99, t + 0.2, 0.4);  // So (G5)
    playLoudNote(1046.50, t + 0.3, 0.6, 'sine'); // Do (C6)

    // 伴奏
    playLoudNote(523.25, t + 0.3, 0.6, 'sine'); 

  } catch (e) {
    console.error("Audio playback failed", e);
  }
};

/**
 * 播放溫和的「失敗」音效
 * 旋律：E3 -> C3 (Mi -> Do, 下行)
 * 聽起來像：可愛的「咘、咘～」(Uh-oh)
 */
export const playWrongSound = () => {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const t = ctx.currentTime;

    // 第一聲：E3 (Mi) - 短促
    playNote(ctx, 329.63, t, 0.2, 'triangle');
    
    // 第二聲：C3 (Do) - 稍微長一點，帶滑音效果會更可愛
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    
    // 頻率稍微往下滑，像洩氣的感覺
    osc.frequency.setValueAtTime(261.63, t + 0.2); // C3
    osc.frequency.linearRampToValueAtTime(250.00, t + 0.5); // 稍微下滑

    gain.gain.setValueAtTime(0, t + 0.2);
    gain.gain.linearRampToValueAtTime(0.2, t + 0.25);
    gain.gain.linearRampToValueAtTime(0, t + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t + 0.2);
    osc.stop(t + 0.5);

  } catch (e) {
    console.error("Audio playback failed", e);
  }
};
