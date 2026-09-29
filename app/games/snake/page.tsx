"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";

type Point = { x: number; y: number };
type Direction = "up" | "down" | "left" | "right";
type SpeedLevel = "slow" | "normal" | "fast" | "expert";

const SPEED_LEVELS: Record<SpeedLevel, { label: string; base: number; min: number; step: number }> = {
  slow: { label: "Slow", base: 320, min: 210, step: 8 },
  normal: { label: "Normal", base: 220, min: 130, step: 10 },
  fast: { label: "Fast", base: 150, min: 85, step: 10 },
  expert: { label: "Expert", base: 105, min: 60, step: 8 },
};

const GRID = 18;
const START_SNAKE: Point[] = [
  { x: 8, y: 9 },
  { x: 7, y: 9 },
  { x: 6, y: 9 },
];

function same(a: Point, b: Point) {
  return a.x === b.x && a.y === b.y;
}

function randomFood(snake: Point[]): Point {
  const open: Point[] = [];
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      if (!snake.some((p) => p.x === x && p.y === y)) open.push({ x, y });
    }
  }
  return open[Math.floor(Math.random() * open.length)] ?? { x: 2, y: 2 };
}

export default function SnakeGamePage() {
  const [snake, setSnake] = useState<Point[]>(START_SNAKE);
  const [food, setFood] = useState<Point>({ x: 13, y: 9 });
  const [direction, setDirection] = useState<Direction>("right");
  const directionRef = useRef<Direction>("right");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [running, setRunning] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [speedLevel, setSpeedLevel] = useState<SpeedLevel>("slow");

  const speedConfig = SPEED_LEVELS[speedLevel];
  const speed = Math.max(
    speedConfig.min,
    speedConfig.base - Math.floor(score / 6) * speedConfig.step
  );

  const restart = useCallback(() => {
    setSnake(START_SNAKE);
    setFood({ x: 13, y: 9 });
    directionRef.current = "right";
    setDirection("right");
    setScore(0);
    setRunning(true);
    setGameOver(false);
  }, []);

  const changeDirection = useCallback((next: Direction) => {
    const current = directionRef.current;
    if (
      (current === "up" && next === "down") ||
      (current === "down" && next === "up") ||
      (current === "left" && next === "right") ||
      (current === "right" && next === "left")
    ) return;
    directionRef.current = next;
    setDirection(next);
  }, []);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(e.key)) e.preventDefault();
      if (e.key === "ArrowUp" || e.key.toLowerCase() === "w") changeDirection("up");
      if (e.key === "ArrowDown" || e.key.toLowerCase() === "s") changeDirection("down");
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") changeDirection("left");
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") changeDirection("right");
      if (e.key === " ") setRunning((r) => !r);
    };
    window.addEventListener("keydown", key, { passive: false });
    return () => window.removeEventListener("keydown", key);
  }, [changeDirection]);

  useEffect(() => {
    if (!running || gameOver) return;

    const timer = window.setInterval(() => {
      setSnake((current) => {
        const head = current[0];
        const dir = directionRef.current;
        const next: Point = {
          x: head.x + (dir === "right" ? 1 : dir === "left" ? -1 : 0),
          y: head.y + (dir === "down" ? 1 : dir === "up" ? -1 : 0),
        };

        const hitWall = next.x < 0 || next.x >= GRID || next.y < 0 || next.y >= GRID;
        const hitSelf = current.some((p, i) => i !== current.length - 1 && same(p, next));

        if (hitWall || hitSelf) {
          setGameOver(true);
          setRunning(false);
          setBest((b) => Math.max(b, score));
          return current;
        }

        const ate = same(next, food);
        const updated = [next, ...current];

        if (ate) {
          setScore((s) => {
            const nextScore = s + 1;
            setBest((b) => Math.max(b, nextScore));
            return nextScore;
          });
          setFood(randomFood(updated));
          return updated;
        }

        updated.pop();
        return updated;
      });
    }, speed);

    return () => window.clearInterval(timer);
  }, [running, gameOver, food, speed, score]);

  const cells = Array.from({ length: GRID * GRID }, (_, i) => ({
    x: i % GRID,
    y: Math.floor(i / GRID),
  }));

  return (
    <main className="snake-page">
      <div className="snake-wrap">
        <div className="snake-topbar">
          <a href="/#games">← Back to Games</a>
          <span>Browser arcade game</span>
        </div>

        <header className="snake-hero">
          <div>
            <p className="section-kicker">PLAYABLE GAME</p>
            <h1>Neon Snake</h1>
            <p>Eat the fruit, grow longer, and survive as the game speeds up.</p>
          </div>
        </header>

        <section className="snake-panel">
          <div className="snake-hud">
            <div><span>Score</span><strong>{score}</strong></div>
            <div><span>Best</span><strong>{best}</strong></div>
            <div><span>Speed</span><strong>{speedConfig.label}</strong></div>
          </div>

          <div className="snake-speed-picker" aria-label="Choose snake speed">
            <span className="snake-speed-label">Choose speed</span>
            <div className="snake-speed-options">
              {(Object.keys(SPEED_LEVELS) as SpeedLevel[]).map((level) => (
                <button
                  key={level}
                  className={speedLevel === level ? "active" : ""}
                  onClick={() => {
                    setSpeedLevel(level);
                    restart();
                  }}
                >
                  {SPEED_LEVELS[level].label}
                </button>
              ))}
            </div>
            <p>
              Slow is best for beginners. The snake still gets a little faster as your score grows.
            </p>
          </div>

          <div className="snake-board" role="grid" aria-label="Snake game board">
            {cells.map((cell) => {
              const snakeIndex = snake.findIndex((p) => same(p, cell));
              const isHead = snakeIndex === 0;
              const isSnake = snakeIndex >= 0;
              const isFood = same(food, cell);
              return (
                <div
                  key={`${cell.x}-${cell.y}`}
                  className={`snake-cell ${isSnake ? "snake-body" : ""} ${isHead ? "snake-head" : ""} ${isFood ? "snake-food" : ""}`}
                />
              );
            })}

            {gameOver && (
              <div className="snake-overlay">
                <h2>Game Over</h2>
                <p>Score: {score}</p>
                <button onClick={restart}>Play Again</button>
              </div>
            )}
          </div>

          <div className="snake-actions">
            <button onClick={() => setRunning((r) => !r)} disabled={gameOver}>
              {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {running ? "Pause" : "Resume"}
            </button>
            <button onClick={restart}>
              <RotateCcw className="h-4 w-4" /> Restart
            </button>
          </div>

          <div className="snake-dpad" aria-label="Mobile controls">
            <span />
            <button onClick={() => changeDirection("up")}>▲</button>
            <span />
            <button onClick={() => changeDirection("left")}>◀</button>
            <button onClick={() => changeDirection("down")}>▼</button>
            <button onClick={() => changeDirection("right")}>▶</button>
          </div>

          <p className="snake-note">
            Use Arrow Keys or WASD on desktop. On mobile, use the direction buttons. Press Space to pause.
          </p>
        </section>
      </div>
    </main>
  );
}
