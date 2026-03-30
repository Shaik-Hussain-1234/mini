import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Timer, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const questions: Record<string, { q: string; hints: string[]; ideal: string }[]> = {
  "Frontend": [
    { q: "Explain the difference between CSS Grid and Flexbox.", hints: ["1D vs 2D layout", "Use cases"], ideal: "Flexbox is 1D (row or column). Grid is 2D (rows and columns). Use Flexbox for component layouts, Grid for page layouts." },
    { q: "How does React's reconciliation algorithm work?", hints: ["Virtual DOM", "Diffing", "Keys"], ideal: "React creates a virtual DOM, diffs it with the previous one, and applies minimal changes to the real DOM using a heuristic O(n) algorithm." },
    { q: "What is tree shaking?", hints: ["Dead code elimination", "ES modules"], ideal: "Tree shaking removes unused exports from bundles. It works with ES modules' static structure to identify and eliminate dead code." },
  ],
  "Backend": [
    { q: "Explain REST vs GraphQL.", hints: ["Over-fetching", "Single endpoint"], ideal: "REST uses multiple endpoints with fixed data structures. GraphQL uses a single endpoint where clients specify exactly what data they need." },
    { q: "What is database indexing?", hints: ["B-tree", "Query performance"], ideal: "Indexes are data structures (usually B-trees) that speed up data retrieval by providing quick lookup paths without scanning entire tables." },
    { q: "Explain microservices vs monolith.", hints: ["Scaling", "Deployment"], ideal: "Monoliths are single deployable units. Microservices split functionality into independently deployable services, enabling independent scaling." },
  ],
  "System Design": [
    { q: "Design a URL shortener.", hints: ["Base62 encoding", "Database", "Caching"], ideal: "Generate short codes using Base62 encoding of auto-increment IDs. Store mappings in DB with Redis cache for hot URLs. Use 301 redirects." },
    { q: "Design a chat application.", hints: ["WebSockets", "Message queue", "Presence"], ideal: "Use WebSockets for real-time messaging. Message queue for delivery guarantees. Presence service for online status. Horizontal scaling with pub/sub." },
    { q: "Design a rate limiter.", hints: ["Token bucket", "Sliding window"], ideal: "Use token bucket or sliding window algorithm. Store counters in Redis for distributed systems. Return 429 status when limit exceeded." },
  ],
};

const MockInterview = () => {
  const [category, setCategory] = useState<keyof typeof questions>("Frontend");
  const [qIndex, setQIndex] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState<number[]>([]);

  const current = questions[category][qIndex];

  const handleNext = (rating: number) => {
    setScore([...score, rating]);
    setAnswer("");
    setShowHints(false);
    setShowAnswer(false);
    if (qIndex < questions[category].length - 1) setQIndex(qIndex + 1);
  };

  const reset = (cat: keyof typeof questions) => {
    setCategory(cat); setQIndex(0); setScore([]); setAnswer(""); setShowHints(false); setShowAnswer(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <Mic className="h-6 w-6 text-primary" /> Mock Interview
      </h1>

      <div className="flex gap-2">
        {(Object.keys(questions) as (keyof typeof questions)[]).map(c => (
          <button key={c} onClick={() => reset(c)} className={`tag-pill ${category === c ? "border-primary/60 bg-primary/20" : ""}`}>{c}</button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card-premium p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-muted-foreground">Q{qIndex + 1} of {questions[category].length}</span>
              <span className="tag-pill">{category}</span>
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-6">{current.q}</h2>

            <textarea value={answer} onChange={e => setAnswer(e.target.value)} rows={6} placeholder="Type your answer..."
              className="w-full bg-muted/20 border border-border/40 rounded-xl p-4 text-sm text-foreground resize-none focus:outline-none focus:border-primary/40" />

            <div className="flex gap-2 mt-4">
              <Button variant="neon-outline" size="sm" onClick={() => setShowHints(!showHints)}>
                {showHints ? "Hide" : "Show"} Hints
              </Button>
              <Button variant="neon-outline" size="sm" onClick={() => setShowAnswer(!showAnswer)}>
                {showAnswer ? "Hide" : "Show"} Ideal Answer
              </Button>
            </div>

            <AnimatePresence>
              {showHints && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  className="mt-4 flex gap-2 flex-wrap">
                  {current.hints.map(h => <span key={h} className="tag-pill">{h}</span>)}
                </motion.div>
              )}
              {showAnswer && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20 text-sm text-foreground">
                  {current.ideal}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex gap-3">
            <Button variant="neon-outline" size="sm" onClick={() => handleNext(1)}><XCircle className="h-4 w-4 mr-1 text-destructive" /> Needs Work</Button>
            <Button variant="neon-outline" size="sm" onClick={() => handleNext(2)}><Timer className="h-4 w-4 mr-1 text-neon-amber" /> Good</Button>
            <Button variant="neon" size="sm" onClick={() => handleNext(3)}><CheckCircle className="h-4 w-4 mr-1" /> Nailed It</Button>
          </div>
        </div>

        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Score Tracker</h3>
          <div className="space-y-2">
            {score.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Q{i + 1}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${s === 3 ? "bg-neon-emerald" : s === 2 ? "bg-neon-amber" : "bg-destructive"}`}
                    style={{ width: `${(s / 3) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          {score.length > 0 && (
            <div className="mt-4 text-center">
              <p className="text-2xl font-bold text-primary">{Math.round((score.reduce((a, b) => a + b, 0) / (score.length * 3)) * 100)}%</p>
              <p className="text-xs text-muted-foreground">Overall Score</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MockInterview;
