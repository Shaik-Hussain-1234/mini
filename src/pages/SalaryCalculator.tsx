import { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, MapPin, Briefcase, TrendingUp } from "lucide-react";

const salaryData: Record<string, Record<string, { junior: number; mid: number; senior: number; lead: number }>> = {
  "Software Engineer": {
    "San Francisco": { junior: 120000, mid: 160000, senior: 210000, lead: 260000 },
    "New York": { junior: 110000, mid: 150000, senior: 200000, lead: 250000 },
    "Austin": { junior: 95000, mid: 130000, senior: 175000, lead: 220000 },
    "Remote": { junior: 90000, mid: 125000, senior: 170000, lead: 210000 },
    "India (Bangalore)": { junior: 12000, mid: 25000, senior: 45000, lead: 65000 },
    "London": { junior: 55000, mid: 80000, senior: 110000, lead: 140000 },
  },
  "Data Scientist": {
    "San Francisco": { junior: 115000, mid: 155000, senior: 200000, lead: 250000 },
    "New York": { junior: 105000, mid: 145000, senior: 190000, lead: 240000 },
    "Austin": { junior: 90000, mid: 125000, senior: 165000, lead: 210000 },
    "Remote": { junior: 85000, mid: 120000, senior: 160000, lead: 200000 },
    "India (Bangalore)": { junior: 10000, mid: 22000, senior: 40000, lead: 58000 },
    "London": { junior: 50000, mid: 75000, senior: 105000, lead: 135000 },
  },
  "DevOps Engineer": {
    "San Francisco": { junior: 110000, mid: 150000, senior: 195000, lead: 240000 },
    "New York": { junior: 100000, mid: 140000, senior: 185000, lead: 230000 },
    "Austin": { junior: 88000, mid: 120000, senior: 160000, lead: 200000 },
    "Remote": { junior: 85000, mid: 115000, senior: 155000, lead: 195000 },
    "India (Bangalore)": { junior: 10000, mid: 20000, senior: 38000, lead: 55000 },
    "London": { junior: 48000, mid: 72000, senior: 100000, lead: 130000 },
  },
};

const SalaryCalculator = () => {
  const [role, setRole] = useState("Software Engineer");
  const [location, setLocation] = useState("San Francisco");
  const data = salaryData[role]?.[location];

  const formatSalary = (n: number) => n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n.toLocaleString()}`;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <DollarSign className="h-6 w-6 text-primary" /> Salary Calculator
      </h1>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="glass-card p-5">
          <label className="text-xs text-muted-foreground mb-2 flex items-center gap-1"><Briefcase className="h-3 w-3" /> Role</label>
          <select value={role} onChange={e => setRole(e.target.value)}
            className="w-full mt-1 bg-muted/30 border border-border/40 rounded-xl px-4 py-2.5 text-sm text-foreground">
            {Object.keys(salaryData).map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="glass-card p-5">
          <label className="text-xs text-muted-foreground mb-2 flex items-center gap-1"><MapPin className="h-3 w-3" /> Location</label>
          <select value={location} onChange={e => setLocation(e.target.value)}
            className="w-full mt-1 bg-muted/30 border border-border/40 rounded-xl px-4 py-2.5 text-sm text-foreground">
            {Object.keys(salaryData[role] || {}).map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>

      {data && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {(["junior", "mid", "senior", "lead"] as const).map((level, i) => (
            <motion.div key={level} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="glass-card-hover p-6 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{level}</p>
              <p className="text-3xl font-bold gradient-text">{formatSalary(data[level])}</p>
              <p className="text-xs text-muted-foreground mt-2">per year</p>
              <div className="mt-3 flex items-center justify-center gap-1 text-neon-emerald text-xs">
                <TrendingUp className="h-3 w-3" /> +{5 + i * 3}% YoY
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Salary Range Comparison</h3>
        {data && (["junior", "mid", "senior", "lead"] as const).map(level => (
          <div key={level} className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground capitalize">{level}</span>
              <span className="text-primary font-mono">{formatSalary(data[level])}</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${(data[level] / 260000) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent" />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SalaryCalculator;
