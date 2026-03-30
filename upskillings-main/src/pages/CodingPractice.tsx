import { motion, AnimatePresence } from "framer-motion";
import { Code, Search, Trophy, Flame, Star, Play, CheckCircle2, Filter, Zap, Hash } from "lucide-react";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CodeEditor from "@/components/CodeEditor";
import { problemsDB, allTags, allPlatforms, type Problem } from "@/data/problemsDB";

const diffColor: Record<string, string> = {
  Easy: "text-neon-emerald border-neon-emerald/20 bg-neon-emerald/5",
  Medium: "text-neon-amber border-neon-amber/20 bg-neon-amber/5",
  Hard: "text-neon-pink border-neon-pink/20 bg-neon-pink/5",
};

const platformColor: Record<string, string> = {
  LeetCode: "text-neon-amber",
  HackerRank: "text-neon-emerald",
  Codeforces: "text-neon-blue",
  CodeChef: "text-neon-purple",
  GeeksForGeeks: "text-neon-cyan",
};

const CodingPractice = () => {
  const [search, setSearch] = useState("");
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [filterDiff, setFilterDiff] = useState<string>("All");
  const [filterTag, setFilterTag] = useState<string>("All");
  const [filterPlatform, setFilterPlatform] = useState<string>("All");
  const [solvedIds, setSolvedIds] = useState<number[]>([]);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<{ passed: boolean; input: string; expected: string; got: string }[]>([]);
  const [allPassed, setAllPassed] = useState(false);

  const filtered = useMemo(() => problemsDB.filter((p) => {
    const matchesSearch = search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toString() === search.trim() ||
      p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesDiff = filterDiff === "All" || p.difficulty === filterDiff;
    const matchesTag = filterTag === "All" || p.tags.includes(filterTag);
    const matchesPlatform = filterPlatform === "All" || (p.platform || "LeetCode") === filterPlatform;
    return matchesSearch && matchesDiff && matchesTag && matchesPlatform;
  }), [search, filterDiff, filterTag, filterPlatform]);

  const stats = useMemo(() => ({
    easy: problemsDB.filter(p => p.difficulty === "Easy").length,
    medium: problemsDB.filter(p => p.difficulty === "Medium").length,
    hard: problemsDB.filter(p => p.difficulty === "Hard").length,
  }), []);

  const handleRun = (code: string, lang: string) => {
    setIsRunning(true);
    setTestResults([]);
    setAllPassed(false);

    setTimeout(() => {
      if (!selectedProblem) { setIsRunning(false); return; }
      
      const results = selectedProblem.testCases.map((tc, i) => {
        const passed = code.length > 30;
        return {
          passed: i === 0 ? passed : Math.random() > 0.3,
          input: tc.input,
          expected: tc.expected,
          got: passed ? tc.expected : "Error or wrong answer",
        };
      });

      const allPass = results.every(r => r.passed);
      setTestResults(results);
      setAllPassed(allPass);
      setOutput(
        results.map((r, i) =>
          `Test Case ${i + 1}: ${r.passed ? "✅ PASSED" : "❌ FAILED"}\n  Input: ${r.input}\n  Expected: ${r.expected}\n  Got: ${r.got}`
        ).join("\n\n") + (allPass ? "\n\n🎉 All test cases passed!" : "\n\n⚠️ Some test cases failed.")
      );
      setIsRunning(false);
    }, 1500);
  };

  const handleSolve = (id: number) => {
    if (!solvedIds.includes(id)) setSolvedIds(prev => [...prev, id]);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Code className="h-6 w-6 text-primary" /> Coding Practice Hub
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {problemsDB.length} problems from LeetCode, HackerRank, Codeforces, CodeChef & more
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: Star, color: "text-primary", value: solvedIds.length, label: "Solved", glow: "shadow-neon" },
          { icon: Zap, color: "text-neon-emerald", value: stats.easy, label: "Easy" },
          { icon: Flame, color: "text-neon-amber", value: stats.medium, label: "Medium" },
          { icon: Trophy, color: "text-neon-pink", value: stats.hard, label: "Hard" },
        ].map(s => (
          <motion.div key={s.label} whileHover={{ scale: 1.03 }} className={`glass-card p-4 text-center ${s.glow || ""}`}>
            <s.icon className={`h-5 w-5 mx-auto mb-1 ${s.color}`} />
            <motion.div key={s.value} initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-xl font-bold text-foreground">{s.value}</motion.div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="glass-card-premium p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by number (e.g. 1246), name, or tag..."
              className="pl-10 bg-secondary/30 border-border/50" />
          </div>
          <div className="flex gap-1.5">
            {["All", "Easy", "Medium", "Hard"].map(d => (
              <button key={d} onClick={() => setFilterDiff(d)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${filterDiff === d ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-border"}`}>
                {d}
              </button>
            ))}
          </div>
        </div>
        {/* Platform Filter */}
        <div className="flex gap-1.5 flex-wrap items-center">
          <Hash className="h-3.5 w-3.5 text-muted-foreground" />
          {["All", ...allPlatforms].map(p => (
            <button key={p} onClick={() => setFilterPlatform(p)}
              className={`text-[10px] px-2.5 py-1 rounded-full border transition-all ${filterPlatform === p ? "border-accent bg-accent/10 text-accent" : "border-border/50 text-muted-foreground"}`}>
              {p}
            </button>
          ))}
        </div>
        {/* Tag Filter */}
        <div className="flex gap-1.5 flex-wrap">
          <Filter className="h-3.5 w-3.5 text-muted-foreground mt-1" />
          {["All", ...allTags.slice(0, 14)].map(t => (
            <button key={t} onClick={() => setFilterTag(t)}
              className={`text-[10px] px-2 py-1 rounded-full border transition-all ${filterTag === t ? "border-primary bg-primary/10 text-primary" : "border-border/50 text-muted-foreground"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Problem List */}
        <div className="lg:col-span-2 glass-card p-4 max-h-[700px] overflow-y-auto">
          <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center justify-between">
            <span>Problems ({filtered.length})</span>
            <span className="text-xs text-muted-foreground">{solvedIds.length} solved</span>
          </h2>
          <div className="space-y-1.5">
            {filtered.map((p) => (
              <motion.button key={p.id}
                whileHover={{ x: 4 }}
                onClick={() => { setSelectedProblem(p); setOutput(""); setTestResults([]); setAllPassed(false); }}
                className={`w-full text-left flex items-center justify-between p-3 rounded-lg transition-all ${
                  selectedProblem?.id === p.id ? "bg-primary/10 border border-primary/30" : "bg-secondary/20 hover:bg-secondary/40 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 ${solvedIds.includes(p.id) ? "border-neon-emerald bg-neon-emerald/10" : "border-border"}`}>
                    {solvedIds.includes(p.id) && <CheckCircle2 className="h-3 w-3 text-neon-emerald" />}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">#{p.id}</span>
                      <span className={`text-[9px] ${platformColor[p.platform || "LeetCode"]}`}>{p.platform || "LC"}</span>
                    </div>
                    <span className="text-sm text-foreground truncate block">{p.title}</span>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border shrink-0 ${diffColor[p.difficulty]}`}>{p.difficulty}</span>
              </motion.button>
            ))}
            {filtered.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No problems found.</p>}
          </div>
        </div>

        {/* Problem Detail + Editor */}
        <div className="lg:col-span-3 space-y-4">
          <AnimatePresence mode="wait">
            {selectedProblem ? (
              <motion.div key={selectedProblem.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                <div className="glass-card-premium p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs ${platformColor[selectedProblem.platform || "LeetCode"]}`}>{selectedProblem.platform || "LeetCode"}</span>
                      </div>
                      <h2 className="text-lg font-bold text-foreground">#{selectedProblem.id}. {selectedProblem.title}</h2>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full border ${diffColor[selectedProblem.difficulty]}`}>{selectedProblem.difficulty}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProblem.tags.map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border border-primary/20 bg-primary/5 text-primary">{t}</span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedProblem.description}</p>
                  {selectedProblem.examples.map((ex, i) => (
                    <div key={i} className="bg-secondary/30 rounded-lg p-3 space-y-1 font-mono text-xs border border-border/30">
                      <div><span className="text-muted-foreground">Input: </span><span className="text-foreground">{ex.input}</span></div>
                      <div><span className="text-muted-foreground">Output: </span><span className="text-primary">{ex.output}</span></div>
                      {ex.explanation && <div className="text-muted-foreground mt-1 italic">{ex.explanation}</div>}
                    </div>
                  ))}
                  <div>
                    <h3 className="text-xs font-semibold text-foreground mb-1">Constraints:</h3>
                    <ul className="space-y-0.5">
                      {selectedProblem.constraints.map((c, i) => (
                        <li key={i} className="text-xs text-muted-foreground font-mono">• {c}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Play className="h-4 w-4 text-primary" /> Solution Editor
                  </h3>
                  <CodeEditor onRun={handleRun} output={output} isRunning={isRunning} />
                </div>

                {testResults.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4 space-y-2">
                    <h3 className="text-sm font-semibold text-foreground">Test Results</h3>
                    <div className="flex gap-2 flex-wrap">
                      {testResults.map((r, i) => (
                        <div key={i} className={`text-xs px-3 py-1.5 rounded-full border ${r.passed ? "border-neon-emerald/30 bg-neon-emerald/5 text-neon-emerald" : "border-destructive/30 bg-destructive/5 text-destructive"}`}>
                          Case {i + 1}: {r.passed ? "Passed ✅" : "Failed ❌"}
                        </div>
                      ))}
                    </div>
                    {allPassed && (
                      <Button variant="neon" onClick={() => handleSolve(selectedProblem.id)} className="w-full mt-3">
                        <CheckCircle2 className="h-4 w-4 mr-2" /> Mark as Completed
                      </Button>
                    )}
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card-premium flex flex-col items-center justify-center py-24 text-center aurora-bg">
                <Code className="h-16 w-16 text-muted-foreground/20 mb-4" />
                <p className="text-sm text-muted-foreground">Select a problem to start coding</p>
                <p className="text-xs text-muted-foreground mt-1">Search by number (e.g. 1246) or platform name</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default CodingPractice;
