"use client";

import { useEffect, useMemo, useState } from "react";
import { Bot, RotateCcw, Swords, UserRound } from "lucide-react";

type Mark = "X" | "O";
type Cell = Mark | null;
type Mode = "computer" | "friend";
type Difficulty = "easy" | "hard";

const wins = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

function getResult(board: Cell[]) {
  for (const line of wins) {
    const [a,b,c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Mark, line };
    }
  }
  if (board.every(Boolean)) return { winner: "draw" as const, line: [] as number[] };
  return null;
}

function minimax(board: Cell[], maximizing: boolean): number {
  const end = getResult(board);
  if (end?.winner === "O") return 10;
  if (end?.winner === "X") return -10;
  if (end?.winner === "draw") return 0;

  const scores: number[] = [];
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      const next = [...board];
      next[i] = maximizing ? "O" : "X";
      scores.push(minimax(next, !maximizing));
    }
  }
  return maximizing ? Math.max(...scores) : Math.min(...scores);
}

function computerMove(board: Cell[], difficulty: Difficulty) {
  const open = board.map((v, i) => v ? -1 : i).filter(i => i >= 0);
  if (!open.length) return -1;
  if (difficulty === "easy") return open[Math.floor(Math.random() * open.length)];

  let bestScore = -Infinity;
  let best = open[0];
  for (const i of open) {
    const next = [...board];
    next[i] = "O";
    const score = minimax(next, false);
    if (score > bestScore) {
      bestScore = score;
      best = i;
    }
  }
  return best;
}

export default function TicTacToePage() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<Mark>("X");
  const [mode, setMode] = useState<Mode>("computer");
  const [difficulty, setDifficulty] = useState<Difficulty>("hard");
  const [player1, setPlayer1] = useState("Player 1");
  const [player2, setPlayer2] = useState("Player 2");
  const [scores, setScores] = useState({ x: 0, o: 0, draws: 0 });
  const [counted, setCounted] = useState(false);

  const result = useMemo(() => getResult(board), [board]);

  useEffect(() => {
    if (!result || counted) return;
    setCounted(true);
    if (result.winner === "X") setScores(s => ({ ...s, x: s.x + 1 }));
    else if (result.winner === "O") setScores(s => ({ ...s, o: s.o + 1 }));
    else setScores(s => ({ ...s, draws: s.draws + 1 }));
  }, [result, counted]);

  useEffect(() => {
    if (mode !== "computer" || turn !== "O" || result) return;
    const timer = window.setTimeout(() => {
      setBoard(current => {
        if (getResult(current)) return current;
        const move = computerMove(current, difficulty);
        if (move < 0) return current;
        const next = [...current];
        next[move] = "O";
        return next;
      });
      setTurn("X");
    }, 450);
    return () => window.clearTimeout(timer);
  }, [turn, mode, difficulty, result]);

  const play = (index: number) => {
    if (board[index] || result) return;
    if (mode === "computer" && turn === "O") return;
    const next = [...board];
    next[index] = turn;
    setBoard(next);
    setTurn(turn === "X" ? "O" : "X");
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setTurn("X");
    setCounted(false);
  };

  const newMatch = () => {
    resetBoard();
    setScores({ x: 0, o: 0, draws: 0 });
  };

  const playerOName = mode === "computer" ? "Computer" : player2;
  const status = result
    ? result.winner === "draw"
      ? "Draw game"
      : `${result.winner === "X" ? player1 : playerOName} wins!`
    : `${turn === "X" ? player1 : playerOName}'s turn`;

  return (
    <main className="ttt-page">
      <div className="ttt-wrap">
        <div className="ttt-topbar">
          <a href="/#games">← Back to Games</a>
          <span>Advanced browser edition</span>
        </div>

        <header className="ttt-hero">
          <div>
            <p className="section-kicker">PLAYABLE PROJECT</p>
            <h1>Tic-Tac-Toe Arena</h1>
            <p>Based on my original Java console game, now rebuilt with smarter gameplay, multiple modes, score tracking, and a modern interface.</p>
          </div>
        </header>

        <section className="ttt-panel">
          <div className="ttt-settings">
            <div className="ttt-mode-row">
              <button className={mode === "computer" ? "active" : ""} onClick={() => { setMode("computer"); newMatch(); }}>
                <Bot className="h-4 w-4" /> vs Computer
              </button>
              <button className={mode === "friend" ? "active" : ""} onClick={() => { setMode("friend"); newMatch(); }}>
                <UserRound className="h-4 w-4" /> vs Friend
              </button>
            </div>

            {mode === "computer" && (
              <div className="ttt-difficulty">
                <span>Difficulty</span>
                <button className={difficulty === "easy" ? "active" : ""} onClick={() => { setDifficulty("easy"); newMatch(); }}>Easy</button>
                <button className={difficulty === "hard" ? "active" : ""} onClick={() => { setDifficulty("hard"); newMatch(); }}>Hard</button>
              </div>
            )}

            <div className="ttt-names">
              <label>
                Player X
                <input value={player1} onChange={e => setPlayer1(e.target.value || "Player 1")} />
              </label>
              {mode === "friend" && (
                <label>
                  Player O
                  <input value={player2} onChange={e => setPlayer2(e.target.value || "Player 2")} />
                </label>
              )}
            </div>
          </div>

          <div className="ttt-scoreboard">
            <div><span>{player1}</span><strong>{scores.x}</strong><small>X</small></div>
            <div><span>Draws</span><strong>{scores.draws}</strong><small>—</small></div>
            <div><span>{playerOName}</span><strong>{scores.o}</strong><small>O</small></div>
          </div>

          <div className="ttt-status">
            <Swords className="h-5 w-5" />
            <strong>{status}</strong>
          </div>

          <div className="ttt-board" role="grid" aria-label="Tic Tac Toe board">
            {board.map((cell, i) => {
              const win = result?.line.includes(i);
              return (
                <button
                  key={i}
                  className={`ttt-cell ${cell ? `is-${cell.toLowerCase()}` : ""} ${win ? "winner" : ""}`}
                  onClick={() => play(i)}
                  aria-label={`Cell ${i + 1}`}
                >
                  {cell}
                </button>
              );
            })}
          </div>

          <div className="ttt-actions">
            <button onClick={resetBoard}><RotateCcw className="h-4 w-4" /> Next Round</button>
            <button onClick={newMatch}>New Match</button>
          </div>

          <p className="ttt-note">
            Hard mode uses a minimax strategy, so the computer plays strategically instead of choosing random squares.
          </p>
        </section>
      </div>
    </main>
  );
}
