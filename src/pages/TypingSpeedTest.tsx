import { motion } from "framer-motion";
import { Keyboard, RotateCcw, Trophy, Zap, Clock } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

const sentences = [
  "The quick brown fox jumps over the lazy dog near the riverbank.",
  "React is a JavaScript library for building user interfaces efficiently.",
  "Machine learning algorithms can identify patterns in large datasets.",
  "Docker containers provide isolated environments for application deployment.",
  "TypeScript adds static typing to JavaScript for better developer experience.",
  "Kubernetes orchestrates containerized applications across multiple hosts.",
  "GraphQL provides a flexible query language for your API endpoints.",
  "Continuous integration helps teams detect problems early in development.",
];

const TypingSpeedTest = () => {
  const [text, setText] = useState(sentences[0]);
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (started && !finished) {
      const interval = setInterval(() => setElapsed(Date.now() - startTime), 100);
      return () => clearInterval(interval);
    }
  }, [started, finished, startTime]);

  const handleInput = useCallback((val: string) => {
    if (!started) { setStarted(true); setStartTime(Date.now()); }
    setInput(val);
    if (val.length >= text.length) {
      setFinished(true);
      const mins = (Date.now() - startTime) / 60000;
      const words = text.split(" ").length;
      setWpm(Math.round(words / mins));
      let correct = 0;
      for (let i = 0; i < text.length; i++) if (val[i] === text[i]) correct++;
      setAccuracy(Math.round((correct / text.length) * 100));
    }
  }, [started, startTime, text]);

  const reset = () => {
    setText(sentences[Math.floor(Math.random() * sentences.length)]);
    setInput(""); setStarted(false); setFinished(false); setWpm(0); setAccuracy(100); setElapsed(0);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><Keyboard className="h-6 w-6 text-primary" /> Typing Speed Test</h1>
        <p className="text-muted-foreground text-sm mt-1">Test your typing speed and accuracy.</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[{ icon: Zap, label: "WPM", value: wpm, color: "text-primary" }, { icon: Trophy, label: "Accuracy", value: `${accuracy}%`, color: "text-neon-emerald" }, { icon: Clock, label: "Time", value: `${(elapsed / 1000).toFixed(1)}s`, color: "text-neon-amber" }].map(s => (
          <div key={s.label} className="glass-card p-4 text-center">
            <s.icon className={`h-5 w-5 mx-auto mb-1 ${s.color}`} />
            <div className="text-xl font-bold text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="glass-card-premium p-6 space-y-4">
        <div className="font-mono text-base leading-relaxed tracking-wide">
          {text.split("").map((char, i) => (
            <span key={i} className={i < input.length ? (input[i] === char ? "text-neon-emerald" : "text-destructive bg-destructive/10") : "text-muted-foreground"}>{char}</span>
          ))}
        </div>
        <textarea value={input} onChange={e => handleInput(e.target.value)} disabled={finished} placeholder="Start typing here..." autoFocus
          className="w-full bg-secondary/30 border border-border/50 rounded-lg p-3 text-foreground font-mono text-sm resize-none h-20 focus:outline-none focus:border-primary/50" />
      </div>
      {finished && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card neon-border p-6 text-center">
          <h2 className="text-lg font-bold gradient-text mb-2">Test Complete!</h2>
          <p className="text-3xl font-extrabold text-foreground">{wpm} WPM</p>
          <p className="text-sm text-muted-foreground mt-1">{accuracy}% accuracy</p>
        </motion.div>
      )}
      <Button variant="neon-outline" onClick={reset} className="w-full"><RotateCcw className="h-4 w-4 mr-2" /> New Test</Button>
    </motion.div>
  );
};

export default TypingSpeedTest;
