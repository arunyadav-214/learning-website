"use client";

import { useEffect, useState } from "react";

function formatClock(timeZone: string) {
  const now = new Date();
  const time = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(now);
  const date = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(now);
  const hour = Number(
    new Intl.DateTimeFormat("en-US", { timeZone, hour: "2-digit", hourCycle: "h23" })
      .formatToParts(now)
      .find((part) => part.type === "hour")?.value ?? 0
  );

  return { time, date, icon: hour >= 6 && hour < 18 ? "☀️" : "🌙" };
}

export default function HomeClocks() {
  const [nepal, setNepal] = useState({ time: "", date: "", icon: "" });
  const [america, setAmerica] = useState({ time: "", date: "", icon: "" });

  useEffect(() => {
    const update = () => {
      setNepal(formatClock("Asia/Kathmandu"));
      setAmerica(formatClock("America/Chicago"));
    };

    update();
    const timer = window.setInterval(update, 30000);
    return () => window.clearInterval(timer);
  }, []);

  const clocks = [
    { name: "Nepal", flag: "🇳🇵", data: nepal },
    { name: "America", flag: "🇺🇸", data: america },
  ];

  return (
    <div className="grid grid-cols-2 gap-2.5" aria-label="Current time in Nepal and America">
      {clocks.map(({ name, flag, data }) => (
        <div
          key={name}
          className="rounded-2xl border border-[#c83025]/20 bg-[#faf9f5]/95 px-3.5 py-3 text-center shadow-[0_10px_28px_rgba(24,24,24,.06)] backdrop-blur transition hover:-translate-y-0.5 hover:border-[#c83025]/30 hover:shadow-[0_14px_34px_rgba(24,24,24,.09)]"
        >
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-sm" aria-hidden="true">{flag}</span>
            <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[#c83025]">{name}</p>
          </div>
          <div className="mt-1.5 flex items-center justify-center gap-2">
            <span className="text-sm" aria-hidden="true">{data.icon}</span>
            <strong className="font-mono text-sm tracking-tight text-[#181818]">{data.time || "--:--"}</strong>
          </div>
          <p className="mt-1 text-[9px] font-bold text-[#7b756d]">{data.date}</p>
        </div>
      ))}
    </div>
  );
}
