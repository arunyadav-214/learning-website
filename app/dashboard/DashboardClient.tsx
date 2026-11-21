"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { BarChart3, Bot, Eye, LockKeyhole, LogOut, RefreshCw } from "lucide-react";
import { LocalAnalytics, readLocalAnalytics } from "../SiteAnalytics";

const empty: LocalAnalytics = {
  sessions: 0,
  pageViews: {},
  assistantQuestions: [],
  lastSeen: new Date(0).toISOString(),
};

export default function DashboardClient() {
  const [authorized, setAuthorized] = useState(false);
  const [configured, setConfigured] = useState(true);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [analytics, setAnalytics] = useState<LocalAnalytics>(empty);

  async function checkAuth() {
    setChecking(true);
    try {
      const response = await fetch("/api/dashboard-auth", { cache: "no-store" });
      const data = await response.json();
      setAuthorized(Boolean(data.authorized));
      setConfigured(Boolean(data.configured));
      if (data.authorized) setAnalytics(readLocalAnalytics());
    } finally {
      setChecking(false);
    }
  }

  useEffect(() => {
    void checkAuth();
  }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/dashboard-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data?.message || "Could not unlock dashboard.");
      return;
    }

    setPassword("");
    setAuthorized(true);
    setAnalytics(readLocalAnalytics());
  }

  async function logout() {
    await fetch("/api/dashboard-auth", { method: "DELETE" });
    setAuthorized(false);
  }

  const topPages = useMemo(
    () =>
      Object.entries(analytics.pageViews)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8),
    [analytics]
  );

  const totalPageViews = useMemo(
    () => Object.values(analytics.pageViews).reduce((sum, count) => sum + count, 0),
    [analytics]
  );

  if (checking) {
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-black/10 bg-white/80 p-5 text-sm text-muted-foreground">
        <RefreshCw className="h-4 w-4 animate-spin" /> Checking dashboard access...
      </div>
    );
  }

  if (!authorized) {
    return (
      <section className="mx-auto max-w-lg rounded-[1.7rem] border border-black/10 bg-white/85 p-6 shadow-xl sm:p-8">
        <LockKeyhole className="h-8 w-8 text-[#c83025]" />
        <h2 className="mt-5 text-3xl font-black tracking-[-0.04em]">Private dashboard</h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          This area is for Arun only.
        </p>
        {!configured ? (
          <p className="mt-4 rounded-xl border border-amber-300/30 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            Set DASHBOARD_PASSWORD and DASHBOARD_SESSION_SECRET in Cloudflare environment variables to activate secure access.
          </p>
        ) : (
          <form onSubmit={login} className="mt-6">
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Dashboard password"
              className="w-full rounded-xl border border-black/10 bg-[#faf9f5] px-4 py-3 outline-none focus:border-[#c83025]/50"
            />
            {error ? <p className="mt-3 text-sm font-bold text-red-600">{error}</p> : null}
            <button type="submit" className="primary-button mt-4 w-full justify-center">Unlock dashboard</button>
          </form>
        )}
      </section>
    );
  }

  return (
    <div>
      <div className="flex justify-end">
        <button onClick={logout} className="secondary-button text-sm">
          <LogOut className="h-4 w-4" /> Lock dashboard
        </button>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <article className="rounded-2xl border border-black/10 bg-white/80 p-5">
          <Eye className="h-5 w-5 text-[#c83025]" />
          <p className="mt-4 text-3xl font-black">{totalPageViews}</p>
          <p className="mt-1 text-sm text-muted-foreground">Browser-local page views</p>
        </article>
        <article className="rounded-2xl border border-black/10 bg-white/80 p-5">
          <BarChart3 className="h-5 w-5 text-[#c83025]" />
          <p className="mt-4 text-3xl font-black">{analytics.sessions}</p>
          <p className="mt-1 text-sm text-muted-foreground">Sessions on this device</p>
        </article>
        <article className="rounded-2xl border border-black/10 bg-white/80 p-5">
          <Bot className="h-5 w-5 text-[#c83025]" />
          <p className="mt-4 text-3xl font-black">{analytics.assistantQuestions.length}</p>
          <p className="mt-1 text-sm text-muted-foreground">Assistant questions on this device</p>
        </article>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <section className="rounded-[1.5rem] border border-black/10 bg-white/80 p-6">
          <h2 className="text-xl font-black">Top pages</h2>
          <div className="mt-4 space-y-3">
            {topPages.length ? topPages.map(([path, count]) => (
              <div key={path} className="flex items-center justify-between rounded-xl bg-[#faf9f5] px-4 py-3">
                <span className="text-sm font-bold">{path}</span>
                <span className="text-sm font-black text-[#c83025]">{count}</span>
              </div>
            )) : <p className="text-sm text-muted-foreground">No page-view data yet.</p>}
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-black/10 bg-white/80 p-6">
          <h2 className="text-xl font-black">Recent Arun Assistant questions</h2>
          <div className="mt-4 space-y-3">
            {analytics.assistantQuestions.length ? analytics.assistantQuestions.slice(-8).reverse().map((item, index) => (
              <div key={`${item.at}-${index}`} className="rounded-xl bg-[#faf9f5] px-4 py-3">
                <p className="text-sm font-bold">{item.question}</p>
                <p className="mt-1 text-[11px] text-black/45">{item.path}</p>
              </div>
            )) : <p className="text-sm text-muted-foreground">No assistant questions recorded on this device yet.</p>}
          </div>
        </section>
      </div>

      <p className="mt-6 rounded-xl border border-black/10 bg-[#faf9f5] p-4 text-xs leading-6 text-muted-foreground">
        This dashboard intentionally stores its detailed page/question analytics in the current browser only. For aggregated visitor analytics across every device, enable the optional Cloudflare Web Analytics token in the site environment.
      </p>
    </div>
  );
}
