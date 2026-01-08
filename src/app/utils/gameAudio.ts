// 建立 AudioContext
let audioCtx: AudioContext | null = null;
let bgmOscillators: AudioNode[] = [];
let bgmInterval: number | null = null;

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
 * @param volume 音量 (0-1)
 */
const playNote = (ctx: AudioContext, freq: number, startTime: number, duration: number, type: OscillatorType = 'triangle', volume: number = 0.3) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.value = freq;

  // 音量包絡線 (ADSR)
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(volume, startTime + 0.05); // Attack
  gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration); // Decay

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration);
};

/**
 * 播放快樂的「成功」旋律 (Victory Jingle)
 * 旋律：C5 -> E5 -> G5 -> C6 (Do Mi So Do!)
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
       playNote(ctx, f, s, d, type, 0.3);
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
 */
export const playWrongSound = () => {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const t = ctx.currentTime;

    // 第一聲：E3 (Mi) - 短促
    playNote(ctx, 329.63, t, 0.2, 'triangle', 0.2);
    
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

/**
 * 啟動背景音樂 (生成式音樂)
 * 使用 C 大調五聲音階 (Pentatonic): C, D, E, G, A
 * 創造溫柔、不干擾的環境音
 */
export const startBackgroundMusic = () => {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    if (bgmInterval) return; // 已經在播放中

    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25]; // C4 Scale
    let noteIndex = 0;

    // 每 2 秒播放一個隨機音符，形成風鈴般的效果
    const playAmbientNote = () => {
        const t = ctx.currentTime;
        const freq = scale[Math.floor(Math.random() * scale.length)];
        const duration = 1.5;
        
        // 使用 Sine 波，聲音圓潤像豎琴或鐘聲
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        // 非常柔和的音量 envelope
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.05, t + 0.1); // 非常小聲 (0.05)
        gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(t);
        osc.stop(t + duration);
    };

    // 立即播放第一個音
    playAmbientNote();
    
    // 設定循環
    bgmInterval = window.setInterval(playAmbientNote, 2000);

  } catch (e) {
    console.error("BGM failed", e);
  }
};

/**
 * 停止背景音樂
 */
export const stopBackgroundMusic = () => {
  if (bgmInterval) {
    clearInterval(bgmInterval);
    bgmInterval = null;
  }
};

/**
 * 使用瀏覽器語音合成朗讀文字 (Text-to-Speech)
 * @param text 要朗讀的文字
 * @param lang 語言代碼 (預設 en-US)
 */
export const speakText = (text: string, lang: string = 'en-US') => {
  if (!('speechSynthesis' in window)) return;

  // Cancel any currently playing speech to avoid overlap
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.8; // Slightly slower for kids
  utterance.pitch = 1.1; // Slightly higher pitch for friendliness

  window.speechSynthesis.speak(utterance);
};
