"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

const GAME_W = 880;
const GAME_H = 560;
const STEP = 20;
const START_TIME = 45;
const LEVEL_TIME_BONUS = 12;
const BASE_BANANAS = 5;
const BANANAS_PER_LEVEL = 2;
const MONKEY_SIZE = 52;
const BANANA_SIZE = 34;
const OBSTACLE_R = 18;

type Point = { id: number; x: number; y: number };
type Obstacle = Point & { vx: number; vy: number };

function distance(x1: number, y1: number, x2: number, y2: number) {
  return Math.hypot(x1 - x2, y1 - y2);
}

export default function CuriousMonkeyAdventurePage() {
  const [monkey, setMonkey] = useState({ x: (GAME_W - MONKEY_SIZE) / 2, y: (GAME_H - MONKEY_SIZE) / 2 });
  const [bananas, setBananas] = useState<Point[]>([]);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(START_TIME);
  const [gameOver, setGameOver] = useState(false);
  const [hitFlash, setHitFlash] = useState(false);
  const lastHitRef = useRef(0);
  const nextId = useRef(1);

  const playTone = useCallback((frequency: number, duration = 0.08) => {
    try {
      const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = frequency;
      gain.gain.value = 0.04;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.stop(ctx.currentTime + duration);
    } catch {}
  }, []);

  const makeBananas = useCallback((count: number, monkeyPos: {x:number;y:number}) => {
    const items: Point[] = [];
    for (let i = 0; i < count; i++) {
      let x = 0, y = 0, tries = 0;
      do {
        x = Math.random() * (GAME_W - BANANA_SIZE);
        y = Math.random() * (GAME_H - BANANA_SIZE);
        tries++;
      } while (tries < 20 && distance(x, y, monkeyPos.x, monkeyPos.y) < 90);
      items.push({ id: nextId.current++, x, y });
    }
    return items;
  }, []);

  const makeObstacles = useCallback((count: number, lvl: number, monkeyPos: {x:number;y:number}) => {
    const items: Obstacle[] = [];
    for (let i = 0; i < count; i++) {
      let x = 0, y = 0, tries = 0;
      do {
        x = OBSTACLE_R + Math.random() * (GAME_W - OBSTACLE_R * 2);
        y = OBSTACLE_R + Math.random() * (GAME_H - OBSTACLE_R * 2);
        tries++;
      } while (tries < 20 && distance(x, y, monkeyPos.x, monkeyPos.y) < 140);
      const speed = 1.5 + lvl * 0.4;
      items.push({
        id: nextId.current++,
        x, y,
        vx: (Math.random() < 0.5 ? -1 : 1) * speed,
        vy: (Math.random() < 0.5 ? -1 : 1) * speed,
      });
    }
    return items;
  }, []);

  const startLevel = useCallback((lvl: number, monkeyPos: {x:number;y:number}) => {
    setBananas(makeBananas(BASE_BANANAS + (lvl - 1) * BANANAS_PER_LEVEL, monkeyPos));
    setObstacles(makeObstacles(Math.max(0, lvl - 1), lvl, monkeyPos));
  }, [makeBananas, makeObstacles]);

  const restart = useCallback(() => {
    const center = { x: (GAME_W - MONKEY_SIZE) / 2, y: (GAME_H - MONKEY_SIZE) / 2 };
    setMonkey(center);
    setScore(0);
    setLevel(1);
    setTimeLeft(START_TIME);
    setGameOver(false);
    setHitFlash(false);
    lastHitRef.current = 0;
    setBananas(makeBananas(BASE_BANANAS, center));
    setObstacles([]);
  }, [makeBananas]);

  useEffect(() => { restart(); }, [restart]);

  useEffect(() => {
    if (gameOver) return;
    const timer = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [gameOver]);

  useEffect(() => {
    if (gameOver || obstacles.length === 0) return;
    let frame = 0;
    const tick = () => {
      setObstacles((items) => items.map((o) => {
        let nx = o.x + o.vx, ny = o.y + o.vy, vx = o.vx, vy = o.vy;
        if (nx < OBSTACLE_R || nx > GAME_W - OBSTACLE_R) {
          vx = -vx;
          nx = Math.max(OBSTACLE_R, Math.min(GAME_W - OBSTACLE_R, nx));
        }
        if (ny < OBSTACLE_R || ny > GAME_H - OBSTACLE_R) {
          vy = -vy;
          ny = Math.max(OBSTACLE_R, Math.min(GAME_H - OBSTACLE_R, ny));
        }
        return { ...o, x: nx, y: ny, vx, vy };
      }));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [gameOver, obstacles.length]);

  useEffect(() => {
    if (gameOver) return;
    const now = Date.now();
    const monkeyCx = monkey.x + MONKEY_SIZE / 2;
    const monkeyCy = monkey.y + MONKEY_SIZE / 2;
    const hit = obstacles.some((o) => distance(monkeyCx, monkeyCy, o.x, o.y) < MONKEY_SIZE * 0.42 + OBSTACLE_R);
    if (hit && now - lastHitRef.current >= 1000) {
      lastHitRef.current = now;
      setTimeLeft((t) => {
        const next = Math.max(0, t - 5);
        if (next === 0) setGameOver(true);
        return next;
      });
      setHitFlash(true);
      playTone(140, 0.12);
      window.setTimeout(() => setHitFlash(false), 420);
    }
  }, [monkey, obstacles, gameOver, playTone]);

  const collectAt = useCallback((x: number, y: number) => {
    setBananas((items) => {
      let collected = 0;
      const remaining = items.filter((b) => {
        const overlaps = x < b.x + BANANA_SIZE && x + MONKEY_SIZE > b.x && y < b.y + BANANA_SIZE && y + MONKEY_SIZE > b.y;
        if (overlaps) collected++;
        return !overlaps;
      });
      if (collected) {
        setScore((s) => s + collected);
        playTone(660, 0.1);
      }
      if (items.length > 0 && remaining.length === 0) {
        window.setTimeout(() => {
          setLevel((current) => {
            const nextLevel = current + 1;
            setTimeLeft((t) => t + LEVEL_TIME_BONUS);
            startLevel(nextLevel, { x, y });
            return nextLevel;
          });
        }, 180);
      }
      return remaining;
    });
  }, [playTone, startLevel]);

  const moveMonkey = useCallback((dx: number, dy: number) => {
    if (gameOver) return;
    setMonkey((m) => {
      const next = {
        x: Math.max(0, Math.min(GAME_W - MONKEY_SIZE, m.x + dx)),
        y: Math.max(0, Math.min(GAME_H - MONKEY_SIZE, m.y + dy)),
      };
      window.setTimeout(() => collectAt(next.x, next.y), 0);
      return next;
    });
    playTone(250, 0.035);
  }, [collectAt, gameOver, playTone]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) event.preventDefault();
      if (event.key === "ArrowUp") moveMonkey(0, -STEP);
      if (event.key === "ArrowDown") moveMonkey(0, STEP);
      if (event.key === "ArrowLeft") moveMonkey(-STEP, 0);
      if (event.key === "ArrowRight") moveMonkey(STEP, 0);
    };
    window.addEventListener("keydown", onKey, { passive: false });
    return () => window.removeEventListener("keydown", onKey);
  }, [moveMonkey]);

  return (
    <main className="monkey-page">
      <div className="monkey-page-inner">
        <div className="monkey-topline">
          <a href="/#games" className="monkey-back">← Back to Games</a>
          <span>Original JavaFX assignment → browser edition</span>
        </div>

        <div className="monkey-heading">
          <div>
            <p className="section-kicker">PLAYABLE PROJECT</p>
            <h1>Curious Monkey Adventure</h1>
            <p>Collect every banana before time runs out. New levels add more bananas and moving coconut obstacles.</p>
          </div>
          <button className="monkey-restart" onClick={restart}>
            <RotateCcw className="h-4 w-4" /> Restart
          </button>
        </div>

        <section className="monkey-game-shell">
          <div className="monkey-hud">
            <div><span>Score</span><strong>{score}</strong></div>
            <div><span>Time Left</span><strong>{timeLeft}s</strong></div>
            <div><span>Level</span><strong>{level}</strong></div>
          </div>

          <div className="monkey-stage-wrap">
            <div className="monkey-stage">
              <div
                className={`monkey-player ${hitFlash ? "monkey-hit" : ""}`}
                style={{ left: `${(monkey.x / GAME_W) * 100}%`, top: `${(monkey.y / GAME_H) * 100}%` }}
                aria-label="Monkey"
              >🐒</div>

              {bananas.map((b) => (
                <div
                  key={b.id}
                  className="monkey-banana"
                  style={{ left: `${(b.x / GAME_W) * 100}%`, top: `${(b.y / GAME_H) * 100}%` }}
                >🍌</div>
              ))}

              {obstacles.map((o) => (
                <div
                  key={o.id}
                  className="monkey-obstacle"
                  style={{ left: `${(o.x / GAME_W) * 100}%`, top: `${(o.y / GAME_H) * 100}%` }}
                >🥥</div>
              ))}

              {gameOver && (
                <div className="monkey-overlay">
                  <h2>GAME OVER</h2>
                  <p>Score: {score} · Level {level}</p>
                  <button onClick={restart}>Play again</button>
                </div>
              )}
            </div>
          </div>

          <div className="monkey-controls">
            <button onClick={() => moveMonkey(-STEP, 0)}>◀ Left</button>
            <button onClick={() => moveMonkey(0, -STEP)}>▲ Up</button>
            <button onClick={() => moveMonkey(0, STEP)}>▼ Down</button>
            <button onClick={() => moveMonkey(STEP, 0)}>▶ Right</button>
            <button onClick={() => playTone(420, 0.08)}>🔍 Search</button>
            <button onClick={restart}>↺ Restart</button>
          </div>
        </section>

        <div className="monkey-instructions">
          <strong>How to play:</strong> Use your keyboard arrow keys or the buttons. Collect bananas to score points. Starting at level 2, avoid moving coconuts — each hit costs 5 seconds.
        </div>
      </div>
    </main>
  );
}
