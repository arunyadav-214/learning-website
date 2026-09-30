"use client";

import { useEffect, useMemo, useState } from "react";
import { Bot, RotateCcw, Users } from "lucide-react";

type Side = "lion" | "goat";
type Piece = Side | null;
type Mode = "computer" | "friend";
type Difficulty = "easy" | "medium" | "hard";
type Move = { from: number; to: number; capture?: number };

const nodes = [
  { x: 50, y: 7 }, { x: 27, y: 30 }, { x: 50, y: 30 }, { x: 73, y: 30 },
  { x: 15, y: 55 }, { x: 50, y: 55 }, { x: 85, y: 55 },
  { x: 50, y: 73 }, { x: 25, y: 92 }, { x: 75, y: 92 },
];

const edges: [number, number][] = [
  [0,1],[0,3],[1,2],[2,3],[1,5],[2,5],[3,5],
  [4,5],[5,6],[5,7],[7,8],[7,9],[8,9],
];

const captureTriples: [number, number, number][] = [
  [1,2,3],[3,2,1],[4,5,6],[6,5,4],
  [2,5,7],[7,5,2],[8,7,9],[9,7,8],
];

const initialBoard: Piece[] = [
  "lion", null, null, null, null, null, "goat", "goat", "goat", "goat",
];

function adjacent(a: number, b: number) {
  return edges.some(([x,y]) => (x === a && y === b) || (x === b && y === a));
}

function lionCaptures(board: Piece[], from: number) {
  return captureTriples
    .filter(([a, over, land]) => a === from && board[over] === "goat" && board[land] === null)
    .map(([, over, land]) => ({ over, land }));
}

function lionHasMove(board: Piece[]) {
  const lion = board.findIndex(p => p === "lion");
  if (lion < 0) return false;
  const step = edges.some(([a,b]) =>
    (a === lion && board[b] === null) || (b === lion && board[a] === null)
  );
  return step || lionCaptures(board, lion).length > 0;
}

function legalMoves(board: Piece[], side: Side) {
  const moves: Move[] = [];

  if (side === "lion") {
    const from = board.findIndex(p => p === "lion");
    if (from < 0) return moves;

    nodes.forEach((_, to) => {
      if (board[to] === null && adjacent(from, to)) moves.push({ from, to });
    });

    lionCaptures(board, from).forEach(({ over, land }) => {
      moves.push({ from, to: land, capture: over });
    });
    return moves;
  }

  board.forEach((piece, from) => {
    if (piece !== "goat") return;
    nodes.forEach((_, to) => {
      if (board[to] === null && adjacent(from, to)) moves.push({ from, to });
    });
  });

  return moves;
}

function applyMove(board: Piece[], move: Move, side: Side) {
  const next = [...board];
  next[move.from] = null;
  if (move.capture !== undefined) next[move.capture] = null;
  next[move.to] = side;
  return next;
}

function mobility(board: Piece[], side: Side) {
  return legalMoves(board, side).length;
}

function evaluateBoard(board: Piece[], computerSide: Side) {
  const lionMoves = mobility(board, "lion");
  const goatMoves = mobility(board, "goat");
  const goatsLeft = board.filter(p => p === "goat").length;

  if (lionMoves === 0) return computerSide === "goat" ? 1000 : -1000;
  if (goatsLeft < 4) return computerSide === "lion" ? 1000 : -1000;

  if (computerSide === "lion") {
    return lionMoves * 12 - goatMoves * 2;
  }

  return goatMoves * 2 - lionMoves * 14;
}

function minimax(
  board: Piece[],
  sideToMove: Side,
  computerSide: Side,
  depth: number,
  alpha: number,
  beta: number
): number {
  const lionMoves = legalMoves(board, "lion");
  const goatsLeft = board.filter(p => p === "goat").length;

  if (lionMoves.length === 0 || goatsLeft < 4 || depth === 0) {
    return evaluateBoard(board, computerSide);
  }

  const moves = legalMoves(board, sideToMove);
  if (!moves.length) return evaluateBoard(board, computerSide);

  const maximizing = sideToMove === computerSide;
  let best = maximizing ? -Infinity : Infinity;

  for (const move of moves) {
    if (sideToMove === "lion" && move.capture !== undefined) {
      const score = computerSide === "lion" ? 1000 : -1000;
      best = maximizing ? Math.max(best, score) : Math.min(best, score);
    } else {
      const next = applyMove(board, move, sideToMove);
      const nextSide: Side = sideToMove === "lion" ? "goat" : "lion";
      const score = minimax(next, nextSide, computerSide, depth - 1, alpha, beta);
      best = maximizing ? Math.max(best, score) : Math.min(best, score);
    }

    if (maximizing) {
      alpha = Math.max(alpha, best);
    } else {
      beta = Math.min(beta, best);
    }
    if (beta <= alpha) break;
  }

  return best;
}

