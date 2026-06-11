export type Status = "on-track" | "at-risk" | "delayed" | "completed";
export type Priority = "critical" | "important" | "low";

export interface Project {
  id: string;
  name: string;
  client: string;
  category: string;
  progress: number;
  status: Status;
  health: number;
  dueDate: string;
  lead: string;
  team: string[];
  tasksDone: number;
  tasksTotal: number;
  risks: number;
  budget: number; // ZAR
  spent: number; // ZAR
  region: string;
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
  workload: number;
  productivity: number;
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

export interface Transaction {
  id: string;
  project: string;
  description: string;
  category: "Infrastructure" | "Software Licensing" | "Consulting" | "Cloud" | "Payroll" | "Travel" | "Hardware";
  amount: number; // ZAR
  date: string;
  vendor: string;
  flagged: boolean;
  flagReason?: string;
}

export interface AuditFinding {
  id: string;
  project: string;
  title: string;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  recommendation: string;
}

const avatar = (seed: string) =>
  `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundType=gradientLinear`;

export const ZAR = (n: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 }).format(n);

export const projects: Project[] = [
  {
    id: "p1",
    name: "Municipal Digital Services Platform",
    client: "City of Tshwane",
    category: "Government IT Modernization",
    progress: 72,
    status: "on-track",
    health: 86,
    dueDate: "Jul 24",
    lead: "Kagiso Mophuting",
    team: ["Kelebogile", "Tebogo", "Palesa", "Mpho"],
    tasksDone: 84,
    tasksTotal: 117,
    risks: 2,
    budget: 18_500_000,
    spent: 12_900_000,
    region: "Gauteng",
  },
  {
    id: "p2",
    name: "FNB Core Banking Upgrade v3",
    client: "First National Bank",
    category: "Banking Systems Upgrade",
    progress: 41,
    status: "at-risk",
    health: 62,
    dueDate: "Aug 12",
    lead: "Tshegofatso Sejake",
    team: ["Rebaone", "Onalenna", "Lethabo", "Karabo"],
    tasksDone: 38,
    tasksTotal: 92,
    risks: 5,
    budget: 42_000_000,
    spent: 24_600_000,
    region: "Western Cape",
  },
  {
    id: "p3",
    name: "MTN 5G Rollout — Eastern Cape",
    client: "MTN South Africa",
    category: "Telecom Network Expansion",
    progress: 18,
    status: "delayed",
    health: 41,
    dueDate: "Jun 30",
    lead: "Bontle Phiri",
    team: ["Tebogo", "Onalenna", "Tumelo"],
    tasksDone: 14,
    tasksTotal: 78,
    risks: 7,
    budget: 65_000_000,
    spent: 22_300_000,
    region: "Eastern Cape",
  },
  {
    id: "p4",
    name: "Azure Cloud Migration — Discovery Health",
    client: "Discovery Health",
    category: "Cloud Migration",
    progress: 96,
    status: "on-track",
    health: 94,
    dueDate: "Jun 18",
    lead: "Boipelo Kgosi",
    team: ["Mpho", "Rebaone"],
    tasksDone: 47,
    tasksTotal: 49,
    risks: 0,
    budget: 9_800_000,
    spent: 9_100_000,
    region: "Gauteng",
  },
  {
    id: "p5",
    name: "Shoprite National POS Rollout",
    client: "Shoprite Holdings",
    category: "Retail POS Rollout",
    progress: 100,
    status: "completed",
    health: 100,
    dueDate: "May 30",
    lead: "Neo Motsamai",
    team: ["Kelebogile", "Amogelang", "Dintle"],
    tasksDone: 64,
    tasksTotal: 64,
    risks: 0,
    budget: 27_400_000,
    spent: 26_100_000,
    region: "National",
  },
  {
    id: "p6",
    name: "UCT Student Information System Migration",
    client: "University of Cape Town",
    category: "System Implementation",
    progress: 55,
    status: "on-track",
    health: 79,
    dueDate: "Aug 02",
    lead: "Kagiso Mophuting",
    team: ["Lethabo", "Onalenna", "Palesa"],
    tasksDone: 28,
    tasksTotal: 51,
    risks: 1,
    budget: 11_200_000,
    spent: 5_400_000,
    region: "Western Cape",
  },
];

