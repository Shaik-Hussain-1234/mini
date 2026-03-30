import { motion } from "framer-motion";
import { Calendar, Trophy, Clock, Flame, Target, Star, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CodeEditor from "@/components/CodeEditor";

const challenges = [
  { id: 1, week: "Week 42", title: "String Compression", description: "Given a string s, compress it using character counts. 'aabcccccaaa' → 'a2b1c5a3'. Return original if compressed isn't shorter.", difficulty: "Medium" as const, participants: 342, deadline: "Mar 14, 2026", xpReward: 500 },
  { id: 2, week: "Week 41", title: "Matrix Spiral", description: "Given an m x n matrix, return all elements in spiral order.", difficulty: "Medium" as const, participants: 289, deadline: "Mar 7, 2026", xpReward: 500 },
  { id: 3, week: "Week 40", title: "LRU Cache", description: "Design a data structure for Least Recently Used cache with O(1) get and put.", difficulty: "Hard" as const, participants: 198, deadline: "Feb 28, 2026", xpReward: 750 },
];

const leaderboard = [
  { rank: 1, name: "Alice Chen", score: 2840, solved: 42, badge: "🥇" },
  { rank: 2, name: "Bob Smith", score: 2650, solved: 39, badge: "🥈" },
  { rank: 3, name: "Carol Lee", score: 2480, solved: 37, badge: "🥉" },
  { rank: 4, name: "David Kim", score: 2320, solved: 35, badge: "" },
  { rank: 5, name: "Emily Wang", score: 2150, solved: 33, badge: "" },
  { rank: 6, name: "Frank Li", score: 1980, solved: 30, badge: "" },
  { rank: 7, name: "Grace Park", score: 1850, solved: 28, badge: "" },
  { rank: 8, name: "Henry Zhao", score: 1720, solved: 26, badge: "" },
];

const diffColor: Record<string, string> = {
  Easy: "text-neon-emerald border-neon-emerald/20 bg-neon-emerald/5",
  Medium: "text-neon-amber border-neon-amber/20 bg-neon-amber/5",
  Hard: "text-neon-pink border-neon-pink/20 bg-neon-pink/5",
};

const WeeklyChallenge = () => {
  const [activeChallenge, setActiveChallenge] = useState<typeof challenges[0] | null>(null);
  const [output, setOutput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (activeChallenge) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <button onClick={() => { setActiveChallenge(null); setSubmitted(false); setOutput(""); }} className="text-xs text-muted-foreground hover:text-primary">← Back to Challenges</button>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-primary">{activeChallenge.week}</span>
            <h1 className="text-xl font-bold text-foreground">{activeChallenge.title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-xs px-2 py-0.5 rounded-full border ${diffColor[activeChallenge.difficulty]}`}>{activeChallenge.difficulty}</span>
            <span className="text-xs text-neon-amber flex items-center gap-1"><Star className="h-3 w-3" /> {activeChallenge.xpReward} XP</span>
          </div>
        </div>
        <div className="glass-card p-6">
          <p className="text-sm text-muted-foreground leading-relaxed">{activeChallenge.description}</p>
        </div>
        <div className="glass-card p-6">
          <CodeEditor onRun={(code) => {
            setOutput("Test 1: ✅ Passed\nTest 2: ✅ Passed\nTest 3: ✅ Passed\n\n🎉 Challenge completed! +500 XP");
            setSubmitted(true);
          }} output={output} />
        </div>
        {submitted && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card neon-border p-6 text-center space-y-2">
            <Trophy className="h-10 w-10 text-neon-amber mx-auto" />
            <h2 className="text-lg font-bold gradient-text">Challenge Completed!</h2>
            <p className="text-sm text-muted-foreground">You earned {activeChallenge.xpReward} XP</p>
          </motion.div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><Calendar className="h-6 w-6 text-primary" /> Weekly Challenges</h1>
        <p className="text-muted-foreground text-sm mt-1">Compete in weekly coding challenges and climb the leaderboard.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Current Challenge */}
          <div className="glass-card neon-border p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs px-2 py-0.5 rounded-full border border-neon-emerald/20 bg-neon-emerald/5 text-neon-emerald">Active</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> Ends {challenges[0].deadline}</span>
            </div>
            <div>
              <span className="text-xs text-primary">{challenges[0].week}</span>
              <h2 className="text-lg font-bold text-foreground">{challenges[0].title}</h2>
            </div>
            <p className="text-sm text-muted-foreground">{challenges[0].description}</p>
            <div className="flex items-center gap-4">
              <span className={`text-xs px-2 py-0.5 rounded-full border ${diffColor[challenges[0].difficulty]}`}>{challenges[0].difficulty}</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Users className="h-3 w-3" /> {challenges[0].participants} participants</span>
              <span className="text-xs text-neon-amber flex items-center gap-1"><Star className="h-3 w-3" /> {challenges[0].xpReward} XP</span>
            </div>
            <Button variant="neon" onClick={() => setActiveChallenge(challenges[0])} className="w-full">
              <Target className="h-4 w-4 mr-2" /> Start Challenge
            </Button>
          </div>

          {/* Past Challenges */}
          <h3 className="text-sm font-semibold text-foreground">Past Challenges</h3>
          {challenges.slice(1).map(c => (
            <div key={c.id} className="glass-card p-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-muted-foreground">{c.week}</span>
                <h3 className="text-sm font-semibold text-foreground">{c.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${diffColor[c.difficulty]}`}>{c.difficulty}</span>
                  <span className="text-xs text-muted-foreground">{c.participants} solved</span>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setActiveChallenge(c)}>View</Button>
            </div>
          ))}
        </div>

        {/* Leaderboard */}
        <div className="glass-card p-6 space-y-4">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2"><Trophy className="h-5 w-5 text-neon-amber" /> Leaderboard</h2>
          <div className="space-y-3">
            {leaderboard.map(u => (
              <div key={u.rank} className={`flex items-center justify-between p-2 rounded-lg ${u.rank <= 3 ? "bg-primary/5" : ""}`}>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-muted-foreground w-6">#{u.rank}</span>
                  <span className="text-sm text-foreground">{u.badge} {u.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-primary">{u.score}</span>
                  <span className="text-[10px] text-muted-foreground block">{u.solved} solved</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeeklyChallenge;
