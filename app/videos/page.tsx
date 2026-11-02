import PageShell from "../PageShell";

export default function VideosPage() {
  return (
    <PageShell kicker="VIDEOS" title="Project demos & walkthroughs." intro="Video demonstrations will stream from external hosting so the website stays fast and reliable.">
      <div className="rounded-[1.5rem] border border-black/10 bg-white/80 p-6">
        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#c83025]">External Streaming</p>
        <h2 className="mt-3 text-2xl font-black">Video library</h2>
        <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">This page is ready for project demos, walkthroughs, and presentations without storing large video files inside the main website repository.</p>
      </div>
    </PageShell>
  );
}
