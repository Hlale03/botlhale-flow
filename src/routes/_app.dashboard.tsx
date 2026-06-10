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
      <SectionHeader title="Welcome back, Naledi" description="Here's where your portfolio stands today." />

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

*** Add File: src/routes/_app.projects.tsx
import { createFileRoute } from "@tanstack/react-router";
import { Card, SectionHeader, Pill, Bar } from "@/components/ui-bits";
import { projects } from "@/lib/mock-data";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/_app/projects")({
  head: () => ({ meta: [{ title: "Projects · SMARTtlhale" }] }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div>
      <SectionHeader
        title="Projects"
        description="All portfolios at a glance, scored by AI health."
        action={
          <button className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-3 py-2 text-xs font-medium text-primary-foreground shadow-elegant">
            <Plus className="h-3.5 w-3.5" /> New project
          </button>
        }
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((p) => (
          <Card key={p.id} className="transition-transform hover:-translate-y-0.5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold">{p.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{p.client}</p>
              </div>
              <Pill tone={p.status === "on-track" ? "success" : p.status === "at-risk" ? "warning" : p.status === "delayed" ? "danger" : "info"}>
                {p.status.replace("-", " ")}
              </Pill>
            </div>
            <div className="mt-5 flex items-end justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Health</p>
                <p className="text-3xl font-semibold tracking-tight text-gradient">{p.health}</p>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                <p>Due {p.dueDate}</p>
                <p>{p.risks} risks</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>{p.tasksDone}/{p.tasksTotal} tasks</span>
              <span>{p.progress}%</span>
            </div>
            <div className="mt-2">
              <Bar value={p.progress} tone={p.status === "delayed" ? "danger" : p.status === "at-risk" ? "warning" : "primary"} />
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
              <p className="text-xs text-muted-foreground">Lead · {p.lead}</p>
              <div className="flex -space-x-2">
                {p.team.slice(0, 4).map((t) => (
                  <div key={t} className="h-6 w-6 rounded-full border border-card bg-gradient-primary" title={t} />
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

*** Add File: src/routes/_app.tasks.tsx
import { createFileRoute } from "@tanstack/react-router";
import { Card, Pill, SectionHeader } from "@/components/ui-bits";
import { tasks } from "@/lib/mock-data";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/_app/tasks")({
  head: () => ({ meta: [{ title: "Tasks · SMARTtlhale" }] }),
  component: TasksPage,
});

const columns = ["todo", "in-progress", "review", "done"] as const;

function TasksPage() {
  return (
    <div>
      <SectionHeader
        title="Tasks"
        description="Prioritized by SMARTtlhale AI based on urgency, impact, and dependencies."
        action={
          <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-3 py-2 text-xs font-medium hover:bg-card">
            <Sparkles className="h-3.5 w-3.5 text-primary-glow" /> Re-plan my week
          </button>
        }
      />
      <div className="grid gap-4 lg:grid-cols-4">
        {columns.map((c) => {
          const items = tasks.filter((t) => t.status === c);
          return (
            <div key={c} className="flex flex-col gap-3">
              <div className="flex items-center justify-between px-1">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{c.replace("-", " ")}</p>
                <span className="text-xs text-muted-foreground">{items.length}</span>
              </div>
              {items.map((t) => (
                <Card key={t.id} className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium leading-snug">{t.title}</p>
                    <Pill tone={t.priority === "critical" ? "danger" : t.priority === "important" ? "warning" : "info"}>{t.priority}</Pill>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{t.project}</p>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>{t.assignee}</span>
                    <span>Due {t.due}</span>
                  </div>
                </Card>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

*** Add File: src/routes/_app.meetings.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, Pill, SectionHeader, AIDisclaimer } from "@/components/ui-bits";
import { meetings } from "@/lib/mock-data";
import { Sparkles, Calendar } from "lucide-react";

export const Route = createFileRoute("/_app/meetings")({
  head: () => ({ meta: [{ title: "Meetings · SMARTtlhale" }] }),
  component: MeetingsPage,
});

function MeetingsPage() {
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState<typeof meetings[number] | null>(null);
  const [loading, setLoading] = useState(false);

  function summarize() {
    setLoading(true);
    setTimeout(() => {
      setSummary(meetings[0]);
      setLoading(false);
    }, 900);
  }

  return (
    <div>
      <SectionHeader
        title="Meetings"
        description="Paste a transcript and let the AI extract decisions, risks, and action items."
      />
      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Meeting transcript</p>
            <span className="text-xs text-muted-foreground">Auto-detected language: English</span>
          </div>
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            rows={10}
            placeholder="Paste meeting notes or transcript here…"
            className="mt-3 w-full resize-none rounded-lg border border-input bg-input/40 p-3 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
          <div className="mt-3 flex items-center justify-between">
            <p className="text-[11px] text-muted-foreground">Demo mode: any input produces a sample summary.</p>
            <button
              onClick={summarize}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-elegant disabled:opacity-60"
            >
              <Sparkles className="h-3.5 w-3.5" /> {loading ? "Summarizing…" : "Summarize with AI"}
            </button>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <p className="text-sm font-medium">Recent meetings</p>
          <ul className="mt-3 space-y-3">
            {meetings.map((m) => (
              <li key={m.id} className="rounded-lg border border-border bg-background/40 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{m.title}</p>
                  <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground"><Calendar className="h-3 w-3" /> {m.date}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{m.attendees.join(", ")}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {summary && (
        <Card className="mt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">AI summary — {summary.title}</p>
              <p className="text-xs text-muted-foreground">{summary.date} · {summary.attendees.join(", ")}</p>
            </div>
            <Pill tone="info">AI generated</Pill>
          </div>
          <p className="mt-4 text-sm text-foreground/90">{summary.summary}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Block title="Key decisions">
              <ul className="space-y-2 text-xs text-muted-foreground">
                {summary.decisions.map((d) => <li key={d}>· {d}</li>)}
              </ul>
            </Block>
            <Block title="Risks">
              <ul className="space-y-2 text-xs text-muted-foreground">
                {summary.risks.map((d) => <li key={d}>· {d}</li>)}
              </ul>
            </Block>
            <Block title="Action items">
              <ul className="space-y-2 text-xs">
                {summary.actions.map((a) => (
                  <li key={a.task} className="text-muted-foreground">
                    <p className="text-foreground">{a.task}</p>
                    <p>{a.owner} · due {a.due}</p>
                  </li>
                ))}
              </ul>
            </Block>
          </div>
          <AIDisclaimer />
        </Card>
      )}
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-background/40 p-4">
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
      {children}
    </div>
  );
}

*** Add File: src/routes/_app.reports.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, SectionHeader, AIDisclaimer, Pill } from "@/components/ui-bits";
import { projects } from "@/lib/mock-data";
import { Download, FileText, Mail, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_app/reports")({
  head: () => ({ meta: [{ title: "Reports · SMARTtlhale" }] }),
  component: ReportsPage,
});

function ReportsPage() {
  const [project, setProject] = useState(projects[0].id);
  const [tone, setTone] = useState<"executive" | "formal" | "friendly">("executive");
  const [generated, setGenerated] = useState(false);
  const p = projects.find((x) => x.id === project)!;

  return (
    <div>
      <SectionHeader title="Reports" description="Generate executive-ready status reports with one click." />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <p className="text-sm font-medium">Configure</p>
          <label className="mt-4 block text-xs text-muted-foreground">Project</label>
          <select
            value={project}
            onChange={(e) => setProject(e.target.value)}
            className="mt-1 w-full rounded-md border border-input bg-input/40 px-3 py-2 text-sm focus:border-ring focus:outline-none"
          >
            {projects.map((pr) => (
              <option key={pr.id} value={pr.id}>{pr.name}</option>
            ))}
          </select>

          <label className="mt-4 block text-xs text-muted-foreground">Tone</label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {(["executive", "formal", "friendly"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`rounded-md border px-2 py-1.5 text-xs capitalize transition-colors ${
                  tone === t
                    ? "border-primary/60 bg-primary/10 text-primary-glow"
                    : "border-border bg-background/40 text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <button
            onClick={() => setGenerated(true)}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gradient-primary px-3 py-2 text-xs font-medium text-primary-foreground shadow-elegant"
          >
            <Sparkles className="h-3.5 w-3.5" /> Generate report
          </button>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <ExportBtn icon={FileText} label="PDF" />
            <ExportBtn icon={Download} label="Word" />
            <ExportBtn icon={Mail} label="Email" />
          </div>
        </Card>

        <Card className="lg:col-span-2">
          {!generated ? (
            <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
                <FileText className="h-5 w-5 text-primary-glow" />
              </div>
              <p className="mt-3 text-sm font-medium">No report yet</p>
              <p className="mt-1 max-w-xs text-xs text-muted-foreground">
                Select a project and tone, then generate to preview a status report.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{p.name} — Weekly status</p>
                  <p className="text-xs capitalize text-muted-foreground">{tone} tone · Week of Jun 09</p>
                </div>
                <Pill tone="info">AI generated</Pill>
              </div>
              <div className="mt-4 space-y-4 text-sm text-foreground/90">
                <p>
                  <strong>Summary.</strong> {p.name} is currently <span className="text-primary-glow">{p.status.replace("-", " ")}</span>
                  {" "}at {p.progress}% completion ({p.tasksDone}/{p.tasksTotal} tasks). Project health is {p.health}/100,
                  trending {p.health > 70 ? "positively" : "down"} week-over-week.
                </p>
                <p>
                  <strong>Achievements.</strong> The team closed key milestones around design and integration,
                  and unblocked the third-party dependency that was flagged last week.
                </p>
                <p>
                  <strong>Risks.</strong> {p.risks} active risks — including timeline pressure on the next milestone
                  and one resource constraint on the engineering side.
                </p>
                <p>
                  <strong>Next steps.</strong> Lock down scope for the next release window, rebalance two tasks from
                  {" "}{p.lead}, and schedule a stakeholder review on Friday.
                </p>
              </div>
              <AIDisclaimer />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function ExportBtn({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <button className="inline-flex items-center justify-center gap-1.5 rounded-md border border-border bg-background/40 px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground">
      <Icon className="h-3.5 w-3.5" /> {label}
    </button>
  );
}

*** Add File: src/routes/_app.team.tsx
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

*** Add File: src/routes/_app.assistant.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, SectionHeader, AIDisclaimer } from "@/components/ui-bits";
import { Send, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_app/assistant")({
  head: () => ({ meta: [{ title: "AI Assistant · SMARTtlhale" }] }),
  component: AssistantPage,
});

type Msg = { role: "user" | "ai"; content: string };

const seedMessages: Msg[] = [
  { role: "ai", content: "Hi Naledi 👋 — I'm your SMARTtlhale assistant. I have the latest context across your projects. Ask me anything." },
];

const suggestions = [
  "What tasks are overdue this week?",
  "Summarize yesterday's Atlas sync",
  "Which projects are at risk?",
  "Who is at risk of burnout?",
];

function respond(q: string): string {
  const lower = q.toLowerCase();
  if (lower.includes("overdue")) return "14 tasks are overdue across 4 projects. The largest cluster (6) is on Warehouse OS Migration — owner: Amara Okeke. Want me to draft a re-plan?";
  if (lower.includes("risk")) return "Mobile Banking v3 and Warehouse OS Migration are the two most at-risk. The biggest single risk is the schema migration owner being overloaded (score 92). Suggested mitigation: reassign 2 tasks to Jaco and add a buffer day.";
  if (lower.includes("burnout")) return "Sipho Dlamini (94% workload, 3 weeks running) and Amara Okeke (88%) are showing burnout signals. I recommend redistributing 3 tasks to Kabelo and Pumi.";
  if (lower.includes("summar")) return "Atlas weekly sync — Decisions: adopt new tokens by Friday; postpone analytics widget. Risks: auth library blocker may push release 3 days. Action items: Sipho to unblock auth by Jun 11; Naledi to publish tokens by Jun 13.";
  return "Based on your current portfolio: avg health is 78, completion is 64%, and there are 3 critical risks. Tell me what you'd like to dig into.";
}

function AssistantPage() {
  const [messages, setMessages] = useState<Msg[]>(seedMessages);
  const [input, setInput] = useState("");

  function send(text?: string) {
    const q = (text ?? input).trim();
    if (!q) return;
    setMessages((m) => [...m, { role: "user", content: q }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { role: "ai", content: respond(q) }]);
    }, 500);
  }

  return (
    <div>
      <SectionHeader title="AI Assistant" description="Project-aware chat. Ask about risks, status, people, or plans." />
      <Card className="flex h-[calc(100vh-220px)] flex-col p-0">
        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : "flex items-start gap-3"}>
              {m.role === "ai" && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gradient-primary shadow-elegant">
                  <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
              )}
              <div
                className={
                  m.role === "user"
                    ? "max-w-[75%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2 text-sm text-primary-foreground"
                    : "max-w-[75%] text-sm text-foreground/90"
                }
              >
                {m.content}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-border bg-background/40 px-3 py-1 text-[11px] text-muted-foreground hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask SMARTtlhale anything about your projects…"
              className="h-10 flex-1 rounded-md border border-input bg-input/40 px-3 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
            <button type="submit" className="inline-flex h-10 items-center gap-2 rounded-md bg-gradient-primary px-4 text-sm font-medium text-primary-foreground shadow-elegant">
              <Send className="h-4 w-4" /> Send
            </button>
          </form>
          <AIDisclaimer />
        </div>
      </Card>
    </div>
  );
}

*** Add File: src/routes/_app.settings.tsx
import { createFileRoute } from "@tanstack/react-router";
import { Card, SectionHeader } from "@/components/ui-bits";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings · SMARTtlhale" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div>
      <SectionHeader title="Settings" description="Workspace, AI behavior and notification preferences." />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <p className="text-sm font-medium">Workspace</p>
          <div className="mt-4 space-y-3 text-sm">
            <Row label="Workspace name" value="Botlhale Studio" />
            <Row label="Plan" value="Pro" />
            <Row label="Members" value="12" />
          </div>
        </Card>
        <Card>
          <p className="text-sm font-medium">AI behavior</p>
          <div className="mt-4 space-y-3 text-sm">
            <Toggle label="Auto-summarize meeting transcripts" defaultOn />
            <Toggle label="Surface risk insights on dashboard" defaultOn />
            <Toggle label="Suggest weekly re-prioritization" defaultOn />
            <Toggle label="Notify on burnout signals" />
          </div>
          <p className="mt-4 text-[11px] text-muted-foreground">
            AI features may make mistakes — review outputs before acting on critical decisions.
          </p>
        </Card>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function Toggle({ label, defaultOn = false }: { label: string; defaultOn?: boolean }) {
  return (
    <label className="flex items-center justify-between gap-3">
      <span>{label}</span>
      <span className={`inline-flex h-5 w-9 items-center rounded-full p-0.5 transition-colors ${defaultOn ? "bg-gradient-primary" : "bg-secondary"}`}>
        <span className={`h-4 w-4 rounded-full bg-card transition-transform ${defaultOn ? "translate-x-4" : ""}`} />
      </span>
    </label>
  );
}

*** Add File: public/robots.txt
User-agent: *
Allow: /
