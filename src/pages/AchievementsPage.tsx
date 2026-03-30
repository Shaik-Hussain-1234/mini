import { motion } from "framer-motion";
import { Trophy, Lock, Star, Zap, Code, Brain, Flame, Target, Shield, Rocket } from "lucide-react";

const achievements = [
  { icon: Code, title: "First Solve", desc: "Solve your first coding problem", xp: 50, unlocked: true },
  { icon: Flame, title: "7-Day Streak", desc: "Practice for 7 consecutive days", xp: 100, unlocked: true },
  { icon: Brain, title: "Quiz Master", desc: "Score 100% on any quiz", xp: 150, unlocked: true },
  { icon: Target, title: "Problem Hunter", desc: "Solve 25 coding problems", xp: 200, unlocked: true },
  { icon: Star, title: "Course Completer", desc: "Complete your first course", xp: 250, unlocked: false },
  { icon: Trophy, title: "Contest Winner", desc: "Rank in top 10 in a contest", xp: 500, unlocked: false },
  { icon: Zap, title: "Speed Demon", desc: "Solve a problem in under 2 minutes", xp: 150, unlocked: false },
  { icon: Shield, title: "Bug Crusher", desc: "Complete all debug challenges", xp: 300, unlocked: false },
  { icon: Rocket, title: "Full Stack Hero", desc: "Complete roadmaps for 3 career paths", xp: 1000, unlocked: false },
  { icon: Flame, title: "30-Day Streak", desc: "Practice for 30 consecutive days", xp: 500, unlocked: false },
  { icon: Code, title: "Polyglot", desc: "Solve problems in 4 different languages", xp: 400, unlocked: false },
  { icon: Brain, title: "Algorithm Expert", desc: "Solve 100 coding problems", xp: 800, unlocked: false },
];

const totalXP = achievements.filter(a => a.unlocked).reduce((s, a) => s + a.xp, 0);
const maxXP = achievements.reduce((s, a) => s + a.xp, 0);

const AchievementsPage = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <Trophy className="h-6 w-6 text-neon-amber" /> Achievements
      </h1>

      <div className="glass-card-premium p-6 text-center">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Total XP Earned</p>
        <p className="text-4xl font-extrabold gradient-text">{totalXP}</p>
        <div className="h-2 bg-muted rounded-full mt-4 overflow-hidden max-w-md mx-auto">
          <motion.div initial={{ width: 0 }} animate={{ width: `${(totalXP / maxXP) * 100}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent" />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {achievements.filter(a => a.unlocked).length}/{achievements.length} unlocked
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((a, i) => (
          <motion.div key={a.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`glass-card p-5 ${a.unlocked ? "neon-border" : "opacity-50"} transition-all`}>
            <div className="flex items-start gap-3">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${a.unlocked ? "bg-primary/20" : "bg-muted/30"}`}>
                {a.unlocked ? <a.icon className="h-5 w-5 text-primary" /> : <Lock className="h-5 w-5 text-muted-foreground" />}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{a.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{a.desc}</p>
                <p className="text-xs text-primary font-bold mt-1">+{a.xp} XP</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AchievementsPage;
