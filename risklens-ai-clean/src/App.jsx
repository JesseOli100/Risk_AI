import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  Brain,
  Building2,
  ChevronRight,
  FileText,
  LineChart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Card({ className = "", children }) {
  return <div className={cn("border border-slate-800 bg-slate-900 rounded-3xl", className)}>{children}</div>;
}

function CardHeader({ className = "", children }) {
  return <div className={cn("p-6 pb-0", className)}>{children}</div>;
}

function CardTitle({ className = "", children }) {
  return <h2 className={cn("text-xl font-semibold", className)}>{children}</h2>;
}

function CardDescription({ className = "", children }) {
  return <p className={cn("mt-1 text-sm text-slate-400", className)}>{children}</p>;
}

function CardContent({ className = "", children }) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

function Button({ className = "", variant = "default", children, ...props }) {
  const base = "inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-medium transition";
  const styles =
    variant === "outline"
      ? "border border-slate-700 bg-transparent text-slate-100 hover:bg-slate-800"
      : "bg-blue-600 text-white hover:bg-blue-500";

  return (
    <button className={cn(base, styles, className)} {...props}>
      {children}
    </button>
  );
}

function Badge({ className = "", children }) {
  return <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-sm font-medium", className)}>{children}</span>;
}

function Input({ className = "", ...props }) {
  return (
    <input
      className={cn(
        "w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-500",
        className
      )}
      {...props}
    />
  );
}

function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={cn(
        "w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-500",
        className
      )}
      {...props}
    />
  );
}

function Progress({ value = 0, className = "" }) {
  return (
    <div className={cn("h-3 w-full overflow-hidden rounded-full bg-slate-800", className)}>
      <div className="h-full rounded-full bg-sky-500 transition-all" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

function Tabs({ defaultValue, children, className = "" }) {
  const childrenArray = React.Children.toArray(children);
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className={className}>
      {childrenArray.map((child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, { activeTab, setActiveTab });
      })}
    </div>
  );
}

function TabsList({ className = "", children, activeTab, setActiveTab }) {
  const childrenArray = React.Children.toArray(children);
  return (
    <div className={cn("grid gap-2 rounded-2xl bg-slate-950 p-1", className)}>
      {childrenArray.map((child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, { activeTab, setActiveTab });
      })}
    </div>
  );
}

function TabsTrigger({ value, children, activeTab, setActiveTab }) {
  const isActive = activeTab === value;
  return (
    <button
      onClick={() => setActiveTab(value)}
      className={cn(
        "rounded-2xl px-4 py-2.5 text-sm font-medium transition",
        isActive ? "bg-slate-800 text-white" : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
      )}
    >
      {children}
    </button>
  );
}

function TabsContent({ value, children, activeTab, className = "" }) {
  if (activeTab !== value) return null;
  return <div className={className}>{children}</div>;
}

const borrowers = [
  {
    id: "BR-2041",
    name: "Alta Vista Dental Group",
    industry: "Healthcare Services",
    revenue: 12.4,
    ebitda: 2.1,
    dti: 43,
    dscr: 1.31,
    utilization: 68,
    risk: 32,
    trend: "Stable",
    flags: ["Revenue concentration", "Tight DSCR"],
    memo:
      "Borrower shows resilient revenue and acceptable leverage, but downside sensitivity is elevated if same-store sales decline more than 8%. Recommend conditional approval with tighter covenant package and 90-day reporting cadence.",
  },
  {
    id: "BR-1827",
    name: "Summit Freight Systems",
    industry: "Transportation & Logistics",
    revenue: 21.8,
    ebitda: 2.9,
    dti: 57,
    dscr: 1.08,
    utilization: 84,
    risk: 74,
    trend: "Deteriorating",
    flags: ["Weak cash conversion", "High utilization", "Margin compression"],
    memo:
      "Borrower is trending negative under current freight assumptions. Stress scenarios indicate elevated covenant breach risk within 2 quarters. Recommend decline or restructure with collateral enhancement and pricing adjustment.",
  },
  {
    id: "BR-2215",
    name: "North Ridge Components",
    industry: "Light Manufacturing",
    revenue: 18.7,
    ebitda: 3.4,
    dti: 36,
    dscr: 1.56,
    utilization: 49,
    risk: 24,
    trend: "Improving",
    flags: ["Customer diversification improving"],
    memo:
      "Healthy debt service coverage, lower leverage, and recent diversification improve the credit story. Recommend approval with standard monitoring and annual field exam only if inventory concentration rises.",
  },
];

