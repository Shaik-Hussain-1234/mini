import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Eye, Code, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

const defaultMd = `# Hello Developer! 🚀

## Features
- **Bold text** and *italic text*
- [Links](https://example.com)
- Inline \`code\` blocks

### Code Example
\`\`\`javascript
const greet = (name) => {
  console.log(\`Hello, \${name}!\`);
};
greet("World");
\`\`\`

### Task List
- [x] Learn React
- [x] Master TypeScript
- [ ] Build awesome projects

> "The best way to predict the future is to create it." — Peter Drucker

---

| Skill | Level |
|-------|-------|
| React | ⭐⭐⭐⭐⭐ |
| Python | ⭐⭐⭐⭐ |
| Docker | ⭐⭐⭐ |
`;

const MarkdownEditor = () => {
  const [md, setMd] = useState(defaultMd);
  const [view, setView] = useState<"split" | "edit" | "preview">("split");

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" /> Markdown Editor
        </h1>
        <div className="flex gap-2">
          {(["edit", "split", "preview"] as const).map(v => (
            <Button key={v} variant={view === v ? "neon" : "neon-outline"} size="sm" onClick={() => setView(v)}>
              {v === "edit" ? <Code className="h-4 w-4" /> : v === "preview" ? <Eye className="h-4 w-4" /> : "Split"}
            </Button>
          ))}
          <Button variant="neon-outline" size="sm" onClick={() => { navigator.clipboard.writeText(md); toast.success("Copied!"); }}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className={`grid gap-4 ${view === "split" ? "lg:grid-cols-2" : ""}`} style={{ height: "calc(100vh - 200px)" }}>
        {view !== "preview" && (
          <textarea value={md} onChange={e => setMd(e.target.value)}
            className="glass-card p-4 w-full text-sm font-mono text-foreground resize-none focus:outline-none overflow-auto" />
        )}
        {view !== "edit" && (
          <div className="glass-card p-6 overflow-auto prose prose-invert prose-sm max-w-none
            prose-headings:text-foreground prose-a:text-primary prose-code:text-neon-emerald
            prose-strong:text-foreground prose-blockquote:border-primary/30 prose-blockquote:text-muted-foreground
            prose-pre:bg-muted/30 prose-pre:border prose-pre:border-border/40 prose-pre:rounded-xl">
            <ReactMarkdown>{md}</ReactMarkdown>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MarkdownEditor;