export const tasks: Task[] = [
  { id: "t1", title: "Design citizen portal IA & service catalog", project: "Municipal Digital Services Platform", assignee: "Kagiso Mophuting", priority: "important", status: "in-progress", due: "Jun 14" },
  { id: "t2", title: "Patch OAuth gateway — FNB SSO regression", project: "FNB Core Banking Upgrade v3", assignee: "Rebaone Motlhabi", priority: "critical", status: "in-progress", due: "Jun 11" },
  { id: "t3", title: "Migrate subscriber schema to Mongo v6", project: "MTN 5G Rollout — Eastern Cape", assignee: "Tebogo Seabela", priority: "critical", status: "todo", due: "Jun 13" },
  { id: "t4", title: "Stakeholder demo prep — Discovery exec", project: "Azure Cloud Migration — Discovery Health", assignee: "Boipelo Kgosi", priority: "important", status: "review", due: "Jun 16" },
  { id: "t5", title: "Draft release notes v3.1 (SARB compliance)", project: "FNB Core Banking Upgrade v3", assignee: "Lethabo Molefe", priority: "low", status: "todo", due: "Jun 20" },
  { id: "t6", title: "Eastern Cape tower-site readiness workshop", project: "MTN 5G Rollout — Eastern Cape", assignee: "Bontle Phiri", priority: "critical", status: "todo", due: "Jun 12" },
  { id: "t7", title: "Onboarding copy review (isiZulu + English)", project: "UCT Student Information System Migration", assignee: "Palesa Baebele", priority: "important", status: "in-progress", due: "Jun 18" },
  { id: "t8", title: "QA pass — payments & 3DS flow", project: "FNB Core Banking Upgrade v3", assignee: "Amogelang Dube", priority: "important", status: "review", due: "Jun 15" },
  { id: "t9", title: "Shoprite Western Cape handover", project: "Shoprite National POS Rollout", assignee: "Neo Motsamai", priority: "low", status: "done", due: "Jun 02" },
];

export const meetings: Meeting[] = [
  {
    id: "m1",
    title: "Tshwane Municipal Platform — weekly sync",
    date: "Jun 09",
    attendees: ["Kagiso Mophuting", "Tebogo Seabela", "Palesa Baebele", "Mpho Tlhomola"],
    summary:
      "Team reviewed sprint velocity and aligned on the citizen portal IA. Design is 2 days ahead; engineering is blocked on the SITA identity integration. Load-shedding caused 6 hours of dev downtime in Pretoria this week.",
    decisions: [
      "Adopt the new design tokens before Friday",
      "Postpone analytics widget to next sprint",
      "Provision Cape Town fallback environment to mitigate load-shedding",
    ],
    risks: [
      "SITA identity integration blocker may push UAT by 3 days",
      "Stage-6 load-shedding could disrupt next demo",
    ],
    actions: [
      { task: "Unblock SITA identity integration", owner: "Rebaone Motlhabi", due: "Jun 11" },
      { task: "Publish design tokens to Figma library", owner: "Kagiso Mophuting", due: "Jun 13" },
    ],
  },
  {
    id: "m2",
    title: "FNB Core Banking v3 — risk review",
    date: "Jun 07",
    attendees: ["Tshegofatso Sejake", "Lethabo Molefe", "Karabo Lekganyane", "Amogelang Dube"],
    summary:
      "Reviewed open risks for the v3 launch. Two critical SARB compliance items remain. Payments QA owner identified and gateway escalation path agreed.",
    decisions: ["Move launch by 1 week to harden SARB compliance"],
    risks: ["SARB compliance sign-off pending", "Third-party payment gateway SLA at risk"],
    actions: [
      { task: "SARB compliance sign-off package", owner: "Lethabo Molefe", due: "Jun 17" },
      { task: "Gateway escalation to vendor", owner: "Karabo Lekganyane", due: "Jun 12" },
    ],
  },
];

