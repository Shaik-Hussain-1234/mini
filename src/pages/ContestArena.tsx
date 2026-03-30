import { motion } from "framer-motion";
import { Timer, Trophy, Zap, Users, Play, Lock, Clock, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import CodeEditor from "@/components/CodeEditor";

const contests = [
  { id: 1, name: "Weekly Challenge #42", status: "live" as const, duration: "90 min", problems: 4, participants: 234, startTime: Date.now() - 30 * 60000, difficulty: "Mixed" },
  { id: 2, name: "Speed Sprint #18", status: "upcoming" as const, duration: "30 min", problems: 3, participants: 0, startTime: Date.now() + 2 * 3600000, difficulty: "Easy-Medium" },
  { id: 3, name: "Algorithm Marathon #7", status: "ended" as const, duration: "120 min", problems: 6, participants: 512, startTime: Date.now() - 48 * 3600000, difficulty: "Hard" },
  { id: 4, name: "Daily Blitz", status: "live" as const, duration: "15 min", problems: 2, participants: 89, startTime: Date.now() - 5 * 60000, difficulty: "Easy" },
];

const contestProblems = [
  { id: 1, title: "Array Rotation", points: 100, difficulty: "Easy" as const, solved: false },
  { id: 2, title: "Graph Shortest Path", points: 200, difficulty: "Medium" as const, solved: false },
  { id: 3, title: "DP on Trees", points: 300, difficulty: "Hard" as const, solved: false },
  { id: 4, title: "String Matching", points: 150, difficulty: "Medium" as const, solved: false },
];

const statusColors = { live: "text-neon-emerald border-neon-emerald/20 bg-neon-emerald/5", upcoming: "text-neon-amber border-neon-amber/20 bg-neon-amber/5", ended: "text-muted-foreground border-border bg-secondary/20" };

const ContestArena = () => {
  const [activeContest, setActiveContest] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(90 * 60);
  const [score, setScore] = useState(0);
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (activeContest === null) return;
    const interval = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000);
    return () => clearInterval(interval);
  }, [activeContest]);

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  if (activeContest !== null) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <button onClick={() => setActiveContest(null)} className="text-xs text-muted-foreground hover:text-primary mb-1">← Back to Contests</button>
            <h1 className="text-xl font-bold text-foreground">{contests[0].name}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="glass-card px-4 py-2 flex items-center gap-2">
              <Clock className="h-4 w-4 text-neon-amber" />
              <span className="text-lg font-mono font-bold text-foreground">{formatTime(timeLeft)}</span>
            </div>
            <div className="glass-card px-4 py-2 flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" />
              <span className="text-lg font-bold text-primary">{score} pts</span>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            {contestProblems.map(p => (
              <div key={p.id} className={`glass-card p-3 cursor-pointer hover:border-primary/30 transition-all ${p.solved ? "border-neon-emerald/30" : ""}`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{p.title}</span>
                  <span className="text-xs text-primary font-bold">{p.points}pts</span>
                </div>
                <span className="text-[10px] text-muted-foreground">{p.difficulty}</span>
              </div>
            ))}
          </div>
          <div className="lg:col-span-3 glass-card p-6 space-y-4">
            <h2 className="text-lg font-bold text-foreground">Problem: Array Rotation</h2>
            <p className="text-sm text-muted-foreground">Given an array nums of n integers and an integer k, rotate the array to the right by k steps.</p>
            <CodeEditor onRun={(code) => {
              setOutput("Running tests...\nTest 1: ✅ Passed\nTest 2: ✅ Passed\n\n🎉 All tests passed! +100 points");
              setScore(s => s + 100);
            }} output={output} />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Trophy className="h-6 w-6 text-primary" /> Coding Contest Arena
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Compete in timed coding contests and climb the leaderboard.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {contests.map(c => (
          <motion.div key={c.id} whileHover={{ scale: 1.02 }} className={`glass-card-hover p-6 ${c.status === "live" ? "neon-border" : ""}`}>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${statusColors[c.status]}`}>
                {c.status === "live" && <span className="inline-block w-1.5 h-1.5 rounded-full bg-neon-emerald mr-1 animate-pulse" />}
                {c.status}
              </span>
              <span className="text-xs text-muted-foreground">{c.difficulty}</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{c.name}</h3>
            <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-4">
              <div><Timer className="h-3 w-3 inline mr-1" />{c.duration}</div>
              <div><Zap className="h-3 w-3 inline mr-1" />{c.problems} problems</div>
              <div><Users className="h-3 w-3 inline mr-1" />{c.participants} joined</div>
            </div>
            <Button variant={c.status === "live" ? "neon" : c.status === "upcoming" ? "neon-outline" : "outline"} size="sm" className="w-full"
              onClick={() => c.status === "live" && setActiveContest(c.id)} disabled={c.status === "ended"}>
              {c.status === "live" ? <><Play className="h-3 w-3 mr-1" /> Join Now</> : c.status === "upcoming" ? <><Clock className="h-3 w-3 mr-1" /> Starts Soon</> : <><Lock className="h-3 w-3 mr-1" /> Ended</>}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ContestArena;
