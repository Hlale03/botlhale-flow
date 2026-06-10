import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FolderKanban,
  ListChecks,
  CalendarClock,
  FileBarChart2,
  Users,
  Bot,
  Settings,
  Search,
  Bell,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/tasks", label: "Tasks", icon: ListChecks },
  { to: "/meetings", label: "Meetings", icon: CalendarClock },
  { to: "/reports", label: "Reports", icon: FileBarChart2 },
  { to: "/team", label: "Team", icon: Users },
  { to: "/assistant", label: "AI Assistant", icon: Bot },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 bg-radial-glow opacity-60" />
      <div className="relative flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl md:flex md:flex-col">
          <div className="flex items-center gap-2 px-6 py-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-elegant">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight">SMARTtlhale</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Project Flow</span>
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-3">
            {nav.map((item) => {
              const active = pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="m-3 rounded-lg border border-sidebar-border bg-card/60 p-4">
            <p className="text-xs font-medium text-foreground">AI credits</p>
            <p className="mt-1 text-[11px] text-muted-foreground">842 / 1,000 this month</p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full bg-gradient-primary" style={{ width: "84%" }} />
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/70 px-4 backdrop-blur-xl md:px-8">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search projects, tasks, people…"
                className="h-9 w-full rounded-md border border-input bg-input/40 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>
            <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card/60 text-muted-foreground hover:text-foreground">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
            </button>
            <div className="flex items-center gap-2 rounded-md border border-border bg-card/60 px-2 py-1">
              <div className="h-6 w-6 rounded-full bg-gradient-primary" />
              <div className="hidden text-xs leading-tight sm:block">
                <p className="font-medium">Naledi K.</p>
                <p className="text-muted-foreground">Workspace admin</p>
              </div>
            </div>
          </header>
          <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
