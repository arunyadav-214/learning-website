"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink, GitBranch, Github, RefreshCw } from "lucide-react";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  updated_at: string;
  stargazers_count: number;
  fork: boolean;
};

type User = {
  public_repos: number;
  followers: number;
  html_url: string;
};

export default function GitHubActivity() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const [reposResponse, userResponse] = await Promise.all([
          fetch("https://api.github.com/users/arunyadav-214/repos?sort=updated&per_page=8"),
          fetch("https://api.github.com/users/arunyadav-214"),
        ]);

        if (!reposResponse.ok || !userResponse.ok) throw new Error("GitHub unavailable");

        const repoData = (await reposResponse.json()) as Repo[];
        const userData = (await userResponse.json()) as User;

        if (!active) return;
        setRepos(repoData.filter((repo) => !repo.fork).slice(0, 4));
        setUser(userData);
      } catch {
        if (!active) return;
        setRepos([]);
        setUser(null);
      } finally {
        if (active) setLoading(false);
      }
    }

    void load();
    return () => {
      active = false;
    };
  }, []);

  const lastUpdated = useMemo(() => {
    const newest = repos[0]?.updated_at;
    if (!newest) return "Live from GitHub";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(newest));
  }, [repos]);

  return (
    <section className="rounded-[1.7rem] border border-black/10 bg-white/80 p-5 shadow-[0_14px_45px_rgba(24,24,24,.06)] sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-[#c83025]">
            <Github className="h-4 w-4" />
            <p className="text-[10px] font-black uppercase tracking-[0.16em]">LIVE GITHUB ACTIVITY</p>
          </div>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] sm:text-3xl">Recent public work.</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{lastUpdated}</p>
        </div>
        <a
          href="https://github.com/arunyadav-214"
          target="_blank"
          rel="noreferrer"
          className="secondary-button justify-center text-sm"
        >
          GitHub profile <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {loading ? (
        <div className="mt-6 flex items-center gap-2 rounded-2xl border border-black/10 bg-[#faf9f5] p-4 text-sm text-muted-foreground">
          <RefreshCw className="h-4 w-4 animate-spin" /> Loading GitHub activity...
        </div>
      ) : repos.length ? (
        <>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-black/10 bg-[#faf9f5] p-4 transition hover:-translate-y-1 hover:border-[#c83025]/35"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-black text-[#181818]">{repo.name}</h3>
                  <ExternalLink className="h-4 w-4 shrink-0 text-[#c83025]" />
                </div>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {repo.description || "Public GitHub repository."}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-bold text-black/50">
                  {repo.language ? <span>{repo.language}</span> : null}
                  <span className="inline-flex items-center gap-1"><GitBranch className="h-3 w-3" /> Updated recently</span>
                  {repo.stargazers_count > 0 ? <span>★ {repo.stargazers_count}</span> : null}
                </div>
              </a>
            ))}
          </div>
          {user ? (
            <p className="mt-4 text-xs font-semibold text-black/45">
              {user.public_repos} public repositories • {user.followers} GitHub followers
            </p>
          ) : null}
        </>
      ) : (
        <p className="mt-6 rounded-2xl border border-black/10 bg-[#faf9f5] p-4 text-sm leading-6 text-muted-foreground">
          GitHub activity could not be loaded right now. The portfolio projects are still available from the Projects page.
        </p>
      )}
    </section>
  );
}