export const team: TeamMember[] = [
  { id: "u1", name: "Kagiso Mophuting", role: "Senior IT Project Manager", workload: 72, productivity: 88, burnoutRisk: "low", avatar: avatar("Kagiso Mophuting") },
  { id: "u2", name: "Tshegofatso Sejake", role: "Project Manager — Banking", workload: 94, productivity: 81, burnoutRisk: "high", avatar: avatar("Tshegofatso Sejake") },
  { id: "u3", name: "Bontle Phiri", role: "Programme Manager — Telecoms", workload: 88, productivity: 76, burnoutRisk: "medium", avatar: avatar("Bontle Phiri") },
  { id: "u4", name: "Boipelo Kgosi", role: "Cloud Migration PM", workload: 61, productivity: 92, burnoutRisk: "low", avatar: avatar("Boipelo Kgosi") },
  { id: "u5", name: "Neo Motsamai", role: "Rollout Project Manager", workload: 78, productivity: 85, burnoutRisk: "medium", avatar: avatar("Neo Motsamai") },
  { id: "u6", name: "Kelebogile Ramokgopa", role: "Lead Software Engineer", workload: 84, productivity: 86, burnoutRisk: "medium", avatar: avatar("Kelebogile Ramokgopa") },
  { id: "u7", name: "Tebogo Seabela", role: "Senior Backend Engineer", workload: 90, productivity: 79, burnoutRisk: "high", avatar: avatar("Tebogo Seabela") },
  { id: "u8", name: "Rebaone Motlhabi", role: "DevOps Engineer", workload: 67, productivity: 81, burnoutRisk: "low", avatar: avatar("Rebaone Motlhabi") },
  { id: "u9", name: "Mpho Tlhomola", role: "Cloud Engineer", workload: 58, productivity: 90, burnoutRisk: "low", avatar: avatar("Mpho Tlhomola") },
  { id: "u10", name: "Onalenna Ncube", role: "Frontend Engineer", workload: 74, productivity: 84, burnoutRisk: "low", avatar: avatar("Onalenna Ncube") },
  { id: "u11", name: "Palesa Baebele", role: "QA Lead", workload: 69, productivity: 91, burnoutRisk: "low", avatar: avatar("Palesa Baebele") },
  { id: "u12", name: "Lethabo Molefe", role: "QA Engineer", workload: 71, productivity: 83, burnoutRisk: "low", avatar: avatar("Lethabo Molefe") },
  { id: "u13", name: "Amogelang Dube", role: "QA Engineer", workload: 65, productivity: 86, burnoutRisk: "low", avatar: avatar("Amogelang Dube") },
  { id: "u14", name: "Tumelo Morake", role: "Business Analyst", workload: 60, productivity: 82, burnoutRisk: "low", avatar: avatar("Tumelo Morake") },
  { id: "u15", name: "Dintle Mokoena", role: "Operations Manager", workload: 73, productivity: 80, burnoutRisk: "low", avatar: avatar("Dintle Mokoena") },
  { id: "u16", name: "Karabo Lekganyane", role: "Vendor & Procurement Lead", workload: 66, productivity: 78, burnoutRisk: "low", avatar: avatar("Karabo Lekganyane") },
  { id: "u17", name: "Ogone Matshidiso", role: "Internal Auditor — Finance & Compliance", workload: 70, productivity: 89, burnoutRisk: "low", avatar: avatar("Ogone Matshidiso") },
  { id: "u18", name: "Kabelo Mothibi", role: "CTO", workload: 80, productivity: 88, burnoutRisk: "medium", avatar: avatar("Kabelo Mothibi") },
  { id: "u19", name: "Lorato Segone", role: "COO", workload: 76, productivity: 87, burnoutRisk: "low", avatar: avatar("Lorato Segone") },
  { id: "u20", name: "Bonolo Sebata", role: "CEO", workload: 78, productivity: 90, burnoutRisk: "low", avatar: avatar("Bonolo Sebata") },
];

export const risks: Risk[] = [
  { id: "r1", project: "MTN 5G Rollout — Eastern Cape", description: "Tower-site readiness slipping; load-shedding (Stage 4–6) extending generator-only runtime windows.", severity: "critical", score: 92, suggestion: "Reassign 2 site surveys to Tebogo; add 2-day buffer per tower milestone." },
  { id: "r2", project: "FNB Core Banking Upgrade v3", description: "SARB compliance sign-off slipping past launch window.", severity: "high", score: 84, suggestion: "Escalate to compliance lead; lock scope for v3.0." },
  { id: "r3", project: "FNB Core Banking Upgrade v3", description: "Third-party payments gateway SLA breach risk.", severity: "high", score: 76, suggestion: "Activate fallback provider in staging." },
  { id: "r4", project: "Municipal Digital Services Platform", description: "Connectivity instability at municipal regional offices delaying UAT.", severity: "medium", score: 58, suggestion: "Provision offline-first UAT mode + 4G failover for 3 sites." },
  { id: "r5", project: "UCT Student Information System Migration", description: "Copy/QA bottleneck on Palesa.", severity: "low", score: 32, suggestion: "Share review with Lethabo for the week." },
];

export const insights = [
  { title: "2 team members trending toward burnout", body: "Tshegofatso and Tebogo are above 88% workload for the 3rd consecutive week. Consider rebalancing 3–5 tasks across Rebaone and Mpho." },
  { title: "MTN 5G Rollout likely to slip", body: "Predicted success probability dropped from 71% → 46% in the last 7 days. Driven by Eastern Cape tower-site delays and Stage-6 load-shedding impact." },
  { title: "Tshwane Municipal Platform on track for early delivery", body: "If current velocity holds, the citizen portal can ship 4 days early. Consider pulling in 2 polish items before SITA UAT." },
];

