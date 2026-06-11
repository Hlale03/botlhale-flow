import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
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
import logoUrl from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SMARTtlhale — AI-Powered IT Project Management for SA Enterprises" },
      {
        name: "description",
        content:
          "SMARTtlhale Project Management Flow is an AI-powered IT Project Management platform built for South African enterprise software, infrastructure and cloud projects. Powered by Botlhale.",
      },
      { property: "og:title", content: "SMARTtlhale — AI-Powered IT Project Management" },
      { property: "og:description", content: "Built for African Innovation. Designed for Enterprise IT Excellence." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: CalendarClock, title: "Meeting Summarizer", body: "Turn 60-minute project calls into decisions, risks and owned action items — in seconds." },
  { icon: ShieldAlert, title: "Risk Detection Engine", body: "Continuously scans deadlines, workloads, vendor SLAs and infrastructure constraints — including load-shedding and connectivity risk." },
  { icon: FileBarChart2, title: "Executive Status Reports", body: "PMO-ready weekly reports for CTOs, COOs and steering committees — generated and exportable in one click." },
  { icon: Bot, title: "Project Chat Assistant", body: "Ask anything across your IT portfolio: 'what's overdue?', 'which projects are over budget?', 'who is at risk of burnout?'." },
  { icon: Workflow, title: "Smart Prioritization", body: "AI ranks tasks by urgency, impact and dependencies so engineering teams ship the right work first." },
  { icon: Users, title: "Burnout & Workload Intel", body: "Detect overloaded engineers and PMs early — rebalance before a sprint, a release, or a rollout slips." },
];

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2.5">
          <img src={logoUrl} alt="SMARTtlhale logo" width={36} height={36} className="h-9 w-9 rounded-lg bg-card object-contain p-1 shadow-elegant ring-1 ring-border" />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">SMARTtlhale</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">IT Project Flow</span>
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
          <span className="h-1.5 w-1.5 rounded-full bg-success" /> Built for African Innovation · Powered by Botlhale AI
        </div>
        <h1 className="mx-auto mt-6 max-w-4xl text-balance text-5xl font-semibold tracking-tight md:text-7xl">
          Intelligence for every <span className="text-gradient">IT project.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg">
          SMARTtlhale Project Management Flow is the AI co-pilot for South African IT project managers
          running software, infrastructure, cloud and enterprise system projects. It summarizes meetings,
          detects risks, audits spend, and helps your team ship — without the busywork.
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
                  <p className="text-sm font-medium">Portfolio health · SA region</p>
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
                  <li className="flex gap-2"><Brain className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-glow" /> Tshegofatso & Tebogo trending toward burnout.</li>
                  <li className="flex gap-2"><Brain className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-glow" /> Tshwane Municipal Platform may ship 4 days early.</li>
                  <li className="flex gap-2"><Brain className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-glow" /> MTN 5G Eastern Cape success probability ↓ 25%.</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-widest text-primary-glow">IT Project Intelligence</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Built for IT project managers shipping real systems.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">Software delivery, infrastructure rollouts, system implementations, cloud migrations and IT operations — all on one intelligent platform.</p>
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
            <p className="text-xs uppercase tracking-widest text-primary-glow">South African Context</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              An AI that understands your environment.
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              SMARTtlhale models the realities of South African enterprise IT — load-shedding windows,
              regional connectivity, SARB &amp; POPIA compliance, vendor SLAs, and provincial rollout
              constraints — so risk signals reflect how projects actually behave on the ground.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Project Success Predictor tuned for SA delivery risk",
                "Load-shedding & connectivity-aware planning",
                "Internal audit & finance oversight (separation of duties)",
                "Executive stakeholder brief in one click",
              ].map((x) => (
                <li key={x} className="flex items-center gap-2 text-foreground/90">
                  <CheckCircle2 className="h-4 w-4 text-success" /> {x}
                </li>
              ))}
            </ul>
          </div>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Success predictor</p>
              <span className="text-xs text-muted-foreground">FNB Core Banking v3</span>
            </div>
            <div className="mt-6 flex items-end gap-6">
              <div className="text-6xl font-semibold tracking-tight text-gradient">62%</div>
              <p className="pb-2 text-xs text-muted-foreground">
                Confidence: medium · Down 9% this week, primarily driven by SARB compliance sign-off delays and travel-budget variance.
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
            Built for African Innovation. Designed for Enterprise IT Excellence.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Step into the SMARTtlhale workspace and see your IT portfolio through an AI lens.
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