function chooseComputerMove(
  board: Piece[],
  computerSide: Side,
  difficulty: Difficulty
) {
  const moves = legalMoves(board, computerSide);
  if (!moves.length) return null;

  if (difficulty === "easy") {
    return moves[Math.floor(Math.random() * moves.length)];
  }

  if (computerSide === "lion") {
    const captures = moves.filter(m => m.capture !== undefined);
    if (captures.length) return captures[Math.floor(Math.random() * captures.length)];
  } else {
    const traps = moves.filter(move => {
      const next = applyMove(board, move, "goat");
      return !lionHasMove(next);
    });
    if (traps.length) return traps[Math.floor(Math.random() * traps.length)];
  }

  if (difficulty === "medium") {
    return moves[Math.floor(Math.random() * moves.length)];
  }

  let bestScore = -Infinity;
  let bestMoves: Move[] = [];

  for (const move of moves) {
    const next = applyMove(board, move, computerSide);
    const nextSide: Side = computerSide === "lion" ? "goat" : "lion";
    const score = minimax(next, nextSide, computerSide, 5, -Infinity, Infinity);

    if (score > bestScore) {
      bestScore = score;
      bestMoves = [move];
    } else if (score === bestScore) {
      bestMoves.push(move);
    }
  }

  return bestMoves[Math.floor(Math.random() * bestMoves.length)];
}

