import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  Bot,
  CalendarClock,
  ShieldAlert,
  FileBarChart2,
  Users,
  Workflow,
  Brain,
  CheckCircle2,
} from "lucide-react";
import { Card } from "@/components/ui-bits";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SMARTtlhale — Intelligence for Every Project" },
      {
        name: "description",
        content:
          "The AI co-pilot for project managers. Summarize meetings, detect risks, plan weeks, and ship projects faster. Powered by Botlhale.",
      },
      { property: "og:title", content: "SMARTtlhale — Intelligence for Every Project" },
      { property: "og:description", content: "AI-powered project management for modern teams." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: CalendarClock, title: "Meeting Summarizer", body: "Turn 60-minute calls into decisions, risks, and owned action items in seconds." },
  { icon: ShieldAlert, title: "Risk Detection Engine", body: "Continuously scans deadlines, workloads and dependencies to surface what's about to break." },
  { icon: FileBarChart2, title: "Progress Reports", body: "Executive-ready status reports — generated, formatted, and exportable in one click." },
  { icon: Bot, title: "Project Chat Assistant", body: "Ask anything: 'what's overdue?', 'who's at risk of burnout?', 'summarize last week'." },
  { icon: Workflow, title: "Smart Prioritization", body: "AI ranks tasks by urgency, impact, and dependencies so your team always works on what matters." },
  { icon: Users, title: "Burnout Detection", body: "Detect overloaded teammates early and rebalance work before it costs you a sprint." },
];

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-elegant">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">SMARTtlhale</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Project Flow</span>
          </div>
        </div>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#intelligence" className="hover:text-foreground">Intelligence</a>
          <a href="#workflow" className="hover:text-foreground">Workflow</a>
        </nav>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-elegant transition-transform hover:scale-[1.02]"
        >
          Open app <ArrowRight className="h-4 w-4" />
        </Link>
      </header>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-16 text-center md:pt-28">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-success" /> Powered by Botlhale AI
        </div>
        <h1 className="mx-auto mt-6 max-w-4xl text-balance text-5xl font-semibold tracking-tight md:text-7xl">
          Intelligence for <span className="text-gradient">every project.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg">
          SMARTtlhale is the AI co-pilot for project managers. It summarizes meetings,
          detects risks, plans your week, and helps your team ship — without the busywork.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-elegant transition-transform hover:scale-[1.02]"
          >
            Launch dashboard <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/assistant"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur hover:bg-card"
          >
            Try the AI assistant
          </Link>
        </div>

        <div className="relative mx-auto mt-20 max-w-6xl">
          <div className="absolute -inset-px rounded-2xl bg-gradient-primary opacity-40 blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card/80 shadow-elegant backdrop-blur-xl">
            <div className="flex items-center gap-1.5 border-b border-border bg-background/40 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
              <span className="ml-3 text-xs text-muted-foreground">smarttlhale.app / dashboard</span>
            </div>
            <div className="grid grid-cols-3 gap-4 p-6 text-left">
              <Card className="col-span-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Project health</p>
                  <span className="text-xs text-success">+6.2%</span>
                </div>
                <div className="mt-4 grid h-32 grid-cols-7 items-end gap-2">
                  {[40, 55, 48, 62, 70, 76, 84].map((v, i) => (
                    <div key={i} className="rounded-md bg-gradient-primary" style={{ height: `${v}%` }} />
                  ))}
                </div>
              </Card>
              <Card>
                <p className="text-sm font-medium">AI insights</p>
                <ul className="mt-3 space-y-3 text-xs text-muted-foreground">
                  <li className="flex gap-2"><Brain className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-glow" /> 2 team members trending toward burnout.</li>
                  <li className="flex gap-2"><Brain className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-glow" /> Atlas likely to ship 4 days early.</li>
                  <li className="flex gap-2"><Brain className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-glow" /> Warehouse OS success probability ↓ 23%.</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-widest text-primary-glow">Features</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Built for project managers who care about outcomes.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">Every feature is an AI co-pilot — not another form to fill out.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Card key={f.title} className="transition-transform hover:-translate-y-0.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/15 text-primary-glow">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="mt-4 text-base font-medium">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.body}</p>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="intelligence" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary-glow">Intelligence</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              An AI that actually understands your project.
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              SMARTtlhale reads your meetings, watches your timelines, and continuously
              scores project health — so you spot problems before they spot you.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {["Project Success Predictor", "Productivity Score per project", "Stakeholder brief in one click", "Smart prioritization across all work"].map((x) => (
                <li key={x} className="flex items-center gap-2 text-foreground/90">
                  <CheckCircle2 className="h-4 w-4 text-success" /> {x}
                </li>
              ))}
            </ul>
          </div>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Success predictor</p>
              <span className="text-xs text-muted-foreground">Mobile Banking v3</span>
            </div>
            <div className="mt-6 flex items-end gap-6">
              <div className="text-6xl font-semibold tracking-tight text-gradient">62%</div>
              <p className="pb-2 text-xs text-muted-foreground">
                Confidence: medium · Down 9% this week, primarily driven by compliance sign-off delays.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs">
              {[{ l: "On-time", v: "58%" }, { l: "Quality", v: "81%" }, { l: "Scope", v: "74%" }].map((s) => (
                <div key={s.l} className="rounded-lg border border-border bg-background/40 p-3">
                  <p className="text-lg font-semibold">{s.v}</p>
                  <p className="text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section id="workflow" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <Card className="overflow-hidden p-10 text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
            Ready to give your team an unfair advantage?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Step into the SMARTtlhale workspace and see your projects through an AI lens.
          </p>
          <Link
            to="/dashboard"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-elegant transition-transform hover:scale-[1.02]"
          >
            Open the workspace <ArrowRight className="h-4 w-4" />
          </Link>
        </Card>
      </section>

      <footer className="relative z-10 border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} SMARTtlhale Project Management Flow</p>
          <p>Intelligence for Every Project · Powered by <span className="text-foreground">Botlhale</span></p>
        </div>
      </footer>
    </div>
  );
}

