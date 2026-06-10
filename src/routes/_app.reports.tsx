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
