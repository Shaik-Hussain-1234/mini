import { motion } from "framer-motion";
import { Brain, Code, Trophy, TrendingUp, BookOpen, Flame, Target, ArrowRight, Zap, Sparkles, Clock, Award, BarChart3, Rocket, Calendar, CheckCircle2, Play, Star, Activity, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

const skillProgress = [
  { name: "Python", level: 78, icon: "🐍", xp: 2340 },
  { name: "React", level: 65, icon: "⚛️", xp: 1950 },
  { name: "SQL", level: 55, icon: "🗃️", xp: 1650 },
  { name: "Docker", level: 40, icon: "🐳", xp: 1200 },
  { name: "AWS", level: 30, icon: "☁️", xp: 900 },
];

const quickStats = [
  { label: "Total XP", value: "8,240", icon: Zap, color: "bg-primary", trend: "+420 today" },
  { label: "Problems Solved", value: "87", icon: Code, color: "bg-accent", trend: "+5 this week" },
  { label: "Day Streak", value: "15", icon: Flame, color: "bg-neon-amber", trend: "🔥 Best!" },
  { label: "Rank", value: "#142", icon: Trophy, color: "bg-neon-emerald", trend: "↑ 23 spots" },
];

const todayTasks = [
  { title: "Solve 2 Medium LeetCode problems", done: true, xp: 80 },
  { title: "Complete React Hooks chapter", done: true, xp: 50 },
  { title: "Review System Design notes", done: false, xp: 30 },
  { title: "Practice SQL joins exercises", done: false, xp: 40 },
];

const upcomingEvents = [
  { title: "HackMIT 2026", date: "Mar 15", type: "Hackathon", icon: "🏆" },
  { title: "AWS Cloud Exam", date: "Mar 22", type: "Certification", icon: "📜" },
  { title: "Mock Interview", date: "Mar 10", type: "Practice", icon: "🎤" },
];

const quickActions = [
  { icon: Code, label: "Practice", desc: "Solve problems", to: "/dashboard/coding", color: "bg-primary/10 hover:bg-primary/20 border-primary/20" },
  { icon: Brain, label: "AI Chat", desc: "Ask anything", to: "/dashboard/coding", color: "bg-accent/10 hover:bg-accent/20 border-accent/20" },
  { icon: Target, label: "Skill Gap", desc: "Analyze skills", to: "/dashboard/skill-gap", color: "bg-neon-blue/10 hover:bg-neon-blue/20 border-neon-blue/20" },
  { icon: Rocket, label: "Roadmap", desc: "Career path", to: "/dashboard/roadmaps", color: "bg-neon-emerald/10 hover:bg-neon-emerald/20 border-neon-emerald/20" },
  { icon: Trophy, label: "Compete", desc: "Join contests", to: "/dashboard/contests", color: "bg-neon-amber/10 hover:bg-neon-amber/20 border-neon-amber/20" },
  { icon: Layers, label: "Projects", desc: "Build stuff", to: "/dashboard/projects", color: "bg-neon-pink/10 hover:bg-neon-pink/20 border-neon-pink/20" },
];

const leaderboard = [
  { name: "You", xp: 8240, rank: 142, highlight: true },
  { name: "AlexCode", xp: 8580, rank: 138, highlight: false },
  { name: "DevPriya", xp: 9120, rank: 125, highlight: false },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const StudentDashboard = () => {
  const completedTasks = todayTasks.filter(t => t.done).length;
  const totalXpToday = todayTasks.filter(t => t.done).reduce((sum, t) => sum + t.xp, 0);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
      {/* Header with greeting & date */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-foreground flex items-center gap-3 font-display">
            Command Center <Activity className="h-5 w-5 text-primary animate-pulse-glow" />
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Track, learn, and level up every day.</p>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground glass-card px-3 py-1.5 rounded-full">
            <Calendar className="h-3.5 w-3.5" />
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {quickStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.03, y: -2 }}
            className="glass-card p-4 group cursor-default"
          >
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-xl ${stat.color} flex items-center justify-center shrink-0`}>
                <stat.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="text-xl font-black text-foreground font-display">{stat.value}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{stat.label}</div>
              </div>
            </div>
            <div className="text-[11px] text-primary font-semibold mt-2 pl-[52px]">{stat.trend}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions Grid */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Quick Actions</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {quickActions.map((action) => (
            <Link key={action.label} to={action.to}>
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className={`rounded-xl border p-3 text-center transition-all duration-300 ${action.color} cursor-pointer`}
              >
                <action.icon className="h-5 w-5 mx-auto mb-1.5 text-foreground/80" />
                <div className="text-xs font-bold text-foreground">{action.label}</div>
                <div className="text-[9px] text-muted-foreground">{action.desc}</div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-5">
        {/* Skill Progress - Left */}
        <motion.div variants={itemVariants} className="lg:col-span-5 glass-card p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-bold text-foreground font-display uppercase tracking-wider">Skill Matrix</h2>
            <Link to="/dashboard/skill-gap">
              <Button variant="ghost" size="sm" className="text-primary text-xs h-7 hover:bg-primary/10">
                Details <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {skillProgress.map((skill, i) => (
              <div key={skill.name} className="group">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <span className="text-base">{skill.icon}</span>
                    {skill.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground">{skill.xp} XP</span>
                    <span className="text-xs font-black text-primary font-display">{skill.level}%</span>
                  </div>
                </div>
                <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Overall Level</span>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-neon-amber fill-neon-amber" />
              <span className="text-sm font-black text-foreground font-display">Level 12</span>
            </div>
          </div>
        </motion.div>

        {/* Middle Column - Today's Progress */}
        <motion.div variants={itemVariants} className="lg:col-span-4 space-y-5">
          {/* Daily Progress */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-foreground font-display uppercase tracking-wider">Today</h2>
              <span className="text-xs text-primary font-bold">+{totalXpToday} XP earned</span>
            </div>

            {/* Circular progress */}
            <div className="flex items-center justify-center mb-4">
              <div className="relative h-24 w-24">
                <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" stroke="hsl(var(--secondary))" strokeWidth="8" fill="none" />
                  <motion.circle
                    cx="50" cy="50" r="42"
                    stroke="hsl(var(--primary))"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={264}
                    initial={{ strokeDashoffset: 264 }}
                    animate={{ strokeDashoffset: 264 - (264 * completedTasks / todayTasks.length) }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-black text-foreground font-display">{completedTasks}/{todayTasks.length}</span>
                  <span className="text-[9px] text-muted-foreground uppercase">Tasks</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {todayTasks.map((task, i) => (
                <div key={i} className={`flex items-center gap-2.5 p-2 rounded-lg transition-all ${task.done ? 'opacity-60' : 'bg-secondary/30'}`}>
                  <CheckCircle2 className={`h-4 w-4 shrink-0 ${task.done ? 'text-primary' : 'text-muted-foreground/30'}`} />
                  <span className={`text-xs flex-1 ${task.done ? 'line-through text-muted-foreground' : 'text-foreground font-medium'}`}>{task.title}</span>
                  <span className="text-[10px] text-primary font-bold">+{task.xp}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div variants={itemVariants} className="lg:col-span-3 space-y-5">
          {/* Upcoming */}
          <div className="glass-card p-5">
            <h2 className="text-sm font-bold text-foreground font-display uppercase tracking-wider mb-4">Upcoming</h2>
            <div className="space-y-3">
              {upcomingEvents.map((event, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-secondary/20 hover:bg-secondary/40 transition-all cursor-pointer">
                  <span className="text-xl">{event.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-foreground truncate">{event.title}</div>
                    <div className="text-[10px] text-muted-foreground">{event.date} · {event.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mini Leaderboard */}
          <div className="glass-card p-5">
            <h2 className="text-sm font-bold text-foreground font-display uppercase tracking-wider mb-4">Leaderboard</h2>
            <div className="space-y-2">
              {leaderboard.map((user, i) => (
                <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${user.highlight ? 'bg-primary/10 border border-primary/20' : 'bg-secondary/20'}`}>
                  <span className="text-xs font-black text-muted-foreground w-5 font-display">#{user.rank}</span>
                  <div className="flex-1">
                    <span className={`text-xs font-bold ${user.highlight ? 'text-primary' : 'text-foreground'}`}>{user.name}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono">{user.xp.toLocaleString()} XP</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Continue Learning */}
      <motion.div variants={itemVariants} className="glass-card p-5">
        <h2 className="text-sm font-bold text-foreground font-display uppercase tracking-wider mb-4">Continue Learning</h2>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { title: "React Advanced Patterns", progress: 65, lessons: "12/18", icon: "⚛️", color: "from-primary to-neon-blue" },
            { title: "System Design Fundamentals", progress: 40, lessons: "6/15", icon: "🏗️", color: "from-accent to-neon-pink" },
            { title: "AWS Cloud Practitioner", progress: 25, lessons: "5/20", icon: "☁️", color: "from-neon-amber to-neon-pink" },
          ].map((course, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -3 }}
              className="p-4 rounded-xl bg-secondary/20 border border-border/20 hover:border-primary/20 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{course.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-foreground truncate">{course.title}</h3>
                  <p className="text-[10px] text-muted-foreground">{course.lessons} lessons</p>
                </div>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                  className={`h-full rounded-full bg-gradient-to-r ${course.color}`}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">{course.progress}% complete</span>
                <Play className="h-3.5 w-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StudentDashboard;
