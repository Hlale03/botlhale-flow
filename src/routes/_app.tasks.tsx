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
