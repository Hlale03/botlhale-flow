export type Status = "on-track" | "at-risk" | "delayed" | "completed";
export type Priority = "critical" | "important" | "low";

export interface Project {
  id: string;
  name: string;
  client: string;
  progress: number;
  status: Status;
  health: number;
  dueDate: string;
  lead: string;
  team: string[];
  tasksDone: number;
  tasksTotal: number;
  risks: number;
}

export interface Task {
  id: string;
  title: string;
  project: string;
  assignee: string;
  priority: Priority;
  status: "todo" | "in-progress" | "review" | "done";
  due: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  attendees: string[];
  summary: string;
  decisions: string[];
  risks: string[];
  actions: { task: string; owner: string; due: string }[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  workload: number; // %
  productivity: number; // 0-100
  burnoutRisk: "low" | "medium" | "high";
  avatar: string;
}

export interface Risk {
  id: string;
  project: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  score: number;
  suggestion: string;
}

const avatar = (seed: string) =>
  `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundType=gradientLinear`;

export const projects: Project[] = ([
  { id: "p1", name: "Atlas Platform Redesign", client: "Northwind Co.", progress: 72, status: "on-track", health: 88, dueDate: "Jul 24", lead: "Naledi Khumalo", team: ["Naledi", "Sipho", "Amara", "Tendai"], tasksDone: 84, tasksTotal: 117, risks: 2 },
  { id: "p2", name: "Mobile Banking v3", client: "FirstCape Bank", progress: 41, status: "at-risk", health: 64, dueDate: "Aug 12", lead: "Sipho Dlamini", team: ["Sipho", "Lerato", "Kabelo"], tasksDone: 38, tasksTotal: 92, risks: 5 },
  { id: "p3", name: "Warehouse OS Migration", client: "Karoo Logistics", progress: 18, status: "delayed", health: 42, dueDate: "Jun 30", lead: "Amara Okeke", team: ["Amara", "Jaco", "Pumi"], tasksDone: 14, tasksTotal: 78, risks: 7 },
  { id: "p4", name: "Analytics Insights Engine", client: "Internal", progress: 96, status: "on-track", health: 94, dueDate: "Jun 18", lead: "Tendai Moyo", team: ["Tendai", "Lerato"], tasksDone: 47, tasksTotal: 49, risks: 0 },
  { id: "p5", name: "Customer Portal Launch", client: "Aurora Health", progress: 100, status: "completed", health: 100, dueDate: "May 30", lead: "Lerato Ndlovu", team: ["Lerato", "Naledi"], tasksDone: 64, tasksTotal: 64, risks: 0 },
  { id: "p6", name: "AI Onboarding Flow", client: "Lumen Edu", progress: 55, status: "on-track", health: 81, dueDate: "Aug 02", lead: "Kabelo Mokoena", team: ["Kabelo", "Sipho", "Pumi"], tasksDone: 28, tasksTotal: 51, risks: 1 },
] as Project[]);

export const tasks: Task[] = [
  { id: "t1", title: "Draft design tokens for Atlas system", project: "Atlas Platform Redesign", assignee: "Naledi Khumalo", priority: "important", status: "in-progress", due: "Jun 14" },
  { id: "t2", title: "Fix OAuth callback regression", project: "Mobile Banking v3", assignee: "Sipho Dlamini", priority: "critical", status: "in-progress", due: "Jun 11" },
  { id: "t3", title: "Migrate inventory schema to v2", project: "Warehouse OS Migration", assignee: "Amara Okeke", priority: "critical", status: "todo", due: "Jun 13" },
  { id: "t4", title: "Stakeholder demo prep", project: "Analytics Insights Engine", assignee: "Tendai Moyo", priority: "important", status: "review", due: "Jun 16" },
  { id: "t5", title: "Write release notes v3.1", project: "Mobile Banking v3", assignee: "Lerato Ndlovu", priority: "low", status: "todo", due: "Jun 20" },
  { id: "t6", title: "Risk mitigation workshop", project: "Warehouse OS Migration", assignee: "Jaco van Wyk", priority: "critical", status: "todo", due: "Jun 12" },
  { id: "t7", title: "Onboarding copy review", project: "AI Onboarding Flow", assignee: "Kabelo Mokoena", priority: "important", status: "in-progress", due: "Jun 18" },
  { id: "t8", title: "QA pass — payments", project: "Mobile Banking v3", assignee: "Pumi Zulu", priority: "important", status: "review", due: "Jun 15" },
  { id: "t9", title: "Customer portal handover", project: "Customer Portal Launch", assignee: "Lerato Ndlovu", priority: "low", status: "done", due: "Jun 02" },
];

export const meetings: Meeting[] = [
  {
    id: "m1",
    title: "Atlas weekly sync",
    date: "Jun 09",
    attendees: ["Naledi", "Sipho", "Amara", "Tendai"],
    summary:
      "Team reviewed sprint velocity and aligned on the redesign tokens. Design is 2 days ahead, engineering is blocked on the new auth library.",
    decisions: [
      "Adopt new design tokens before Friday",
      "Postpone analytics widget to next sprint",
    ],
    risks: ["Auth library blocker may push release by 3 days"],
    actions: [
      { task: "Unblock auth integration", owner: "Sipho Dlamini", due: "Jun 11" },
      { task: "Publish design tokens", owner: "Naledi Khumalo", due: "Jun 13" },
    ],
  },
  {
    id: "m2",
    title: "Banking v3 risk review",
    date: "Jun 07",
    attendees: ["Sipho", "Lerato", "Kabelo", "Pumi"],
    summary:
      "Reviewed open risks for the v3 launch. Two critical compliance items remain. Payment QA owner identified.",
    decisions: ["Move launch by 1 week to harden compliance"],
    risks: ["Compliance sign-off pending", "Third-party gateway SLA"],
    actions: [
      { task: "Compliance sign-off package", owner: "Lerato Ndlovu", due: "Jun 17" },
      { task: "Gateway escalation", owner: "Kabelo Mokoena", due: "Jun 12" },
    ],
  },
];

export const team: TeamMember[] = [
  { id: "u1", name: "Naledi Khumalo", role: "Design Lead", workload: 72, productivity: 88, burnoutRisk: "low", avatar: avatar("Naledi Khumalo") },
  { id: "u2", name: "Sipho Dlamini", role: "Engineering Lead", workload: 94, productivity: 81, burnoutRisk: "high", avatar: avatar("Sipho Dlamini") },
  { id: "u3", name: "Amara Okeke", role: "Senior PM", workload: 88, productivity: 76, burnoutRisk: "medium", avatar: avatar("Amara Okeke") },
  { id: "u4", name: "Tendai Moyo", role: "Data Engineer", workload: 61, productivity: 92, burnoutRisk: "low", avatar: avatar("Tendai Moyo") },
  { id: "u5", name: "Lerato Ndlovu", role: "Product Manager", workload: 78, productivity: 85, burnoutRisk: "medium", avatar: avatar("Lerato Ndlovu") },
  { id: "u6", name: "Kabelo Mokoena", role: "Frontend Engineer", workload: 67, productivity: 79, burnoutRisk: "low", avatar: avatar("Kabelo Mokoena") },
  { id: "u7", name: "Jaco van Wyk", role: "Backend Engineer", workload: 84, productivity: 74, burnoutRisk: "medium", avatar: avatar("Jaco van Wyk") },
  { id: "u8", name: "Pumi Zulu", role: "QA Engineer", workload: 58, productivity: 90, burnoutRisk: "low", avatar: avatar("Pumi Zulu") },
];

export const risks: Risk[] = [
  { id: "r1", project: "Warehouse OS Migration", description: "Schema migration owner overloaded; 7 dependent tasks at risk.", severity: "critical", score: 92, suggestion: "Reassign 2 tasks to Jaco; add a buffer day to milestone." },
  { id: "r2", project: "Mobile Banking v3", description: "Compliance sign-off slipping past launch window.", severity: "high", score: 81, suggestion: "Escalate to compliance lead; lock scope for v3.0." },
  { id: "r3", project: "Mobile Banking v3", description: "Third-party gateway SLA breach risk.", severity: "high", score: 74, suggestion: "Activate fallback provider in staging." },
  { id: "r4", project: "Atlas Platform Redesign", description: "Design system adoption blocked by auth library.", severity: "medium", score: 58, suggestion: "Parallelize auth integration with token rollout." },
  { id: "r5", project: "AI Onboarding Flow", description: "Copy review bottleneck on Kabelo.", severity: "low", score: 32, suggestion: "Share review with Lerato for the week." },
];

export const insights = [
  { title: "2 team members trending toward burnout", body: "Sipho and Amara are above 85% workload for the 3rd consecutive week. Consider rebalancing 3–5 tasks." },
  { title: "Warehouse OS Migration likely to slip", body: "Predicted success probability dropped from 71% → 48% in the last 7 days. Driven by schema delays." },
  { title: "Atlas Platform on track for early delivery", body: "If current velocity holds, Atlas can ship 4 days early. Consider pulling in 2 polish items." },
];

export const productivityTrend = [
  { week: "W18", score: 71 },
  { week: "W19", score: 74 },
  { week: "W20", score: 78 },
  { week: "W21", score: 76 },
  { week: "W22", score: 81 },
  { week: "W23", score: 84 },
];
