import { motion } from "framer-motion";
import { Briefcase, Users, Search, BarChart3, Zap, Plus, Eye, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const postedJobs = [
  { title: "Senior React Developer", applicants: 24, status: "Active", posted: "2 days ago" },
  { title: "Backend Engineer (Python)", applicants: 18, status: "Active", posted: "5 days ago" },
  { title: "DevOps Engineer", applicants: 12, status: "Closed", posted: "2 weeks ago" },
];

const candidates = [
  { name: "Alice Chen", skills: ["React", "TypeScript", "Node.js"], score: 95, university: "MIT" },
  { name: "Bob Smith", skills: ["Python", "Django", "AWS"], score: 90, university: "Stanford" },
  { name: "Carol Lee", skills: ["Java", "Spring", "Kubernetes"], score: 87, university: "UC Berkeley" },
  { name: "David Kim", skills: ["React", "Python", "PostgreSQL"], score: 85, university: "Georgia Tech" },
];

const stats = [
  { label: "Active Postings", value: "5", icon: Briefcase, change: "+2 this month" },
  { label: "Total Applicants", value: "142", icon: Users, change: "+38 this week" },
  { label: "Profile Views", value: "89", icon: Eye, change: "+12 today" },
  { label: "Hires Made", value: "3", icon: BarChart3, change: "This quarter" },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const itemVariants = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const HRDashboard = () => {
  const [searchSkill, setSearchSkill] = useState("");

  const filteredCandidates = candidates.filter((c) =>
    searchSkill === "" || c.skills.some((s) => s.toLowerCase().includes(searchSkill.toLowerCase()))
  );

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Recruiter Dashboard 🎯</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage job postings and discover talent.</p>
        </div>
        <Button variant="neon" size="sm"><Plus className="h-4 w-4 mr-1" /> Post Job</Button>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <s.icon className="h-5 w-5 text-primary" />
              <Zap className="h-3 w-3 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            <div className="text-xs text-primary mt-2">{s.change}</div>
          </div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="glass-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Your Job Postings</h2>
          <div className="space-y-3">
            {postedJobs.map((job) => (
              <div key={job.title} className="p-4 rounded-lg bg-secondary/30 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{job.title}</h3>
                  <p className="text-xs text-muted-foreground">{job.posted} • {job.applicants} applicants</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${job.status === "Active" ? "border-neon-emerald/20 bg-neon-emerald/5 text-neon-emerald" : "border-muted-foreground/20 bg-muted/30 text-muted-foreground"}`}>
                  {job.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Talent Search</h2>
          <div className="flex items-center gap-2 bg-secondary/50 rounded-lg px-3 py-2 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by skill (React, Python, AWS...)"
              value={searchSkill}
              onChange={(e) => setSearchSkill(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground flex-1"
            />
          </div>
          <div className="space-y-3">
            {filteredCandidates.map((c) => (
              <div key={c.name} className="p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-medium text-foreground">{c.name}</h3>
                    <p className="text-xs text-muted-foreground">{c.university}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-primary">{c.score}%</span>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary">
                      <Mail className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {c.skills.map((s) => (
                    <span key={s} className="text-[10px] px-2 py-0.5 rounded-full border border-primary/20 bg-primary/5 text-primary">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HRDashboard;
