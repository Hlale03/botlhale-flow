import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Brain, ShieldAlert, TrendingUp, Zap } from "lucide-react";
import { Card, SectionHeader, Pill, Bar } from "@/components/ui-bits";
import { projects, insights, risks, productivityTrend, team } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · SMARTtlhale" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const completion = Math.round(
    (projects.reduce((s, p) => s + p.tasksDone, 0) /
      projects.reduce((s, p) => s + p.tasksTotal, 0)) *
      100,
  );
  const avgHealth = Math.round(projects.reduce((s, p) => s + p.health, 0) / projects.length);
  const atRisk = projects.filter((p) => p.status !== "completed" && p.status !== "on-track").length;

  const stats = [
    { label: "Active projects", value: projects.length, delta: "+2 this month", icon: TrendingUp },
    { label: "Completion rate", value: `${completion}%`, delta: "+4.1%", icon: Zap },
    { label: "Avg. project health", value: avgHealth, delta: "+6.2", icon: Brain },
    { label: "At-risk projects", value: atRisk, delta: "-1 vs last week", icon: ShieldAlert },
  ];

  return (
    <div>
      <SectionHeader title="Welcome back, Kagiso" description="Here is where your IT project portfolio stands across South Africa today." />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label}>
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
                <Icon className="h-4 w-4 text-primary-glow" />
              </div>
              <p className="mt-3 text-3xl font-semibold tracking-tight">{s.value}</p>
              <p className="mt-1 text-xs text-success">{s.delta}</p>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Productivity trend</p>
              <p className="text-xs text-muted-foreground">Last 6 weeks</p>
            </div>
            <Pill tone="success">+13 pts</Pill>
          </div>
          <div className="mt-6 grid h-44 grid-cols-6 items-end gap-3">
            {productivityTrend.map((d) => (
              <div key={d.week} className="flex flex-col items-center gap-2">
                <div className="w-full rounded-md bg-gradient-primary" style={{ height: `${d.score}%` }} />
                <span className="text-[10px] text-muted-foreground">{d.week}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-primary-glow" />
            <p className="text-sm font-medium">AI insights</p>
          </div>
          <ul className="mt-4 space-y-4">
            {insights.map((i) => (
              <li key={i.title} className="rounded-lg border border-border bg-background/40 p-3">
                <p className="text-sm font-medium">{i.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{i.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] text-muted-foreground">AI may make mistakes. Review before acting.</p>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-medium">Active projects</p>
            <Link to="/projects" className="inline-flex items-center gap-1 text-xs text-primary-glow hover:underline">
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-4">
            {projects.slice(0, 4).map((p) => (
              <div key={p.id} className="rounded-lg border border-border bg-background/40 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.client} · Lead: {p.lead}</p>
                  </div>
                  <StatusPill status={p.status} />
                </div>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{p.tasksDone}/{p.tasksTotal} tasks</span>
                  <span>·</span>
                  <span>Due {p.dueDate}</span>
                  <span>·</span>
                  <span>{p.risks} risks</span>
                  <span className="ml-auto text-foreground">{p.progress}%</span>
                </div>
                <div className="mt-2">
                  <Bar value={p.progress} tone={p.status === "delayed" ? "danger" : p.status === "at-risk" ? "warning" : "primary"} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-medium">Top risks</p>
            <span className="text-xs text-muted-foreground">14 overdue tasks</span>
          </div>
          <ul className="space-y-3">
            {risks.slice(0, 4).map((r) => (
              <li key={r.id} className="rounded-lg border border-border bg-background/40 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium">{r.project}</p>
                  <SeverityPill severity={r.severity} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{r.description}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <p className="text-sm font-medium">Burnout watch</p>
          <p className="text-xs text-muted-foreground">Workload over the last 14 days</p>
          <ul className="mt-4 space-y-3">
            {team.slice().sort((a, b) => b.workload - a.workload).slice(0, 4).map((m) => (
              <li key={m.id} className="flex items-center gap-3">
                <img src={m.avatar} alt="" className="h-8 w-8 rounded-full" />
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">{m.name}</span>
                    <span className="text-muted-foreground">{m.workload}%</span>
                  </div>
                  <div className="mt-1">
                    <Bar value={m.workload} tone={m.workload >= 90 ? "danger" : m.workload >= 80 ? "warning" : "primary"} />
                  </div>
                </div>
                <RiskPill risk={m.burnoutRisk} />
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <p className="text-sm font-medium">Quick actions</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <QuickAction to="/meetings" title="Summarize a meeting" body="Paste a transcript → get decisions & actions" />
            <QuickAction to="/reports" title="Generate status report" body="Executive-ready summary, exportable" />
            <QuickAction to="/assistant" title="Ask the AI" body='"What is at risk this week?"' />
            <QuickAction to="/tasks" title="Re-plan my week" body="Smart prioritization across active work" />
          </div>
        </Card>
      </div>
    </div>
  );
}

function QuickAction({ to, title, body }: { to: "/meetings" | "/reports" | "/assistant" | "/tasks"; title: string; body: string }) {
  return (
    <Link to={to} className="group rounded-lg border border-border bg-background/40 p-4 transition-colors hover:border-primary/40">
      <p className="text-sm font-medium group-hover:text-primary-glow">{title}</p>
      <p className="mt-1 text-xs text-muted-foreground">{body}</p>
    </Link>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, "success" | "warning" | "danger" | "info"> = {
    "on-track": "success",
    "at-risk": "warning",
    delayed: "danger",
    completed: "info",
  };
  return <Pill tone={map[status]}>{status.replace("-", " ")}</Pill>;
}

function SeverityPill({ severity }: { severity: string }) {
  const map: Record<string, "success" | "warning" | "danger" | "info"> = {
    low: "info",
    medium: "warning",
    high: "danger",
    critical: "danger",
  };
  return <Pill tone={map[severity]}>{severity}</Pill>;
}

function RiskPill({ risk }: { risk: string }) {
  const map: Record<string, "success" | "warning" | "danger"> = {
    low: "success",
    medium: "warning",
    high: "danger",
  };
  return <Pill tone={map[risk]}>{risk}</Pill>;
}