export default function LionGoatPage() {
  const [board, setBoard] = useState<Piece[]>(initialBoard);
  const [turn, setTurn] = useState<Side>("goat");
  const [selected, setSelected] = useState<number | null>(null);
  const [winner, setWinner] = useState<Side | null>(null);
  const [message, setMessage] = useState("Goats move first.");
  const [mode, setMode] = useState<Mode>("computer");
  const [humanSide, setHumanSide] = useState<Side>("goat");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [thinking, setThinking] = useState(false);

  const computerSide: Side = humanSide === "goat" ? "lion" : "goat";
  const computerTurn = mode === "computer" && turn === computerSide && !winner;

  function resetGame(nextHumanSide = humanSide, nextMode = mode) {
    setBoard(initialBoard);
    setTurn("goat");
    setSelected(null);
    setWinner(null);
    setThinking(false);
    setMessage(
      nextMode === "computer" && nextHumanSide === "lion"
        ? "Computer goats move first."
        : "Goats move first."
    );
  }

  const validTargets = useMemo(() => {
    if (selected === null || winner) return [] as number[];
    if (board[selected] === "goat" && turn === "goat") {
      return nodes.map((_,i) => i).filter(i => board[i] === null && adjacent(selected, i));
    }
    if (board[selected] === "lion" && turn === "lion") {
      const steps = nodes.map((_,i) => i).filter(i => board[i] === null && adjacent(selected, i));
      const jumps = lionCaptures(board, selected).map(c => c.land);
      return [...new Set([...steps, ...jumps])];
    }
    return [];
  }, [selected, board, turn, winner]);

  function finishMove(next: Piece[], moving: Side, captured = false) {
    setBoard(next);
    setSelected(null);

    if (captured) {
      setWinner("lion");
      setMessage("Lion captured a goat and wins.");
      return;
    }

    if (moving === "goat") {
      if (!lionHasMove(next)) {
        setWinner("goat");
        setMessage("The lion is trapped. Goats win!");
        return;
      }
      setTurn("lion");
      setMessage(mode === "computer" && computerSide === "lion" ? "Computer lion is thinking…" : "Lion's turn.");
    } else {
      setTurn("goat");
      setMessage(mode === "computer" && computerSide === "goat" ? "Computer goats are thinking…" : "Goats' turn.");
    }
  }

  function makeMove(from: number, to: number) {
    const next = [...board];
    const moving = next[from] as Side;
    next[from] = null;

    if (moving === "lion") {
      const capture = lionCaptures(board, from).find(c => c.land === to);
      if (capture) {
        next[capture.over] = null;
        next[to] = "lion";
        finishMove(next, moving, true);
        return;
      }
    }

    next[to] = moving;
    finishMove(next, moving, false);
  }

  function choose(index: number) {
    if (winner || thinking || computerTurn) return;
    const piece = board[index];

    if (piece === turn) {
      if (mode === "computer" && piece !== humanSide) return;
      setSelected(index);
      setMessage(turn === "goat" ? "Choose an adjacent empty point." : "Move or jump over a goat to capture.");
      return;
    }

    if (selected === null || !validTargets.includes(index)) return;
    makeMove(selected, index);
  }

  useEffect(() => {
    if (!computerTurn) return;

    setThinking(true);
    const timer = window.setTimeout(() => {
      const moves = legalMoves(board, computerSide);

      if (!moves.length) {
        if (computerSide === "lion") {
          setWinner("goat");
          setMessage("The lion is trapped. Goats win!");
        }
        setThinking(false);
        return;
      }

      const move = chooseComputerMove(board, computerSide, difficulty);
      if (!move) {
        setThinking(false);
        return;
      }

      const next = [...board];
      const moving = next[move.from] as Side;
      next[move.from] = null;

      if (move.capture !== undefined) {
        next[move.capture] = null;
        next[move.to] = "lion";
        setBoard(next);
        setSelected(null);
        setWinner("lion");
        setMessage("Computer lion captured a goat and wins.");
        setThinking(false);
        return;
      }

      next[move.to] = moving;
      setBoard(next);
      setSelected(null);

      if (moving === "goat") {
        if (!lionHasMove(next)) {
          setWinner("goat");
          setMessage("Computer goats trapped the lion. Goats win!");
        } else {
          setTurn("lion");
          setMessage("Your turn — Lion.");
        }
      } else {
        setTurn("goat");
        setMessage("Your turn — Goats.");
      }

      setThinking(false);
    }, 650);

    return () => window.clearTimeout(timer);
  }, [computerTurn, board, computerSide, difficulty]);

  return (
    <main className="lion-goat-page">
      <div className="lion-goat-wrap">
        <div className="lion-goat-topbar">
          <a href="/#games">← Back to Games</a>
          <span>Traditional hunt game</span>
        </div>

        <header className="lion-goat-hero">
          <p className="section-kicker">PLAYABLE TRADITIONAL GAME</p>
          <h1>Lion & Goats</h1>
          <p>Trap the lion with four goats — or escape and capture a goat as the lion.</p>
        </header>

        <section className="lion-goat-shell">
          <div className="lion-goat-modes">
            <div className="lion-goat-mode-row">
              <button
                className={mode === "computer" ? "active" : ""}
                onClick={() => { setMode("computer"); resetGame(humanSide, "computer"); }}
              >
                <Bot className="h-4 w-4" /> Play vs Computer
              </button>
              <button
                className={mode === "friend" ? "active" : ""}
                onClick={() => { setMode("friend"); resetGame(humanSide, "friend"); }}
              >
                <Users className="h-4 w-4" /> 2 Players
              </button>
            </div>

            {mode === "computer" && (
              <>
                <div className="lion-goat-side-row">
                  <span>Play as</span>
                  <button
                    className={humanSide === "goat" ? "active" : ""}
                    onClick={() => { setHumanSide("goat"); resetGame("goat", "computer"); }}
                  >
                    🐐 Goats
                  </button>
                  <button
                    className={humanSide === "lion" ? "active" : ""}
                    onClick={() => { setHumanSide("lion"); resetGame("lion", "computer"); }}
                  >
                    🦁 Lion
                  </button>
                </div>

                <div className="lion-goat-difficulty-row">
                  <span>Difficulty</span>
                  {(["easy", "medium", "hard"] as Difficulty[]).map(level => (
                    <button
                      key={level}
                      className={difficulty === level ? "active" : ""}
                      onClick={() => {
                        setDifficulty(level);
                        resetGame(humanSide, "computer");
                      }}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="lion-goat-status">
            <div>
              <span>Turn</span>
              <strong>{winner ? "Game over" : thinking ? "Computer" : turn === "goat" ? "Goats" : "Lion"}</strong>
            </div>
            <p>{message}</p>
            <button onClick={() => resetGame()}><RotateCcw className="h-4 w-4" /> Restart</button>
          </div>

          <div className="lion-goat-board" aria-label="Lion and Goats game board">
            <svg viewBox="0 0 100 100" className="lion-goat-lines" aria-hidden="true">
              {edges.map(([a,b]) => (
                <line
                  key={a + "-" + b}
                  x1={nodes[a].x}
                  y1={nodes[a].y}
                  x2={nodes[b].x}
                  y2={nodes[b].y}
                />
              ))}
            </svg>

            {nodes.map((node, i) => {
              const piece = board[i];
              const selectable =
                piece === turn &&
                !winner &&
                !thinking &&
                !(mode === "computer" && piece !== humanSide);
              const target = validTargets.includes(i) && !computerTurn;

              return (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  className={
                    "lion-goat-node " +
                    (selected === i ? "selected " : "") +
                    (target ? "target " : "") +
                    (piece ? "occupied " : "")
                  }
                  style={{ left: node.x + "%", top: node.y + "%" }}
                  aria-label={
                    piece === "lion" ? "Lion" :
                    piece === "goat" ? "Goat" :
                    "Empty point"
                  }
                >
                  {piece === "lion" ? <span className="lion-piece">🦁</span> :
                   piece === "goat" ? <span className="goat-piece">🐐</span> :
                   <span className="empty-dot">•</span>}
                  {selectable && <span className="piece-ring" />}
                </button>
              );
            })}

            {winner && (
              <div className="lion-goat-overlay">
                <h2>{winner === "lion" ? "🦁 Lion Wins!" : "🐐 Goats Win!"}</h2>
                <p>{winner === "lion" ? "The lion captured a goat." : "The lion has no legal move."}</p>
                <button onClick={() => resetGame()}>Play Again</button>
              </div>
            )}
          </div>

          <div className="lion-goat-rules">
            <h2>Rules</h2>
            <ol>
              <li>There is one lion and four goats. The goats move first.</li>
              <li>On a normal turn, move one piece along a connected line to an adjacent empty point.</li>
              <li>The lion may capture by jumping over a goat to the empty point directly beyond it on an allowed line.</li>
              <li>The goats win if they block every legal move of the lion.</li>
              <li>The lion wins after capturing one goat in this Sher Bakr-style version.</li>
            </ol>
          </div>
        </section>
      </div>
    </main>
  );
}