export const productivityTrend = [
  { week: "W18", score: 71 },
  { week: "W19", score: 74 },
  { week: "W20", score: 78 },
  { week: "W21", score: 76 },
  { week: "W22", score: 81 },
  { week: "W23", score: 84 },
];

export const transactions: Transaction[] = [
  { id: "tx1", project: "MTN 5G Rollout — Eastern Cape", description: "Tower site lease — Mthatha cluster", category: "Infrastructure", amount: 1_850_000, date: "Jun 06", vendor: "Eastern Cape Property Holdings", flagged: false },
  { id: "tx2", project: "FNB Core Banking Upgrade v3", description: "Oracle DB licensing — annual", category: "Software Licensing", amount: 3_240_000, date: "Jun 04", vendor: "Oracle SA", flagged: false },
  { id: "tx3", project: "Municipal Digital Services Platform", description: "Independent consultant — unscheduled engagement", category: "Consulting", amount: 480_000, date: "Jun 09", vendor: "Nala Advisory (Pty) Ltd", flagged: true, flagReason: "Vendor not on approved supplier list. Engagement signed off without 3-quote procurement process." },
  { id: "tx4", project: "Azure Cloud Migration — Discovery Health", description: "Azure reserved instances — Q3", category: "Cloud", amount: 920_000, date: "Jun 02", vendor: "Microsoft SA", flagged: false },
  { id: "tx5", project: "FNB Core Banking Upgrade v3", description: "Travel — JHB ↔ CPT, 6 trips", category: "Travel", amount: 184_000, date: "Jun 05", vendor: "Travel With Flair", flagged: true, flagReason: "Trip count exceeds project travel budget by 38%. Recommend video sessions for non-critical reviews." },
  { id: "tx6", project: "MTN 5G Rollout — Eastern Cape", description: "Hardware — 5G small cells (batch 1)", category: "Hardware", amount: 6_400_000, date: "May 28", vendor: "Huawei SA", flagged: false },
  { id: "tx7", project: "Shoprite National POS Rollout", description: "Field engineer payroll — May", category: "Payroll", amount: 1_120_000, date: "May 31", vendor: "Internal payroll", flagged: false },
  { id: "tx8", project: "UCT Student Information System Migration", description: "Duplicate invoice — data migration sprint", category: "Consulting", amount: 312_000, date: "Jun 03", vendor: "BlueNorth Data", flagged: true, flagReason: "Invoice #BN-2241 appears duplicated against #BN-2237 (same scope, same week). Hold for vendor confirmation." },
  { id: "tx9", project: "Azure Cloud Migration — Discovery Health", description: "Security audit — penetration test", category: "Consulting", amount: 285_000, date: "Jun 01", vendor: "MWR CyberSec", flagged: false },
];

export const auditFindings: AuditFinding[] = [
  {
    id: "af1",
    project: "Municipal Digital Services Platform",
    title: "Procurement process bypass",
    severity: "high",
    description: "Consulting engagement of R480,000 signed off without 3-quote procurement process. Vendor not on approved supplier list.",
    recommendation: "Halt further payments to vendor. Open procurement exception ticket; require COO sign-off for re-engagement.",
  },
  {
    id: "af2",
    project: "UCT Student Information System Migration",
    title: "Potential duplicate invoice",
    severity: "medium",
    description: "Invoice BN-2241 (R312,000) matches BN-2237 in scope and period. Likely duplicate billing by vendor BlueNorth Data.",
    recommendation: "Hold payment. Request itemised reconciliation from vendor within 5 business days.",
  },
  {
    id: "af3",
    project: "FNB Core Banking Upgrade v3",
    title: "Travel budget variance",
    severity: "low",
    description: "Travel spend is 38% over plan YTD. Most trips relate to gateway vendor reviews that could be conducted remotely.",
    recommendation: "Switch non-critical reviews to MS Teams. Cap quarterly travel at R150k.",
  },
  {
    id: "af4",
    project: "MTN 5G Rollout — Eastern Cape",
    title: "Capex pacing risk",
    severity: "medium",
    description: "34% of budget spent against 18% of project progress. Risk of cost overrun if site delays continue.",
    recommendation: "Re-baseline cost-to-complete with PMO; lock equipment orders for Phase 2 until tower readiness > 60%.",
  },
];
