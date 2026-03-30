import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, Pause, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const algorithms = ["Bubble Sort", "Selection Sort", "Insertion Sort", "Quick Sort", "Merge Sort"];

const AlgorithmVisualizer = () => {
  const [array, setArray] = useState<number[]>([]);
  const [sorting, setSorting] = useState(false);
  const [selected, setSelected] = useState("Bubble Sort");
  const [speed, setSpeed] = useState(50);
  const [comparing, setComparing] = useState<number[]>([]);
  const stopRef = useRef(false);

  const generateArray = () => {
    const newArr = Array.from({ length: 40 }, () => Math.floor(Math.random() * 90) + 10);
    setArray(newArr);
    setComparing([]);
  };

  useEffect(() => { generateArray(); }, []);

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  const bubbleSort = async () => {
    const arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (stopRef.current) return;
        setComparing([j, j + 1]);
        if (arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        setArray([...arr]);
        await sleep(100 - speed);
      }
    }
    setComparing([]);
  };

  const selectionSort = async () => {
    const arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      let min = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (stopRef.current) return;
        setComparing([min, j]);
        if (arr[j] < arr[min]) min = j;
        await sleep(100 - speed);
      }
      [arr[i], arr[min]] = [arr[min], arr[i]];
      setArray([...arr]);
    }
    setComparing([]);
  };

  const handleSort = async () => {
    stopRef.current = false;
    setSorting(true);
    if (selected === "Bubble Sort") await bubbleSort();
    else if (selected === "Selection Sort") await selectionSort();
    else await bubbleSort(); // fallback
    setSorting(false);
  };

  const handleStop = () => { stopRef.current = true; setSorting(false); };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" /> Algorithm Visualizer
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Watch sorting algorithms in real-time</p>
        </div>
        <div className="flex gap-2">
          <Button variant="neon-outline" size="sm" onClick={generateArray} disabled={sorting}>
            <RotateCcw className="h-4 w-4 mr-1" /> Reset
          </Button>
          {sorting ? (
            <Button variant="destructive" size="sm" onClick={handleStop}><Pause className="h-4 w-4 mr-1" /> Stop</Button>
          ) : (
            <Button variant="neon" size="sm" onClick={handleSort}><Play className="h-4 w-4 mr-1" /> Sort</Button>
          )}
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {algorithms.map(a => (
          <button key={a} onClick={() => !sorting && setSelected(a)}
            className={`tag-pill ${selected === a ? "border-primary/60 bg-primary/20" : ""}`}>
            {a}
          </button>
        ))}
      </div>

      <div className="glass-card p-6">
        <div className="flex items-end justify-center gap-[2px] h-64">
          {array.map((val, i) => (
            <motion.div key={i} layout transition={{ duration: 0.1 }}
              className={`rounded-t transition-colors duration-150 ${comparing.includes(i) ? "bg-neon-pink" : "bg-primary/70"}`}
              style={{ height: `${val}%`, width: `${100 / array.length}%`, maxWidth: 20 }} />
          ))}
        </div>
      </div>

      <div className="glass-card p-4 flex items-center gap-4">
        <span className="text-sm text-muted-foreground">Speed:</span>
        <input type="range" min={10} max={95} value={speed} onChange={e => setSpeed(+e.target.value)}
          className="flex-1 accent-primary" disabled={sorting} />
        <span className="text-sm text-primary font-mono">{speed}%</span>
      </div>
    </motion.div>
  );
};

export default AlgorithmVisualizer;
