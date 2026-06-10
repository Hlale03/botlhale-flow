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
