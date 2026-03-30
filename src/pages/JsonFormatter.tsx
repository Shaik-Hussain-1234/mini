import { useState } from "react";
import { motion } from "framer-motion";
import { Braces, Copy, Check, Minimize2, Maximize2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const JsonFormatter = () => {
  const [input, setInput] = useState('{"name":"John","age":30,"skills":["React","Node.js","Python"],"experience":{"years":5,"companies":["Google","Meta"]}}');
  const [indentSize, setIndentSize] = useState(2);
  const [copied, setCopied] = useState(false);

  let formatted = "";
  let error = "";
  try {
    const parsed = JSON.parse(input);
    formatted = JSON.stringify(parsed, null, indentSize);
  } catch (e: any) {
    error = e.message;
  }

  const handleMinify = () => {
    try { setInput(JSON.stringify(JSON.parse(input))); } catch { toast.error("Invalid JSON"); }
  };
  const handleFormat = () => {
    try { setInput(JSON.stringify(JSON.parse(input), null, indentSize)); } catch { toast.error("Invalid JSON"); }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(formatted || input);
    setCopied(true); toast.success("Copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <Braces className="h-6 w-6 text-primary" /> JSON Formatter
      </h1>

      <div className="flex gap-2 flex-wrap">
        <Button variant="neon-outline" size="sm" onClick={handleFormat}><Maximize2 className="h-4 w-4 mr-1" /> Beautify</Button>
        <Button variant="neon-outline" size="sm" onClick={handleMinify}><Minimize2 className="h-4 w-4 mr-1" /> Minify</Button>
        <Button variant="neon-outline" size="sm" onClick={handleCopy}>
          {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />} Copy
        </Button>
        <select value={indentSize} onChange={e => setIndentSize(+e.target.value)}
          className="text-xs bg-muted/30 border border-border/40 rounded-lg px-3 py-1.5 text-foreground">
          <option value={2}>2 spaces</option>
          <option value={4}>4 spaces</option>
          <option value={1}>Tab</option>
        </select>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="glass-card p-4">
          <p className="text-xs text-muted-foreground mb-2">Input</p>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={20}
            className="w-full bg-transparent text-sm font-mono text-foreground resize-none focus:outline-none" />
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-muted-foreground mb-2">Output</p>
          {error ? (
            <div className="flex items-start gap-2 text-destructive text-sm">
              <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" /> {error}
            </div>
          ) : (
            <pre className="text-sm font-mono text-neon-emerald overflow-auto whitespace-pre">{formatted}</pre>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default JsonFormatter;
