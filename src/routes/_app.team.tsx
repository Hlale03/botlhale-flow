import { createFileRoute } from "@tanstack/react-router";
import { Card, SectionHeader, Pill, Bar } from "@/components/ui-bits";
import { team } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/team")({
  head: () => ({ meta: [{ title: "Team · SMARTtlhale" }] }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <div>
      <SectionHeader title="Team" description="Workload, productivity and burnout signals across your people." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {team.map((m) => (
          <Card key={m.id}>
            <div className="flex items-center gap-3">
              <img src={m.avatar} alt="" className="h-10 w-10 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.role}</p>
              </div>
              <Pill tone={m.burnoutRisk === "high" ? "danger" : m.burnoutRisk === "medium" ? "warning" : "success"}>
                {m.burnoutRisk} risk
              </Pill>
            </div>
            <div className="mt-5 space-y-3">
              <Stat label="Workload" value={`${m.workload}%`}>
                <Bar value={m.workload} tone={m.workload >= 90 ? "danger" : m.workload >= 80 ? "warning" : "primary"} />
              </Stat>
              <Stat label="Productivity" value={`${m.productivity}`}>
                <Bar value={m.productivity} tone="success" />
              </Stat>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
      {children}
    </div>
  );
}
