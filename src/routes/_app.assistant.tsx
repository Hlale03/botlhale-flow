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
  { role: "ai", content: "Dumela Kagiso 👋 — I'm your SMARTtlhale assistant. I have full context across your South African IT project portfolio. Ask me anything." },
];

const suggestions = [
  "What tasks are overdue this week?",
  "Summarize the Tshwane Municipal sync",
  "Which projects are at risk?",
  "Who is at risk of burnout?",
  "Which projects have budget overrun risk?",
];

function respond(q: string): string {
  const lower = q.toLowerCase();
  if (lower.includes("budget") || lower.includes("overrun") || lower.includes("spend"))
    return "MTN 5G Rollout — Eastern Cape has spent 34% of budget against 18% delivery — capex pacing risk. FNB Core Banking v3 is 38% over its travel budget YTD. Recommend re-baselining MTN cost-to-complete and switching non-critical FNB vendor reviews to remote.";
  if (lower.includes("overdue")) return "14 tasks are overdue across 4 projects. The largest cluster (6) sits on the MTN 5G Rollout — Eastern Cape — owner: Bontle Phiri. Want me to draft a re-plan that accounts for Stage-4 load-shedding windows?";
  if (lower.includes("risk")) return "FNB Core Banking v3 and MTN 5G Rollout are the two most at-risk. The biggest single risk is Eastern Cape tower-site readiness compounded by load-shedding (score 92). Suggested mitigation: reassign 2 site surveys to Tebogo and add a 2-day buffer per tower milestone.";
  if (lower.includes("burnout")) return "Tshegofatso Sejake (94% workload, 3 weeks running) and Tebogo Seabela (90%) are showing burnout signals. I recommend redistributing 3 tasks to Rebaone and Mpho.";
  if (lower.includes("summar")) return "Tshwane Municipal Platform weekly sync — Decisions: adopt new tokens by Friday; provision Cape Town fallback for load-shedding. Risks: SITA identity integration blocker (3-day UAT slip); Stage-6 load-shedding affecting next demo. Actions: Rebaone to unblock SITA integration by Jun 11; Kagiso to publish design tokens by Jun 13.";
  return "Across the SA portfolio: average project health is 77, completion is 63%, and there are 3 critical risks — mostly tied to Eastern Cape rollout and SARB compliance. Tell me what you'd like to dig into.";
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
