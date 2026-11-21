"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Bot, Mic, MicOff, RotateCcw, Send, Sparkles, Volume2, VolumeX, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { recordAssistantQuestion } from "./SiteAnalytics";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type RecognitionResultLike = {
  0?: { transcript?: string };
};

type RecognitionEventLike = {
  results: {
    0?: RecognitionResultLike;
  };
};

type RecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: RecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type RecognitionConstructor = new () => RecognitionLike;

const welcome: Message = {
  role: "assistant",
  content:
    "Hi! I’m Arun Assistant. I can explain Arun’s projects and skills, compare his work, help recruiters evaluate relevant experience, answer questions about the portfolio, and guide you to the right page. You can type or use the microphone.",
};

const starterQuestions = [
  "Why should we interview Arun?",
  "Which project best shows Arun's engineering skills?",
  "Which projects prove Arun's software skills?",
  "Compare Arun's software and engineering experience.",
  "What database experience does Arun have?",
];

const storageKey = "arun-assistant-chat-v3";

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
  const [listening, setListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [voiceReplies, setVoiceReplies] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<RecognitionLike | null>(null);

  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length) setMessages(parsed.slice(-20));
      }
    } catch {
      // Start with a clean chat if saved data cannot be read.
    }

    const speechWindow = window as typeof window & {
      SpeechRecognition?: RecognitionConstructor;
      webkitSpeechRecognition?: RecognitionConstructor;
    };
    setVoiceSupported(Boolean(speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition));

    return () => {
      recognitionRef.current?.stop();
      window.speechSynthesis?.cancel();
    };
  }, []);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(storageKey, JSON.stringify(messages.slice(-20)));
    } catch {
      // Chat persistence is optional.
    }
  }, [messages]);

  const canSend = useMemo(() => input.trim().length > 0 && !sending, [input, sending]);

  function speak(text: string) {
    if (!voiceReplies || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/\/(projects|skills|research|academic-work|games|resume)\b/g, "$1 page"));
    utterance.rate = 0.96;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }

  function toggleVoiceReplies() {
    setVoiceReplies((value) => {
      const next = !value;
      if (!next) window.speechSynthesis?.cancel();
      return next;
    });
  }

  function startListening() {
    setVoiceNotice("");

    if (!voiceSupported) {
      setVoiceNotice("Voice input is not supported by this browser.");
      return;
    }

    const speechWindow = window as typeof window & {
      SpeechRecognition?: RecognitionConstructor;
      webkitSpeechRecognition?: RecognitionConstructor;
    };
    const Recognition = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
    if (!Recognition) return;

    if (listening) {
      recognitionRef.current?.stop();
      return;
    }

    const recognition = new Recognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript?.trim() || "";
      if (transcript) setInput(transcript);
    };
    recognition.onerror = () => {
      setVoiceNotice("I couldn’t hear that clearly. Try the microphone again.");
      setListening(false);
    };
    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  }

  function clearChat() {
    setMessages([welcome]);
    setInput("");
    setVoiceNotice("");
    window.speechSynthesis?.cancel();
    try {
      window.sessionStorage.removeItem(storageKey);
    } catch {
      // Ignore storage errors.
    }
  }

  async function ask(question: string) {
    const clean = question.trim();
    if (!clean || sending) return;

    recordAssistantQuestion(clean, pathname);

    const nextMessages = [...messages, { role: "user" as const, content: clean }];
    setMessages(nextMessages);
    setInput("");
    setSending(true);
    setVoiceNotice("");

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
      speak(answer);
    } catch {
      const fallback =
        "I’m having trouble connecting right now. You can still explore /projects, /skills, /research, /academic-work, /games, and /resume.";
      setMessages((current) => [...current, { role: "assistant", content: fallback }]);
      speak(fallback);
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
        <section className="mb-3 flex h-[min(680px,82vh)] w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.7rem] border border-black/10 bg-[#faf9f5] shadow-2xl">
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
                onClick={toggleVoiceReplies}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 transition hover:bg-white/10"
                aria-label={voiceReplies ? "Turn spoken replies off" : "Turn spoken replies on"}
                title={voiceReplies ? "Spoken replies on" : "Spoken replies off"}
              >
                {voiceReplies ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </button>
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
                onClick={() => {
                  setOpen(false);
                  recognitionRef.current?.stop();
                  window.speechSynthesis?.cancel();
                }}
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
            {voiceNotice ? <p className="mb-2 text-xs font-semibold text-[#c83025]">{voiceNotice}</p> : null}
            <div className="flex items-end gap-2 rounded-2xl border border-black/10 bg-white p-2 shadow-sm">
              <button
                type="button"
                onClick={startListening}
                className={
                  listening
                    ? "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#c83025] text-white"
                    : "grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-black/10 bg-[#faf9f5] text-[#181818] transition hover:border-[#c83025]/35 hover:text-[#c83025]"
                }
                aria-label={listening ? "Stop listening" : "Use microphone"}
                title={voiceSupported ? "Voice input" : "Voice input unavailable"}
              >
                {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>
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
                placeholder={listening ? "Listening..." : "Ask Arun Assistant..."}
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
              Type or speak • remembers this chat while you browse
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
