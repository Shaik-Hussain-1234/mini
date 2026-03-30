import { motion } from "framer-motion";
import { TrendingUp, Flame, DollarSign, Zap, ArrowUpRight } from "lucide-react";

const trendingTech = [
  { name: "AI / Machine Learning", growth: 92, category: "AI" },
  { name: "Large Language Models", growth: 88, category: "AI" },
  { name: "Cloud Computing (AWS/Azure)", growth: 85, category: "Cloud" },
  { name: "DevOps & Platform Engineering", growth: 78, category: "DevOps" },
  { name: "Cybersecurity", growth: 75, category: "Security" },
  { name: "Rust Programming", growth: 72, category: "Language" },
  { name: "Web3 / Blockchain", growth: 65, category: "Web3" },
  { name: "Edge Computing", growth: 60, category: "Infrastructure" },
];

const topPaying = [
  { role: "AI/ML Engineer", salary: "$150K - $250K", growth: "+35%" },
  { role: "Cloud Architect", salary: "$140K - $200K", growth: "+28%" },
  { role: "Security Engineer", salary: "$130K - $190K", growth: "+32%" },
  { role: "Data Engineer", salary: "$120K - $180K", growth: "+25%" },
  { role: "DevOps Engineer", salary: "$115K - $175K", growth: "+22%" },
  { role: "Full Stack Developer", salary: "$100K - $165K", growth: "+18%" },
];

const emergingTech = [
  { name: "Quantum Computing", status: "Early Stage", impact: "Revolutionary" },
  { name: "AI Agents", status: "Rapid Growth", impact: "High" },
  { name: "Spatial Computing (AR/VR)", status: "Growing", impact: "High" },
  { name: "Green Tech / Sustainability", status: "Growing", impact: "Medium" },
];

const TechTrendsPage = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <TrendingUp className="h-6 w-6 text-primary" /> Tech Trends Dashboard
      </h1>
      <p className="text-muted-foreground text-sm mt-1">Trending technologies, fastest growing skills, and highest paying roles.</p>
    </div>

    <div className="glass-card p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2"><Flame className="h-5 w-5 text-neon-amber" /> Trending Technologies</h2>
      <div className="space-y-3">
        {trendingTech.map((t) => (
          <div key={t.name}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-foreground">{t.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full border border-primary/20 bg-primary/5 text-primary">{t.category}</span>
                <span className="text-sm font-bold text-primary">{t.growth}%</span>
              </div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${t.growth}%` }} transition={{ duration: 1, ease: "easeOut" }} className="h-full rounded-full bg-primary" />
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2"><DollarSign className="h-5 w-5 text-neon-emerald" /> Highest Paying Roles</h2>
        <div className="space-y-3">
          {topPaying.map((r) => (
            <div key={r.role} className="p-3 rounded-lg bg-secondary/30 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-foreground">{r.role}</h3>
                <p className="text-xs text-neon-emerald">{r.salary}</p>
              </div>
              <span className="text-xs text-primary flex items-center gap-0.5"><ArrowUpRight className="h-3 w-3" /> {r.growth}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2"><Zap className="h-5 w-5 text-neon-purple" /> Emerging Technologies</h2>
        <div className="space-y-3">
          {emergingTech.map((t) => (
            <div key={t.name} className="p-4 rounded-lg bg-secondary/30">
              <h3 className="text-sm font-semibold text-foreground">{t.name}</h3>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-muted-foreground">Status: <span className="text-primary">{t.status}</span></span>
                <span className="text-xs text-muted-foreground">Impact: <span className="text-neon-amber">{t.impact}</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

export default TechTrendsPage;
