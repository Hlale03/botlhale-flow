import { createFileRoute } from "@tanstack/react-router";
import { Card, SectionHeader, Pill, Bar } from "@/components/ui-bits";
import { projects, transactions, auditFindings, ZAR } from "@/lib/mock-data";
import { ShieldCheck, AlertTriangle, Wallet, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/_app/audit")({
  head: () => ({ meta: [{ title: "Audit · SMARTtlhale" }] }),
  component: AuditPage,
});

function AuditPage() {
  const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
  const totalSpent = projects.reduce((s, p) => s + p.spent, 0);
  const burnPct = Math.round((totalSpent / totalBudget) * 100);
  const flagged = transactions.filter((t) => t.flagged);
  const revenueYTD = 184_500_000;

  const stats = [
    { label: "Revenue YTD", value: ZAR(revenueYTD), delta: "+12.4% YoY", icon: TrendingUp },
    { label: "Portfolio budget", value: ZAR(totalBudget), delta: `${burnPct}% utilised`, icon: Wallet },
    { label: "Flagged transactions", value: flagged.length, delta: `${ZAR(flagged.reduce((s,t)=>s+t.amount,0))} at risk`, icon: AlertTriangle },
    { label: "Open audit findings", value: auditFindings.length, delta: "Read-only oversight", icon: ShieldCheck },
  ];

  return (
    <div>
      <SectionHeader
        title="Audit & Compliance"
        description="Ogone Matshidiso · Internal Auditor (Finance & Compliance Oversight). Read-only view of revenue, spend, and risk signals."
      />

      <div className="mb-4 rounded-lg border border-primary/30 bg-primary/5 p-3 text-xs text-foreground/80">
        <span className="font-medium text-primary-glow">Separation of duties:</span> this role has
        read-only access to financial and project data. Payments and approvals are not actioned here —
        only reviewed, analysed and reported for governance and fraud prevention.
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label}>
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
                <Icon className="h-4 w-4 text-primary-glow" />
              </div>
              <p className="mt-3 text-2xl font-semibold tracking-tight">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.delta}</p>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <p className="text-sm font-medium">Project budget utilisation</p>
          <p className="text-xs text-muted-foreground">Planned vs actual — all amounts in ZAR</p>
          <div className="mt-5 space-y-4">
            {projects.map((p) => {
              const pct = Math.round((p.spent / p.budget) * 100);
              const overPace = pct > p.progress + 10;
              return (
                <div key={p.id} className="rounded-lg border border-border bg-background/40 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.client} · {p.region}</p>
                    </div>
                    <Pill tone={overPace ? "danger" : pct > 90 ? "warning" : "success"}>
                      {pct}% spent · {p.progress}% done
                    </Pill>
                  </div>
                  <div className="mt-3 grid gap-3 text-xs text-muted-foreground sm:grid-cols-3">
                    <div><p className="text-foreground">{ZAR(p.budget)}</p><p>Budget</p></div>
                    <div><p className="text-foreground">{ZAR(p.spent)}</p><p>Spent</p></div>
                    <div><p className="text-foreground">{ZAR(p.budget - p.spent)}</p><p>Remaining</p></div>
                  </div>
                  <div className="mt-3">
                    <Bar value={pct} tone={overPace ? "danger" : pct > 90 ? "warning" : "primary"} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary-glow" />
            <p className="text-sm font-medium">Audit findings</p>
          </div>
          <ul className="mt-4 space-y-3">
            {auditFindings.map((f) => (
              <li key={f.id} className="rounded-lg border border-border bg-background/40 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium">{f.title}</p>
                  <Pill tone={f.severity === "critical" || f.severity === "high" ? "danger" : f.severity === "medium" ? "warning" : "info"}>{f.severity}</Pill>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">{f.project}</p>
                <p className="mt-2 text-xs text-foreground/90">{f.description}</p>
                <p className="mt-2 text-[11px] text-primary-glow">Recommendation: {f.recommendation}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Transaction ledger</p>
            <p className="text-xs text-muted-foreground">AI-flagged items highlighted for review</p>
          </div>
          <span className="text-xs text-muted-foreground">{transactions.length} transactions · last 30 days</span>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr className="border-b border-border">
                <th className="py-2 pr-3">Date</th>
                <th className="py-2 pr-3">Project</th>
                <th className="py-2 pr-3">Description</th>
                <th className="py-2 pr-3">Vendor</th>
                <th className="py-2 pr-3">Category</th>
                <th className="py-2 pr-3 text-right">Amount</th>
                <th className="py-2 pr-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b border-border/60 align-top">
                  <td className="py-3 pr-3 text-muted-foreground">{t.date}</td>
                  <td className="py-3 pr-3">{t.project}</td>
                  <td className="py-3 pr-3">
                    {t.description}
                    {t.flagged && t.flagReason && (
                      <p className="mt-1 text-[11px] text-destructive">⚠ {t.flagReason}</p>
                    )}
                  </td>
                  <td className="py-3 pr-3 text-muted-foreground">{t.vendor}</td>
                  <td className="py-3 pr-3 text-muted-foreground">{t.category}</td>
                  <td className="py-3 pr-3 text-right font-medium">{ZAR(t.amount)}</td>
                  <td className="py-3 pr-3">
                    {t.flagged ? <Pill tone="danger">Flagged</Pill> : <Pill tone="success">Clean</Pill>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground">AI may make mistakes. All flagged items require human auditor review before action.</p>
      </Card>
    </div>
  );
}
