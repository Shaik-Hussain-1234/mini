import { motion } from "framer-motion";
import { Timer, Play, Pause, RotateCcw, Coffee, Brain } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const presets = [
  { label: "Pomodoro", work: 25, break: 5, icon: Brain },
  { label: "Short Focus", work: 15, break: 3, icon: Timer },
  { label: "Deep Work", work: 50, break: 10, icon: Coffee },
];

const FocusTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [preset, setPreset] = useState(presets[0]);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => {
          if (prev === 0) {
            setMinutes(m => {
              if (m === 0) {
                setIsRunning(false);
                if (!isBreak) { setSessions(s => s + 1); setIsBreak(true); setMinutes(preset.break); } 
                else { setIsBreak(false); setMinutes(preset.work); }
                return isBreak ? preset.work : preset.break;
              }
              return m - 1;
            });
            return 59;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, isBreak, preset]);

  const reset = () => { setIsRunning(false); setMinutes(preset.work); setSeconds(0); setIsBreak(false); };
  const selectPreset = (p: typeof presets[0]) => { setPreset(p); setMinutes(p.work); setSeconds(0); setIsRunning(false); setIsBreak(false); };

  const totalSecs = minutes * 60 + seconds;
  const maxSecs = (isBreak ? preset.break : preset.work) * 60;
  const progress = ((maxSecs - totalSecs) / maxSecs) * 100;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-lg mx-auto">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2"><Timer className="h-6 w-6 text-primary" /> Focus Timer</h1>
        <p className="text-muted-foreground text-sm mt-1">Stay focused with Pomodoro technique.</p>
      </div>
      <div className="flex justify-center gap-3">
        {presets.map(p => (
          <button key={p.label} onClick={() => selectPreset(p)}
            className={`text-xs px-4 py-2 rounded-full border transition-all flex items-center gap-1.5 ${preset.label === p.label ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>
            <p.icon className="h-3.5 w-3.5" /> {p.label}
          </button>
        ))}
      </div>
      <div className="glass-card-premium neon-border p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-48 h-48 -rotate-90">
            <circle cx="96" cy="96" r="88" fill="none" stroke="hsl(var(--muted))" strokeWidth="4" />
            <circle cx="96" cy="96" r="88" fill="none" stroke={isBreak ? "hsl(var(--neon-emerald))" : "hsl(var(--primary))"} strokeWidth="4"
              strokeDasharray={553} strokeDashoffset={553 - (553 * progress) / 100} strokeLinecap="round" className="transition-all duration-1000" />
          </svg>
        </div>
        <div className="relative z-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{isBreak ? "☕ Break Time" : "🧠 Focus Time"}</p>
          <p className="text-6xl font-extrabold text-foreground font-mono">{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</p>
        </div>
      </div>
      <div className="flex justify-center gap-3">
        <Button variant={isRunning ? "neon-outline" : "neon"} onClick={() => setIsRunning(!isRunning)} className="px-8">
          {isRunning ? <><Pause className="h-4 w-4 mr-2" /> Pause</> : <><Play className="h-4 w-4 mr-2" /> Start</>}
        </Button>
        <Button variant="ghost" onClick={reset}><RotateCcw className="h-4 w-4" /></Button>
      </div>
      <div className="glass-card p-4 text-center">
        <p className="text-xs text-muted-foreground">Sessions completed today</p>
        <p className="text-2xl font-bold gradient-text">{sessions}</p>
      </div>
    </motion.div>
  );
};

export default FocusTimer;
