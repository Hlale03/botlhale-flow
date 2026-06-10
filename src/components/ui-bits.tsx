import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card/60 p-5 shadow-card backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Pill({
  tone = "default",
  children,
}: {
  tone?: "default" | "success" | "warning" | "danger" | "info";
  children: ReactNode;
}) {
  const tones: Record<string, string> = {
    default: "bg-secondary text-secondary-foreground",
    success: "bg-success/15 text-success",
    warning: "bg-warning/15 text-warning",
    danger: "bg-destructive/15 text-destructive",
    info: "bg-primary/15 text-primary-glow",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium capitalize",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

export function Bar({
  value,
  tone = "primary",
}: {
  value: number;
  tone?: "primary" | "success" | "warning" | "danger";
}) {
  const colors = {
    primary: "bg-gradient-primary",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-destructive",
  } as const;
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
      <div className={cn("h-full", colors[tone])} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

export function AIDisclaimer() {
  return (
    <p className="mt-3 text-[11px] text-muted-foreground">
      AI may make mistakes. Review outputs before acting on critical decisions.
    </p>
  );
}
