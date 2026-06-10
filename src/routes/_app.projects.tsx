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
