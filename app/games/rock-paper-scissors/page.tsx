"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";

type Choice = "Rock" | "Paper" | "Scissors";

const choices: { name: Choice; emoji: string }[] = [
  { name: "Rock", emoji: "✊" },
  { name: "Paper", emoji: "✋" },
  { name: "Scissors", emoji: "✌️" },
];

function winner(user: Choice, computer: Choice) {
  if (user === computer) return "tie" as const;
  if (
    (user === "Rock" && computer === "Scissors") ||
    (user === "Paper" && computer === "Rock") ||
    (user === "Scissors" && computer === "Paper")
  ) return "win" as const;
  return "loss" as const;
}

export default function RockPaperScissorsPage() {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [ties, setTies] = useState(0);
  const [userChoice, setUserChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [message, setMessage] = useState("Choose Rock, Paper, or Scissors.");

  function play(choice: Choice) {
    const computer = choices[Math.floor(Math.random() * choices.length)].name;
    const result = winner(choice, computer);

    setUserChoice(choice);
    setComputerChoice(computer);

    if (result === "win") {
      setWins((n) => n + 1);
      setMessage("You win!");
    } else if (result === "loss") {
      setLosses((n) => n + 1);
      setMessage("Computer wins!");
    } else {
      setTies((n) => n + 1);
      setMessage("It is a tie!");
    }
  }

  function reset() {
    setWins(0);
    setLosses(0);
    setTies(0);
    setUserChoice(null);
    setComputerChoice(null);
    setMessage("Choose Rock, Paper, or Scissors.");
  }

  const emojiFor = (choice: Choice | null) =>
    choices.find((item) => item.name === choice)?.emoji ?? "❔";

  return (
    <main className="min-h-screen bg-[#080b12] px-4 py-8 text-white">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400">
          <a href="/#games" className="font-bold text-white">← Back to Games</a>
          <span>Player vs Computer</span>
        </div>

        <header className="mb-6">
          <p className="text-xs font-black tracking-[0.18em] text-violet-400">PLAYABLE GAME</p>
          <h1 className="mt-2 text-5xl font-black tracking-[-0.05em] sm:text-7xl">Rock Paper Scissors</h1>
          <p className="mt-3 max-w-2xl text-slate-400">Choose your move. The computer randomly chooses Rock, Paper, or Scissors.</p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-[#111722] p-4 sm:p-6">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-[#171f2d] p-4 text-center">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">Wins</span>
              <strong className="mt-1 block text-3xl">{wins}</strong>
            </div>
            <div className="rounded-2xl bg-[#171f2d] p-4 text-center">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">Losses</span>
              <strong className="mt-1 block text-3xl">{losses}</strong>
            </div>
            <div className="rounded-2xl bg-[#171f2d] p-4 text-center">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">Ties</span>
              <strong className="mt-1 block text-3xl">{ties}</strong>
            </div>
          </div>

          <div className="my-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-[#171f2d] p-5 text-center">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">You</span>
              <div className="my-3 text-6xl">{emojiFor(userChoice)}</div>
              <strong>{userChoice ?? "Waiting"}</strong>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#171f2d] p-5 text-center">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">Computer</span>
              <div className="my-3 text-6xl">{emojiFor(computerChoice)}</div>
              <strong>{computerChoice ?? "Waiting"}</strong>
            </div>
          </div>

          <div className="mb-5 rounded-xl bg-white/5 p-3 text-center font-black text-cyan-200">{message}</div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {choices.map((choice) => (
              <button
                key={choice.name}
                onClick={() => play(choice.name)}
                className="min-h-28 rounded-2xl border border-white/10 bg-[#202938] p-4 text-white transition hover:-translate-y-1 hover:border-violet-400/60 hover:bg-[#273244] active:scale-95"
              >
                <span className="block text-5xl">{choice.emoji}</span>
                <span className="mt-2 block text-lg font-black">{choice.name}</span>
              </button>
            ))}
          </div>

          <div className="mt-5 flex justify-center">
            <button onClick={reset} className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-4 py-3 font-black text-slate-900">
              <RotateCcw className="h-4 w-4" /> Reset Score
            </button>
          </div>

          <div className="mt-6 rounded-2xl bg-[#171f2d] p-4 text-sm leading-7 text-slate-400">
            <strong className="text-white">Rules:</strong> Rock beats Scissors, Paper beats Rock, and Scissors beats Paper. Matching choices are a tie.
          </div>
        </section>
      </div>
    </main>
  );
}
