import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Play, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const methods = ["GET", "POST", "PUT", "DELETE"] as const;
const presets = [
  { name: "Users", url: "https://jsonplaceholder.typicode.com/users", method: "GET" as const },
  { name: "Posts", url: "https://jsonplaceholder.typicode.com/posts?_limit=5", method: "GET" as const },
  { name: "Todos", url: "https://jsonplaceholder.typicode.com/todos?_limit=5", method: "GET" as const },
];

const ApiPlayground = () => {
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/users");
  const [method, setMethod] = useState<typeof methods[number]>("GET");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(0);

  const handleSend = async () => {
    setLoading(true);
    const start = performance.now();
    try {
      const opts: RequestInit = { method };
      if (body && method !== "GET") { opts.body = body; opts.headers = { "Content-Type": "application/json" }; }
      const res = await fetch(url, opts);
      setStatus(res.status);
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (e: any) {
      setResponse(e.message);
      setStatus(0);
    }
    setTime(Math.round(performance.now() - start));
    setLoading(false);
  };

  const methodColor: Record<string, string> = { GET: "text-neon-emerald", POST: "text-neon-amber", PUT: "text-neon-blue", DELETE: "text-destructive" };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <Globe className="h-6 w-6 text-primary" /> API Playground
      </h1>

      <div className="flex gap-2 flex-wrap">
        {presets.map(p => (
          <button key={p.name} onClick={() => { setUrl(p.url); setMethod(p.method); }} className="tag-pill">{p.name}</button>
        ))}
      </div>

      <div className="glass-card p-4">
        <div className="flex gap-2">
          <select value={method} onChange={e => setMethod(e.target.value as any)}
            className={`bg-muted/30 border border-border/40 rounded-xl px-3 text-sm font-bold ${methodColor[method]}`}>
            {methods.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <Input value={url} onChange={e => setUrl(e.target.value)} className="flex-1 font-mono text-sm bg-muted/30 border-border/40" />
          <Button variant="neon" onClick={handleSend} disabled={loading}>
            <Play className="h-4 w-4 mr-1" /> {loading ? "..." : "Send"}
          </Button>
        </div>

        {method !== "GET" && (
          <textarea value={body} onChange={e => setBody(e.target.value)} rows={4} placeholder='{"key": "value"}'
            className="w-full mt-3 bg-muted/20 border border-border/40 rounded-xl p-3 text-sm font-mono text-foreground resize-none focus:outline-none" />
        )}
      </div>

      {status !== null && (
        <div className="glass-card p-4">
          <div className="flex items-center gap-4 mb-3">
            <span className={`text-sm font-bold ${status >= 200 && status < 300 ? "text-neon-emerald" : "text-destructive"}`}>
              Status: {status}
            </span>
            <span className="text-xs text-muted-foreground">{time}ms</span>
            <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(response); toast.success("Copied!"); }}>
              <Copy className="h-3 w-3" />
            </Button>
          </div>
          <pre className="text-xs font-mono text-foreground overflow-auto max-h-96 whitespace-pre">{response}</pre>
        </div>
      )}
    </motion.div>
  );
};

export default ApiPlayground;
