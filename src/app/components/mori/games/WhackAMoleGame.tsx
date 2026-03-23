import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
} from "motion/react";
import {
  ArrowLeft,
  Clock,
  RefreshCw,
  Trophy,
  Sparkles,
  User,
  Lightbulb,
  Target,
} from "lucide-react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { useGameTime } from "../../../context/GameTimeContext";
import { TimeUpOverlay } from "../TimeUpOverlay";
import { playCorrectSound } from "../../../utils/gameAudio";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
const hammerImage = "/Morimori/assets/pk.png";
const mobileStartImage = "/Morimori/assets/unnamed4.jpg";
const desktopStartImage = "/Morimori/assets/unnamed5.jpg";
const mobileBgImage = "/Morimori/assets/unnamed1.jpg";
const desktopBgImage = "/Morimori/assets/unnamed.jpg";

const GAME_DURATION = 30;

// 🎧 柔和鋼琴
function piano(
  ctx: AudioContext,
  freq: number,
  time: number,
  dur: number,
  vol = 0.08,
) {
  if (ctx.state === "closed") return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = "triangle";
  osc.frequency.value = freq;

  filter.type = "lowpass";
  filter.frequency.value = 1400;

  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(vol, time + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(time);
  osc.stop(time + dur);
}

// 🔧 基礎音效 (音效)
function playTone(
  ctx: AudioContext,
  freq: number,
  time: number,
  dur: number,
  type: OscillatorType = "triangle",
  vol = 0.1,
) {
  if (ctx.state === "closed") return;
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
function playKick(
  ctx: AudioContext,
  time: number,
  baseFreq: number,
) {
  if (ctx.state === "closed") return;
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

// 🐹 HIT（核心爽感）
function playHitSound(ctx: AudioContext) {
  if (ctx.state === "closed") return;
  const now = ctx.currentTime;
  playKick(ctx, now, 120);
  playTone(ctx, 800, now, 0.1);
  playTone(ctx, 1200, now + 0.05, 0.15);
}

// ❌ MISS（輕微失誤）
function playMissSound(ctx: AudioContext) {
  if (ctx.state === "closed") return;
  const now = ctx.currentTime;
  playTone(ctx, 300, now, 0.1, "sine", 0.05);
  playTone(ctx, 200, now + 0.1, 0.1, "sine", 0.05);
}

// 🎉 CLEAR（過關）
function playClearSound(ctx: AudioContext) {
  if (ctx.state === "closed") return;
  const now = ctx.currentTime;
  const notes = [523, 659, 784, 1046];
  notes.forEach((f, i) => {
    playTone(ctx, f, now + i * 0.15, 0.3, "triangle", 0.12);
  });
}

// 🎼 和弦（加7th）
const chords = [
  [261.63, 329.63, 392.0, 493.88], // Cmaj7
  [392.0, 493.88, 587.33, 698.46], // G7
  [220.0, 261.63, 329.63, 392.0], // Am7
  [174.61, 220.0, 261.63, 329.63], // Fmaj7
];

interface MoleNode {
  id: number;
  active: boolean;
  hit: boolean;
}

export function WhackAMoleGame({
  onExit,
}: {
  onExit: () => void;
}) {
  const [moles, setMoles] = useState<MoleNode[]>(
    Array.from({ length: 9 }, (_, i) => ({
      id: i,
      active: false,
      hit: false,
    })),
  );
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const [isHitting, setIsHitting] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const bgmTimerRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const stopBGM = () => {
    if (bgmTimerRef.current) {
      clearTimeout(bgmTimerRef.current);
      bgmTimerRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
  };

  const startBGM = async () => {
    stopBGM();

    const AudioContextClass =
      window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    if (ctx.state === "suspended") {
      await ctx.resume();
    }

    const playGroove = () => {
      if (
        !audioCtxRef.current ||
        audioCtxRef.current.state === "closed"
      )
        return;

      let t = audioCtxRef.current.currentTime;
      let beat = 0.4; // 約 140 BPM

      chords.forEach((chord, bar) => {
        let base = t + bar * beat * 4;

        // 🎹 左手（不是固定拍）
        piano(ctx, chord[0], base, 0.2, 0.08);
        piano(ctx, chord[2], base + beat * 1.5, 0.2, 0.06);

        // 🎶 右手（插空 + syncopation）
        piano(ctx, chord[1] * 2, base + beat * 0.5, 0.2, 0.1);
        piano(ctx, chord[3] * 2, base + beat * 1.2, 0.2, 0.1);
        piano(ctx, chord[2] * 2, base + beat * 2.2, 0.2, 0.1);

        // 🎵 裝飾音（關鍵！）
        piano(
          ctx,
          chord[1] * 2 * 0.9,
          base + beat * 0.45,
          0.05,
          0.05,
        );
      });

      bgmTimerRef.current = setTimeout(playGroove, 6400);
    };

    playGroove();
  };

  useEffect(() => {
    return () => {
      stopBGM();
    };
  }, []);

  const { startTimer, stopTimer, isTimeUp, recordGame } =
    useGameTime();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.movementX !== 0 || e.movementY !== 0) {
        setShowCursor(true);
      }
      // Center the hit point to the exact cursor position
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const handleTouch = () => {
      setShowCursor(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouch);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
      stopTimer();
    };
  }, []);

  useEffect(() => {
    startTimer();
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleGameOver();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  useEffect(() => {
    let moleInterval: ReturnType<typeof setInterval>;
    if (isPlaying && timeLeft > 0) {
      moleInterval = setInterval(() => {
        activateRandomMole();
      }, 800);
    }
    return () => clearInterval(moleInterval);
  }, [isPlaying, timeLeft]);

  const activateRandomMole = () => {
    setMoles((current) => {
      const inactiveMoles = current.filter(
        (m) => !m.active && !m.hit,
      );
      if (inactiveMoles.length === 0) return current;

      const numToActivate = Math.random() > 0.8 ? 2 : 1;
      const shuffled = [...inactiveMoles]
        .sort(() => Math.random() - 0.5)
        .slice(0, numToActivate);
      const idsToActivate = shuffled.map((m) => m.id);

      idsToActivate.forEach((id) => {
        setTimeout(
          () => {
            setMoles((latest) =>
              latest.map((m) =>
                m.id === id && !m.hit
                  ? { ...m, active: false }
                  : m,
              ),
            );
          },
          1500 + Math.random() * 500,
        );
      });

      return current.map((m) =>
        idsToActivate.includes(m.id)
          ? { ...m, active: true, hit: false }
          : m,
      );
    });
  };

  const handleGameOver = () => {
    setIsPlaying(false);
    setIsGameOver(true);
    setMoles((prev) =>
      prev.map((m) => ({ ...m, active: false, hit: false })),
    );
    stopBGM();
    if (audioCtxRef.current) {
      playClearSound(audioCtxRef.current);
    }
    recordGame({
      gameId: "whackamole",
      gameType: "打地鼠遊戲",
      score: `得分: ${score}`,
      timePlayed: GAME_DURATION,
    });
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setIsPlaying(true);
    setIsGameOver(false);
    setHasStarted(true);
    setMoles(
      Array.from({ length: 9 }, (_, i) => ({
        id: i,
        active: false,
        hit: false,
      })),
    );
    startBGM();
  };

  const handleExit = () => {
    stopBGM();
    onExit();
  };

  const handleMoleClick = (
    id: number,
    e: React.PointerEvent,
  ) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isPlaying) return;
    setIsHitting(true);

    setMoles((current) => {
      const mole = current.find((m) => m.id === id);
      if (mole && mole.active && !mole.hit) {
        if (audioCtxRef.current) {
          playHitSound(audioCtxRef.current);
        }
        setScore((s) => s + 1);

        setTimeout(() => {
          setMoles((latest) =>
            latest.map((m) =>
              m.id === id ? { ...m, hit: false } : m,
            ),
          );
        }, 500);

        return current.map((m) =>
          m.id === id ? { ...m, active: false, hit: true } : m,
        );
      } else {
        if (audioCtxRef.current) {
          playMissSound(audioCtxRef.current);
        }
      }
      return current;
    });
  };

  if (isTimeUp) {
    return <TimeUpOverlay onExit={handleExit} />;
  }

  return (
    <div className="fixed inset-0 z-50 bg-stone-50 flex flex-col select-none overflow-hidden touch-none">
      {/* RWD Gameplay Background */}
      <img
        src={mobileBgImage}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover sm:hidden -z-10 pointer-events-none"
      />
      <img
        src={desktopBgImage}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover hidden sm:block -z-10 pointer-events-none"
      />

      {/* Start Screen Overlay */}
      {!hasStarted && (
        <div className="absolute inset-0 z-[60] bg-emerald-900 flex flex-col">
          <img
            src={mobileStartImage}
            alt="Start Game"
            className="absolute inset-0 w-full h-full object-cover sm:hidden"
          />
          <img
            src={desktopStartImage}
            alt="Start Game"
            className="absolute inset-0 w-full h-full object-cover hidden sm:block"
          />
          <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-4 left-4 z-20">
            <Button
              variant="secondary"
              onClick={handleExit}
              className="bg-white/80 backdrop-blur-sm text-stone-800 hover:bg-white rounded-full"
            >
              <ArrowLeft className="w-5 h-5 mr-1" /> 離開
            </Button>
          </div>
          <div className="absolute bottom-10 left-0 w-full flex justify-center z-20 px-8">
            <Button
              onClick={startGame}
              size="lg"
              className="w-full max-w-sm rounded-full bg-orange-500 hover:bg-orange-600 text-2xl py-6 sm:py-8 shadow-2xl border-4 border-white/30 font-bold text-white animate-bounce hover:scale-105 transition-transform duration-200"
            >
              開始遊戲
            </Button>
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-emerald-900/40 backdrop-blur-[1px] -z-10" />

      {/* Custom Hammer Cursor */}
      {showCursor && isPlaying && (
        <motion.div
          className="fixed pointer-events-none z-[100]"
          style={{
            x: mouseX,
            y: mouseY,
            left: 0,
            top: 0,
          }}
        >
          <motion.div
            className="w-32 h-32 origin-bottom-right"
            animate={{
              rotate: isHitting ? -60 : 0,
              x: isHitting ? -10 : 30,
              y: isHitting ? -10 : -50,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 20,
            }}
          >
            <img
              src={hammerImage}
              alt="hammer"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>
      )}

      {/* Header */}
      <div className="flex-none px-4 py-3 bg-white/90 backdrop-blur-md shadow-sm flex justify-between items-center z-20">
        <Button
          variant="ghost"
          onClick={handleExit}
          className="text-stone-500 hover:bg-stone-100 -ml-2"
        >
          <ArrowLeft className="w-5 h-5 mr-1" /> 離開
        </Button>
        <div className="flex gap-2">
          <Badge
            variant="outline"
            className={`px-3 py-1.5 text-base bg-white font-mono shadow-sm flex items-center ${timeLeft <= 10 ? "border-red-400 text-red-500" : "border-stone-200 text-stone-700"}`}
          >
            <Clock className="w-4 h-4 mr-1.5" />
            00:{timeLeft.toString().padStart(2, "0")}
          </Badge>
          <Badge
            variant="outline"
            className="px-3 py-1.5 text-base bg-white border-stone-200 shadow-sm text-stone-700 flex items-center"
          >
            <Target className="w-4 h-4 mr-1.5 text-orange-400" />
            得分: {score}
          </Badge>
          {hasStarted && !isGameOver && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setIsPlaying(false);
                setIsGameOver(true);
                stopBGM();
              }}
              className="rounded-full w-9 h-9"
              title="提早結束"
            >
              <RefreshCw className="w-4 h-4 text-stone-400" />
            </Button>
          )}
        </div>
      </div>

      {/* Main Game Area */}
      <div
        className={`flex-1 w-full flex flex-col items-center justify-center p-4 overflow-hidden relative z-10 ${showCursor && isPlaying ? "cursor-none" : ""}`}
        onPointerDown={(e) => {
          setIsHitting(true);
          if (isPlaying && audioCtxRef.current) {
            playMissSound(audioCtxRef.current);
          }
        }}
        onPointerUp={() => setIsHitting(false)}
        onPointerCancel={() => setIsHitting(false)}
        onMouseLeave={() => setIsHitting(false)}
      >
        {isGameOver ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-6 relative max-w-sm mx-auto bg-white/95 p-8 rounded-3xl shadow-xl backdrop-blur-sm"
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                animate={{
                  x: (Math.random() - 0.5) * 600,
                  y: (Math.random() - 0.5) * 600,
                  opacity: 0,
                  scale: Math.random() * 1.5 + 0.5,
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 2,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full pointer-events-none"
                style={{
                  backgroundColor: [
                    "#FFD700",
                    "#F97316",
                    "#40E0D0",
                    "#A78BFA",
                    "#10B981",
                  ][Math.floor(Math.random() * 5)],
                }}
              />
            ))}

            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto relative z-10">
              <Trophy className="w-12 h-12 text-yellow-500" />
            </div>

            <div className="relative z-10 space-y-4">
              <h2 className="text-3xl font-bold text-stone-800">
                時間到！
              </h2>
              <p className="text-stone-600">
                哇！你總共找到了{" "}
                <span className="text-3xl font-bold text-orange-500 mx-1">
                  {score}
                </span>{" "}
                隻小地鼠！
              </p>

              <div className="pt-4 flex gap-3 justify-center">
                <Button
                  onClick={handleExit}
                  variant="outline"
                  className="rounded-full px-6"
                >
                  回大廳
                </Button>
                <Button
                  onClick={startGame}
                  className="rounded-full px-6 bg-orange-500 hover:bg-orange-600 text-white shadow-sm hover:shadow"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />{" "}
                  再玩一次
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="w-full max-w-md flex flex-col items-center">
            <div className="grid grid-cols-3 gap-3 sm:gap-6 p-4 sm:p-6 bg-emerald-800/40 rounded-3xl backdrop-blur-md shadow-2xl border-4 border-emerald-900/50 w-full aspect-square">
              {moles.map((mole) => (
                <div
                  key={mole.id}
                  className="relative w-full h-full flex flex-col justify-end"
                  onPointerDown={(e) =>
                    handleMoleClick(mole.id, e)
                  }
                >
                  {/* Hole background */}
                  <div className="absolute bottom-0 w-full h-[40%] bg-stone-900/60 rounded-[100%] shadow-inner z-0" />

                  {/* Dirt mound edge */}
                  <div className="absolute bottom-0 w-full h-[45%] rounded-[100%] border-b-8 border-stone-800/80 z-20 pointer-events-none" />

                  {/* Mole Container */}
                  <div className="absolute bottom-[20%] w-full h-[80%] overflow-hidden z-10 flex justify-center items-end">
                    <AnimatePresence>
                      {(mole.active || mole.hit) && (
                        <motion.div
                          initial={{ y: "100%" }}
                          animate={{
                            y: mole.hit ? "20%" : "0%",
                          }}
                          exit={{ y: "100%" }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                          }}
                          className={`w-[80%] aspect-square pb-2 touch-manipulation origin-bottom flex items-center justify-center text-5xl sm:text-7xl select-none ${showCursor && isPlaying ? "cursor-none" : "cursor-pointer"}`}
                        >
                          {mole.hit ? "💥" : "🐹"}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-white/80 hover:text-white hover:bg-white/20 gap-1 rounded-full text-sm bg-black/20 backdrop-blur-sm border border-white/10"
                  >
                    <Lightbulb className="w-4 h-4" />
                    爸媽陪玩小撇步
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-sm rounded-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-orange-400" />
                      給爸媽的陪玩建議
                    </DialogTitle>
                    <DialogDescription className="pt-2 text-stone-600 leading-relaxed text-left">
                      這款遊戲能幫助 3-5
                      歲幼兒練習「專注力」與「手眼協調」。建議爸媽可以在旁邊用語氣給予回饋：「哇！小地鼠出來了！」「敲到了，好棒！」，增添遊戲的趣味與成就感喔！
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}