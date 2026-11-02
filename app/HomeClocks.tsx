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
    { name: "🇳🇵 Nepal", data: nepal },
    { name: "🇺🇸 America", data: america },
  ];

  return (
    <div className="grid grid-cols-2 gap-2" aria-label="Current time in Nepal and America">
      {clocks.map(({ name, data }) => (
        <div
          key={name}
          className="rounded-xl border border-[#c83025]/20 bg-[#c83025]/[0.06] px-3 py-2 text-center"
        >
          <p className="text-[9px] font-black uppercase tracking-[0.13em] text-[#c83025]">{name}</p>
          <div className="mt-1 flex items-center justify-center gap-1.5">
            <span aria-hidden="true">{data.icon}</span>
            <strong className="font-mono text-xs text-[#c83025]">{data.time || "--:--"}</strong>
          </div>
          <p className="mt-1 text-[9px] font-bold text-[#a9271f]">{data.date}</p>
        </div>
      ))}
    </div>
  );
}
