import PageShell from "../PageShell";
import DashboardClient from "./DashboardClient";

export default function DashboardPage() {
  return (
    <PageShell
      kicker="PRIVATE"
      title="Portfolio analytics."
      intro="A private view of portfolio usage, popular pages, and Arun Assistant questions recorded on this browser."
    >
      <DashboardClient />
    </PageShell>
  );
}
