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
