import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const presets = [
  { name: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" },
  { name: "URL", pattern: "https?://[\\w.-]+(?:\\.[\\w]+)+[\\w.,@?^=%&:/~+#-]*" },
  { name: "Phone", pattern: "\\+?\\d{1,3}[-.\\s]?\\(?\\d{1,4}\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}" },
  { name: "IP Address", pattern: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b" },
  { name: "Hex Color", pattern: "#(?:[0-9a-fA-F]{3}){1,2}\\b" },
];

const RegexTester = () => {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testStr, setTestStr] = useState("Hello world! test@email.com 192.168.1.1 https://example.com #ff5733");
  const [copied, setCopied] = useState(false);

  const matches = useMemo(() => {
    try {
      if (!pattern) return [];
      const regex = new RegExp(pattern, flags);
      return Array.from(testStr.matchAll(regex)).map(m => ({ match: m[0], index: m.index ?? 0 }));
    } catch { return []; }
  }, [pattern, flags, testStr]);

  const isValid = useMemo(() => {
    try { if (pattern) new RegExp(pattern, flags); return true; } catch { return false; }
  }, [pattern, flags]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`/${pattern}/${flags}`);
    setCopied(true);
    toast.success("Copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <Search className="h-6 w-6 text-primary" /> Regex Tester
      </h1>

      <div className="flex gap-2 flex-wrap">
        {presets.map(p => (
          <button key={p.name} onClick={() => setPattern(p.pattern)} className="tag-pill">{p.name}</button>
        ))}
      </div>

      <div className="glass-card p-6 space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-sm">/</span>
            <Input value={pattern} onChange={e => setPattern(e.target.value)} placeholder="Enter regex..."
              className={`pl-6 pr-6 font-mono bg-muted/30 border-border/40 ${!isValid ? "border-destructive/50" : ""}`} />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-sm">/</span>
          </div>
          <Input value={flags} onChange={e => setFlags(e.target.value)} className="w-16 font-mono bg-muted/30 border-border/40 text-center" />
          <Button variant="neon-outline" size="icon" onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        {!isValid && <p className="text-xs text-destructive">Invalid regex pattern</p>}

        <textarea value={testStr} onChange={e => setTestStr(e.target.value)} rows={6}
          className="w-full bg-muted/20 border border-border/40 rounded-xl p-4 text-sm font-mono text-foreground resize-none focus:outline-none focus:border-primary/40" />

        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Matches:</span>
          <span className="text-primary font-bold">{matches.length}</span>
        </div>

        {matches.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {matches.map((m, i) => (
              <span key={i} className="px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm font-mono">
                {m.match} <span className="text-muted-foreground text-xs">@{m.index}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RegexTester;
