import { motion } from "framer-motion";
import { Briefcase, Search, FileText, TrendingUp, Target, Zap, BookOpen, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const jobListings = [
  { title: "Senior Python Developer", company: "TechCorp", location: "Remote", salary: "$120K-$150K", match: "95%", skills: ["Python", "Django", "PostgreSQL"] },
  { title: "Full Stack Engineer", company: "StartupXYZ", location: "San Francisco", salary: "$130K-$170K", match: "88%", skills: ["React", "Node.js", "TypeScript"] },
  { title: "Data Engineer", company: "DataFlow Inc", location: "New York", salary: "$140K-$180K", match: "82%", skills: ["Python", "Spark", "AWS"] },
  { title: "DevOps Engineer", company: "CloudScale", location: "Remote", salary: "$125K-$165K", match: "78%", skills: ["Docker", "Kubernetes", "Terraform"] },
];

const stats = [
  { label: "Jobs Applied", value: "12", icon: Send, change: "+3 this week" },
  { label: "Profile Views", value: "48", icon: TrendingUp, change: "+15 this month" },
  { label: "Skills Matched", value: "8/12", icon: Target, change: "67% match rate" },
  { label: "Interviews", value: "3", icon: Briefcase, change: "2 upcoming" },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const itemVariants = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const JobSeekerDashboard = () => (
  <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
    <motion.div variants={itemVariants}>
      <h1 className="text-2xl font-bold text-foreground">Job Seeker Dashboard 💼</h1>
      <p className="text-muted-foreground text-sm mt-1">Track applications and discover opportunities.</p>
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

    <motion.div variants={itemVariants} className="glass-card p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-foreground">Recommended Jobs</h2>
        <Link to="/dashboard/skill-gap">
          <Button variant="ghost" size="sm" className="text-primary text-xs">Skill Gap Analysis →</Button>
        </Link>
      </div>
      <div className="space-y-3">
        {jobListings.map((job) => (
          <div key={job.title} className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-semibold text-foreground">{job.title}</h3>
                <p className="text-xs text-muted-foreground">{job.company} • {job.location}</p>
              </div>
              <span className="text-xs font-bold text-primary">{job.match} match</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                {job.skills.map((s) => (
                  <span key={s} className="text-[10px] px-2 py-0.5 rounded-full border border-primary/20 bg-primary/5 text-primary">{s}</span>
                ))}
              </div>
              <span className="text-xs text-neon-emerald">{job.salary}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>

    <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { icon: FileText, label: "Resume Analyzer", to: "/dashboard/resume" },
        { icon: Target, label: "Skill Gap Analysis", to: "/dashboard/skill-gap" },
        { icon: BookOpen, label: "Interview Prep", to: "/dashboard/interview" },
        { icon: Search, label: "Explore Careers", to: "/dashboard/career-explorer" },
      ].map((a) => (
        <Link key={a.label} to={a.to}>
          <div className="glass-card-hover p-5 text-center group">
            <a.icon className="h-6 w-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm text-foreground">{a.label}</span>
          </div>
        </Link>
      ))}
    </motion.div>
  </motion.div>
);

export default JobSeekerDashboard;