const kpis = [
  { label: "Borrowers Monitored", value: "148", sub: "+12 this quarter", icon: Building2 },
  { label: "Avg. Risk Score", value: "41", sub: "-4 vs last month", icon: ShieldCheck },
  { label: "Early Warning Alerts", value: "11", sub: "3 high-priority", icon: AlertTriangle },
  { label: "AI Memos Generated", value: "392", sub: "+27 this week", icon: Brain },
];

function scoreColor(score) {
  if (score >= 70) return "text-red-500";
  if (score >= 40) return "text-amber-500";
  return "text-emerald-400";
}

function riskLabel(score) {
  if (score >= 70) return "High Risk";
  if (score >= 40) return "Moderate Risk";
  return "Low Risk";
}

export default function App() {
  const [selectedId, setSelectedId] = useState(borrowers[0].id);
  const [salesShock, setSalesShock] = useState(8);
  const [marginShock, setMarginShock] = useState(2);
  const [customNote, setCustomNote] = useState("Focus on covenant structure, downside risk, and approval rationale.");

  const selected = useMemo(() => borrowers.find((b) => b.id === selectedId) ?? borrowers[0], [selectedId]);

  const stressedDscr = useMemo(() => {
    const impact = salesShock * 0.03 + marginShock * 0.06;
    return Math.max(0.72, +(selected.dscr - impact).toFixed(2));
  }, [selected, salesShock, marginShock]);

  const stressedRisk = useMemo(() => {
    return Math.min(95, Math.round(selected.risk + salesShock * 1.6 + marginShock * 3.2));
  }, [selected, salesShock, marginShock]);

  const recommendation = useMemo(() => {
    if (stressedRisk >= 75 || stressedDscr < 1.1) return "Decline / Restructure";
    if (stressedRisk >= 45 || stressedDscr < 1.25) return "Conditional Approval";
    return "Approve";
  }, [stressedRisk, stressedDscr]);

  const memoPreview = useMemo(() => {
    return `AI Credit Memo — ${selected.name}\n\nBase Case: ${riskLabel(selected.risk)} with ${selected.trend.toLowerCase()} trend.\nStress Case: ${riskLabel(stressedRisk)} under ${salesShock}% sales compression and ${marginShock} pt margin pressure.\nRecommendation: ${recommendation}.\n\nAnalyst Focus: ${customNote}`;
  }, [selected, stressedRisk, salesShock, marginShock, recommendation, customNote]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl p-4 md:p-8">
        <div className="mb-8">
          <Card className="border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 shadow-2xl">
            <CardContent className="p-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-2xl bg-blue-500/15 p-3 text-blue-300">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">RiskLens AI</h1>
                  <p className="text-slate-400">Private credit early-warning dashboard with explainable AI memos.</p>
                </div>
              </div>

              <div className="mb-6 flex flex-wrap gap-2">
                <Badge className="bg-blue-500/15 text-blue-200">React</Badge>
                <Badge className="bg-violet-500/15 text-violet-200">Vite</Badge>
                <Badge className="bg-emerald-500/15 text-emerald-200">Credit Risk</Badge>
                <Badge className="bg-amber-500/15 text-amber-200">Explainable AI</Badge>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {kpis.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-sm text-slate-400">{item.label}</span>
                        <Icon className="h-4 w-4 text-slate-400" />
                      </div>
                      <div className="text-3xl font-semibold">{item.value}</div>
                      <div className="mt-1 text-sm text-slate-500">{item.sub}</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Card>
            <CardHeader>
              <CardTitle>Borrower Queue</CardTitle>
              <CardDescription>Select a borrower to review risk, flags, and AI recommendation.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {borrowers.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedId(b.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    selectedId === b.id
                      ? "border-blue-500/60 bg-blue-500/10"
                      : "border-slate-800 bg-slate-950 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold">{b.name}</div>
                      <div className="mt-1 text-sm text-slate-400">
                        {b.industry} • {b.id}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${scoreColor(b.risk)}`}>{b.risk}</div>
                      <div className="text-xs text-slate-500">{riskLabel(b.risk)}</div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-sm text-slate-300">
                    <div className="rounded-xl bg-slate-900 p-3">
                      DSCR
                      <br />
                      <span className="text-lg font-semibold">{b.dscr}x</span>
                    </div>
                    <div className="rounded-xl bg-slate-900 p-3">
                      DTI
                      <br />
                      <span className="text-lg font-semibold">{b.dti}%</span>
                    </div>
                    <div className="rounded-xl bg-slate-900 p-3">
                      Util.
                      <br />
                      <span className="text-lg font-semibold">{b.utilization}%</span>
                    </div>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle>{selected.name}</CardTitle>
                  <CardDescription>
                    {selected.industry} • {selected.id}
                  </CardDescription>
                </div>
                <Badge className="bg-slate-800 text-slate-200">Trend: {selected.trend}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="stress">Stress Test</TabsTrigger>
                  <TabsTrigger value="memo">AI Memo</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-4 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-2xl border border-slate-800 p-4">
                      <div className="text-sm text-slate-400">Revenue</div>
                      <div className="text-2xl font-semibold">${selected.revenue}M</div>
                    </div>
                    <div className="rounded-2xl border border-slate-800 p-4">
                      <div className="text-sm text-slate-400">EBITDA</div>
                      <div className="text-2xl font-semibold">${selected.ebitda}M</div>
                    </div>
                    <div className="rounded-2xl border border-slate-800 p-4">
                      <div className="text-sm text-slate-400">Base Risk</div>
                      <div className={`text-2xl font-semibold ${scoreColor(selected.risk)}`}>{selected.risk}</div>
                    </div>
                    <div className="rounded-2xl border border-slate-800 p-4">
                      <div className="text-sm text-slate-400">Recommendation</div>
                      <div className="text-2xl font-semibold">{selected.risk >= 45 ? "Review" : "Approve"}</div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-800 p-4">
                    <div className="mb-3 flex items-center gap-2 text-sm text-slate-400">
                      <LineChart className="h-4 w-4" /> Risk Score
                    </div>
                    <Progress value={selected.risk} className="h-3" />
                    <div className="mt-2 text-sm text-slate-500">
                      Explainable score synthesized from leverage, coverage, utilization, and qualitative flags.
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-800 p-4">
                    <div className="mb-3 text-sm text-slate-400">Key Flags</div>
                    <div className="flex flex-wrap gap-2">
                      {selected.flags.map((flag) => (
                        <Badge key={flag} className="bg-amber-500/10 text-amber-200">
                          {flag}
                        </Badge>
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-300">{selected.memo}</p>
                  </div>
                </TabsContent>

                <TabsContent value="stress" className="mt-4 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-800 p-4">
                      <label className="mb-2 block text-sm text-slate-400">Sales Shock (%)</label>
                      <Input type="number" value={salesShock} onChange={(e) => setSalesShock(Number(e.target.value || 0))} />
                    </div>
                    <div className="rounded-2xl border border-slate-800 p-4">
                      <label className="mb-2 block text-sm text-slate-400">Margin Shock (pts)</label>
                      <Input type="number" value={marginShock} onChange={(e) => setMarginShock(Number(e.target.value || 0))} />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-slate-800 p-4">
                      <div className="text-sm text-slate-400">Stressed DSCR</div>
                      <div className={`text-3xl font-bold ${stressedDscr < 1.1 ? "text-red-500" : stressedDscr < 1.25 ? "text-amber-500" : "text-emerald-500"}`}>
                        {stressedDscr}x
                      </div>
                    </div>
                    <div className="rounded-2xl border border-slate-800 p-4">
                      <div className="text-sm text-slate-400">Stressed Risk</div>
                      <div className={`text-3xl font-bold ${scoreColor(stressedRisk)}`}>{stressedRisk}</div>
                    </div>
                    <div className="rounded-2xl border border-slate-800 p-4">
                      <div className="text-sm text-slate-400">Decision</div>
                      <div className="text-3xl font-bold">{recommendation}</div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="memo" className="mt-4 space-y-4">
                  <div className="rounded-2xl border border-slate-800 p-4">
                    <label className="mb-2 block text-sm text-slate-400">Analyst Prompt Focus</label>
                    <Textarea value={customNote} onChange={(e) => setCustomNote(e.target.value)} className="min-h-[110px]" />
                  </div>
                  <div className="rounded-2xl border border-slate-800 p-4">
                    <div className="mb-3 flex items-center gap-2 text-sm text-slate-400">
                      <FileText className="h-4 w-4" /> AI Memo Preview
                    </div>
                    <pre className="whitespace-pre-wrap text-sm leading-6 text-slate-200">{memoPreview}</pre>
                  </div>
                  <div className="flex gap-3">
                    <Button>
                      <ChevronRight className="mr-2 h-4 w-4" /> Export Memo
                    </Button>
                    <Button variant="outline">Send to Review Queue</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
