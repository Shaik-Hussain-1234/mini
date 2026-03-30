import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, DollarSign, TrendingUp, ChevronRight, ArrowLeft, Building, Globe, Users, BarChart3 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const careers = [
  {
    title: "AI Engineer",
    description: "Design, build, and deploy AI/ML models and systems for production environments.",
    skills: ["Python", "TensorFlow", "PyTorch", "MLOps", "Docker", "AWS"],
    salary: "$130K - $200K", salaryData: [
      { level: "Junior", salary: 95000 }, { level: "Mid", salary: 140000 }, { level: "Senior", salary: 185000 }, { level: "Lead", salary: 220000 },
    ],
    demand: "Very High",
    demandData: [{ year: "2022", jobs: 45000 }, { year: "2023", jobs: 72000 }, { year: "2024", jobs: 110000 }, { year: "2025", jobs: 165000 }, { year: "2026", jobs: 230000 }],
    companies: ["Google", "OpenAI", "Meta", "Microsoft", "NVIDIA", "DeepMind"],
    roadmap: ["Python Fundamentals", "Mathematics & Statistics", "Machine Learning Basics", "Deep Learning", "MLOps & Deployment", "Specialization (NLP/CV)"],
    industryDist: [{ name: "Tech", value: 40 }, { name: "Finance", value: 20 }, { name: "Healthcare", value: 15 }, { name: "Auto", value: 10 }, { name: "Other", value: 15 }],
  },
  {
    title: "Full Stack Developer",
    description: "Build end-to-end web applications with modern frontend and backend technologies.",
    skills: ["JavaScript", "React", "Node.js", "PostgreSQL", "Docker", "Git"],
    salary: "$100K - $160K", salaryData: [
      { level: "Junior", salary: 70000 }, { level: "Mid", salary: 110000 }, { level: "Senior", salary: 150000 }, { level: "Lead", salary: 180000 },
    ],
    demand: "High",
    demandData: [{ year: "2022", jobs: 200000 }, { year: "2023", jobs: 220000 }, { year: "2024", jobs: 250000 }, { year: "2025", jobs: 270000 }, { year: "2026", jobs: 290000 }],
    companies: ["Stripe", "Vercel", "Shopify", "Atlassian", "GitHub", "Netflix"],
    roadmap: ["HTML/CSS/JS Fundamentals", "React & TypeScript", "Backend with Node.js", "Databases & ORMs", "DevOps Basics", "System Design"],
    industryDist: [{ name: "SaaS", value: 35 }, { name: "E-commerce", value: 20 }, { name: "Fintech", value: 15 }, { name: "Agency", value: 15 }, { name: "Other", value: 15 }],
  },
  {
    title: "DevOps Engineer",
    description: "Automate infrastructure, CI/CD pipelines, and ensure system reliability.",
    skills: ["Docker", "Kubernetes", "Terraform", "AWS", "CI/CD", "Linux"],
    salary: "$110K - $170K", salaryData: [
      { level: "Junior", salary: 80000 }, { level: "Mid", salary: 120000 }, { level: "Senior", salary: 160000 }, { level: "Lead", salary: 190000 },
    ],
    demand: "High",
    demandData: [{ year: "2022", jobs: 80000 }, { year: "2023", jobs: 100000 }, { year: "2024", jobs: 130000 }, { year: "2025", jobs: 160000 }, { year: "2026", jobs: 195000 }],
    companies: ["AWS", "HashiCorp", "Datadog", "GitLab", "Red Hat", "Cloudflare"],
    roadmap: ["Linux & Networking", "Scripting (Python/Bash)", "Docker & Containers", "CI/CD Pipelines", "Kubernetes", "Infrastructure as Code"],
    industryDist: [{ name: "Cloud", value: 30 }, { name: "Fintech", value: 20 }, { name: "SaaS", value: 25 }, { name: "Enterprise", value: 15 }, { name: "Other", value: 10 }],
  },
  {
    title: "Data Scientist",
    description: "Extract insights from data using statistical analysis and machine learning.",
    skills: ["Python", "SQL", "Statistics", "Pandas", "Scikit-learn", "Visualization"],
    salary: "$120K - $180K", salaryData: [
      { level: "Junior", salary: 85000 }, { level: "Mid", salary: 130000 }, { level: "Senior", salary: 170000 }, { level: "Lead", salary: 200000 },
    ],
    demand: "Very High",
    demandData: [{ year: "2022", jobs: 60000 }, { year: "2023", jobs: 85000 }, { year: "2024", jobs: 115000 }, { year: "2025", jobs: 150000 }, { year: "2026", jobs: 190000 }],
    companies: ["Spotify", "Netflix", "Airbnb", "LinkedIn", "Uber", "Palantir"],
    roadmap: ["Python & Statistics", "Data Wrangling", "Visualization", "Machine Learning", "Deep Learning", "Business Communication"],
    industryDist: [{ name: "Tech", value: 30 }, { name: "Finance", value: 25 }, { name: "Health", value: 15 }, { name: "Retail", value: 15 }, { name: "Other", value: 15 }],
  },
  {
    title: "Cloud Architect",
    description: "Design scalable, secure cloud infrastructure and migration strategies.",
    skills: ["AWS", "Azure", "GCP", "Kubernetes", "Terraform", "Security"],
    salary: "$140K - $190K", salaryData: [
      { level: "Junior", salary: 100000 }, { level: "Mid", salary: 145000 }, { level: "Senior", salary: 180000 }, { level: "Lead", salary: 210000 },
    ],
    demand: "High",
    demandData: [{ year: "2022", jobs: 55000 }, { year: "2023", jobs: 75000 }, { year: "2024", jobs: 100000 }, { year: "2025", jobs: 130000 }, { year: "2026", jobs: 170000 }],
    companies: ["AWS", "Microsoft", "Google Cloud", "Salesforce", "Oracle", "IBM"],
    roadmap: ["Cloud Fundamentals", "Networking & Security", "Compute & Storage", "Containers & Serverless", "IaC & Automation", "Architecture Patterns"],
    industryDist: [{ name: "Cloud", value: 35 }, { name: "Enterprise", value: 25 }, { name: "Fintech", value: 15 }, { name: "Gov", value: 10 }, { name: "Other", value: 15 }],
  },
  {
    title: "Cybersecurity Analyst",
    description: "Protect organizations from cyber threats and ensure compliance.",
    skills: ["Networks", "SIEM", "Pentesting", "Linux", "Python", "Compliance"],
    salary: "$100K - $160K", salaryData: [
      { level: "Junior", salary: 70000 }, { level: "Mid", salary: 105000 }, { level: "Senior", salary: 145000 }, { level: "Lead", salary: 175000 },
    ],
    demand: "Very High",
    demandData: [{ year: "2022", jobs: 70000 }, { year: "2023", jobs: 95000 }, { year: "2024", jobs: 125000 }, { year: "2025", jobs: 160000 }, { year: "2026", jobs: 210000 }],
    companies: ["CrowdStrike", "Palo Alto Networks", "Fortinet", "Mandiant", "Splunk", "Check Point"],
    roadmap: ["Networking Basics", "Linux Administration", "Security Fundamentals", "Threat Analysis", "Pentesting", "Incident Response"],
    industryDist: [{ name: "Cyber", value: 25 }, { name: "Finance", value: 25 }, { name: "Gov", value: 20 }, { name: "Health", value: 15 }, { name: "Other", value: 15 }],
  },
];

