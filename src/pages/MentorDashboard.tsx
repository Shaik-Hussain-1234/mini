import { motion } from "framer-motion";
import { BookOpen, Users, MessageSquare, Star, Zap, FileText, Lightbulb, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const mentees = [
  { name: "Alice Chen", topic: "React & TypeScript", progress: 78, lastActive: "2 hours ago" },
  { name: "Bob Smith", topic: "Python for ML", progress: 55, lastActive: "1 day ago" },
  { name: "Carol Lee", topic: "System Design", progress: 40, lastActive: "3 hours ago" },
];

const questions = [
  { student: "David Kim", question: "How to implement JWT auth in Node.js?", topic: "Backend", time: "30 min ago" },
  { student: "Emily Wang", question: "Best practices for React state management?", topic: "Frontend", time: "2 hours ago" },
  { student: "Frank Zhou", question: "Docker vs Kubernetes for beginners?", topic: "DevOps", time: "5 hours ago" },
];

const stats = [
  { label: "Active Mentees", value: "8", icon: Users, change: "+2 this month" },
  { label: "Questions Answered", value: "156", icon: MessageSquare, change: "+12 this week" },
  { label: "Resources Shared", value: "43", icon: BookOpen, change: "+5 this week" },
  { label: "Mentor Rating", value: "4.9", icon: Star, change: "⭐ Top 5%" },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const itemVariants = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const MentorDashboard = () => (
  <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
    <motion.div variants={itemVariants}>
      <h1 className="text-2xl font-bold text-foreground">Mentor Dashboard 🎓</h1>
      <p className="text-muted-foreground text-sm mt-1">Guide students and share your expertise.</p>
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
        <h2 className="text-lg font-semibold text-foreground mb-4">Your Mentees</h2>
        <div className="space-y-3">
          {mentees.map((m) => (
            <div key={m.name} className="p-4 rounded-lg bg-secondary/30">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{m.name}</h3>
                  <p className="text-xs text-muted-foreground">{m.topic} • {m.lastActive}</p>
                </div>
                <span className="text-xs font-bold text-primary">{m.progress}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${m.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="glass-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Questions</h2>
        <div className="space-y-3">
          {questions.map((q) => (
            <div key={q.question} className="p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-primary">{q.student}</span>
                <span className="text-xs text-muted-foreground">{q.time}</span>
              </div>
              <p className="text-sm text-foreground">{q.question}</p>
              <span className="text-[10px] px-2 py-0.5 rounded-full border border-primary/20 bg-primary/5 text-primary mt-2 inline-block">{q.topic}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>

    <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { icon: Lightbulb, label: "Share Resources", to: "/dashboard/community" },
        { icon: FileText, label: "Review Projects", to: "/dashboard/projects" },
        { icon: Award, label: "Certifications", to: "/dashboard/certifications" },
        { icon: MessageSquare, label: "Community", to: "/dashboard/community" },
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

export default MentorDashboard;
