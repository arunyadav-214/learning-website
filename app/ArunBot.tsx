"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Bot, RotateCcw, Send, Sparkles, X } from "lucide-react";
import { usePathname } from "next/navigation";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const welcome: Message = {
  role: "assistant",
  content:
    "Hi! I’m Arun Assistant. I can explain Arun’s projects and skills, compare his work, help recruiters find relevant experience, answer questions about the portfolio, and guide you to the right page.",
};

const starterQuestions = [
  "Give me a recruiter-style summary of Arun.",
  "Which project best shows Arun's engineering skills?",
  "What programming and database skills does Arun have?",
  "Show me Arun's research and certificates.",
];

const storageKey = "arun-assistant-chat-v2";

function pageLabel(pathname: string) {
  if (pathname === "/") return "Home";
  const part = pathname.split("/").filter(Boolean)[0] || "Home";
  return part
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function ArunBot() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem(storageKey);
      if (!saved) return;
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length) setMessages(parsed.slice(-20));
    } catch {
      // Start with a clean chat if saved data cannot be read.
    }
  }, []);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(storageKey, JSON.stringify(messages.slice(-20)));
    } catch {
      // Chat persistence is optional.
    }
  }, [messages]);

  const canSend = useMemo(() => input.trim().length > 0 && !sending, [input, sending]);

  function clearChat() {
    setMessages([welcome]);
    setInput("");
    try {
      window.sessionStorage.removeItem(storageKey);
    } catch {
      // Ignore storage errors.
    }
  }

  async function ask(question: string) {
    const clean = question.trim();
    if (!clean || sending) return;

    const nextMessages = [...messages, { role: "user" as const, content: clean }];
    setMessages(nextMessages);
    setInput("");
    setSending(true);

    try {
      const response = await fetch("/api/arun-bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: clean,
          currentPath: pathname,
          history: nextMessages.slice(-12),
        }),
      });

      const data = await response.json();
      const answer =
        typeof data?.reply === "string" && data.reply.trim()
          ? data.reply
          : "I’m sorry, I couldn’t answer that right now.";

      setMessages((current) => [...current, { role: "assistant", content: answer }]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "I’m having trouble connecting right now. You can still explore /projects, /skills, /research, /academic-work, /games, and /resume.",
        },
      ]);
    } finally {
      setSending(false);
      requestAnimationFrame(() => endRef.current?.scrollIntoView({ behavior: "smooth" }));
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(input);
  }

  return (
    <div className="fixed bottom-5 right-5 z-[120] sm:bottom-6 sm:right-6">
      {open ? (
        <section className="mb-3 flex h-[min(650px,80vh)] w-[min(410px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.7rem] border border-black/10 bg-[#faf9f5] shadow-2xl">
          <header className="flex items-center justify-between border-b border-black/10 bg-[#181818] px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[#c83025]">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <p className="font-black tracking-tight">Arun Assistant</p>
                <p className="text-xs text-white/60">
                  Portfolio assistant • {pageLabel(pathname)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={clearChat}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 transition hover:bg-white/10"
                aria-label="Start a new chat"
                title="New chat"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 transition hover:bg-white/10"
                aria-label="Close Arun Assistant"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={
                  message.role === "assistant"
                    ? "mr-7 whitespace-pre-wrap rounded-2xl rounded-tl-md border border-black/8 bg-white px-4 py-3 text-sm leading-6 text-[#292929]"
                    : "ml-7 whitespace-pre-wrap rounded-2xl rounded-tr-md bg-[#c83025] px-4 py-3 text-sm leading-6 text-white"
                }
              >
                {message.content}
              </div>
            ))}

            {messages.length === 1 ? (
              <div className="grid gap-2 pt-1">
                {starterQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => void ask(question)}
                    className="rounded-xl border border-black/10 bg-white px-3 py-2 text-left text-xs font-bold text-[#333] transition hover:border-[#c83025]/35 hover:bg-[#fff7f5]"
                  >
                    {question}
                  </button>
                ))}
              </div>
            ) : null}

            {sending ? (
              <div className="mr-16 flex items-center gap-2 rounded-2xl rounded-tl-md border border-black/8 bg-white px-4 py-3 text-sm text-black/55">
                <Sparkles className="h-4 w-4 animate-pulse" />
                Arun Assistant is thinking...
              </div>
            ) : null}
            <div ref={endRef} />
          </div>

          <form onSubmit={submit} className="border-t border-black/10 bg-white/80 p-3">
            <div className="flex items-end gap-2 rounded-2xl border border-black/10 bg-white p-2 shadow-sm">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    if (canSend) void ask(input);
                  }
                }}
                rows={1}
                maxLength={1200}
                placeholder="Ask Arun Assistant..."
                className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-[#181818] outline-none placeholder:text-black/40"
              />
              <button
                type="submit"
                disabled={!canSend}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#181818] text-white transition hover:bg-[#c83025] disabled:cursor-not-allowed disabled:opacity-35"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-black/40">
              Remembers this chat while you browse the portfolio.
            </p>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="ml-auto flex items-center gap-2 rounded-full bg-[#181818] px-4 py-3 font-black text-white shadow-2xl transition hover:-translate-y-0.5 hover:bg-[#c83025]"
        aria-label="Open Arun Assistant"
      >
        <Bot className="h-5 w-5" />
        <span className="text-sm">Ask Arun Assistant</span>
      </button>
    </div>
  );
}
