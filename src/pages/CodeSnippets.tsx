import { motion } from "framer-motion";
import { Bookmark, Copy, Check, Search, Plus } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const defaultSnippets = [
  { id: 1, title: "Debounce Function", lang: "JavaScript", code: `function debounce(fn, delay) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}`, tags: ["utility", "performance"] },
  { id: 2, title: "Fetch with Retry", lang: "TypeScript", code: `async function fetchRetry(url: string, retries = 3): Promise<Response> {\n  for (let i = 0; i < retries; i++) {\n    try { return await fetch(url); }\n    catch (e) { if (i === retries - 1) throw e; }\n  }\n  throw new Error("Failed");\n}`, tags: ["api", "error-handling"] },
  { id: 3, title: "Python List Flatten", lang: "Python", code: `def flatten(lst):\n    return [item for sublist in lst for item in (flatten(sublist) if isinstance(sublist, list) else [sublist])]`, tags: ["utility", "recursion"] },
  { id: 4, title: "CSS Glass Card", lang: "CSS", code: `.glass {\n  background: rgba(255, 255, 255, 0.05);\n  backdrop-filter: blur(20px);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 12px;\n}`, tags: ["ui", "glassmorphism"] },
  { id: 5, title: "React Custom Hook - useLocalStorage", lang: "TypeScript", code: `function useLocalStorage<T>(key: string, initial: T) {\n  const [value, setValue] = useState<T>(() => {\n    const stored = localStorage.getItem(key);\n    return stored ? JSON.parse(stored) : initial;\n  });\n  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [key, value]);\n  return [value, setValue] as const;\n}`, tags: ["react", "hooks"] },
  { id: 6, title: "SQL - Find Duplicates", lang: "SQL", code: `SELECT column_name, COUNT(*)\nFROM table_name\nGROUP BY column_name\nHAVING COUNT(*) > 1;`, tags: ["database", "query"] },
];

const CodeSnippets = () => {
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState<number | null>(null);
  const [snippets] = useState(defaultSnippets);

  const filtered = snippets.filter(s => s.title.toLowerCase().includes(search.toLowerCase()) || s.lang.toLowerCase().includes(search.toLowerCase()) || s.tags.some(t => t.includes(search.toLowerCase())));

  const copyCode = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><Bookmark className="h-6 w-6 text-primary" /> Code Snippets Library</h1>
        <p className="text-muted-foreground text-sm mt-1">Useful code snippets you can copy and use in your projects.</p>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search snippets..." className="pl-10 bg-secondary/30 border-border/50" />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map(s => (
          <motion.div key={s.id} whileHover={{ y: -2 }} className="glass-card-hover p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">{s.title}</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full border border-primary/20 bg-primary/5 text-primary">{s.lang}</span>
            </div>
            <pre className="bg-background/80 rounded-lg p-3 text-xs font-mono text-foreground overflow-x-auto border border-border/30 max-h-[150px]">
              {s.code}
            </pre>
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                {s.tags.map(t => <span key={t} className="text-[9px] px-1.5 py-0.5 rounded border border-border/50 text-muted-foreground">{t}</span>)}
              </div>
              <button onClick={() => copyCode(s.id, s.code)} className="text-xs text-primary flex items-center gap-1 hover:underline">
                {copied === s.id ? <><Check className="h-3 w-3" /> Copied!</> : <><Copy className="h-3 w-3" /> Copy</>}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CodeSnippets;
