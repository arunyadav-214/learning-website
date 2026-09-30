"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";

type Side = "lion" | "goat";
type Piece = Side | null;

const nodes = [
  { x: 50, y: 7 },   // 0 top
  { x: 27, y: 30 },  // 1 upper-left
  { x: 50, y: 30 },  // 2 upper-center
  { x: 73, y: 30 },  // 3 upper-right
  { x: 15, y: 55 },  // 4 middle-left
  { x: 50, y: 55 },  // 5 middle-center
  { x: 85, y: 55 },  // 6 middle-right
  { x: 50, y: 73 },  // 7 lower-center
  { x: 25, y: 92 },  // 8 lower-left
  { x: 75, y: 92 },  // 9 lower-right
];

const edges: [number, number][] = [
  [0,1],[0,3],
  [1,2],[2,3],
  [1,5],[2,5],[3,5],
  [4,5],[5,6],
  [5,7],
  [7,8],[7,9],
  [8,9],
];

const captureTriples: [number, number, number][] = [
  [1,2,3],
  [3,2,1],
  [4,5,6],
  [6,5,4],
  [2,5,7],
  [7,5,2],
  [8,7,9],
  [9,7,8],
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
  const step = edges.some(([a,b]) => (a === lion && board[b] === null) || (b === lion && board[a] === null));
  return step || lionCaptures(board, lion).length > 0;
}

export default function LionGoatPage() {
  const [board, setBoard] = useState<Piece[]>(initialBoard);
  const [turn, setTurn] = useState<Side>("goat");
  const [selected, setSelected] = useState<number | null>(null);
  const [winner, setWinner] = useState<Side | null>(null);
  const [message, setMessage] = useState("Goats move first.");

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

  function restart() {
    setBoard(initialBoard);
    setTurn("goat");
    setSelected(null);
    setWinner(null);
    setMessage("Goats move first.");
  }

  function choose(index: number) {
    if (winner) return;
    const piece = board[index];

    if (piece === turn) {
      setSelected(index);
      setMessage(turn === "goat" ? "Choose an adjacent empty point." : "Move or jump over a goat to capture.");
      return;
    }

    if (selected === null || !validTargets.includes(index)) return;

    const next = [...board];
    const moving = next[selected];
    next[selected] = null;

    if (moving === "lion") {
      const capture = lionCaptures(board, selected).find(c => c.land === index);
      if (capture) {
        next[capture.over] = null;
        next[index] = "lion";
        setBoard(next);
        setSelected(null);
        setWinner("lion");
        setMessage("Lion captured a goat and wins.");
        return;
      }
    }

    next[index] = moving;
    setBoard(next);
    setSelected(null);

    if (moving === "goat") {
      if (!lionHasMove(next)) {
        setWinner("goat");
        setMessage("The lion is trapped. Goats win!");
        return;
      }
      setTurn("lion");
      setMessage("Lion's turn.");
    } else {
      setTurn("goat");
      setMessage("Goats' turn.");
    }
  }

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
          <p>
            Trap the lion with four goats — or escape and capture a goat as the lion.
          </p>
        </header>

        <section className="lion-goat-shell">
          <div className="lion-goat-status">
            <div>
              <span>Turn</span>
              <strong>{winner ? "Game over" : turn === "goat" ? "Goats" : "Lion"}</strong>
            </div>
            <p>{message}</p>
            <button onClick={restart}><RotateCcw className="h-4 w-4" /> Restart</button>
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
              const selectable = piece === turn && !winner;
              const target = validTargets.includes(i);
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
                <button onClick={restart}>Play Again</button>
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