const COLORS = ["hsl(174, 90%, 50%)", "hsl(262, 80%, 60%)", "hsl(160, 84%, 45%)", "hsl(38, 92%, 60%)", "hsl(330, 80%, 60%)"];

const CareerExplorer = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const career = careers.find((c) => c.title === selected);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-primary" /> Career Explorer
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Explore tech career paths with salary data, demand charts, and detailed roadmaps.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {careers.map((c) => (
          <motion.div key={c.title} whileHover={{ scale: 1.02, y: -4 }} transition={{ type: "spring", stiffness: 300 }}
            onClick={() => setSelected(c.title === selected ? null : c.title)}
            className={`glass-card-hover p-5 cursor-pointer ${selected === c.title ? "neon-border" : ""}`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold text-foreground">{c.title}</h3>
              <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${selected === c.title ? "rotate-90 text-primary" : ""}`} />
            </div>
            <p className="text-xs text-muted-foreground mb-3">{c.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {c.skills.slice(0, 3).map(s => <span key={s} className="text-[10px] px-2 py-0.5 rounded-full border border-primary/20 bg-primary/5 text-primary">{s}</span>)}
              {c.skills.length > 3 && <span className="text-[10px] text-muted-foreground">+{c.skills.length - 3} more</span>}
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1 text-neon-emerald"><DollarSign className="h-3 w-3" /> {c.salary}</span>
              <span className="flex items-center gap-1 text-primary"><TrendingUp className="h-3 w-3" /> {c.demand}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail Panel */}
      <AnimatePresence>
        {career && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="space-y-6">
            <div className="glass-card neon-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold gradient-text">{career.title}</h2>
                <button onClick={() => setSelected(null)} className="text-xs text-muted-foreground hover:text-primary">Close ×</button>
              </div>
              <p className="text-sm text-muted-foreground">{career.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Salary Chart */}
              <div className="glass-card p-6 space-y-3">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2"><DollarSign className="h-4 w-4 text-neon-emerald" /> Salary by Level</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={career.salaryData}>
                    <XAxis dataKey="level" tick={{ fill: "hsl(215 20% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "hsl(215 20% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}K`} />
                    <Tooltip contentStyle={{ background: "hsl(222 47% 8%)", border: "1px solid hsl(222 30% 16%)", borderRadius: 8, fontSize: 12 }} formatter={(v: number) => [`$${v.toLocaleString()}`, "Salary"]} />
                    <Bar dataKey="salary" fill="hsl(174 90% 50%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Demand Chart */}
              <div className="glass-card p-6 space-y-3">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" /> Job Demand Trend</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={career.demandData}>
                    <XAxis dataKey="year" tick={{ fill: "hsl(215 20% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "hsl(215 20% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v / 1000}K`} />
                    <Tooltip contentStyle={{ background: "hsl(222 47% 8%)", border: "1px solid hsl(222 30% 16%)", borderRadius: 8, fontSize: 12 }} formatter={(v: number) => [v.toLocaleString(), "Open Positions"]} />
                    <Bar dataKey="jobs" fill="hsl(262 80% 60%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Industry Distribution */}
              <div className="glass-card p-6 space-y-3">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2"><BarChart3 className="h-4 w-4 text-neon-amber" /> Industry Distribution</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={career.industryDist} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>
                      {career.industryDist.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: "hsl(222 47% 8%)", border: "1px solid hsl(222 30% 16%)", borderRadius: 8, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Companies Hiring */}
              <div className="glass-card p-6 space-y-3">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2"><Building className="h-4 w-4 text-primary" /> Top Companies Hiring</h3>
                <div className="grid grid-cols-2 gap-2">
                  {career.companies.map(c => (
                    <motion.div key={c} whileHover={{ scale: 1.05 }} className="flex items-center gap-2 p-3 rounded-lg bg-secondary/30 border border-border/30">
                      <Globe className="h-4 w-4 text-primary" />
                      <span className="text-sm text-foreground">{c}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {career.skills.map(s => (
                  <motion.span key={s} whileHover={{ scale: 1.1 }} className="text-xs px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary cursor-pointer hover:bg-primary/10 transition-colors">{s}</motion.span>
                ))}
              </div>
            </div>

            {/* Roadmap */}
            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Learning Roadmap</h3>
              <div className="relative">
                {career.roadmap.map((step, i) => (
                  <motion.div key={step} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4 mb-4 last:mb-0">
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                        {i + 1}
                      </div>
                      {i < career.roadmap.length - 1 && <div className="w-0.5 h-6 bg-primary/20" />}
                    </div>
                    <span className="text-sm text-foreground">{step}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CareerExplorer;
