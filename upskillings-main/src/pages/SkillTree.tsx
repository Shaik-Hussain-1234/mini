import { motion } from "framer-motion";
import { GitBranch, Star, Lock, CheckCircle2, Zap } from "lucide-react";
import { useState } from "react";

interface SkillNode {
  id: string; name: string; level: number; unlocked: boolean; completed: boolean;
  xp: number; maxXp: number; children: string[]; icon: string;
}

const skillNodes: SkillNode[] = [
  { id: "basics", name: "Programming Basics", level: 1, unlocked: true, completed: true, xp: 100, maxXp: 100, children: ["python", "javascript"], icon: "🎯" },
  { id: "python", name: "Python", level: 2, unlocked: true, completed: true, xp: 100, maxXp: 100, children: ["data-structures", "ml"], icon: "🐍" },
  { id: "javascript", name: "JavaScript", level: 2, unlocked: true, completed: true, xp: 100, maxXp: 100, children: ["react", "node"], icon: "⚡" },
  { id: "data-structures", name: "Data Structures", level: 3, unlocked: true, completed: false, xp: 65, maxXp: 100, children: ["algorithms"], icon: "🏗️" },
  { id: "ml", name: "Machine Learning", level: 3, unlocked: true, completed: false, xp: 30, maxXp: 100, children: ["deep-learning"], icon: "🤖" },
  { id: "react", name: "React", level: 3, unlocked: true, completed: false, xp: 75, maxXp: 100, children: ["fullstack"], icon: "⚛️" },
  { id: "node", name: "Node.js", level: 3, unlocked: true, completed: false, xp: 40, maxXp: 100, children: ["fullstack"], icon: "🟢" },
  { id: "algorithms", name: "Algorithms", level: 4, unlocked: true, completed: false, xp: 20, maxXp: 100, children: ["system-design"], icon: "🧮" },
  { id: "deep-learning", name: "Deep Learning", level: 4, unlocked: false, completed: false, xp: 0, maxXp: 100, children: [], icon: "🧠" },
  { id: "fullstack", name: "Full Stack", level: 4, unlocked: false, completed: false, xp: 0, maxXp: 100, children: ["system-design"], icon: "🚀" },
  { id: "system-design", name: "System Design", level: 5, unlocked: false, completed: false, xp: 0, maxXp: 100, children: [], icon: "🏛️" },
];

const SkillTree = () => {
  const [selected, setSelected] = useState<SkillNode | null>(null);
  const totalXp = skillNodes.reduce((acc, n) => acc + n.xp, 0);
  const maxXp = skillNodes.reduce((acc, n) => acc + n.maxXp, 0);
  const levels = [1, 2, 3, 4, 5];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><GitBranch className="h-6 w-6 text-primary" /> Skill Tree</h1>
          <p className="text-muted-foreground text-sm mt-1">Your game-style skill progression map.</p>
        </div>
        <div className="glass-card px-4 py-2 flex items-center gap-2">
          <Zap className="h-4 w-4 text-neon-amber" />
          <span className="text-sm font-bold text-foreground">{totalXp} / {maxXp} XP</span>
        </div>
      </div>

      {/* Tree Visualization */}
      <div className="glass-card p-8 overflow-x-auto">
        <div className="min-w-[600px] space-y-8">
          {levels.map(level => {
            const nodesAtLevel = skillNodes.filter(n => n.level === level);
            return (
              <div key={level} className="flex items-center justify-center gap-6">
                <span className="text-xs text-muted-foreground w-16 shrink-0">Level {level}</span>
                <div className="flex gap-4 flex-wrap justify-center">
                  {nodesAtLevel.map(node => (
                    <motion.button
                      key={node.id}
                      whileHover={{ scale: node.unlocked ? 1.1 : 1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => node.unlocked && setSelected(node)}
                      className={`relative p-4 rounded-xl border-2 min-w-[120px] transition-all ${
                        node.completed ? "border-neon-emerald bg-neon-emerald/5 shadow-[0_0_15px_hsl(160_84%_45%/0.2)]" :
                        node.unlocked ? "border-primary/30 bg-primary/5 hover:border-primary cursor-pointer" :
                        "border-border/30 bg-secondary/10 opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <div className="text-2xl mb-1">{node.icon}</div>
                      <div className="text-xs font-semibold text-foreground">{node.name}</div>
                      {node.completed && <CheckCircle2 className="absolute -top-1 -right-1 h-4 w-4 text-neon-emerald" />}
                      {!node.unlocked && <Lock className="absolute -top-1 -right-1 h-4 w-4 text-muted-foreground" />}
                      {node.unlocked && !node.completed && (
                        <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${(node.xp / node.maxXp) * 100}%` }} className="h-full bg-primary rounded-full" />
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Skill Detail */}
      {selected && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card neon-border p-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{selected.icon}</span>
            <div>
              <h2 className="text-lg font-bold text-foreground">{selected.name}</h2>
              <p className="text-xs text-muted-foreground">Level {selected.level} • {selected.xp}/{selected.maxXp} XP</p>
            </div>
            {selected.completed && <span className="text-xs px-2 py-0.5 rounded-full border border-neon-emerald/20 bg-neon-emerald/5 text-neon-emerald ml-auto">Mastered</span>}
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${(selected.xp / selected.maxXp) * 100}%` }} transition={{ duration: 0.8 }} className="h-full bg-primary rounded-full" />
          </div>
          {selected.children.length > 0 && (
            <p className="text-xs text-muted-foreground">Unlocks: {selected.children.map(c => skillNodes.find(n => n.id === c)?.name).join(", ")}</p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default SkillTree;
