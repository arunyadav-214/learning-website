"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const analyticsStorageKey = "arun-portfolio-analytics-v1";

export type LocalAnalytics = {
  sessions: number;
  pageViews: Record<string, number>;
  assistantQuestions: Array<{ question: string; path: string; at: string }>;
  lastSeen: string;
};

export function readLocalAnalytics(): LocalAnalytics {
  const empty: LocalAnalytics = {
    sessions: 0,
    pageViews: {},
    assistantQuestions: [],
    lastSeen: new Date().toISOString(),
  };

  try {
    const raw = window.localStorage.getItem(analyticsStorageKey);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<LocalAnalytics>;
    return {
      sessions: typeof parsed.sessions === "number" ? parsed.sessions : 0,
      pageViews: parsed.pageViews && typeof parsed.pageViews === "object" ? parsed.pageViews : {},
      assistantQuestions: Array.isArray(parsed.assistantQuestions) ? parsed.assistantQuestions.slice(-100) : [],
      lastSeen: typeof parsed.lastSeen === "string" ? parsed.lastSeen : empty.lastSeen,
    };
  } catch {
    return empty;
  }
}

export function saveLocalAnalytics(data: LocalAnalytics) {
  try {
    window.localStorage.setItem(analyticsStorageKey, JSON.stringify(data));
  } catch {
    // Analytics are optional and never block the portfolio.
  }
}

export function recordAssistantQuestion(question: string, path: string) {
  const data = readLocalAnalytics();
  data.assistantQuestions.push({
    question: question.slice(0, 300),
    path,
    at: new Date().toISOString(),
  });
  data.assistantQuestions = data.assistantQuestions.slice(-100);
  data.lastSeen = new Date().toISOString();
  saveLocalAnalytics(data);
}

export default function SiteAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    const data = readLocalAnalytics();
    const sessionKey = "arun-portfolio-session-counted";

    try {
      if (!window.sessionStorage.getItem(sessionKey)) {
        data.sessions += 1;
        window.sessionStorage.setItem(sessionKey, "1");
      }
    } catch {
      // Session counting is optional.
    }

    data.pageViews[pathname] = (data.pageViews[pathname] || 0) + 1;
    data.lastSeen = new Date().toISOString();
    saveLocalAnalytics(data);
  }, [pathname]);

  return null;
}
