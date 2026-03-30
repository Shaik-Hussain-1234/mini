import { useState } from "react";
import { motion } from "framer-motion";
import { Bug, Check, X, ArrowRight, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

const challenges = [
  { title: "Off-by-one Error", buggy: `function sum(arr) {\n  let total = 0;\n  for (let i = 0; i <= arr.length; i++) {\n    total += arr[i];\n  }\n  return total;\n}`, fixed: `function sum(arr) {\n  let total = 0;\n  for (let i = 0; i < arr.length; i++) {\n    total += arr[i];\n  }\n  return total;\n}`, hint: "Check the loop boundary condition", difficulty: "Easy" },
  { title: "Async Trap", buggy: `async function fetchUsers() {\n  const users = fetch('/api/users');\n  return users.json();\n}`, fixed: `async function fetchUsers() {\n  const users = await fetch('/api/users');\n  return users.json();\n}`, hint: "fetch() returns a Promise", difficulty: "Medium" },
  { title: "Reference vs Value", buggy: `function addItem(list, item) {\n  const newList = list;\n  newList.push(item);\n  return newList;\n}`, fixed: `function addItem(list, item) {\n  const newList = [...list];\n  newList.push(item);\n  return newList;\n}`, hint: "Arrays are passed by reference", difficulty: "Medium" },
  { title: "Scope Issue", buggy: `for (var i = 0; i < 5; i++) {\n  setTimeout(() => {\n    console.log(i);\n  }, 100);\n}`, fixed: `for (let i = 0; i < 5; i++) {\n  setTimeout(() => {\n    console.log(i);\n  }, 100);\n}`, hint: "var is function-scoped, not block-scoped", difficulty: "Easy" },
  { title: "Type Coercion", buggy: `function isEqual(a, b) {\n  return a == b;\n}\n// isEqual(0, '') returns true!`, fixed: `function isEqual(a, b) {\n  return a === b;\n}\n// isEqual(0, '') returns false`, hint: "== performs type coercion", difficulty: "Easy" },
];

const DebugChallenge = () => {
  const [current, setCurrent] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showFix, setShowFix] = useState(false);
  const [solved, setSolved] = useState<Set<number>>(new Set());

  const ch = challenges[current];
  const diffColor: Record<string, string> = { Easy: "text-neon-emerald", Medium: "text-neon-amber", Hard: "text-destructive" };

  const markSolved = () => {
    setSolved(new Set([...solved, current]));
    setShowFix(true);
  };

  const next = () => {
    if (current < challenges.length - 1) { setCurrent(current + 1); setShowHint(false); setShowFix(false); }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Bug className="h-6 w-6 text-primary" /> Debug Challenge
        </h1>
        <span className="text-sm text-muted-foreground">{solved.size}/{challenges.length} solved</span>
      </div>

      <div className="flex gap-2">
        {challenges.map((_, i) => (
          <button key={i} onClick={() => { setCurrent(i); setShowHint(false); setShowFix(false); }}
            className={`h-8 w-8 rounded-lg text-xs font-bold transition-all ${current === i ? "bg-primary text-primary-foreground" : solved.has(i) ? "bg-neon-emerald/20 text-neon-emerald border border-neon-emerald/30" : "bg-muted/30 text-muted-foreground border border-border/30"}`}>
            {solved.has(i) ? <Check className="h-3 w-3 mx-auto" /> : i + 1}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">{ch.title}</h3>
            <span className={`text-xs font-bold ${diffColor[ch.difficulty]}`}>{ch.difficulty}</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">🐛 Find and fix the bug:</p>
          <pre className="text-sm font-mono text-destructive/80 bg-destructive/5 p-4 rounded-xl border border-destructive/20 overflow-auto">{ch.buggy}</pre>
          <div className="flex gap-2 mt-4">
            <Button variant="neon-outline" size="sm" onClick={() => setShowHint(!showHint)}>
              {showHint ? "Hide Hint" : "💡 Hint"}
            </Button>
            <Button variant="neon" size="sm" onClick={markSolved}>
              <Check className="h-4 w-4 mr-1" /> I Fixed It
            </Button>
          </div>
          {showHint && <p className="mt-3 text-sm text-neon-amber bg-neon-amber/5 p-3 rounded-xl border border-neon-amber/20">{ch.hint}</p>}
        </div>

        <div className="glass-card p-6">
          <h3 className="font-semibold text-foreground mb-4">{showFix ? "✅ Correct Solution" : "Solution Hidden"}</h3>
          {showFix ? (
            <pre className="text-sm font-mono text-neon-emerald bg-neon-emerald/5 p-4 rounded-xl border border-neon-emerald/20 overflow-auto">{ch.fixed}</pre>
          ) : (
            <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
              Click "I Fixed It" to reveal the solution
            </div>
          )}
          {showFix && current < challenges.length - 1 && (
            <Button variant="neon" size="sm" className="mt-4" onClick={next}>
              Next Challenge <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </div>

      {solved.size === challenges.length && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="glass-card-premium neon-border p-8 text-center">
          <Trophy className="h-10 w-10 text-neon-amber mx-auto mb-3" />
          <h2 className="text-xl font-bold text-foreground">All Bugs Squashed! 🎉</h2>
          <p className="text-sm text-muted-foreground mt-1">You've completed all debug challenges!</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DebugChallenge;
